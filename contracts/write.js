import { writeContract } from "arweavekit/contract"
import deployment from "../app/deployment.json" assert { type: "json" }
import fs from "fs"

const w = JSON.parse(fs.readFileSync("./wallet.json", "utf8"))

const CNT_TX_ID = deployment.contractAddr

const envr = process.env.ENV == "main" ? "mainnet" : "local"

const tx = await writeContract({
    environment: envr,
    wallet: w,
    contractTxId: CNT_TX_ID,
    options: {
        function: "registration",
        role: "user",
    }
})

console.log(tx.state)

const tx1 = await writeContract({
    environment: envr,
    wallet: w,
    contractTxId: CNT_TX_ID,
    options: {
        function: "newDoc",
        fileName: "sample.txt",
        hash: "sampleb64",
    }
})

console.log(tx1.state)