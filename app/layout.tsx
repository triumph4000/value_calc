import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hidden MSP MRR Calculator | Bridgepointe Technologies',
  description:
    'Discover how much recurring revenue is hiding in your existing customer base. Calculate your untapped cross-sell MRR across Network, UCaaS, CX, Cloud, and Security.',
  openGraph: {
    title: 'Hidden MSP MRR Calculator | Bridgepointe Technologies',
    description:
      "Most MSPs monetize less than 40% of their customer's total technology wallet. Find out how much you're leaving on the table.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className="min-h-screen bg-white text-[#32373c] antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
