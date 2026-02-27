// app/[locale]/notifications/page.jsx
'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { Bell, Award, AlertCircle, Trash2 } from 'lucide-react'

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, category: 'achievement', message: '🔥 7 day streak achieved!', time: '2 hours ago', read: false },
    { id: 2, category: 'system', message: 'Code executed successfully!', time: '5 min ago', read: false },
    { id: 3, category: 'system', message: 'New resource uploaded', time: '1 hour ago', read: false },
    { id: 4, category: 'achievement', message: 'New milestone: 50 problems solved!', time: '3 hours ago', read: true },
  ])

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

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
                Notifications
              </h1>
              <p style={{color: 'var(--text-secondary)'}}>
                Manage all your notifications in one place
              </p>
            </div>

            <div className="space-y-4">
              {notifications.map(notif => (
                <div key={notif.id} className="card p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
                    style={{background: notif.category === 'achievement' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(26, 115, 232, 0.1)'}}
                  >
                    {notif.category === 'achievement' ? 
                      <Award className="w-5 h-5" style={{color: 'var(--action-success)'}} /> :
                      <AlertCircle className="w-5 h-5" style={{color: 'var(--brand-blue)'}} />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1" style={{color: 'var(--text-dark)'}}>
                      {notif.message}
                    </p>
                    <p className="text-sm" style={{color: 'var(--text-tertiary)'}}>
                      {notif.time}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}