import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Manager - Ross\'s Business AI Agents',
  description: 'Manage AI agents for TrendFarm, ChurchOS, ShieldMyShop, and SystemsFarm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}