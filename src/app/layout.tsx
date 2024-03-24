import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from './Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce Platform',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className='scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-white overflow-y-scroll'
    >
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
