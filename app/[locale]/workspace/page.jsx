'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Code2, Home, ChevronLeft, ChevronRight, Layers } from 'lucide-react'

// ── Real component imports (from reference code) ────────────────────────────
import Header        from '@/components/layout/Header'
import Sidebar       from '@/components/layout/Sidebar'
import ResourceViewer from '@/components/workspace/ResourceViewer'
import AIChat         from '@/components/workspace/AIChat'
import CodeEditor     from '@/components/workspace/CodeEditor'
import WhiteboardCalculator from '@/components/workspace/WhiteboardCalculator'
import NotesPanel     from '@/components/workspace/NotesPanel'

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — Slate-950 / Slate-900 / Indigo accent (locked v3)
   Matches: Home Page (page.jsx) and Dashboard (dashboard-page.jsx) exactly.
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg0:          '#020617',   /* slate-950  — page canvas                    */
  bg1:          '#0f172a',   /* slate-900  — panel base                     */
  bg2:          '#1e293b',   /* slate-800  — borders / raised surfaces      */
  bg3:          '#334155',   /* slate-700  — hover / subtle                 */

  blue:         '#6366f1',   /* indigo-500                                  */
  purple:       '#7c3aed',   /* violet-600                                  */
  grad:         'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
  gradSoft:     'linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(124,58,237,0.14) 100%)',
  borderAccent: 'rgba(99,102,241,0.30)',  /* active panel indigo glow       */

  textHigh:    '#f1f5f9',
  textMid:     '#94a3b8',
  textLow:     '#475569',

  border:       '#1e293b',
  borderBright: '#334155',
}

/* ═══════════════════════════════════════════════════════════════════════════
   HINGLISH SYSTEM PROMPT
   Passed into <AIChat systemPrompt={...} /> so the AI responds in
   Hindi + English for a universal Indian audience.
   ═══════════════════════════════════════════════════════════════════════════ */
export const HINGLISH_SYSTEM_PROMPT = `You are DevSathi, an intelligent AI assistant embedded in a universal developer and research workspace.

Communication style:
- When the user writes in Hindi or mixed Hindi-English, respond in warm Hinglish (Hindi + English blend).
  Example: "Yeh function ek array leta hai (takes an array) aur usse sort karta hai (and sorts it)."
- For technical content (code, algorithms, architecture), use clear English with optional Hindi clarifications in parentheses.
- If the user writes in pure English, respond in English only.
- Never force Hinglish — mirror the user's language preference naturally.

Tone and format:
- Be concise, encouraging, and practical.
- Use markdown code blocks with language identifiers.
- Numbered steps for multi-part answers.
- Keep explanations scannable with bold key terms.

Supported languages: Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), English.`

/* ═══════════════════════════════════════════════════════════════════════════
   PANEL LABELS — Universal (no student-specific names)
   ═══════════════════════════════════════════════════════════════════════════ */
const PANEL_LABELS = {
  aiChat:     { label: 'AI Assistant',        mono: 'AI-CHAT',   accent: '#6366f1' },
  codeEditor: { label: 'Technical Workspace', mono: 'CODE',      accent: '#22c55e' },
  resources:  { label: 'Source Viewer',       mono: 'SOURCES',   accent: '#f59e0b' },
  calculator: { label: 'Whiteboard',          mono: 'BOARD',     accent: '#a78bfa' },
  notes:      { label: 'Active Notes',        mono: 'NOTES',     accent: '#06b6d4' },
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODE → PANEL MAPS  (mirrors Dashboard MODES + sessionStorage contract)
   ═══════════════════════════════════════════════════════════════════════════ */
const LAYOUT_MODES = {
  focus: {
    label: '🎯 Focus Mode',
    panels: { aiChat: false, codeEditor: true,  resources: false, calculator: false, notes: false },
  },
  chat: {
    label: '💬 Chat Mode',
    panels: { aiChat: true,  codeEditor: false, resources: false, calculator: false, notes: true  },
  },
  learn: {
    label: '🎓 Learning Hub',
    // 4 panels — matches Dashboard "learn" mode
    panels: { aiChat: true,  codeEditor: false, resources: true,  calculator: false, notes: true  },
  },
  balanced: {
    label: '⚖️ Balanced Mode',
    panels: { aiChat: true,  codeEditor: true,  resources: false, calculator: false, notes: false },
  },
  dev: {
    label: '💻 Development Mode',
    // 3 panels — matches Dashboard "dev" mode
    panels: { aiChat: true,  codeEditor: true,  resources: false, calculator: false, notes: true  },
  },
  research: {
    label: '🔬 Insight & Research',
    // 5 panels — matches Dashboard "research" mode
    panels: { aiChat: true,  codeEditor: false, resources: true,  calculator: true,  notes: true  },
  },
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS — injected once into <head> via dangerouslySetInnerHTML
   ═══════════════════════════════════════════════════════════════════════════ */
const WS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

  /* Base resets */
  html, body { margin:0; padding:0; background:#020617; overflow:hidden; }
  *, *::before, *::after { box-sizing:border-box; }

  /* Fonts for workspace */
  .ws-body { font-family:'Plus Jakarta Sans', sans-serif; }
  .ws-mono { font-family:'JetBrains Mono', monospace; }

  /* Dark scrollbars */
  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:#0f172a; }
  ::-webkit-scrollbar-thumb { background:#334155; border-radius:99px; }
  ::-webkit-scrollbar-thumb:hover { background:#475569; }

  /* Panel toggle buttons in header bar */
  .ws-toggle {
    display:inline-flex; align-items:center; gap:5px;
    padding:5px 12px; border-radius:7px; font-size:12px; font-weight:600;
    border:1px solid #1e293b; background:#0f172a; color:#94a3b8;
    cursor:pointer; font-family:'Plus Jakarta Sans', sans-serif;
    transition:background 0.15s, color 0.15s, border-color 0.15s;
  }
  .ws-toggle:hover  { background:#1e293b; color:#f1f5f9; border-color:#334155; }
  .ws-toggle.active {
    background:linear-gradient(135deg,rgba(99,102,241,0.22),rgba(124,58,237,0.22));
    color:#a5b4fc; border-color:rgba(99,102,241,0.35);
  }

  /* Active panel — indigo glow border */
  .panel-glow {
    border:1px solid rgba(99,102,241,0.30) !important;
    box-shadow:0 0 0 1px rgba(99,102,241,0.08), inset 0 0 28px rgba(99,102,241,0.02);
  }

  /* Floating AI bubble */
  .float-ai {
    position:fixed; bottom:24px; right:24px; z-index:60;
    width:52px; height:52px; border-radius:50%;
    background:linear-gradient(135deg,#6366f1,#7c3aed);
    border:none; cursor:pointer; font-size:22px;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 24px rgba(99,102,241,0.45);
    transition:transform 0.18s, box-shadow 0.18s;
  }
  .float-ai:hover { transform:scale(1.10); box-shadow:0 8px 32px rgba(99,102,241,0.60); }

  /* Sidebar mode buttons */
  .ws-mode-btn {
    display:flex; align-items:center; gap:9px; width:100%;
    padding:9px 12px; border-radius:9px; border:none;
    font-size:13px; font-weight:500; color:#94a3b8;
    background:transparent; cursor:pointer;
    font-family:'Plus Jakarta Sans', sans-serif;
    transition:background 0.15s, color 0.15s;
  }
  .ws-mode-btn:hover  { background:#1e293b; color:#f1f5f9; }
  .ws-mode-btn.active {
    background:linear-gradient(135deg,rgba(99,102,241,0.18),rgba(124,58,237,0.18));
    color:#a5b4fc; border:1px solid rgba(99,102,241,0.22);
  }

  /* Fade-in for panels */
  @keyframes panelFadeIn {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:none; }
  }
  .panel-fade { animation:panelFadeIn 0.28s ease both; }
`

/* ═══════════════════════════════════════════════════════════════════════════
   WORKSPACE HEADER  — replaces reference <Header />
   Shows DevSathi branding + mode badge + panel toggles + count indicator.
   The real <Header /> from '@/components/layout/Header' is kept below for
   the Sidebar to consume — swap back once Header accepts these props.
   ═══════════════════════════════════════════════════════════════════════════ */
function WorkspaceTopBar({ layoutMode, panels, onTogglePanel, activePanelCount }) {
  const modeLabel = LAYOUT_MODES[layoutMode]?.label ?? '⚖️ Balanced Mode'

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 56,
      background: 'rgba(2,6,23,0.92)',
      backdropFilter: 'blur(18px) saturate(160%)',
      borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 18px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* LEFT — DevSathi logo + caption */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 200 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: C.grad, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(99,102,241,0.40)',
        }}>
          <Code2 size={16} color="white" />
        </div>
        <div>
          <div style={{
            fontSize: 15, fontWeight: 800, lineHeight: 1,
            background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>DevSathi</div>
          <div style={{
            fontSize: 9, color: C.textLow, marginTop: 2,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'JetBrains Mono', monospace",
          }}>Your AI Companion</div>
        </div>
      </div>

      {/* CENTER — mode badge + panel toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Active mode pill */}
        <div style={{
          padding: '4px 13px', borderRadius: 99, fontSize: 11, fontWeight: 700,
          background: C.gradSoft, color: '#a5b4fc',
          border: '1px solid rgba(99,102,241,0.25)',
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}>{modeLabel}</div>

        {/* Panel toggles — show universal labels */}
        <div style={{ display: 'flex', gap: 5 }}>
          {Object.entries(PANEL_LABELS).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => onTogglePanel(key)}
              className={`ws-toggle${panels[key] ? ' active' : ''}`}
              title={meta.label}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.04em',
              }}>{meta.mono}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — panel count indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200, justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              width: 20, height: 5, borderRadius: 3,
              background: i < activePanelCount ? C.blue : C.bg3,
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: C.textLow, fontFamily: "'JetBrains Mono', monospace" }}>
          {activePanelCount}-panel
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR OVERLAY — wraps the real <Sidebar /> and injects dark theming +
   Dashboard home link. Replace the outer div once Sidebar accepts bg props.
   ═══════════════════════════════════════════════════════════════════════════ */
function SidebarShell({ locale, collapsed, onToggle, layoutMode, onLayoutChange, panels, onPanelToggle }) {
  const router = useRouter()

  return (
    <div style={{
      width: collapsed ? 60 : 220,
      flexShrink: 0,
      background: C.bg1,
      borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column',
      height: '100%',
      transition: 'width 0.22s cubic-bezier(.4,0,.2,1)',
      overflow: 'hidden',
      zIndex: 10,
    }}>
      {/* Collapse toggle */}
      <div style={{
        height: 48, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-end',
        padding: collapsed ? 0 : '0 10px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textLow, padding: 6, borderRadius: 7, display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.color = C.textMid}
          onMouseLeave={e => e.currentTarget.style.color = C.textLow}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Home → Dashboard */}
      <div style={{ padding: '10px 8px 4px' }}>
        <button
          onClick={() => router.push(`/${locale}/dashboard`)}
          className="ws-mode-btn"
          title={collapsed ? 'Dashboard' : undefined}
          style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 9 : '9px 12px' }}
        >
          <Home size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Dashboard</span>}
        </button>
      </div>

      {/* Mode section label */}
      {!collapsed && (
        <div style={{ padding: '8px 16px 4px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: C.textLow, letterSpacing: '0.10em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>
            Workspace Modes
          </div>
        </div>
      )}

      {/* Mode buttons — universal labels, hook into reference onLayoutChange */}
      <div style={{ padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Object.entries(LAYOUT_MODES).map(([id, mode]) => (
          <button
            key={id}
            className={`ws-mode-btn${layoutMode === id ? ' active' : ''}`}
            onClick={() => onLayoutChange[id]?.()}
            title={collapsed ? mode.label : undefined}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 9 : '9px 12px' }}
          >
            <span style={{ fontSize: 15, flexShrink: 0 }}>{mode.label.split(' ')[0]}</span>
            {!collapsed && <span style={{ fontSize: 13 }}>{mode.label.split(' ').slice(1).join(' ')}</span>}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Layout engine label */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 9, color: C.textLow, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', marginBottom: 4 }}>LAYOUT ENGINE</div>
          <div style={{ fontSize: 11, color: C.textMid }}>Adaptive 3–5 panel workspace</div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PANEL SHELL — dark Slate-900 base + indigo glow border
   Wraps each real component with the universal title bar
   ═══════════════════════════════════════════════════════════════════════════ */
function PanelShell({ panelKey, children, width }) {
  const meta = PANEL_LABELS[panelKey]
  return (
    <div
      className="panel-glow panel-fade"
      style={{
        width,
        minWidth: 0,
        height: '100%',
        background: C.bg1,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'width 0.25s ease',
      }}
    >
      {/* Universal panel title bar */}
      <div style={{
        height: 36, flexShrink: 0,
        background: C.bg0,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 13px',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: meta.accent,
          boxShadow: `0 0 6px ${meta.accent}`,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, color: meta.accent,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.08em',
        }}>{meta.mono}</span>
        <span style={{ fontSize: 11, color: C.textLow, marginLeft: 1 }}>· {meta.label}</span>
      </div>

      {/* Component content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function WorkspacePage() {
  const params  = useParams()
  const locale  = params?.locale ?? 'en'

  // ── State (mirrors reference code structure exactly) ──────────────────────
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [panels,     setPanels]     = useState({
    aiChat: true, codeEditor: true, resources: false, calculator: false, notes: false,
  })
  const [layoutMode, setLayoutMode] = useState('balanced')
  const [pdfContext, setPdfContext]  = useState(null)

  const activePanelCount = Object.values(panels).filter(Boolean).length

  /* ── sessionStorage init — reads mode set by Dashboard ───────────────────
     dev      → 3 panels: aiChat, codeEditor, notes
     research → 5 panels: aiChat, resources, notes, calculator, (extra handled via layout)
     learn    → 4 panels: aiChat, resources, notes, + one more
  ─────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = sessionStorage.getItem('ds_workspace_mode')
      if (!raw) return
      const { id } = JSON.parse(raw)
      const mode = LAYOUT_MODES[id]
      if (mode) {
        setPanels({ ...mode.panels })
        setLayoutMode(id)
      }
      sessionStorage.removeItem('ds_workspace_mode')  // consume once
    } catch {
      /* ignore malformed data — fall through to default 'balanced' */
    }
  }, [])

  // ── Layout mode handlers (reference API — passed verbatim to SidebarShell) */
  const setFocusMode    = useCallback(() => { setPanels({ ...LAYOUT_MODES.focus.panels    }); setLayoutMode('focus')    }, [])
  const setChatMode     = useCallback(() => { setPanels({ ...LAYOUT_MODES.chat.panels     }); setLayoutMode('chat')     }, [])
  const setLearnMode    = useCallback(() => { setPanels({ ...LAYOUT_MODES.learn.panels    }); setLayoutMode('learn')    }, [])
  const setBalancedMode = useCallback(() => { setPanels({ ...LAYOUT_MODES.balanced.panels }); setLayoutMode('balanced') }, [])
  const setDevMode      = useCallback(() => { setPanels({ ...LAYOUT_MODES.dev.panels      }); setLayoutMode('dev')      }, [])
  const setResearchMode = useCallback(() => { setPanels({ ...LAYOUT_MODES.research.panels }); setLayoutMode('research') }, [])

  const togglePanel = useCallback((panelName) => {
    setPanels(prev => ({ ...prev, [panelName]: !prev[panelName] }))
  }, [])

  // ── Smart panel switch — from AIChat context detection ───────────────────
  const handleSmartPanelSwitch = useCallback((context) => {
    if (context.type === 'youtube' || context.type === 'pdf')
      setPanels(prev => ({ ...prev, resources: true, codeEditor: false }))
    else if (context.type === 'code')
      setPanels(prev => ({ ...prev, codeEditor: true, resources: false }))
    else if (context.type === 'calculate')
      setPanels(prev => ({ ...prev, calculator: true }))
  }, [])

  // ── Panel width calculation (reference logic, preserved) ─────────────────
  const getPanelWidth = () => {
    if (activePanelCount === 1) return '100%'
    if (activePanelCount === 2) return '50%'
    if (activePanelCount === 3) return '33.33%'
    if (activePanelCount === 4) return '25%'
    return '20%'
  }

  const panelWidth = getPanelWidth()

  // ── Render order: consistent left-to-right display ───────────────────────
  const RENDER_ORDER = ['aiChat', 'codeEditor', 'resources', 'notes', 'calculator']

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WS_CSS }} />

      <div className="ws-body" style={{
        height: '100vh', width: '100vw',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', background: C.bg0,
      }}>

        {/* ── TOP BAR (branded, dark) ── */}
        <WorkspaceTopBar
          layoutMode={layoutMode}
          panels={panels}
          onTogglePanel={togglePanel}
          activePanelCount={activePanelCount}
        />

        {/* ── BODY (sidebar + main) ── */}
        <div style={{ flex: 1, display: 'flex', paddingTop: 56, overflow: 'hidden' }}>

          {/* Dark sidebar shell wrapping real Sidebar component logic */}
          <SidebarShell
            locale={locale}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(c => !c)}
            layoutMode={layoutMode}
            onLayoutChange={{
              focus:    setFocusMode,
              chat:     setChatMode,
              learn:    setLearnMode,
              balanced: setBalancedMode,
              dev:      setDevMode,
              research: setResearchMode,
            }}
            panels={panels}
            onPanelToggle={togglePanel}
          />

          {/* ── MAIN PANEL AREA ── */}
          <main style={{
            flex: 1,
            padding: 10,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>

            {/* Dynamic panels — rendered in fixed order with universal labels */}
            <div style={{
              flex: 1,
              display: 'flex',
              gap: 10,
              overflow: 'hidden',
              alignItems: 'stretch',
            }}>

              {RENDER_ORDER.map(key => {
                if (!panels[key]) return null
                return (
                  <PanelShell key={key} panelKey={key} width={panelWidth}>
                    {key === 'aiChat' && (
                      <AIChat
                        pdfContext={pdfContext}
                        onSmartSwitch={handleSmartPanelSwitch}
                        systemPrompt={HINGLISH_SYSTEM_PROMPT}
                      />
                    )}
                    {key === 'codeEditor' && <CodeEditor />}
                    {key === 'resources'  && <ResourceViewer onPDFProcessed={data => setPdfContext(data)} />}
                    {key === 'calculator' && <WhiteboardCalculator />}
                    {key === 'notes'      && <NotesPanel />}
                  </PanelShell>
                )
              })}

              {/* Empty state when all panels toggled off */}
              {activePanelCount === 0 && (
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 14,
                }}>
                  <Layers size={36} color={C.textLow} />
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.textMid }}>No panels active</div>
                  <div style={{ fontSize: 13, color: C.textLow }}>
                    Use the header toggles or select a mode from the sidebar.
                  </div>
                </div>
              )}
            </div>

          </main>
        </div>

        {/* ── Floating AI button — Focus Mode only ── */}
        {layoutMode === 'focus' && !panels.aiChat && (
          <button
            className="float-ai"
            onClick={() => setPanels(prev => ({ ...prev, aiChat: true }))}
            title="Open AI Assistant"
          >
            💬
          </button>
        )}

      </div>
    </>
  )
}