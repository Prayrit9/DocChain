import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './navbar';
import chatbot from '../assets/chatbot.png';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ children, title = "DocChain", wallet }: { children: React.ReactNode, title: string, wallet: any }) {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)

    return <div className="bg-[#fdfaf5] min-h-screen h-screen">
        <div className="fixed bottom-10 right-10 z-10">
            <button onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
                <img src={chatbot} alt="chatbot" width={69} height={69} />
            </button>
        </div>
        {
            isChatbotOpen && <div className="fixed right-5 top-5 w-[92vw] sm:w-[50vw] h-[80vh] z-30 bg-black/50">
                <iframe src="https://lawbotpro.com/" className="w-[92vw] sm:w-[50vw] h-[80vh]" title="chatbot" >loading</iframe>
            </div>
        }
        <Toaster />
        <title>{title}</title>
        <div className='p-10 md:px-20 min-h-[85vh]'>
            <Navbar wallet={wallet} />
            <div className="mx-auto my-10">
                {children}
            </div>
        </div>
    </div>
}