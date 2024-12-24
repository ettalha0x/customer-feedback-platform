import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nutritech Agro Feedback Platform",
  description: "Customer feedback platform for Nutritech Agro products",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 background-image">
          <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-lg">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-green-700">Nutritech Agro Feedback Platform</h1>
            </header>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}