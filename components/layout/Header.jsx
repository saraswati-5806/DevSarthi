'use client'
import { Code2, Bell, Settings, User, Search, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Header({ mode = 'developer' }) {
  const [language, setLanguage] = useState('Hinglish')

  return (
    <header className="header h-16 flex items-center justify-between px-6 fixed top-0 w-full z-50 bg-white">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient flex items-center justify-center rounded-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-gradient">DevSarthi</span>
            <div className="text-xs" style={{color: 'var(--text-secondary)'}}>
              Apka Technology Sarthi
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="badge">
            {mode === 'developer' ? '💻 Developer Mode' : '💼 Problem-Solver Mode'}
          </span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color: 'var(--text-tertiary)'}} />
          <input 
            type="text"
            placeholder="Search in chats, files, docs..."
            className="w-full pl-10 pr-4 py-2 text-sm"
            style={{
              background: 'var(--bg-canvas)',
              border: '2px solid var(--border-light)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg" style={{background: 'var(--bg-canvas)'}}>
          <Globe className="w-4 h-4" style={{color: 'var(--brand-blue)'}} />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-sm focus:outline-none cursor-pointer"
            style={{color: 'var(--text-primary)'}}
          >
            <option value="Hinglish">Hinglish</option>
            <option value="Hindi">हिंदी</option>
            <option value="English">English</option>
            <option value="Tamil">தமிழ்</option>
            <option value="Telugu">తెలుగు</option>
            <option value="Bengali">বাংলা</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell className="w-5 h-5" style={{color: 'var(--text-secondary)'}} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{background: 'var(--action-error)'}}></span>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Settings className="w-5 h-5" style={{color: 'var(--text-secondary)'}} />
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          <div className="w-8 h-8 bg-gradient rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block text-sm font-medium" style={{color: 'var(--text-primary)'}}>
            Rahul K.
          </span>
        </button>
      </div>
    </header>
  )
}