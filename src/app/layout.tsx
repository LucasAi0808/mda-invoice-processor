import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Invoice Processor | MDA Consulting AB',
  description: 'Upload invoices and automatically extract data to Google Sheets',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-b from-surface to-surface-subtle">
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
