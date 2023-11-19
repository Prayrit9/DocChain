import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ArweaveWebWallet, type State, type AppInfo } from 'arweave-wallet-connector'
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App.tsx'
import Drive from './drive.tsx'
import './index.css'
import '@mantine/dropzone/styles.css';

const state: State = { url: 'arweave.app', showIframe: false, usePopup: false, requirePopup: false, keepPopup: false, connected: false }
const appInfo: AppInfo = {
  name: "vault",
  // logo: 'https://jfbeats.github.io/ArweaveWalletConnector/placeholder.svg'
}

const wallet = new ArweaveWebWallet(appInfo, { state })

wallet.on('connect', () => {
  console.log('connected')
  localStorage.setItem("address", wallet.address as string)
  // emit a custom event to let the app know that the wallet has connected
  const event = new CustomEvent('WalletConnected')
  window.dispatchEvent(event)
})

wallet.on('disconnect', () => {
  console.log('disconnected')
  localStorage.removeItem("address")
  // emit a custom event to let the app know that the wallet has disconnected
  const event = new CustomEvent('WalletDisconnected')
  window.dispatchEvent(event)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App wallet={wallet} />} />
          <Route path="/drive" element={<Drive wallet={wallet} />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)