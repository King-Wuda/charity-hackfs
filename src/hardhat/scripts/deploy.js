const { ethers } = require("hardhat");

async function main() {
  const charityContract = await ethers.getContractFactory("Charity");
  const deployedCharity = await charityContract.deploy();
  console.log("Charity contract address:", deployedCharity.address);

  const nftContract = await ethers.getContractFactory("RazeMoneyToken");
  const deployedNft = await nftContract.deploy();
  console.log("NFT contract address:", deployedNft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
