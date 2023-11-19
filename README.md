# Blockchain Based E-Vault

Submission for the E-Suraksha hackathon at CU

- [Blockchain Based E-Vault](#blockchain-based-e-vault)
  - [Team members](#team-members)
  - [Tech Stack](#tech-stack)
- [How to run](#how-to-run)
  - [Fork and Clone the repo](#fork-and-clone-the-repo)
    - [Run the frontend](#run-the-frontend)
    - [Run the backend](#run-the-backend)
    - [Blockchain](#blockchain)
      - [Run a local arweave node](#run-a-local-arweave-node)
      - [Deploy the smart contract](#deploy-the-smart-contract)
      - [Tests for the contract](#tests-for-the-contract)

## Team members
- [Ankush Singh](github.com/ankushKun)
- [Ashutosh Mittal](github.com/Aashu1412)
- [Prayrit](github.com/Prayrit9)
- Parth Tiwari
- Abhijeet Singh

## Tech Stack

- React
- Vite
- Arweave Blockchain
- Arweave.app web wallet
- arweavekit

# How to run

## Fork and Clone the repo

```bash
git clone https://github.com/<YOUR_USERNAME>/esuraksha-cu.git
```

The project is split into 3 folders

- `app` - React frontend
- `instabase` - Express backend with instabase functions
- `contracts` - Arewave Smart contracts to store document data

### Run the frontend

```bash
cd app
npm install --force
```

```bash
npm run dev
```

### Run the backend

```bash
cd instabase
npm install --force
```

```bash
nodemon index.js
```

### Blockchain

#### Run a local arweave node

```bash
npx arlocal
```

#### Deploy the smart contract

```bash
cd contracts
npm install --force
```

**Smart Contract is in `contracts/contract.js`**

```bash
node deploy.js
```

#### Tests for the contract

```bash
node write.js
```

```bash
node read.js
```

**NOTE: All of these should be run with arlocal running in the background or in a terminal tab**

To make sure the contract deploys you will need an arweave `wallet.json` file which can be created using `ardrive-cli` or downloaded from arweave.app web wallet