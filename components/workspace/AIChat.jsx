'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, Loader2 } from 'lucide-react'

export default function AIChat({ pdfContext, onSmartSwitch, activePanelCount }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initial Greeting
  useEffect(() => {
    setMessages([{
      type: 'ai',
      content: 'Namaste! 👋 Main aapka AI tutor hoon. Poocho, kya seekhna hai?',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }])
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ═══════════════════════════════════════════════════════════════════════════
     ✅ UPDATED: handleSend with AWS Bedrock Logic
     ═══════════════════════════════════════════════════════════════════════════ */
  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    // 1. Add User Message to UI
    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMessage])
    
    const currentInput = input
    setInput('')
    setIsTyping(true)

    try {
      // 2. Call our Next.js API route that talks to AWS Bedrock
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentInput,
          language: "Hinglish" 
        }),
      })

      const data = await response.json()

      if (data.text) {
        // 3. Add AI Response to UI
        setMessages(prev => [...prev, {
          type: 'ai',
          content: data.text,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }])
      } else {
        throw new Error("No response")
      }
    } catch (error) {
      console.error("AWS Bedrock Error:", error)
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "Oops! Brain connection slow hai. Please try again! 😅",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex-shrink-0">
        <h3 className="font-bold text-slate-800">AI Tutor</h3>
        <div className="text-[10px] text-slate-500 uppercase tracking-tight font-bold">Hinglish Mode</div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
              msg.type === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 p-3 rounded-2xl rounded-tl-none text-xs italic animate-pulse">
              DevSathi is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-all flex-shrink-0">
            <Paperclip className="w-5 h-5 text-slate-400" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Poocho..."
            className="flex-1 min-w-[50px] bg-slate-50 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
          />
          
          {/* Adaptive Mic Button */}
          <button className={`p-2 hover:bg-slate-100 rounded-lg transition-all flex-shrink-0 ${activePanelCount > 2 ? 'hidden' : 'block'}`}>
            <Mic className="w-5 h-5 text-slate-400" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}