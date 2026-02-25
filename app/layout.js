import '../styles/cyberpunk.css'
import './globals.css'
import { AppSettingsProvider } from '@/context/AppSettingsContext'

export const metadata = {
  title: 'DevSarthi - Apka Technology Sarthi',
  description: 'Code seekho ya solution pao - Zero setup, AI-powered, Pure Hinglish',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppSettingsProvider>
          {children}
        </AppSettingsProvider>
      </body>
    </html>
  )
}