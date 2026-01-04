import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Ecommerce Studio',
}

interface Props {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default Layout
