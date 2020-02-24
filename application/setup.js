/*
SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

// A wallet stores a collection of identities for use
//const wallet = new FileSystemWallet('../user/isabella/wallet');
const wallet = new FileSystemWallet('./../local_fabric_wallet');

// Main program function
async function main() {

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'admin';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('./networkConnection.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:false, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access PaperNet network
        console.log('Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to commercial paper contract
        console.log('Use org.papernet.commercialpaper smart contract.');

        const contract = await network.getContract('papercontract', 'org.papernet.commercialpaper');

        // issue commercial paper
        console.log('Submit commercial paper issue transaction.');

        await contract.submitTransaction('issue', 'MagnetoCorp', '00001', '2016-01-31', '2016-07-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00002', '2016-02-31', '2016-08-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00003', '2016-03-31', '2016-09-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00004', '2016-04-31', '2016-10-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00005', '2016-05-31', '2016-11-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00006', '2016-06-31', '2016-12-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00007', '2016-07-31', '2017-01-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00008', '2016-08-31', '2017-02-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00009', '2016-09-31', '2017-03-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00010', '2016-10-31', '2017-04-30', '5000000');

        await contract.submitTransaction('issue', 'MagnetoCorp', '00011', '2017-01-31', '2017-07-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00012', '2017-02-31', '2017-08-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00013', '2017-03-31', '2017-09-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00014', '2017-04-31', '2017-10-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00015', '2017-05-31', '2017-11-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00016', '2017-06-31', '2017-12-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00017', '2017-07-31', '2018-01-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00018', '2017-08-31', '2018-02-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00019', '2017-09-31', '2018-03-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00020', '2017-10-31', '2018-04-30', '5000000');

        await contract.submitTransaction('issue', 'MagnetoCorp', '00021', '2018-01-31', '2018-07-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00022', '2018-02-31', '2018-08-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00023', '2018-03-31', '2018-09-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00024', '2018-04-31', '2018-10-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00025', '2018-05-31', '2018-11-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00026', '2018-06-31', '2018-12-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00027', '2018-07-31', '2019-01-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00028', '2018-08-31', '2019-02-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00029', '2018-09-31', '2019-03-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00030', '2018-10-31', '2019-04-30', '5000000');

        await contract.submitTransaction('issue', 'MagnetoCorp', '00031', '2019-01-31', '2019-07-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00032', '2019-02-31', '2019-08-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00033', '2019-03-31', '2019-09-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00034', '2019-04-31', '2019-10-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00035', '2019-05-31', '2019-11-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00036', '2019-06-31', '2019-12-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00037', '2019-07-31', '2020-01-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00038', '2019-08-31', '2020-02-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00039', '2019-09-31', '2020-03-30', '5000000');
        await contract.submitTransaction('issue', 'MagnetoCorp', '00040', '2019-10-31', '2020-04-30', '5000000');

        await contract.submitTransaction('buy', 'MagnetoCorp', '00001', 'MagnetoCorp', 'DigiBank', '4900000', '2016-01-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00002', 'MagnetoCorp', 'DigiBank', '4900000', '2016-02-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00003', 'MagnetoCorp', 'DigiBank', '4900000', '2016-03-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00004', 'MagnetoCorp', 'DigiBank', '4900000', '2016-04-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00005', 'MagnetoCorp', 'DigiBank', '4900000', '2016-05-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00006', 'MagnetoCorp', 'DigiBank', '4900000', '2016-06-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00007', 'MagnetoCorp', 'DigiBank', '4900000', '2016-07-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00008', 'MagnetoCorp', 'DigiBank', '4900000', '2016-08-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00009', 'MagnetoCorp', 'DigiBank', '4900000', '2016-09-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00010', 'MagnetoCorp', 'DigiBank', '4900000', '2016-10-31');

        await contract.submitTransaction('buy', 'MagnetoCorp', '00011', 'MagnetoCorp', 'DigiBank', '4900000', '2017-01-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00012', 'MagnetoCorp', 'DigiBank', '4900000', '2017-02-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00013', 'MagnetoCorp', 'DigiBank', '4900000', '2017-03-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00014', 'MagnetoCorp', 'DigiBank', '4900000', '2017-04-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00015', 'MagnetoCorp', 'DigiBank', '4900000', '2017-05-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00016', 'MagnetoCorp', 'DigiBank', '4900000', '2017-06-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00017', 'MagnetoCorp', 'DigiBank', '4900000', '2017-07-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00018', 'MagnetoCorp', 'DigiBank', '4900000', '2017-08-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00019', 'MagnetoCorp', 'DigiBank', '4900000', '2017-09-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00020', 'MagnetoCorp', 'DigiBank', '4900000', '2017-10-31');

        await contract.submitTransaction('buy', 'MagnetoCorp', '00021', 'MagnetoCorp', 'DigiBank', '4900000', '2018-01-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00022', 'MagnetoCorp', 'DigiBank', '4900000', '2018-02-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00023', 'MagnetoCorp', 'DigiBank', '4900000', '2018-03-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00024', 'MagnetoCorp', 'DigiBank', '4900000', '2018-04-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00025', 'MagnetoCorp', 'DigiBank', '4900000', '2018-05-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00026', 'MagnetoCorp', 'DigiBank', '4900000', '2018-06-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00027', 'MagnetoCorp', 'DigiBank', '4900000', '2018-07-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00028', 'MagnetoCorp', 'DigiBank', '4900000', '2018-08-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00029', 'MagnetoCorp', 'DigiBank', '4900000', '2018-09-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00030', 'MagnetoCorp', 'DigiBank', '4900000', '2018-10-31');

        await contract.submitTransaction('buy', 'MagnetoCorp', '00031', 'MagnetoCorp', 'DigiBank', '4900000', '2019-01-31');
        await contract.submitTransaction('buy', 'MagnetoCorp', '00032', 'MagnetoCorp', 'DigiBank', '4900000', '2019-02-31');

        await contract.submitTransaction('redeem', 'MagnetoCorp', '00001', 'DigiBank', '2016-07-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00002', 'DigiBank', '2016-08-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00003', 'DigiBank', '2016-09-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00004', 'DigiBank', '2016-10-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00005', 'DigiBank', '2016-11-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00006', 'DigiBank', '2016-12-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00007', 'DigiBank', '2017-01-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00008', 'DigiBank', '2017-02-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00009', 'DigiBank', '2017-03-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00010', 'DigiBank', '2017-04-30');

        await contract.submitTransaction('redeem', 'MagnetoCorp', '00011', 'DigiBank', '2017-07-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00012', 'DigiBank', '2017-08-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00013', 'DigiBank', '2017-09-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00014', 'DigiBank', '2017-10-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00015', 'DigiBank', '2017-11-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00016', 'DigiBank', '2017-12-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00017', 'DigiBank', '2018-01-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00018', 'DigiBank', '2018-02-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00019', 'DigiBank', '2018-03-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00020', 'DigiBank', '2018-04-30');

        await contract.submitTransaction('redeem', 'MagnetoCorp', '00021', 'DigiBank', '2018-07-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00022', 'DigiBank', '2018-08-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00023', 'DigiBank', '2018-09-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00024', 'DigiBank', '2018-10-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00025', 'DigiBank', '2018-11-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00026', 'DigiBank', '2018-12-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00027', 'DigiBank', '2019-01-30');
        await contract.submitTransaction('redeem', 'MagnetoCorp', '00028', 'DigiBank', '2019-02-30');

        // // process response
        // console.log('Process issue transaction response.');

        // let paper = CommercialPaper.fromBuffer(issueResponse);

        // console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for value ${paper.faceValue}`);
        console.log('Transaction complete.');

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});