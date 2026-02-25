'use client'
import { Home, MessageSquare, BookOpen, Code, FolderKanban, Award, Settings, ChevronLeft, Plus } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: 'Home', active: true, badge: null },
    { icon: MessageSquare, label: 'Chats', active: false, badge: '3' },
    { icon: BookOpen, label: 'Resources', active: false, badge: null },
    { icon: Code, label: 'Code Editor', active: false, badge: null },
    { icon: FolderKanban, label: 'My Projects', active: false, badge: '5' },
    { icon: Award, label: 'Achievements', active: false, badge: null },
    { icon: Settings, label: 'Settings', active: false, badge: null },
  ]

  return (
    <aside 
      className="sidebar h-screen fixed left-0 top-16 transition-all duration-300 pt-6"
      style={{
        width: collapsed ? '80px' : '256px',
        background: 'var(--bg-sidebar)'
      }}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full flex items-center justify-center transition shadow-lg"
        style={{
          background: 'var(--brand-blue)',
          color: 'white'
        }}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Logo/Title */}
      {!collapsed && (
        <div className="px-6 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide" style={{color: 'rgba(255,255,255,0.5)'}}>
            Workspace
          </h2>
        </div>
      )}

      {/* New Chat Button */}
      <div className="px-3 mb-4">
        <button 
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3 px-4 py-3 rounded-lg transition-all font-medium ai-accent`}
        >
          <Plus className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1 px-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`sidebar-item w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active ? 'active' : ''
            }`}
            title={collapsed ? item.label : ''}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </div>
            {!collapsed && item.badge && (
              <span className="px-2 py-0.5 text-xs rounded-full font-bold" style={{
                background: 'var(--action-error)',
                color: 'white'
              }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section - Streak */}
      {!collapsed && (
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient">
                🔥
              </div>
              <div>
                <div className="text-sm font-bold" style={{color: 'var(--text-dark)'}}>7 Day Streak!</div>
                <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Keep it up!</div>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{background: 'var(--bg-canvas)'}}>
              <div className="h-full w-[70%] bg-gradient rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}