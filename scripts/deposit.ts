import { ethers } from "hardhat";

async function main() {
  let time = Date.now();
  const AMOUNT = ethers.parseEther("1"); //bignumber

  let vault;
  const [owner] = await ethers.getSigners();
  vault = await ethers.getContractAt(
    //"InsecureEtherVault", 
	"FixedEtherVault",
    "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8",  
    // make sure this address is the address you just deployed
    owner
  );

  const txn1 = await vault.deposit({value: AMOUNT});
  await txn1.wait(1);

  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
