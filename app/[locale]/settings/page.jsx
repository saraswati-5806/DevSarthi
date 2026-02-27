// app/[locale]/settings/page.jsx
'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { User, Bell, Globe, Shield, CreditCard, Palette } from 'lucide-react'

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  const settingsSections = [
    { icon: User, title: 'Account', description: 'Manage your profile and preferences' },
    { icon: Bell, title: 'Notifications', description: 'Configure notification preferences' },
    { icon: Globe, title: 'Language & Region', description: 'Language and location settings' },
    { icon: Palette, title: 'Appearance', description: 'Theme and display options' },
    { icon: Shield, title: 'Privacy & Security', description: 'Control your privacy settings' },
    { icon: CreditCard, title: 'Billing', description: 'Manage subscription and payments' },
  ]

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{background: 'var(--bg-canvas)'}}>
      <Header />
      
      <div className="flex-1 flex pt-16 overflow-hidden">
        <Sidebar onToggle={handleSidebarToggle} />
        
        <main 
          className="flex-1 p-6 overflow-y-auto transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--text-dark)'}}>
                Settings
              </h1>
              <p style={{color: 'var(--text-secondary)'}}>
                Manage your account settings and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settingsSections.map((section, idx) => (
                <button
                  key={idx}
                  className="card p-6 text-left hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{background: 'rgba(26, 115, 232, 0.1)'}}
                    >
                      <section.icon className="w-6 h-6" style={{color: 'var(--brand-blue)'}} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{color: 'var(--text-dark)'}}>
                        {section.title}
                      </h3>
                      <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}