import Page from "./components/page"

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function App({ wallet }: { wallet: any }) {
  return (
    <Page title="DocChain" wallet={wallet}>
      app
    </Page>
  )
}
