import { Button } from "@mantine/core"

export default function Home() {
  return (
    <div className="w-screen h-screen p-2 bg-[#dde0f8]">
      <div className="ring-1 ring-black rounded-xl h-full w-full p-2 bg-white/50">
        <div className="flex justify-between">
          <div></div>
          <Button variant="filled" color="gray" radius="md">Connect</Button>
        </div>
      </div>
    </div>
  )
}
