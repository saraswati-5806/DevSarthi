// app/page.jsx (ROOT LEVEL - Not inside any folder)
'use client'
import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    // Redirect to default locale and workspace
    window.location.href = '/en/workspace'
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{background: 'var(--bg-canvas)'}}>
      <div className="text-center">
        <div className="spinner mb-4"></div>
        <div className="text-lg font-bold" style={{color: 'var(--text-dark)'}}>
          Loading DevSathi...
        </div>
      </div>
    </div>
  )
}