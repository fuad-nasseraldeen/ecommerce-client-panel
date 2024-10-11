'use client'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import {CartContextProvider} from '../app/components/CartContext'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <GlobalStyles />
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  )
}
