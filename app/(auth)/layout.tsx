import { ClerkProvider } from '@clerk/nextjs'

interface Props {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-tech_bg_color">{children}</div>
    </ClerkProvider>
  )
}

export default Layout
