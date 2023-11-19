import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import NoSSR from 'react-no-ssr';


export default function App({ Component, pageProps }: AppProps) {
  return <NoSSR>
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  </NoSSR>
}
