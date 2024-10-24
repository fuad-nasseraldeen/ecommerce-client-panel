'use client'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import { CartContextProvider } from '@/app/components/CartContext'
import NgProgress from '@/app/components/NgProgress'
import { Providers } from '@/app/redux/Providers'
import store from '@/app/redux/store'
const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif; /* Default font */
  }
`

export default function RootLayout({ children }) {
  return (
    <Providers store={store}>
      <html lang='en'>
        <Head>
          <link rel='icon' href='/logo.png' />
          {/* Preconnect to Google Fonts */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

          {/* Load Poppins font */}
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />

          {/* Load Kanit font */}
          <link
            href='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <GlobalStyles />
          <NgProgress />
          <CartContextProvider>{children}</CartContextProvider>
        </body>
      </html>
    </Providers>
  )
}
