import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const poppins = localFont({
  src: './fonts/Poppins.woff2',
  variable: '--font-poppins',
  weight: '400',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Next.js Sanity Ecommerce',
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  )
}

export default RootLayout
