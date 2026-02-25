'use client'
import { useState } from 'react'
import { FileText, Video, Link as LinkIcon, Upload, Cloud, Plus, X, CheckCircle } from 'lucide-react'

export default function ResourceViewer() {
  const [activeResource, setActiveResource] = useState(null)

  return (
    <div className="h-full flex flex-col card">
      {/* Header */}
      <div className="p-4" style={{borderBottom: '1px solid var(--border-light)'}}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2" style={{color: 'var(--text-dark)'}}>
            <Video className="w-5 h-5" style={{color: 'var(--brand-blue)'}} />
            Resource Viewer
          </h3>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Plus className="w-5 h-5" style={{color: 'var(--brand-blue)'}} />
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{
          background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.1) 0%, rgba(106, 27, 154, 0.1) 100%)',
          border: '2px solid var(--border-light)'
        }}>
          <Video className="w-12 h-12" style={{color: 'var(--brand-blue)'}} />
        </div>
        <h4 className="text-xl font-bold mb-3" style={{color: 'var(--text-dark)'}}>
          No Resource Loaded
        </h4>
        <p className="text-sm mb-8 max-w-xs" style={{color: 'var(--text-secondary)'}}>
          Add a tutorial video, document, or link to start learning
        </p>
        
        {/* Add Resource Buttons */}
        <div className="space-y-3 w-full max-w-xs">
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-lg transition card hover:scale-105">
            <Video className="w-6 h-6" style={{color: 'var(--brand-blue)'}} />
            <div className="text-left flex-1">
              <div className="font-medium" style={{color: 'var(--text-dark)'}}>YouTube Video</div>
              <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Paste video URL</div>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-lg transition card hover:scale-105">
            <FileText className="w-6 h-6" style={{color: 'var(--brand-blue)'}} />
            <div className="text-left flex-1">
              <div className="font-medium" style={{color: 'var(--text-dark)'}}>Upload Document</div>
              <div className="text-xs" style={{color: 'var(--text-secondary)'}}>PDF, DOCX, MD files</div>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-lg transition card hover:scale-105">
            <LinkIcon className="w-6 h-6" style={{color: 'var(--brand-blue)'}} />
            <div className="text-left flex-1">
              <div className="font-medium" style={{color: 'var(--text-dark)'}}>Add Link</div>
              <div className="text-xs" style={{color: 'var(--text-secondary)'}}>Article, blog, tutorial</div>
            </div>
          </button>
        </div>

        {/* Quick Tip */}
        <div className="mt-8 p-4 rounded-lg max-w-xs" style={{
          background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.05) 0%, rgba(106, 27, 154, 0.05) 100%)',
          border: '1px solid var(--border-light)'
        }}>
          <p className="text-xs" style={{color: 'var(--text-secondary)'}}>
            💡 <span className="font-medium" style={{color: 'var(--brand-blue)'}}>Pro Tip:</span> Upload a tutorial and the AI will understand the context when you ask questions!
          </p>
        </div>
      </div>
    </div>
  )
}