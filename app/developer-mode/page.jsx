'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import ResourceViewer from '@/components/layout/panels/ResourceViewer'
import AIChat from '@/components/layout/panels/AIChat'
import CodeEditor from '@/components/layout/panels/CodeEditor'

export default function DeveloperMode() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [hasResource, setHasResource] = useState(false)

  return (
  <div className="h-screen flex flex-col overflow-hidden" style={{background: 'var(--bg-canvas)'}}>
    {/* Header - Fixed at top */}
    <Header mode="developer" />
    
    {/* Main Container */}
    <div className="flex-1 flex pt-16 overflow-hidden">
      {/* Sidebar - Fixed on left */}
      <Sidebar />
      
      {/* Main Workspace - 3 Column Layout */}
      <main className="flex-1 ml-64 flex gap-4 p-4">
        {/* Left Panel: Resource Viewer */}
        <div className="w-[30%] min-w-[300px]">
          <ResourceViewer />
        </div>
        
        {/* Center Panel: AI Chat */}
        <div className="w-[35%] min-w-[350px]">
          <AIChat />
        </div>
        
        {/* Right Panel: Code Editor */}
        <div className="w-[35%] min-w-[350px]">
          <CodeEditor />
        </div>
      </main>
    </div>
  </div>
)
}