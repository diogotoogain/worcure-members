import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Worcure Members - Portal com Capas IA',
  description: 'Portal de membros com capas geradas por inteligência artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
