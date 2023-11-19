import { readContractState, writeContract } from "arweavekit/contract"
import deployment from "../app/deployment.json" assert { type: "json" }
// import fs from "fs"

// const w = JSON.parse(fs.readFileSync("./wallet.json", "utf8"))

const CNT_TX_ID = deployment.contractAddr

const envr = process.env.ENV == "main" ? "mainnet" : "local"

const tx = await readContractState({
    environment: envr,
    contractTxId: CNT_TX_ID,
    options: {
        function: "fetchMine"
    }
})

console.log(tx.readContract)