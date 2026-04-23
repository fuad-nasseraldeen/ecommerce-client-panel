'use client'
import { createGlobalStyle } from 'styled-components'
import NgProgress from '@/app/components/NgProgress'
import { Providers } from '@/app/redux/Providers'
import { CartSummary } from '@/app/components/CartSummary'

const GlobalStyles = createGlobalStyle`
  :root {
    --page-bg: #f4f7fb;
    --surface: #ffffff;
    --surface-muted: #eef3fa;
    --text-primary: #182433;
    --text-secondary: #5a6878;
    --border: #d8e0ea;
    --brand: #0f766e;
    --brand-strong: #0a5d58;
    --accent: #f59e0b;
    --radius-sm: 10px;
    --radius-md: 14px;
    --radius-lg: 22px;
    --shadow-sm: 0 6px 18px rgba(16, 24, 40, 0.06);
    --shadow-md: 0 16px 32px rgba(16, 24, 40, 0.1);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: radial-gradient(circle at 0% 0%, #e8f8f7 0, #f4f7fb 45%, #f4f7fb 100%);
    padding: 0;
    margin: 0;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
  }

  a {
    color: inherit;
  }

  button, input, textarea, select {
    font: inherit;
  }

  h1, h2, h3, h4, h5, p {
    margin: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/logo.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <Providers>
          <GlobalStyles />
          <NgProgress />
          {children}
          <CartSummary />
        </Providers>
      </body>
    </html>
  )
}
