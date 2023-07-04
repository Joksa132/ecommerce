import Nav from '../components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from './context/userContext'
import { CartProvider } from './context/cartContext'

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
          <CartProvider>
            <Nav />
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}
