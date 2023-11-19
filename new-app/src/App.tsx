import Page from "./components/page";
import FadeIn from "react-fade-in";
import chain from "./assets/chain.svg";
import shield from "./assets/shield.svg";
import userfriendly from "./assets/userfriendly.svg";
import efficiency from "./assets/efficiency.svg";
import decentralized from "./assets/decentralized.svg";
import justice from "./assets/justice.svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function App({ wallet }: { wallet: any }) {
  return (
    <Page title="Home | DocChain" wallet={wallet}>
      <div className="flex flex-col gap-[80px]">
        <FadeIn delay={30} transitionDuration={200}>
          <div className="flex items-center h-[80vh] justify-center text-center bg-gray-200 rounded-[50px]">
            <FadeIn delay={200} transitionDuration={2000}>
              <div className=" flex text-[18vw]">
                Doc<img src={chain} className="w-[18vw]"></img>
                <h1 className="font-thin">Chain</h1>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
        <div className="flex flex-col h-[80vh] bg-gray-200 rounded-[50px]">
          <div className="text-center font-medium text-8xl my-10 text-blue-950">
            What do we offer?
          </div>
          <ul className="flex flex-col text-center gap-[50px] text-slate-900 text-[3vw] font-normal my-12 mx-12">
            <li className="flex justify-center">
              Blockchain Security{" "}
              <img src={shield} className="w-[3vw] mx-6"></img>
            </li>
            <li className="flex justify-center">
              User-Friendly Collaboration{" "}
              <img src={userfriendly} className="w-[3vw] mx-6"></img>
            </li>
            <li className="flex justify-center">
              Decentralized Identity, Privacy Assurance{" "}
              <img src={decentralized} className="w-[3vw] mx-6"></img>
            </li>
            <li className="flex justify-center">
              Integration for Efficiency{" "}
              <img src={efficiency} className="w-[3vw] mx-6"></img>
            </li>
            <li className="flex justify-center">
              Transformative Access to Justice{" "}
              <img src={justice} className="w-[3vw] mx-6"></img>
            </li>
          </ul>
        </div>
      </div>
    </Page>
  );
}
