"use client"
import React, { createContext, useContext, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const AppSettingsContext = createContext(null)

export function AppSettingsProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [mode, setModeState] = useState(() => {
    if (pathname?.startsWith('/developer-mode')) return 'developer'
    if (pathname?.startsWith('/normal-mode')) return 'normal'
    return 'developer'
  })
  const [language, setLanguage] = useState('Hinglish')

  const setMode = (m) => {
    setModeState(m)
    // navigate client-side without full reload
    if (m === 'developer') router.push('/developer-mode')
    if (m === 'normal') router.push('/normal-mode')
  }

  return (
    <AppSettingsContext.Provider value={{ mode, setMode, language, setLanguage }}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext)
  if (!ctx) throw new Error('useAppSettings must be used within AppSettingsProvider')
  return ctx
}

export default AppSettingsContext
