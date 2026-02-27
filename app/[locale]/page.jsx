// app/[locale]/page.jsx (Inside [locale] folder)
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LocaleRootPage({ params }) {
  const router = useRouter()

  useEffect(() => {
    // Extract locale from params (it's a Promise in Next.js 15+)
    const getLocale = async () => {
      const resolvedParams = await params
      router.replace(`/${resolvedParams.locale}/workspace`)
    }
    getLocale()
  }, [params, router])

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