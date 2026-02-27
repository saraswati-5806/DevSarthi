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

  // ✅ VERTICAL THRESHOLD: Side-by-Side for 1-3. Vertical for 4+.
  const isVertical = activePanelCount >= 4;

  const PanelWrapper = ({ children }) => (
    <div 
      className={`transition-all duration-300 flex justify-center ${
        isVertical 
          ? 'w-full h-[650px] mb-8 flex-shrink-0' // Increased height for vertical mode
          : 'h-full flex-1 min-w-[320px] self-stretch'
      }`}
      style={{ 
        // Balanced widths for horizontal mode
        maxWidth: isVertical ? '1000px' : activePanelCount === 1 ? '900px' : activePanelCount === 2 ? '750px' : 'none' 
      }}
    >
      <div className="h-full w-full">
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
          className={`flex-1 p-4 transition-all duration-300 flex flex-col ${isVertical ? 'overflow-y-auto' : 'overflow-hidden'}`}
          style={{ 
            marginLeft: sidebarCollapsed ? '80px' : '256px',
            height: 'calc(100vh - 64px)' 
          }}
        >
          {/* Header Controls */}
          <div className="mb-4 flex items-center justify-between flex-shrink-0">
            <div className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
              {layoutMode === 'focus' && '🎯 Focus Mode'}
              {layoutMode === 'chat' && '💬 Chat Mode'}
              {layoutMode === 'learn' && '📚 Learn Mode'}
              {layoutMode === 'balanced' && '⚖️ Balanced Mode'}
            </div>

            <div className="flex gap-2">
              {['resources', 'codeEditor', 'calculator', 'notes'].map(key => (
                <button
                  key={key}
                  onClick={() => togglePanel(key)}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-sm"
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

          {/* DYNAMIC CONTAINER */}
          <div className={`flex-1 flex gap-6 w-full h-full min-h-0 ${
            isVertical ? 'flex-col items-center' : 'flex-row items-stretch justify-center'
          }`}>
            {panels.aiChat && (
              <PanelWrapper>
                <AIChat pdfContext={pdfContext} onSmartSwitch={handleSmartPanelSwitch} activePanelCount={activePanelCount} />
              </PanelWrapper>
            )}

            {panels.codeEditor && (
              <PanelWrapper>
                <CodeEditor />
              </PanelWrapper>
            )}

            {panels.resources && (
              <PanelWrapper>
                <ResourceViewer onPDFProcessed={(data) => setPdfContext(data)} />
              </PanelWrapper>
            )}

            {panels.calculator && (
              <PanelWrapper>
                <WhiteboardCalculator />
              </PanelWrapper>
            )}

            {panels.notes && (
              <PanelWrapper>
                <NotesPanel />
              </PanelWrapper>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}