// app/workspace/page.jsx
'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import ResourceViewer from '@/components/layout/panels/ResourceViewer'
import AIChat from '@/components/layout/panels/AIChat'
import CodeEditor from '@/components/layout/panels/CodeEditor'
import WhiteboardCalculator from '@/components/panels/WhiteboardCalculator'
import NotesPanel from '@/components/panels/NotesPanel'

export default function Workspace() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [panels, setPanels] = useState({
    aiChat: true,
    codeEditor: true,
    resources: false,
    calculator: false,
    notes: false
  })
  const [layoutMode, setLayoutMode] = useState('balanced')
  const [pdfContext, setPdfContext] = useState(null)
  
  const activePanelCount = Object.values(panels).filter(Boolean).length

  // Layout mode handlers
  const setFocusMode = () => {
    setPanels({ aiChat: false, codeEditor: true, resources: false, calculator: false, notes: false })
    setLayoutMode('focus')
  }

  const setChatMode = () => {
    setPanels({ aiChat: true, codeEditor: false, resources: false, calculator: false, notes: true })
    setLayoutMode('chat')
  }

  const setLearnMode = () => {
    setPanels({ aiChat: true, codeEditor: false, resources: true, calculator: false, notes: false })
    setLayoutMode('learn')
  }

  const setBalancedMode = () => {
    setPanels({ aiChat: true, codeEditor: true, resources: false, calculator: false, notes: false })
    setLayoutMode('balanced')
  }

  const togglePanel = (panelName) => {
    setPanels(prev => ({ ...prev, [panelName]: !prev[panelName] }))
  }

  const handleSmartPanelSwitch = (context) => {
    if (context.type === 'youtube') setPanels(prev => ({ ...prev, resources: true, codeEditor: false }))
    else if (context.type === 'code') setPanels(prev => ({ ...prev, codeEditor: true, resources: false }))
    else if (context.type === 'calculate') setPanels(prev => ({ ...prev, calculator: true }))
  }

  const getPanelWidth = () => {
    if (activePanelCount === 1) return '100%'
    if (activePanelCount === 2) return '50%'
    if (activePanelCount === 3) return '33.33%'
    return '25%'
  }

  // --- NEW: Helper to prevent content from stretching too far ---
  const PanelContainer = ({ children }) => (
    <div className={`h-full w-full transition-all duration-300 flex justify-center`} style={{ width: getPanelWidth() }}>
      <div className={`h-full w-full ${activePanelCount === 1 ? 'max-w-5xl' : 'max-w-full'}`}>
        {children}
      </div>
    </div>
  )

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{background: 'var(--bg-canvas)'}}>
      <Header />
      
      <div className="flex-1 flex pt-16 overflow-hidden">
        <Sidebar 
          onToggle={(val) => setSidebarCollapsed(val)}
          layoutMode={layoutMode}
          onLayoutChange={{
            focus: setFocusMode,
            chat: setChatMode,
            learn: setLearnMode,
            balanced: setBalancedMode
          }}
          panels={panels}
          onPanelToggle={togglePanel}
        />
        
        <main 
          className="flex-1 p-3 overflow-hidden transition-all duration-300 flex flex-col"
          style={{ marginLeft: sidebarCollapsed ? '80px' : '256px' }}
        >
          {/* Header/Toggles */}
          <div className="mb-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{
                background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.1) 0%, rgba(106, 27, 154, 0.1) 100%)',
                color: 'var(--brand-blue)',
                border: '1px solid rgba(26, 115, 232, 0.2)'
              }}>
                {layoutMode === 'focus' && '🎯 Focus Mode'}
                {layoutMode === 'chat' && '💬 Chat Mode'}
                {layoutMode === 'learn' && '📚 Learn Mode'}
                {layoutMode === 'balanced' && '⚖️ Balanced Mode'}
              </div>
            </div>

            <div className="flex gap-2">
              {['resources', 'codeEditor', 'calculator', 'notes'].map(key => (
                <button
                  key={key}
                  onClick={() => togglePanel(key)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
                  style={{
                    background: panels[key] ? 'var(--brand-gradient)' : 'white',
                    color: panels[key] ? 'white' : 'var(--text-primary)',
                    border: panels[key] ? 'none' : '1px solid var(--border-light)'
                  }}
                >
                  {key === 'codeEditor' ? '💻 Code' : key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Panels */}
          <div className="flex-1 flex gap-3 overflow-hidden justify-center">
            {panels.aiChat && (
              <PanelContainer>
                <AIChat pdfContext={pdfContext} onSmartSwitch={handleSmartPanelSwitch} />
              </PanelContainer>
            )}

            {panels.codeEditor && (
              <PanelContainer>
                <CodeEditor />
              </PanelContainer>
            )}

            {panels.resources && (
              <PanelContainer>
                <ResourceViewer onPDFProcessed={(data) => setPdfContext(data)} />
              </PanelContainer>
            )}

            {panels.calculator && (
              <PanelContainer>
                <WhiteboardCalculator />
              </PanelContainer>
            )}

            {panels.notes && (
              <PanelContainer>
                <NotesPanel />
              </PanelContainer>
            )}
          </div>

          {/* Floating AI Button for Focus Mode */}
          {layoutMode === 'focus' && !panels.aiChat && (
            <button
              onClick={() => setPanels(prev => ({ ...prev, aiChat: true }))}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-50 bg-gradient text-white"
            >
              💬
            </button>
          )}
        </main>
      </div>
    </div>
  )
}