import Nav from './components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from './context/userContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecommerce Website',
  description: 'Ecommerce website with Next.js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Nav />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
