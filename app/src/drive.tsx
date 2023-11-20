import { Group } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import deployment from "../deployment.json"
import Page from "./components/page"
import trash from "./assets/trash.svg"
import share from "./assets/share.svg"
import preview from "./assets/preview.svg"
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast"
import { writeContract, viewContractState } from "arweavekit/contract"

const CNT_TX_ID = deployment.contractAddr

const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = reject;
});

type Item = {
  filename: string,
  date: string,
  url: string,
  sharedWith: string[]
}

const data: Item[] = [
  {
    filename: "sample.txt",
    date: "2021-08-20",
    url: "#"
  },
  {
    filename: "sample.txt",
    date: "2021-08-20",
    url: "#"
  }
]

const UploadedItem = (data: Item) => {
  return <div className="flex justify-between items-center bg-white rounded-xl p-3 my-3">
    <div className="flex gap-3 items-center">
      {data.url != "#" ? <img src={data.url} width={20} /> : <div className="text-4xl">📄</div>}
      <div className="flex flex-col">
        <span className="text-lg">{data.filename}</span>
        <span className="text-sm text-gray-500">{data.date}</span>
      </div>
    </div>
    <div className="text-sm text-center">Shared with {data.sharedWith?.length | 0} others</div>
    <div className="flex gap-5">
      <button className=""><img src={preview} alt="delete" width={30} /></button>
      <button className=""><img src={share} alt="share" width={30} /></button>
      <button className=""><img src={trash} alt="delete" width={30} /></button>
    </div>
  </div>
}

const SharedItem = (data: Item) => {
  return <div className="flex justify-between items-center bg-white rounded-lg p-3 my-3">
    <div className="flex gap-5 items-center">
      {data.url != "#" ? <img src="#" width={20} /> : <div className="text-4xl">📄</div>}
      <div className="flex flex-col">
        <span className="text-lg">{data.filename}</span>
        <span className="text-sm text-gray-500">{data.date}</span>
      </div>
    </div>
    <div className="flex gap-2">
      <button><img src={trash} alt="delete" width={30} /></button>
    </div>
  </div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function Drive({ wallet }: { wallet: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [fileb64, setFileb64] = useState<string | null>(null)
  const [askName, setAskName] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>("")
  const [myFiles, setMyFiles] = useState<Item[]>([])

  useEffect(() => {
    if (file)
      toBase64(file).then((res) => {
        console.log(res)
        setFileb64(res as string)
      })
  }, [file])

  useEffect(() => {
    if (fileb64)
      setAskName(true)
  }, [fileb64])

  async function readMine() {
    console.log(wallet.address)
    if (!wallet.address) return
    const tx = await viewContractState({
      wallet: "use_wallet",
      environment: deployment.network == "mainnet" ? "mainnet" : "local",
      contractTxId: CNT_TX_ID,
      options: { function: "fetchMine" },
      strategy: "both"
    })
    const docs = tx.viewContract.result.docs
    console.log(docs)
    // setMyFiles(docs)

    const d: Item[] = []
    Object.keys(docs).forEach((key) => {
      d.push({
        filename: docs[key].fileName,
        date: docs[key].date,
        url: docs[key].hash
      })
    })
    console.log(d)
    setMyFiles(d)
  }

  window.addEventListener("WalletConnected", () => {
    readMine()
  })

  useEffect(() => {
    if (wallet.address)
      readMine()
  }, [wallet.address])


  async function pushToContract() {
    console.log(fileb64, filename)
    if (fileb64 && filename) {
      const tx = await writeContract({
        environment: deployment.network == "mainnet" ? "mainnet" : "local",
        wallet: "use_wallet",
        contractTxId: CNT_TX_ID,
        options: {
          function: "newDoc",
          fileName: filename,
          hash: fileb64
        },
        strategy: "arweave"
      })
      console.log(tx)
      if (tx.result.status == 200) {
        setAskName(false)
        setFile(null)
        setFileb64(null)
        setFilename("")
        toast.success(`File uploaded successfully`)
        readMine()
      } else {
        toast.error(`Error while uploading file ${tx.result.statusText}`)
      }
    } else {
      toast.error(`Enter all fields`)
    }
  }


  return (
    <Page wallet={wallet} title="My Docs | DocChain">
      {askName && <div className='fixed w-screen h-screen top-0 left-0 bg-black/20 z-20 flex justify-center items-center'>
        <div className='bg-white w-[50%] p-3 rounded-xl'>
          <div className='text-lg'>Enter file name <span className='text-gray-500'>({file?.name})</span></div>
          <div className='flex gap-2'>
            <input type="text" className='w-full p-2 rounded-lg border-2 border-black/20' onChange={(e) => setFilename(e.target.value)} placeholder='legal doc.txt' />
            <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={pushToContract}>Save</button>
            <button className='bg-red-500 text-white p-2 rounded-lg' onClick={() => setAskName(false)}>Cancel</button>
          </div>
        </div>
      </div>}
      <div className="grid md:grid-cols-2 bg-gradient-to-b from-blue-300 to-blue-100 shadow-sm p-5 rounded-[30px] h-[77vh] m-0 relative">
        <div>
          <div className="text-center underline underline-offset-4">My Documents</div>
          <div className="overflow-scroll rounded-[50px] p-2 h-[70vh]">
            <div className="flex justify-between items-center bg-blue-50 h-[100px] rounded-lg p-3 my-3 ring-1 ring-black/30">
              <Dropzone
                onDrop={(files: File[]) => setFile(files[0])}
                onReject={() => console.log('rejected files')}
                maxSize={3 * 1024 ** 2}
                accept={['image/*', 'application/pdf']}
                className='w-full'
              >
                <Group justify="center" style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      size={50}
                      stroke={1}
                      className='mx-auto'
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={50}
                      stroke={1}
                      className='mx-auto'
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      size={50}
                      stroke={1}
                      className='mx-auto'
                    />
                  </Dropzone.Idle>

                  <div className='text-center'>
                    Drag document image here or click to select files
                  </div>
                </Group>
              </Dropzone>
            </div>
            {
              myFiles.map((item, i) => {
                return <UploadedItem key={i} {...item} />
              })
            }
          </div>
        </div>
        <div>
          <div className="text-center underline underline-offset-4">Shared with me</div>
          <div className="overflow-scroll rounded-[50px] p-2 h-[70vh]">
            {
              data.map((item, i) => {
                return <SharedItem key={i} {...item} />
              })
            }
          </div>
        </div>
      </div>
    </Page>
  )
}
