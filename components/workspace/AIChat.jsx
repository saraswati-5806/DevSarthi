'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, Copy } from 'lucide-react'

export default function AIChat({ pdfContext, onSmartSwitch, activePanelCount }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages([{
      type: 'ai',
      content: 'Namaste! 👋 Main aapka AI tutor hoon. Poocho, kya seekhna hai?',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex-shrink-0">
        <h3 className="font-bold text-slate-800">AI Tutor</h3>
        <div className="text-[10px] text-slate-500 uppercase tracking-tight font-bold">Hinglish Mode</div>
      </div>

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
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ Adaptive Input Area */}
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
          
          <button className={`p-2 hover:bg-slate-100 rounded-lg transition-all flex-shrink-0 ${activePanelCount > 2 ? 'hidden' : 'block'}`}>
            <Mic className="w-5 h-5 text-slate-400" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}