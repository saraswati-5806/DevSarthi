// app/[locale]/achievements/page.jsx
'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { Award, Flame, TrendingUp, Code } from 'lucide-react'

export default function AchievementsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // ✅ Fixed: Added the missing function that the Sidebar needs
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  const achievements = [
    { icon: Flame, title: '7 Day Streak', description: 'Learned for 7 days straight', unlocked: true },
    { icon: Code, title: 'First Code', description: 'Ran your first program', unlocked: true },
    { icon: TrendingUp, title: '50 Problems', description: 'Solved 50 coding problems', unlocked: true },
    { icon: Award, title: '100 Problems', description: 'Solved 100 coding problems', unlocked: false },
  ]

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{background: 'var(--bg-canvas)'}}>
      <Header />
      
      <div className="flex-1 flex pt-16 overflow-hidden">
        {/* Now handleSidebarToggle is defined so it won't crash */}
        <Sidebar onToggle={handleSidebarToggle} />
        
        <main 
          className="flex-1 p-6 overflow-y-auto transition-all duration-300"
          style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6" style={{color: 'var(--text-dark)'}}>
              Achievements
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="card p-6"
                  style={{
                    opacity: achievement.unlocked ? 1 : 0.5,
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{color: 'var(--text-dark)'}}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}