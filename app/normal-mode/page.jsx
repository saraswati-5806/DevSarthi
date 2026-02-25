'use client'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import { Sparkles, Zap, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

export default function NormalMode() {
  const [stage, setStage] = useState('input') // input | processing | solution
  const [problem, setProblem] = useState('')
  const [category, setCategory] = useState('business')

  const handleSubmit = () => {
    if (!problem.trim()) return
    setStage('processing')
    
    // Simulate AI processing
    setTimeout(() => {
      setStage('solution')
    }, 3000)
  }

  const handleReset = () => {
    setStage('input')
    setProblem('')
  }

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <Header mode="normal" />
      
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          
          {/* INPUT STAGE */}
          {stage === 'input' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b9d] bg-opacity-20 rounded-full border border-[#ff6b9d] border-opacity-50 mb-6">
                  <Zap className="w-5 h-5 text-[#ff6b9d]" />
                  <span className="text-[#ff6b9d] font-medium">Problem-Solver Mode</span>
                </div>
                <h1 className="text-5xl font-bold mb-4 text-[#e6f1ff]">
                  Apni <span className="neon-text">Problem Batao</span>
                </h1>
                <p className="text-xl text-[#8892b0] max-w-2xl mx-auto">
                  AI solution banayega - coding ki zarurat nahi!
                </p>
              </div>

              {/* Main Input Card */}
              <div className="glass-panel p-8 border border-[#ff6b9d] border-opacity-30">
                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#8892b0] mb-3">
                    Ye kis field ke liye hai?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'business', label: '🏪 Business', icon: '💼' },
                      { value: 'education', label: '👨‍🏫 Education', icon: '📚' },
                      { value: 'creative', label: '📸 Creative', icon: '🎨' },
                      { value: 'other', label: '📊 Other', icon: '⚙️' }
                    ].map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          category === cat.value
                            ? 'border-[#ff6b9d] bg-[#ff6b9d] bg-opacity-20 text-[#ff6b9d]'
                            : 'border-[#64ffda] border-opacity-30 bg-[#112240] text-[#8892b0] hover:border-opacity-100'
                        }`}
                      >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="text-xs font-medium">{cat.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Problem Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#8892b0] mb-3">
                    Apni problem detail mein batao:
                  </label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Example: Mere paas ek kirana dukaan hai. Daily sales ka hisaab Excel mein likhta hoon. Har mahine ke ant mein total nikalna bahut time leta hai. Kya automated ho sakta hai? WhatsApp pe report bhi chahiye har raat 9 PM ko..."
                    className="w-full h-48 p-4 bg-[#112240] rounded-lg border border-[#ff6b9d] border-opacity-30 focus:border-opacity-100 focus:outline-none text-[#e6f1ff] placeholder-[#8892b0] resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-[#8892b0]">
                      {problem.length} characters
                    </span>
                    <span className="text-xs text-[#8892b0]">
                      Hinglish mein likh sakte ho!
                    </span>
                  </div>
                </div>

                {/* Optional: File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#8892b0] mb-3">
                    Koi example file hai? (Optional)
                  </label>
                  <div className="border-2 border-dashed border-[#64ffda] border-opacity-30 rounded-lg p-6 text-center hover:border-opacity-100 transition cursor-pointer">
                    <div className="text-[#64ffda] mb-2">📎</div>
                    <div className="text-sm text-[#8892b0]">
                      Click to upload or drag & drop
                    </div>
                    <div className="text-xs text-[#8892b0] mt-1">
                      Excel, PDF, Images accepted
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!problem.trim()}
                  className="w-full py-4 bg-[#ff6b9d] text-white rounded-lg font-bold text-lg hover:bg-[#ff5a8c] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  Solution Banao
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* Popular Templates */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-[#e6f1ff]">
                  Ya phir ready-made template use karo:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: 'Sales Tracker', desc: 'Daily sales record', icon: '📊' },
                    { title: 'Inventory Manager', desc: 'Stock management', icon: '📦' },
                    { title: 'Bill Generator', desc: 'GST invoices', icon: '🧾' },
                  ].map((template, idx) => (
                    <div key={idx} className="glass-panel p-4 hover:scale-105 transition cursor-pointer border border-[#64ffda] border-opacity-30">
                      <div className="text-3xl mb-2">{template.icon}</div>
                      <div className="font-bold text-[#e6f1ff] mb-1">{template.title}</div>
                      <div className="text-xs text-[#8892b0]">{template.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROCESSING STAGE */}
          {stage === 'processing' && (
            <div className="glass-panel p-12 text-center max-w-2xl mx-auto border border-[#ff6b9d] border-opacity-30">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 border-4 border-[#ff6b9d] border-opacity-20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-[#ff6b9d] rounded-full animate-spin"></div>
                <Sparkles className="w-16 h-16 text-[#ff6b9d] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-[#e6f1ff]">
                AI Solution Ban Raha Hai...
              </h2>
              
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3 text-[#8892b0]">
                  <CheckCircle className="w-5 h-5 text-[#64ffda]" />
                  <span>Problem samajh aa gaya</span>
                </div>
                <div className="flex items-center gap-3 text-[#e6f1ff]">
                  <Loader2 className="w-5 h-5 text-[#ff6b9d] animate-spin" />
                  <span>Best solution design kar raha hoon...</span>
                </div>
                <div className="flex items-center gap-3 text-[#8892b0]">
                  <div className="w-5 h-5"></div>
                  <span>Code generate ho raha hai...</span>
                </div>
                <div className="flex items-center gap-3 text-[#8892b0]">
                  <div className="w-5 h-5"></div>
                  <span>Solution deploy kar raha hoon...</span>
                </div>
              </div>

              <div className="mt-8 text-sm text-[#8892b0]">
                Estimated time: 2-3 minutes
              </div>
            </div>
          )}

          {/* SOLUTION STAGE */}
          {stage === 'solution' && (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-[#64ffda]" />
                </div>
                <h2 className="text-4xl font-bold mb-2 text-[#64ffda]">
                  Solution Ready Hai! 🎉
                </h2>
                <p className="text-[#8892b0]">
                  Aapka automated sales tracker taiyar hai
                </p>
              </div>

              {/* Solution Details */}
              <div className="glass-panel p-8 border border-[#64ffda] border-opacity-30">
                <h3 className="text-2xl font-bold mb-6 text-[#e6f1ff]">
                  📊 Daily Sales Tracker
                </h3>

                {/* What it does */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-[#64ffda]">Ye solution kya karega:</h4>
                  <ul className="space-y-2 text-[#8892b0]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#64ffda] flex-shrink-0 mt-0.5" />
                      <span>Simple mobile form se sales entry (product, quantity, price)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#64ffda] flex-shrink-0 mt-0.5" />
                      <span>Automatic daily aur monthly total calculations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#64ffda] flex-shrink-0 mt-0.5" />
                      <span>WhatsApp pe automated report (har raat 9 PM)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#64ffda] flex-shrink-0 mt-0.5" />
                      <span>Google Sheet mein automatic backup</span>
                    </li>
                  </ul>
                </div>

                {/* Access Links */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-[#64ffda]">Aapko ye milega:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#112240] rounded-lg border border-[#64ffda] border-opacity-30">
                      <div className="text-xs text-[#8892b0] mb-2">📱 Mobile App URL</div>
                      <div className="font-mono text-sm text-[#64ffda] break-all">
                        sales.devsarthi.app/shop123
                      </div>
                      <button className="mt-2 text-xs text-[#64ffda] hover:underline">
                        Copy Link
                      </button>
                    </div>
                    <div className="p-4 bg-[#112240] rounded-lg border border-[#64ffda] border-opacity-30">
                      <div className="text-xs text-[#8892b0] mb-2">📊 Google Sheet</div>
                      <div className="font-mono text-sm text-[#64ffda]">
                        Auto-created & linked
                      </div>
                      <button className="mt-2 text-xs text-[#64ffda] hover:underline">
                        Open Sheet
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setup Instructions */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-[#64ffda]">Kaise use karein:</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-[#64ffda] font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-[#e6f1ff]">Mobile app link kholo</div>
                        <div className="text-sm text-[#8892b0]">Phone pe link open karo aur "Add to Home Screen" karo</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-[#64ffda] font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-[#e6f1ff]">Daily sales add karo</div>
                        <div className="text-sm text-[#8892b0]">Simple form fill karo - product name, quantity, price</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-[#64ffda] font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-[#e6f1ff]">Automatic report milegi</div>
                        <div className="text-sm text-[#8892b0]">Har raat 9 PM ko WhatsApp pe full day ka summary</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-[#64ffda] text-[#0a192f] rounded-lg font-bold hover:bg-[#52e8c4] transition">
                    Deploy Now & Start Using
                  </button>
                  <button className="px-6 py-3 bg-[#112240] text-[#64ffda] rounded-lg font-medium hover:bg-[#1d3a5f] transition border border-[#64ffda] border-opacity-30">
                    Customize First
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-3 bg-[#112240] text-[#8892b0] rounded-lg font-medium hover:bg-[#1d3a5f] transition"
                  >
                    New Problem
                  </button>
                </div>
              </div>

              {/* Demo Preview */}
              <div className="glass-panel p-6 border border-[#ff6b9d] border-opacity-30">
                <h4 className="font-bold mb-4 text-[#e6f1ff]">📱 Preview:</h4>
                <div className="bg-[#112240] rounded-lg p-4 border border-[#64ffda] border-opacity-20">
                  <div className="text-sm text-[#8892b0] mb-2">Mobile app ka preview:</div>
                  <div className="aspect-video bg-[#0a192f] rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <div className="text-[#64ffda]">Sales Entry Form</div>
                      <div className="text-xs text-[#8892b0] mt-1">Simple & Fast</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}