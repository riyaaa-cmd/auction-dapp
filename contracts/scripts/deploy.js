const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();

  await auction.deployed();

  console.log("Auction contract deployed to:", auction.address);

  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const path = require('path');
  
  const contractInfo = {
    address: auction.address,
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(__dirname, '../deployed.json'),
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract information saved to deployed.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 