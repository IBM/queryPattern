## Deploying the commercial paper smart contract 

This document will take you through the process of deploying the commercial paper smart contract to a local Hyperledger Fabric network. This process is required in order to complete the rest of the pattern. 


### 1. Setting up your environment

#### Step 1. Starting VS Code

Start VS Code by running the command `code` from the terminal. 
Verify the installation under the Extensions view.   

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73479226-98a61300-4365-11ea-9a9a-03ad2e76d665.png">
</p>
<br>


#### Step 2. Start a local fabric environment

Go to the Blockchain platform view and under `FABRIC ENVIRONMENTS`, click on `Local Fabric` to start the Local Fabric environment.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74054051-31164600-49ab-11ea-9950-a6264068e20d.png">
</p>
<br>

After a few minutes, your network will be up and running.


#### Step 3. Clone this repo. 

1. Open up your terminal and `cd` into where you'd like to clone the repo. 

2. Then, enter the following command to clone the repo.

```bash
git clone https://github.com/IBM/queryPattern
```


### 2. Deploy the paper contract

In this section, we will deploy the base commercial paper smart contract which we will be modifying later. 


#### Step 1. Open the project in VS Code

In VSCode, choose `File` > `Open...`, and select the **contract** folder within the repo that was cloned in the previous step. 

Then, right click in the space under your files in the **Explorer** view and select **Add folder to workspace...**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73479797-a3ad7300-4366-11ea-938f-ff8e0125011f.png">
</p>
<br>

Select the repo that was cloned in the previous step.

You should now have two directories in your workspace.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73395890-51a91680-42ae-11ea-8982-a3b7b74f2767.png">
</p>
<br>


#### Step 2. Read through the smart contract

Explore the `papercontract.js` file, which is located in the `contract/lib` subfolder. It effectively orchestrates the logic for the different smart contract transaction functions (issue, buy, redeem, etc.), and is underpinned by essential core functions (in the sample contract) that interact with the ledger. This [link](https://hyperledger-fabric.readthedocs.io/en/master/tutorial/commercial_paper.html) explains the concepts, themes, and programmatic approach to writing contracts using the commercial paper scenario.


#### Step 3. Package the smart contract

Press the `F1` key to see the different VS code options. Choose `IBM Blockchain Platform: Package Open Project`.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910509-05036d00-3140-11ea-8b15-7c8aeb403974.png">
</p>
<br>

When asked to choose a workspace folder to package, select **contract**.

You should now see the packaged contract `papercontract@0.0.1` on top and the blockchain connections on the bottom in the `IBM Blockchain Platform Extension for VSCode`.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73480319-abb9e280-4367-11ea-9e38-56f925eef19f.png">
</p>
<br>


#### Step 5. Install the smart contract

1. In the IBM Blockchain Platform extension for VSCode, find the **FABRIC ENVIRONMENTS** section.

2. Click on **+ Install**. Select **papercontract@0.0.1** when prompted to select the package to install on the peer.

When the process completes, you should see **papercontract@0.0.1** under the *Installed* section under **FABRIC ENVIRONMENTS**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74054470-1ee8d780-49ac-11ea-8cfd-20964cdab173.png">
</p>
<br>


#### Step 6. Instantiate the contract

1. In the **FABRIC ENVIRONMENTS** section, click on **+ Instantiate**.

2. Select **papercontract@0.0.1** when asked to select a smart contract.

4. You will then be prompted to enter a function to call, type **instantiate** and press enter.

5. The function doesn't require any arguments, so you can leave the prompt empty and just press enter.

6. We don't need to setup private data collection for this project, so you can select **No**.

7. Select **Default (single endorser, any org)** when prompted to choose a smart contract endorsement policy.

After a short delay, your smart contract will be instantiated on the channel.

If everything went according to plan then you should see **papercontract@0.0.1** listed under the *Instantiated* section of **FABRIC ENVIRONMENTS**.

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/74055494-214c3100-49ae-11ea-867b-14be22f8c2bc.png">
</p>
<br>


In the next section, we will learn to run indexed queries against the world state database.

[>> Back to the README](./README.md#2-create-indexes-for-the-commonly-used-queries)