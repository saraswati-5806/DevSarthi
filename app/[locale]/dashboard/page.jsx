"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";

import {
  Code2, Home, FolderOpen, User, ChevronRight,
  Flame, Zap, BookOpen, Brain,
  Code, FileSearch, GraduationCap,
  MessageSquare, Upload, Clock,
  TrendingUp, Calendar, ArrowRight,
  Layers, Menu, X, LogOut,
  MoreHorizontal, Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg0: "#020617",
  bg1: "#0f172a",
  bg2: "#1e293b",
  bg3: "#334155",
  blue: "#6366f1",
  purple: "#7c3aed",
  grad: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
  gradSoft: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(124,58,237,0.15) 100%)",
  textHigh: "#f1f5f9",
  textMid: "#94a3b8",
  textLow: "#475569",
  border: "#1e293b",
  borderBright: "#334155",
  borderAccent: "rgba(99,102,241,0.30)",
  green: "#22c55e",
  orange: "#f97316",
  cyan: "#06b6d4",
  amber: "#f59e0b",
};

/* ═══════════════════════════════════════════════════════════════════════════
   INJECTED GLOBAL CSS (RESTORING THE MISSING VARIABLE)
   ═══════════════════════════════════════════════════════════════════════════ */
const DASH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
  html, body { margin:0; padding:0; background:#020617; }
  *, *::before, *::after { box-sizing:border-box; }

  .dash-nav {
    display:flex; align-items:center; gap:10px;
    padding:10px 14px; border-radius:9px; cursor:pointer;
    font-size:14px; font-weight:500; color:#94a3b8;
    text-decoration:none; border:none; background:transparent;
    width:100%; font-family:inherit; transition:background 0.15s, color 0.15s;
  }
  .dash-nav:hover { background:#1e293b; color:#f1f5f9; }
  .dash-nav.active { background:linear-gradient(135deg,rgba(99,102,241,0.18),rgba(124,58,237,0.18));
    color:#a5b4fc; border:1px solid rgba(99,102,241,0.2); }

  .wf-card {
    background:#0f172a; border:1px solid #1e293b; border-radius:16px;
    cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    position:relative; overflow:hidden;
  }
  .wf-card:hover {
    border-color:rgba(99,102,241,0.40);
    box-shadow:0 12px 40px rgba(0,0,0,0.5);
    transform:translateY(-4px);
  }

  .proj-row { transition:background 0.15s; border-radius:10px; }
  .proj-row:hover { background:#1e293b; }

  @keyframes spin { to { transform:rotate(360deg); } }
  .spinner { animation:spin 0.75s linear infinite; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  .fade-in { animation:fadeIn 0.4s ease both; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const WORKSPACE_MODES = [
  { id: "dev", panels: 3, Icon: Code, accent: "#6366f1", accentBg: "rgba(99,102,241,0.12)", tag: "Development Mode", tagMono: "3-PANEL", title: "Code & Build", desc: "AI chat, editor, and notes in a 3-panel view.", panelLabels: ["AI Chat", "Code Editor", "Notes"], stat: "Best for: Coding" },
  { id: "research", panels: 5, Icon: FileSearch, accent: "#a78bfa", accentBg: "rgba(167,139,250,0.12)", tag: "Insight & Research", tagMono: "5-PANEL", title: "Analyze & Discover", desc: "Analyze complex PDFs in a powerful 5-panel layout.", panelLabels: ["AI Chat", "PDF Viewer", "Notes", "Whiteboard", "Sources"], stat: "Best for: Research" },
  { id: "learn", panels: 4, Icon: GraduationCap, accent: "#67e8f9", accentBg: "rgba(103,232,249,0.12)", tag: "Learning Hub", tagMono: "4-PANEL", title: "Learn & Retain", desc: "Balanced layout for watching tutorials and taking notes.", panelLabels: ["AI Chat", "Video / Resources", "Notes", "Whiteboard"], stat: "Best for: Tutorials" },
];

const RECENT_PROJECTS = [
  { id: "p1", emoji: "💻", title: "System Design Notes", tag: "Development", lastActive: "2 hours ago", progress: 68, color: "#6366f1" },
  { id: "p2", emoji: "🔬", title: "Cybersecurity Research", tag: "Research", lastActive: "Yesterday", progress: 42, color: "#a78bfa" },
];

const QUICK_ACTIONS = [
  { Icon: MessageSquare, label: "Ask AI", sub: "Start a conversation", color: "#6366f1", bg: "rgba(99,102,241,0.12)", mode: "dev" },
  { Icon: Clock, label: "Continue", sub: "Resume last session", color: "#67e8f9", bg: "rgba(103,232,249,0.12)", mode: null },
];

const STATS = [
  { Icon: Flame, label: "Day Streak", value: "5", sub: "Keep it up", color: C.orange },
  { Icon: BookOpen, label: "Sessions", value: "23", sub: "This month", color: C.blue },
  { Icon: TrendingUp, label: "Avg Focus", value: "78%", sub: "Productivity", color: C.green },
  { Icon: Calendar, label: "Weekly Goal", value: "5/7", sub: "Days active", color: C.amber },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS (RESTORING ALL MISSING PARTS)
   ═══════════════════════════════════════════════════════════════════════════ */

function WorkspaceTransition({ mode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: C.bg0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
       <svg className="spinner" width="32" height="32" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke={C.bg2} strokeWidth="3" />
          <path d="M14 3 A11 11 0 0 1 25 14" stroke={mode?.accent ?? C.blue} strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>Launching {mode?.tag}...</div>
    </div>
  );
}

function Sidebar({ locale, activeSection, onNav, collapsed, onToggle }) {
  const router = useRouter();
  const navItems = [
    { id: "home", Icon: Home, label: "Home" },
    { id: "projects", Icon: FolderOpen, label: "My Projects" },
    { id: "profile", Icon: User, label: "Profile" },
  ];
  return (
    <aside style={{ width: collapsed ? 64 : 220, background: C.bg1, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, transition: "0.2s" }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${C.border}`, gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><Code2 size={16} color="white" /></div>
        {!collapsed && <div style={{ fontSize: 15, fontWeight: 800, color: "white" }}>DevSathi</div>}
      </div>
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(({ id, Icon, label }) => (
          <button key={id} className={`dash-nav${activeSection === id ? " active" : ""}`} onClick={() => onNav(id)}>
            <Icon size={17} /> {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
      <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.border}` }}>
        <button className="dash-nav" onClick={() => router.push(`/${locale}`)}><LogOut size={16} /> {!collapsed && <span>Sign Out</span>}</button>
      </div>
    </aside>
  );
}

function TopBar({ locale, onWorkspace }) {
  const router = useRouter();
  return (
    <header style={{ height: 64, background: "rgba(2,6,23,0.80)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
      <div><div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh }}>Dashboard</div></div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => router.push(`/${locale}/profile`)}><User size={16} color="white" /></div>
        <button onClick={() => onWorkspace(WORKSPACE_MODES[0])} className="ds-btn" style={{ padding: "8px 18px", fontSize: 13 }}>Open Workspace <ArrowRight size={14} /></button>
      </div>
    </header>
  );
}

function StatsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
      {STATS.map(({ Icon, label, value, sub, color }) => (
        <div key={label} style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={color} /></div>
          <div><div style={{ fontSize: 20, fontWeight: 800, color: C.textHigh }}>{value}</div><div style={{ fontSize: 11, color: C.textMid }}>{label}</div></div>
        </div>
      ))}
    </div>
  );
}

function WorkflowCard({ mode, onLaunch }) {
  return (
    <div className="wf-card" onClick={() => onLaunch(mode)} style={{ padding: "24px" }}>
      <div style={{ width: 44, height: 44, borderRadius: 11, background: mode.accentBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><mode.Icon size={22} color={mode.accent} /></div>
      <div style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 8 }}>{mode.title}</div>
      <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{mode.desc}</p>
    </div>
  );
}

function RecentProjects({ onLaunch }) {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh, marginBottom: 16 }}>My Projects</div>
      {RECENT_PROJECTS.map(p => (
        <div key={p.id} className="proj-row" onClick={() => onLaunch(WORKSPACE_MODES[0])} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 10px", cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: C.bg2, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.emoji}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: C.textHigh }}>{p.title}</div><div style={{ fontSize: 11, color: C.textLow }}>{p.tag}</div></div>
          <ChevronRight size={14} color={C.textLow} />
        </div>
      ))}
    </div>
  );
}

function QuickActions({ onLaunch }) {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh, marginBottom: 14 }}>Knowledge Vault</div>
      <div style={{ marginBottom: '16px' }}><FileUpload /></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {QUICK_ACTIONS.map(({ Icon, label, sub, color, bg, mode: modeId }) => {
          const mode = WORKSPACE_MODES.find(m => m.id === modeId);
          return (
            <button key={label} onClick={() => mode && onLaunch(mode)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, cursor: "pointer", color: "white" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={16} color={color} /></div>
              <div style={{ textAlign: "left" }}><div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale ?? "en";

  const [activeNav, setActiveNav] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [transition, setTransition] = useState(null);
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const launchWorkspace = useCallback((mode) => {
    setTransition(mode);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ds_workspace_mode", JSON.stringify({ id: mode.id, panels: mode.panels }));
    }
    setTimeout(() => { router.push(`/${locale}/workspace`); }, 900);
  }, [locale, router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DASH_CSS }} />
      {transition && <WorkspaceTransition mode={transition} />}

      <div style={{ display: "flex", minHeight: "100vh", background: C.bg0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Sidebar locale={locale} activeSection={activeNav} onNav={setActiveNav} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopBar locale={locale} onWorkspace={launchWorkspace} />
          <main style={{ flex: 1, padding: "32px 28px 48px", overflowY: "auto" }}>
            <div className="fade-in">
                <div style={{ fontSize: 11, fontWeight: 600, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{greeting}</div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: C.textHigh }}>Welcome back, <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>User</span> 👋</h1>
            </div>
            <div style={{ marginTop: 24 }}><StatsRow /></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 24 }}>
                {WORKSPACE_MODES.map(mode => <WorkflowCard key={mode.id} mode={mode} onLaunch={launchWorkspace} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, marginTop: 24 }}>
              <RecentProjects onLaunch={launchWorkspace} />
              <QuickActions onLaunch={launchWorkspace} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}