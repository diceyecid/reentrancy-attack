import { ethers } from "hardhat";

async function main() {
  let time = Date.now();

  const [owner, attacker] = await ethers.getSigners();
  let vault = await ethers.getContractAt(
    "InsecureEtherVault", 
    "0x9E545E3C0baAB3E08CdfD552C960A1050f373042",  
    // make sure this address is the address you just deployed
    owner
  );
  let attack, attackAddress;
  console.log("Deploying contracts with the account:", attacker.address);
  const Attack = await ethers.getContractFactory("Attack");
  attack = await Attack.deploy(await vault.getAddress());
  attackAddress = await attack.getAddress();
  console.log("Attack address:", attackAddress);
  console.log("Time taken:", Date.now() - time);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
