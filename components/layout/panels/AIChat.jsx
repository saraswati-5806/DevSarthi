'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip, Code, MoreVertical, RefreshCw } from 'lucide-react'
import { mockAIResponses, quickQuestions } from '@/Lib/mockData'
import { getAIResponse } from '@/lib/gemini'

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Namaste! 👋 Main aapka AI tutor hoon. Koi bhi sawal pooch sakte ho Hinglish mein!',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMsg = {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    try {
      // Call REAL Gemini AI
      const aiText = await getAIResponse(currentInput, {
        language: 'Python',
        code: '',
        resource: 'Learning basics'
      })

      setIsTyping(false)

      // Extract code blocks if present
      const codeMatch = aiText.match(/```[\s\S]*?```/)
      const codeExample = codeMatch ? codeMatch[0].replace(/```/g, '').trim() : null
      const textWithoutCode = aiText.replace(/```[\s\S]*?```/g, '').trim()

      const aiMsg = {
        type: 'ai',
        content: textWithoutCode,
        code: codeExample,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        videoRef: null
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('AI Error:', error)
      setIsTyping(false)
      const errorMsg = {
        type: 'ai',
        content: 'Sorry, kuch technical issue aa gaya. Please try again! 🙏',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    }
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert('Code copied to clipboard!')
  }

  return (
    <div className="h-full flex flex-col card">
      {/* Header */}
      <div className="p-4 ai-accent-border" style={{borderBottom: '1px solid var(--border-light)'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <div className="font-bold" style={{color: 'var(--text-dark)'}}>AI Tutor</div>
              <div className="text-xs flex items-center gap-2" style={{color: 'var(--text-secondary)'}}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{background: 'var(--action-success)'}}></span>
                Online • Context-Aware
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-50 transition" title="Refresh chat">
              <RefreshCw className="w-4 h-4" style={{color: 'var(--text-secondary)'}} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-50 transition" title="More options">
              <MoreVertical className="w-4 h-4" style={{color: 'var(--text-secondary)'}} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.type === 'user' ? 'message-user' : 'message-ai'}`}>
              {/* Message Content */}
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>

              {/* Code Block */}
              {msg.code && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs flex items-center gap-1" style={{color: 'var(--text-secondary)'}}>
                      <Code className="w-3 h-3" />
                      Code Example
                    </span>
                    <button 
                      onClick={() => copyCode(msg.code)}
                      className="text-xs transition"
                      style={{color: 'var(--brand-blue)'}}
                    >
                      Copy Code
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <code className="font-mono" style={{color: 'var(--brand-blue)'}}>{msg.code}</code>
                  </pre>
                </div>
              )}

              {/* Video Reference */}
              {msg.videoRef && (
                <button className="mt-3 flex items-center gap-2 text-xs transition border rounded px-3 py-1.5" style={{
                  borderColor: 'var(--brand-blue)',
                  color: 'var(--brand-blue)'
                }}>
                  <span>▶</span>
                  <span>Video at {msg.videoRef}</span>
                </button>
              )}

              {/* Timestamp */}
              <div className="text-xs mt-2" style={{color: 'var(--text-tertiary)'}}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-lg p-4" style={{
              background: 'var(--bg-canvas)',
              border: '1px solid var(--border-light)'
            }}>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'var(--brand-blue)', animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'var(--brand-blue)', animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{background: 'var(--brand-blue)', animationDelay: '300ms'}}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <div className="text-xs mb-2" style={{color: 'var(--text-secondary)'}}>Quick questions to try:</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.slice(0, 4).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="text-xs px-3 py-1.5 rounded-full transition btn-secondary"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4" style={{borderTop: '1px solid var(--border-light)'}}>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Paperclip className="w-5 h-5" style={{color: 'var(--text-secondary)'}} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Hinglish mein poocho..."
            className="flex-1 px-4 py-2"
          />
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Mic className="w-5 h-5" style={{color: 'var(--text-secondary)'}} />
          </button>
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-success flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}