import Nav from '../components/Nav'
import './globals.css'
import { Poppins } from 'next/font/google'
import { UserProvider } from '../context/userContext'
import { CartProvider } from '../context/cartContext'

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: 'Ecommerce Website',
  description: 'Ecommerce website with Next.js 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
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
