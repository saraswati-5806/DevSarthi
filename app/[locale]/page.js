'use client'
import { useEffect } from 'react'
import { useRouter } from '@/i18n/routing' // IMPORT FROM YOUR ROUTING FILE

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // This will now automatically go to /en/developer-mode or /hi/developer-mode
    router.replace('/developer-mode')
  }, [router])

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