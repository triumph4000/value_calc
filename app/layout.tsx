import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hidden MSP MRR Calculator | Bridgepointe',
  description:
    'Discover how much recurring revenue is hiding in your existing customer base. Calculate your untapped cross-sell MRR across Network, UCaaS, CX, Cloud, and Security.',
  openGraph: {
    title: 'Hidden MSP MRR Calculator | Bridgepointe',
    description:
      'Most MSPs monetize less than 40% of their customer\'s total technology wallet. Find out how much you\'re leaving on the table.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
