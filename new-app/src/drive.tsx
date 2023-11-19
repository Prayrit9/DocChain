import { Group } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import Page from "./components/page"
import trash from "./assets/trash.svg"
import share from "./assets/share.svg"
import { useEffect, useState } from 'react';

type Item = {
  filename: string,
  date: string,
  url: string
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
  return <div className="flex justify-between items-center bg-white rounded-lg p-3 my-3">
    <div className="flex gap-3 items-center">
      {data.url != "#" ? <img src="#" width={20} /> : <div className="text-4xl">📄</div>}
      <div className="flex flex-col">
        <span className="text-lg">{data.filename}</span>
        <span className="text-sm text-gray-500">{data.date}</span>
      </div>
    </div>
    <div className="text-sm text-center">Shared with {50} others</div>
    <div className="flex gap-2">
      <button className="bg-green-500 p-1 rounded-md"><img src={share} alt="delete" width={30} className="invert" /></button>
      <button className="bg-red-500 p-1.5 rounded-md"><img src={trash} alt="delete" width={22} className="invert" /></button>
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
      <button className="bg-red-500 p-1.5 rounded-md"><img src={trash} alt="delete" width={22} className="invert" /></button>
    </div>
  </div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function Drive({ wallet }: { wallet: any }) {
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    console.log(file)
  }, [file])

  return (
    <Page wallet={wallet} title="My Docs | DocChain">
      <div className="grid md:grid-cols-2 bg-gray-200/50 p-5 rounded-[50px] h-[77vh] m-0 relative">
        <div>
          <div className="text-center underline underline-offset-4">My Documents</div>
          <div className="overflow-scroll rounded-[50px] p-2 h-[70vh]">
            <div className="flex justify-between items-center bg-green-100 h-[100px] rounded-lg p-3 my-3 ring-1 ring-black/30">
              <Dropzone
                onDrop={(files) => setFile(files[0])}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
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
              data.map((item, i) => {
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
