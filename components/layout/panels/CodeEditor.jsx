'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Play, Download, Settings, Code, RotateCcw, Copy } from 'lucide-react'
import { languageTemplates, mockCodeExecutionResults } from '@/Lib/mockData'

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div style={{color: 'var(--brand-blue)'}}>Loading editor...</div>
    </div>
  )
})

export default function CodeEditor() {
  const [code, setCode] = useState(languageTemplates.python.starter)
  const [language, setLanguage] = useState('python')
  const [output, setOutput] = useState('')
  const [showTerminal, setShowTerminal] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState('vs-light')

  const handleRun = () => {
    setShowTerminal(true)
    setIsRunning(true)
    setOutput('Running...')
    
    setTimeout(() => {
      setIsRunning(false)
      if (code.includes('print') || code.includes('console.log') || code.includes('System.out')) {
        setOutput(mockCodeExecutionResults[language]?.success || 'Code executed successfully!')
      } else {
        setOutput(mockCodeExecutionResults[language]?.error || 'Syntax error detected')
      }
    }, 1500)
  }

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setCode(languageTemplates[newLang].starter)
    setOutput('')
    setShowTerminal(false)
  }

  const handleReset = () => {
    setCode(languageTemplates[language].starter)
    setOutput('')
    setShowTerminal(false)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code${languageTemplates[language].extension}`
    a.click()
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  return (
    <div className="h-full flex flex-col card editor-container">
      {/* Header */}
      <div className="flex items-center justify-between p-3" style={{borderBottom: '1px solid var(--border-light)'}}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5" style={{color: 'var(--brand-blue)'}} />
            <span className="font-bold" style={{color: 'var(--text-dark)'}}>Code Editor</span>
          </div>
          
          {/* Language Selector */}
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1.5 text-sm rounded-lg cursor-pointer"
          >
            <option value="python">🐍 Python</option>
            <option value="javascript">⚡ JavaScript</option>
            <option value="java">☕ Java</option>
            <option value="cpp">⚙️ C++</option>
            <option value="c">📘 C</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={copyCode}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Copy code"
          >
            <Copy className="w-4 h-4" style={{color: 'var(--text-secondary)'}} />
          </button>
          <button 
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" style={{color: 'var(--text-secondary)'}} />
          </button>
          <button 
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Download code"
          >
            <Download className="w-4 h-4" style={{color: 'var(--text-secondary)'}} />
          </button>
          <div className="w-px h-6" style={{background: 'var(--border-medium)'}}></div>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="btn-success flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{
        background: 'var(--bg-canvas)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <span className="text-xs" style={{color: 'var(--text-secondary)'}}>Theme:</span>
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="px-2 py-1 rounded text-xs cursor-pointer"
        >
          <option value="vs-light">Light</option>
          <option value="vs-dark">Dark</option>
          <option value="hc-black">High Contrast</option>
        </select>
        
        <div className="flex-1"></div>
        
        <span className="text-xs" style={{color: 'var(--text-secondary)'}}>
          {code.split('\n').length} lines
        </span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme={theme}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            cursorBlinking: 'smooth',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Terminal */}
      {showTerminal && (
        <div className="h-48" style={{borderTop: '1px solid var(--border-light)'}}>
          <div className="flex items-center justify-between px-4 py-2" style={{
            background: 'var(--bg-canvas)',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{background: 'var(--action-success)'}}></div>
              <span className="text-sm font-bold" style={{color: 'var(--brand-blue)'}}>Terminal Output</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setOutput('')}
                className="text-xs transition"
                style={{color: 'var(--text-secondary)'}}
              >
                Clear
              </button>
              <button 
                onClick={() => setShowTerminal(false)}
                className="text-xs transition"
                style={{color: 'var(--text-secondary)'}}
              >
                Close ×
              </button>
            </div>
          </div>
          
          <div className="p-4 h-full overflow-auto">
            <pre className="text-sm font-mono">
              {output.includes('error') || output.includes('Error') ? (
                <span style={{color: 'var(--action-error)'}}>{output}</span>
              ) : (
                <span style={{color: 'var(--action-success)'}}>{output}</span>
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}