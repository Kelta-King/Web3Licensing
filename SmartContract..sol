// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

contract LicenseManager {
    // Struct to represent license information
    struct License {
        uint256 licenseId;      // Unique license ID
        uint256 expirationTime; // Unix timestamp when the license expires
        address walletAddress;  // Ethereum wallet address associated with the license
    }

    // Mapping to store license information
    mapping(uint256 => License) public licenses;

    // Counter to generate unique license IDs
    uint256 private licenseCounter;

    // Event to log license minting
    event LicenseMinted(uint256 licenseId, uint256 expirationTime, address walletAddress);

    constructor() {
        licenseCounter = 1; // Start license IDs from 1
    }

    // Function to mint a new license with a unique ID
    function mintLicense(address walletAddress) public returns (uint256) {
        uint256 licenseId = licenseCounter;

        uint256 expirationTime = block.timestamp + 5 days;

        // Increment the license counter for the next license
        licenseCounter++;

        // Mint the license with the generated ID
        licenses[licenseId] = License(licenseId, expirationTime, walletAddress);

        // Emit an event to log the minting
        emit LicenseMinted(licenseId, expirationTime, walletAddress);

        // Return the generated license ID
        return licenseId;
    }

    // Function to verify if a license is valid
    function isLicenseValid(uint256 licenseId, address walletAddress) public view returns (bool) {
        License storage license = licenses[licenseId];
        // Check if the license exists and has not expired
        return (license.expirationTime > block.timestamp && license.walletAddress == walletAddress);
    }
}
