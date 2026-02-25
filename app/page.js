'use client'
import { Code2, Sparkles, Zap, Globe, ArrowRight, Video, Menu } from 'lucide-react'

export default function LandingPage() {
  const handleDeveloperMode = () => {
    window.location.href = '/developer-mode'
  }

  const handleNormalMode = () => {
    window.location.href = '/normal-mode'
  }

  return (
    <div className="min-h-screen w-full bg-[#0a192f] text-[#e6f1ff] overflow-y-auto">
      {/* Header */}
    <header className="fixed top-0 w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Code2 className="w-8 h-8 text-[#64ffda]" />
        <h1 className="text-2xl font-bold neon-text">DevSarthi</h1>
          <span className="hidden md:block text-sm text-[#8892b0]">• Apka Technology Sarthi</span>
        </div>
    
    {/* Navigation Links */}
    <nav className="hidden md:flex gap-8">
      <a 
        href="#features" 
        className="text-[#e6f1ff] hover:text-[#64ffda] transition font-medium"
      >
        Features
      </a>
      <a 
        href="#how-it-works" 
        className="text-[#e6f1ff] hover:text-[#64ffda] transition font-medium"
      >
        How It Works
      </a>
      <a 
        href="#pricing" 
        className="text-[#e6f1ff] hover:text-[#64ffda] transition font-medium"
      >
        Pricing
      </a>
      <a 
        href="#demo" 
        className="text-[#e6f1ff] hover:text-[#64ffda] transition font-medium"
      >
        Demo
      </a>
    </nav>
    
    {/* CTA Buttons */}
    <div className="flex gap-4 items-center">
      <a 
        href="#demo"
        className="hidden md:block px-4 py-2 text-[#64ffda] hover:text-white transition font-medium"
      >
        Watch Demo
      </a>
      <button 
        onClick={handleDeveloperMode}
        className="neon-button"
      >
        Start Free →
      </button>
      </div>
      </div>
    </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="neon-text">Apni Problem Batao,</span>
            <br />
            <span className="text-[#ff6b9d]">AI Solution Banayega</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8892b0] mb-12 max-w-3xl mx-auto">
            Apka Technology Sarthi - Code Seekho ya Solution Pao
          </p>
          <p className="text-base text-[#8892b0] max-w-2xl mx-auto">
            Zero Setup • Pure Hinglish • AI-Powered
          </p>

          {/* How It Works Section */}
<section id="how-it-works" className="py-20 px-6 bg-[#112240] bg-opacity-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">
      How It Works
    </h2>
    <p className="text-center text-[#8892b0] mb-16 text-lg">
      Choose your path, we'll guide you through
    </p>
    
    <div className="grid md:grid-cols-2 gap-12">
      {/* Developer Mode Flow */}
      <div className="glass-panel p-8 border border-[#64ffda] border-opacity-30">
        <div className="flex items-center gap-3 mb-6">
          <Code2 className="w-8 h-8 text-[#64ffda]" />
          <h3 className="text-2xl font-bold text-[#64ffda]">Developer Mode</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#64ffda] font-bold">1</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Upload Tutorial</div>
              <div className="text-sm text-[#8892b0]">YouTube video, PDF, ya documentation upload karo</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#64ffda] font-bold">2</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">AI se Poocho</div>
              <div className="text-sm text-[#8892b0]">Hinglish mein sawal karo, AI context-aware jawab dega</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#64ffda] font-bold">3</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Code Practice Karo</div>
              <div className="text-sm text-[#8892b0]">Integrated editor mein code likho aur run karo</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#64ffda] font-bold">4</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Master Karo</div>
              <div className="text-sm text-[#8892b0]">Build projects, get feedback, become job-ready</div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleDeveloperMode}
          className="mt-6 w-full py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-lg hover:bg-[#64ffda] hover:text-[#0a192f] transition font-medium"
        >
          Try Developer Mode →
        </button>
      </div>
      
      {/* Normal Mode Flow */}
      <div className="glass-panel p-8 border border-[#ff6b9d] border-opacity-30">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-[#ff6b9d]" />
          <h3 className="text-2xl font-bold text-[#ff6b9d]">Problem-Solver Mode</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#ff6b9d] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#ff6b9d] font-bold">1</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Problem Batao</div>
              <div className="text-sm text-[#8892b0]">Hinglish mein apni business/work problem explain karo</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#ff6b9d] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#ff6b9d] font-bold">2</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">AI Solution Banayega</div>
              <div className="text-sm text-[#8892b0]">2-3 minutes mein AI custom solution design karega</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#ff6b9d] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#ff6b9d] font-bold">3</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Ready Solution Milega</div>
              <div className="text-sm text-[#8892b0]">Working app/tool instantly, no coding needed</div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#ff6b9d] bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#ff6b9d] font-bold">4</span>
            </div>
            <div>
              <div className="font-medium text-[#e6f1ff] mb-1">Use Karo & Scale Karo</div>
              <div className="text-sm text-[#8892b0]">Deploy karo, team ke saath share karo</div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleNormalMode}
          className="mt-6 w-full py-3 border-2 border-[#ff6b9d] text-[#ff6b9d] rounded-lg hover:bg-[#ff6b9d] hover:text-white transition font-medium"
        >
          Try Problem-Solver Mode →
        </button>
      </div>
    </div>
  </div>
</section>
{/* Pricing Section */}
<section id="pricing" className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">
      Simple Pricing
    </h2>
    <p className="text-center text-[#8892b0] mb-16 text-lg">
      Start free, upgrade when you're ready
    </p>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Free Tier */}
      <div className="glass-panel p-8 border border-[#64ffda] border-opacity-30">
        <div className="text-center mb-6">
          <div className="text-[#8892b0] text-sm mb-2">For Explorers</div>
          <div className="text-4xl font-bold text-[#e6f1ff] mb-2">₹0</div>
          <div className="text-sm text-[#8892b0]">Forever Free</div>
        </div>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>10 AI questions/day</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Basic tutorials</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Code editor (Python, JS)</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Community support</span>
          </li>
        </ul>
        
        <button className="w-full py-3 border-2 border-[#64ffda] border-opacity-30 text-[#64ffda] rounded-lg hover:border-opacity-100 transition">
          Start Free
        </button>
      </div>
      
      {/* Pro Tier */}
      <div className="glass-panel p-8 border-2 border-[#64ffda] relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#64ffda] text-[#0a192f] text-sm font-bold rounded-full">
          Most Popular
        </div>
        
        <div className="text-center mb-6">
          <div className="text-[#8892b0] text-sm mb-2">For Learners</div>
          <div className="text-4xl font-bold text-[#64ffda] mb-2">₹199</div>
          <div className="text-sm text-[#8892b0]">per month</div>
        </div>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span><strong>Unlimited</strong> AI questions</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Real code execution</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>All languages</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Priority support</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#64ffda]" />
            <span>Project templates</span>
          </li>
        </ul>
        
        <button className="w-full neon-button">
          Start Pro Trial
        </button>
      </div>
      
      {/* Business Tier */}
      <div className="glass-panel p-8 border border-[#ff6b9d] border-opacity-30">
        <div className="text-center mb-6">
          <div className="text-[#8892b0] text-sm mb-2">For Teams</div>
          <div className="text-4xl font-bold text-[#e6f1ff] mb-2">₹999</div>
          <div className="text-sm text-[#8892b0]">per month</div>
        </div>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
            <span>Everything in Pro</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
            <span>5 team members</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
            <span>Custom solutions</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
            <span>WhatsApp integration</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-[#ff6b9d]" />
            <span>Dedicated support</span>
          </li>
        </ul>
        
        <button className="w-full py-3 border-2 border-[#ff6b9d] text-[#ff6b9d] rounded-lg hover:bg-[#ff6b9d] hover:text-white transition">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</section>
{/* Demo Section */}
<section id="demo" className="py-20 px-6 bg-[#112240] bg-opacity-50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
      See It In Action
    </h2>
    <p className="text-[#8892b0] mb-12 text-lg">
      2-minute demo showing both modes
    </p>
    
    {/* Video Placeholder */}
    <div className="glass-panel p-8 border border-[#64ffda] border-opacity-30">
      <div className="aspect-video bg-[#0a192f] rounded-lg flex items-center justify-center border-2 border-dashed border-[#64ffda] border-opacity-30">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-10 h-10 text-[#64ffda]" />
          </div>
          <div className="text-xl font-bold text-[#e6f1ff] mb-2">Demo Video Coming Soon</div>
          <div className="text-sm text-[#8892b0] mb-6">
            We're recording a full walkthrough
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleDeveloperMode}
              className="neon-button"
            >
              Try Live Demo →
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#64ffda] border-opacity-20">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#64ffda] mb-1">0 min</div>
          <div className="text-sm text-[#8892b0]">Setup Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#64ffda] mb-1">10+</div>
          <div className="text-sm text-[#8892b0]">Languages</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#64ffda] mb-1">24/7</div>
          <div className="text-sm text-[#8892b0]">AI Tutor</div>
        </div>
      </div>
    </div>
  </div>
</section>
  
          {/* Mode Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Developer Mode Card */}
            <div 
              onClick={handleDeveloperMode}
              className="glass-panel p-8 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-[#64ffda] bg-opacity-20 rounded-full flex items-center justify-center">
                <Code2 className="w-10 h-10 text-[#64ffda]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#64ffda]">Developer Mode</h3>
              <p className="text-[#8892b0] mb-6 text-lg">
                Code seekhna hai? AI tutor ke saath step-by-step
              </p>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#64ffda] flex-shrink-0" />
                  <span>Video tutorials integrated</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#64ffda] flex-shrink-0" />
                  <span>AI tutor in Hinglish</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#64ffda] flex-shrink-0" />
                  <span>Practice coding live</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#64ffda] flex-shrink-0" />
                  <span>Build real projects</span>
                </li>
              </ul>
              <button className="neon-button w-full flex items-center justify-center gap-2">
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Normal Mode Card */}
            <div 
              onClick={handleNormalMode}
              className="glass-panel p-8 cursor-pointer hover:scale-105 transition-transform border-[#ff6b9d] border-opacity-30"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-[#ff6b9d] bg-opacity-20 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-[#ff6b9d]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-[#ff6b9d]">Problem-Solver Mode</h3>
             <p className="text-[#8892b0] mb-6 text-lg">
                Apni problem ka solution chahiye? AI bana dega!
            </p>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#ff6b9d] flex-shrink-0" />
                  <span>Describe problem in Hinglish</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#ff6b9d] flex-shrink-0" />
                  <span>AI builds solution</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#ff6b9d] flex-shrink-0" />
                  <span>Deploy automatically</span>
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#ff6b9d] flex-shrink-0" />
                  <span>No coding needed</span>
                </li>
              </ul>
              <button 
                className="neon-button w-full flex items-center justify-center gap-2"
                style={{borderColor: '#ff6b9d', color: '#ff6b9d'}}
              >
                Get Solution
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section id="features" className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 neon-text">
      Why Students & Professionals Choose DevSarthi
    </h2>
    <p className="text-center text-[#8892b0] mb-16 text-lg">
      Everything you need to learn or build with technology
    </p>
    
    <div className="grid md:grid-cols-3 gap-8">
      <div className="glass-panel p-8 hover:scale-105 transition">
        <Globe className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Vernacular Support</h3>
        <p className="text-[#8892b0]">
          Hinglish, Hindi, aur 10+ Indian languages mein seekho. No language barrier!
        </p>
      </div>
      
      <div className="glass-panel p-8 hover:scale-105 transition">
        <Zap className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Zero Setup</h3>
        <p className="text-[#8892b0]">
          Browser kholo aur shuru karo. No installation, no configuration, no headache!
        </p>
      </div>
      
      <div className="glass-panel p-8 hover:scale-105 transition">
        <Sparkles className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">AI-Powered</h3>
        <p className="text-[#8892b0]">
          Context-aware AI jo tumhare learning journey ko samajhta hai aur madad karta hai.
        </p>
      </div>
      
      <div className="glass-panel p-8 hover:scale-105 transition">
        <Code2 className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Real Code Execution</h3>
        <p className="text-[#8892b0]">
          Python, JavaScript, Java - sab kuch browser mein hi run karo. Instant feedback!
        </p>
      </div>
      
      <div className="glass-panel p-8 hover:scale-105 transition">
        <Video className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Integrated Learning</h3>
        <p className="text-[#8892b0]">
          Video tutorials, AI chat, aur code editor - sab ek hi jagah. No tab switching!
        </p>
      </div>
      
      <div className="glass-panel p-8 hover:scale-105 transition">
        <ArrowRight className="w-16 h-16 text-[#64ffda] mb-6" />
        <h3 className="text-2xl font-bold mb-4">Dual Purpose</h3>
        <p className="text-[#8892b0]">
          Learn to code YA get instant solutions - dono options available!
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#64ffda] border-opacity-20">
        <div className="max-w-6xl mx-auto text-center text-[#8892b0]">
          <p>© 2024 DevSarthi - AI for Bharat Hackathon</p>
          <p className="mt-2">Made with ❤️ for every learner in India</p>
        </div>
      </footer>
    </div>
  )
}