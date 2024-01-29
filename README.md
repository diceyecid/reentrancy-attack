# Reentrancy Demo in Hardhat

## Initialize Everything
Follow only if you start from scratch. If you clone this GitHub repo, skip this section.

```
npm install -g yarn
yarn init --yes
yarn add -D hardhat
npx hardhat init
```

## Deploy and Interact with Vault

```
// in terminal 1, start a localhost hardhat ethereum node
// if you've done so in the underflow terminal, just skip this
npx hardhat node

// in terminal 2, do
npx hardhat run --network localhost .\scripts\deploy.ts
npx hardhat run --network localhost .\scripts\query.ts
npx hardhat run --network localhost .\scripts\deposit.ts
```

## Deploy the Attack

```
npx hardhat run --network localhost .\scripts\deploy.attack.ts
```

## Attack the Vault

```
// then run the full attack script
npx hardhat run --network localhost .\scripts\attack.full.ts
```
```
// output
--- operator deposit ---
vault balance:  1000000000000000000n
owner balance:  1000000000000000000n
--- attack contract deposit ---
vault balance:  2000000000000000000n
owner balance:  1000000000000000000n
attack contract balance:  1000000000000000000n
--- attacker contract withdraw ---
vault balance:  0n
owner balance:  1000000000000000000n
// ^^^ The attacker steal owner's balance from the vault
attack contract balance:  0n
```
