const Web3 = require('web3');
const web3 = new Web3("http://localhost:7545"); // Replace with your Ethereum node URL


// ABI and contract address of the LicenseManager contract
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "licenseId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expirationTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "LicenseMinted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "mintLicense",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "licenseId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"name": "isLicenseValid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "licenses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "licenseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expirationTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = '0x04A1fDCdD1e9490Bb61cA32b86Eb4Bf0001942C8'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to mint a license
async function mintLicense(walletAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const gas = await contract.methods.mintLicense(walletAddress).estimateGas();
        const licenseId = await contract.methods.mintLicense(walletAddress).call();
        const result = await contract.methods.mintLicense(walletAddress).send({ from: accounts[0], gas });
        console.log('License minted successfully. Returns:', licenseId);
    } catch (error) {
        console.error('Error minting license:', error);
    }
}

// Function to check if a license is valid
async function checkLicenseValidity(licenseId, walletAddress) {
    try {
        const result = await contract.methods.isLicenseValid(licenseId, walletAddress).call();
        if (result) {
            console.log('License is valid.');
        } else {
            console.log('License is not valid or does not exist.');
        }
    } catch (error) {
        console.error('Error checking license validity:', error);
    }
}

// Example usage
const walletAddress = '##WalletAddress'; // Replace with the wallet address you want to associate with the license
const licenseId = 3; // Replace with the license ID you want to check

// mintLicense(walletAddress); // Mint a new license
checkLicenseValidity(licenseId, walletAddress); // Check the validity of a license
