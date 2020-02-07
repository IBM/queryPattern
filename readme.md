[![Build Status](https://travis-ci.org/IBM/queryPattern.svg?branch=master)](https://travis-ci.org/IBM/queryPattern)

# Exploring the Querying Capability of Hyperledger Fabric 1.4

In this pattern, we will take a look at how you can query the world state of a peer within Hyperledger Fabric. Querying the world state is useful for seeing the current state of the assets in the network. For this pattern, we will be using the commercial paper use case from the [Hyperledger Fabric 1.4 documentation](https://hyperledger-fabric.readthedocs.io/en/release-1.4/developapps/scenario.html).

In this pattern, you will go through the process of creating indexes for the CouchDB world state database. You will then update the smart contract to include the logic to query the world state utilizing the newly created indexes. After updating and redeploying the smart contract, you will simulate 100 transactions to populate the world state with assets. Lastly, you will run a few queries utilizing the Node.js SDK and view the results that were returned.


## What are database indexes?

In order to understand indexes, let's take a look at what happens when you query the world state. Say, for example, you want to find all assets owned by the user, "Bob". The database will search through each json document in the database one by one and return all documents that match user = "bob". This might not seem like a big deal but consider if you have millions of documents in your database. These queries might take a while to return the results as the database needs to go through each and every document. With indexes you create a reference that contains all the values of a specific field and which document contains that value. What this means is that instead of searching through every document, the database can just search the index for occurrences of the user "bob" and return the documents that are referenced. 

It is important to note that every time a document is added to the database the index needs to be updated. Normally in CouchDB this is done when a query is received but in Hyperledger Fabric the indexes are updated every time a new block is committed which allows for faster querying. This is a process known as **index warming**.


## Flow

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73315028-f5d28500-41fc-11ea-9aba-31f1ed27e39d.png">
</p>
<br>

1. The developer creates the query indexes.
2. The developer adds query logic to the smart contract.
3. The IBM Blockchain extension for VS Code is then used to package, install, and instantiate the smart contract and indexes on the local Hyperledger Fabric network.
4. We simulate 100 transactions on the network to populate the world state with data.
5. The Node.js client application uses the Hyperledger Fabric SDK to send the query to the endorsing nodes to evaluate the query transaction.
6. The query results are returned.


## Prerequisites 

- Install [VSCode version 1.38.0 or greater](https://code.visualstudio.com)
- Install the [IBM Blockchain platform extension for VSCode](https://github.com/IBM-Blockchain/blockchain-vscode-extension)
- [Node v8.x or v10.x and npm v6.x or greater](https://nodejs.org/en/download/)
- [Docker version v17.06.2-ce or greater](https://www.docker.com/get-docker)
- [Docker Compose v1.14.0 or greater](https://docs.docker.com/compose/install/)


## Steps

### 1. Deploy the commercial paper smart contract

As mentioned before, this pattern extends the commercial paper example so we will need to package, install, and instantiate the commercial paper smart contract before we do anything else.

Follow the instructions in the [SETUP.md](./SETUP.md) document to get your local environment up and running with the commercial paper smart contract. 


### 2. Create indexes for the commonly used queries

In the commercial paper use case, we will be querying by issuer, by owner, and by the current state of each asset.

1. First, create a directory under the **contract** directory and name the new directory **META-INF**.
2. Then, within the new directory, create another directory named **statedb**.
3. After that, create a new directory inside of **statedb** called **couchdb**.
4. Next, you guessed it, create a new directory inside of **couchdb** and name it **indexes**.

The directory structure should look like the image below.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73315384-f3245f80-41fd-11ea-8f44-21efed7110a0.png">
</p>
<br>

1. Now we can start creating our index definitions. Create a new file in the **indexes** directory and name it **issuerIndex.json**
2. Then, copy the following code into that file:

```javascript
{
    "index": {
        "fields": [ "issuer"]
    },
    "ddoc": "issuerIndexDoc",
    "name": "issuerIndex",
    "type": "json"
}
```

This file states that the index will:
- keep track of the *issuer* field of each document
- store this index in a design document (ddoc) named *issuerIndexDoc*
- is named issuerIndex
- will be in json format

Now let's create two more index files.

3. Create a new file in the **indexes** directory and name it **ownerIndex.json**
4. Then, copy the following code into that file:

```javascript
{
    "index": {
        "fields": ["owner"]
    },
    "ddoc": "ownerIndexDoc",
    "name": "ownerIndex",
    "type": "json"
}
```

This index is very similar to the previous one for the issuer field but instead we are indexing the *owner* field.

5. Finally, create one last file in the **indexes** directory and name it **currentStateIndex.json**
6. Then, copy the following code into that file:

```javascript
{
    "index": {
        "fields": [ "currentState"]
    },
    "ddoc": "currentStateIndexDoc",
    "name": "currentStateIndex",
    "type": "json"
}
```

Your directory structure should now look like this:

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73315427-16e7a580-41fe-11ea-8fb3-920391ffeaa1.png">
</p>
<br>

And that's all it takes to build indexes. These indexes will be deployed the next time the smart contract is installed and instantiated.


### 3. Implement query transactions in the smart contract

Now we need to implement the query logic in the transactions of the smart contract. These transactions will be invoked by the Node.js SDK to execute our queries.

1. Using VSCode, open the [papercontract.js](./papercontract.js) file found in this pattern repo
2. Replace the contents of [contract/lib/papercontract.js](./contract/lib/papercontract.js) with the new [papercontract.js](./papercontract.js)

This updated contract already has the query logic added. Let's take a look at the transactions that were added.

- queryByIssuer, queryByOwner, and queryByCurrentState - These transactions are all similar in that they take one parameter and query the respective fields in the database. If you look at the *queryString* for each transaction, you will notice that they are pointing to the design documents that hold the indexes that were created earlier. This query string is then passed to *queryWithQueryString* to be executed.

- queryAll - This transaction does what it says. It gets all asset states from the world state database. This query string is then passed to *queryWithQueryString* to be executed.

- queryWithQueryString - This function receives a query string as a parameter and is called by other transactions in the contract to do the actual querying. You can also do ad hoc queries with this transaction by passing in your own query strings.

Let's take a closer look at the code involved in making these queries.

Open the new [papercontract.js](./papercontract.js) in VS Code and go to line 182 

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74057410-de8c5800-49b1-11ea-8e4e-036258251935.png">
</p>
<br>

Take a look at how the `queryString` is structured. The `selector` property is where you specify which field of the asset state you want to search against. In the case of our `queryByOwner` transaction, we are searching against the `owner` field and passing in a variable that represents the owner that we want to search for (e.g. `MagnetoCorp`).

The next property to note is `use_index` which allows you to specify a design document and index to use for the query.


### 4. Upgrading the deployed contract

Since we made changes to the smart contract we now need to re-deploy it to the peer.

1. Open up [contract/package.json](./contract/package.json) in VS Code

2. Change the *version* property to **0.0.2** and save the file.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73315612-8c537600-41fe-11ea-910f-7e073dcc4d77.png">
</p>
<br>

3. Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package Open Project`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910509-05036d00-3140-11ea-8b15-7c8aeb403974.png">
</p>

If necessary, specify to create the package from the **contract** folder.

4. Click the `IBM Blockchain Platform` extension button on the left. This will show the packaged contracts on top and the blockchain connections on the bottom.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74057595-4773d000-49b2-11ea-869f-225f27992677.png">
</p>
<br>

5. The next step is to install this newly packaged smart contract - which is named **papercontract@0.0.2**. Find the **FABRIC ENVIRONMENTS** section and click on **+ Install**. Select **papercontract@0.0.2** when prompted to select the package to install on the peer.

When the process completes, you should see **papercontract@0.0.2** under the *Installed* section under **FABRIC ENVIRONMENTS**.

6. Next, go to the **FABRIC ENVIRONMENTS** section and find the instantiated **papercontract@0.0.1**. Right click on it and select **Upgrade Smart Contract**

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74058057-34adcb00-49b3-11ea-967a-fe9775687364.png">
</p>
<br>

7. Select the newly installed **papercontract@0.0.2**, when prompted to select the smart contract version to perform an upgrade with.

8. When asked about what function you'd like to call, enter **instantiate**.

9. Then when it asks for arguments to pass, just press enter without typing anything.

10. Select **No** when prompted to provide a private data collection configuration file.

11. Select **Default (single endorser, any org)** when prompted to choose a smart contract endorsement policy.

12. If successful, you should now see **papercontract@0.0.2** in the **FABRIC ENVIRONMENTS** section under **Instantiated**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74058551-4774cf80-49b4-11ea-9f2a-2b5b290ff3fe.png">
</p>
<br>


### 5. Query the world state with the Node.js SDK

Before we run the query program we need to do a few things first:
- Install dependencies
- Export the connection details and create the wallet
- Populate the world state


#### 1. Installing dependencies

1. From the terminal, cd into the **application** directory of this repo. 
2. Run `npm install`.


#### 2. Exporting connection details and wallet

1. From the IBM Blockchain Platform extension, go to the **FABRIC GATEWAYS** section and right click on **Local Fabric**.

2. Select **Export Connection Profile**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74058737-a9353980-49b4-11ea-8dc3-074de39b4b89.png">
</p>
<br>

3. In the dialog that appears, select the **queryPattern** folder.

This process will export the connection profile which has the necessary information our application will need to interact with our blockchain network. Next we need to export our wallet.

4. From the IBM Blockchain Platform extension, go to the **FABRIC WALLETS** section at the bottom left
and right-click the **Local Fabric Wallet**. Then select **Export Wallet**. In the dialog that appears, 
choose the **queryPattern** folder.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74058981-2791db80-49b5-11ea-9143-7ae909f9ce79.png">
</p>
<br>

5. Switch back to the Explorer view by clicking on the paper icons at the top left of VS Code. You should now see the newly exported **local_fabric_wallet** folder.

Your folder structure should look similar to the picture below, with the wallet and admin credentials which include a public and private key.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74059113-6e7fd100-49b5-11ea-9206-857fddbabf07.png">
</p>
<br>


#### 3. Populate the world state

Right now the world state is empty and there is nothing to query. Let's add some entries to the ledger so that we can see some results when we run the queries.

1. From the terminal and while in the **application** folder, run `node setup.js`

This will run through a variety of transactions to populate the ledger. The process will take about 2-3 minutes. While this is running, take a look at the **setup.js** file from within VS Code to see what the transactions are doing.


#### 4. Query the world state

Now we can finally get around to querying the world state.

1. From the terminal, run `node query.js`

This query will return absolutely everything that is in the world state. While this might be valuable in some situations, in most cases you will want to search based on certain criteria such as by owner or by status.

2. From the terminal, run `node queryByOwner.js`

This query will return all assets that are currently owned by MagnetoCorp. If you take a look at the `queryByOwner.js` file in VS Code you can see in line 66 that we are calling the `queryByOwner` transaction defined in the `papercontract.js` file and that we are passing in `MagnetoCorp` as the only argument. You can easily change `MagnetoCorp` to `DigiBank` and rerun the query to get all assets owned by DigiBank instead.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74059396-f6fe7180-49b5-11ea-8255-f15edabaa60a.png">
</p>
<br>

3. From the terminal, run `node queryByCurrentState.js`

This query will return all commercial papers that have been bought. If you take a look at `queryByCurrentState.js` in VS Code you can see in line 64 that this time we are calling the `queryByCurrentState` transaction in `papercontract.js` and passing in the status code of 2 as the only parameter. The status codes for the commercial papers are as follows:

- 1 = issued
- 2 = bought
- 3 = redeemed

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74059450-17c6c700-49b6-11ea-90ce-6716bcf1e5f3.png">
</p>
<br>

It's also worth noting that to call the transactions in these query files we are using the `contract.evaluateTransaction()` method instead of `contract.submitTransaction()`. This is because `evaluateTransaction` is only evaluated on the endorsing nodes and does not get submitted to the orderer and thus is not ordered into a block or committed. As such this method cannot update the ledger and is only used for querying.


## Summary

In this section we took a look at how querying works in a Hyperledger Fabric network with CouchDB as the state database. First, we created indexes for commonly used queries. Then, we added the query logic to the smart contract. Finally, we ran some queries and took a look at what the world state contained.


## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
