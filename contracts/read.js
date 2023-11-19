import { viewContractState } from "arweavekit/contract"
import deployment from "../app/deployment.json" assert { type: "json" }
// import fs from "fs"

// const w = JSON.parse(fs.readFileSync("./wallet.json", "utf8"))

const CNT_TX_ID = deployment.contractAddr

const envr = process.env.ENV == "main" ? "mainnet" : "local"

const tx0 = await viewContractState({
    environment: envr,
    contractTxId: CNT_TX_ID,
    options: {
        function: "iExist"
    }
})

console.log(tx0.viewContract.result)


const tx = await viewContractState({
    environment: envr,
    contractTxId: CNT_TX_ID,
    options: {
        function: "fetchMine"
    }
})

console.log(tx.viewContract.result)