"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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
   DESIGN TOKENS — Deep navy/slate, mirrors Home Page v3
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg0:          "#020617",   /* slate-950 — page base              */
  bg1:          "#0f172a",   /* slate-900 — sidebar / cards        */
  bg2:          "#1e293b",   /* slate-800 — raised / input         */
  bg3:          "#334155",   /* slate-700 — hover / subtle         */

  blue:         "#6366f1",   /* indigo-500                         */
  purple:       "#7c3aed",   /* violet-600                         */
  grad:         "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
  gradSoft:     "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(124,58,237,0.15) 100%)",

  textHigh:     "#f1f5f9",
  textMid:      "#94a3b8",
  textLow:      "#475569",

  border:       "#1e293b",
  borderBright: "#334155",
  borderAccent: "rgba(99,102,241,0.30)",

  green:        "#22c55e",
  orange:       "#f97316",
  cyan:         "#06b6d4",
  amber:        "#f59e0b",
};

/* ═══════════════════════════════════════════════════════════════════════════
   INJECTED GLOBAL CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const DASH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
  html, body { margin:0; padding:0; background:#020617; }
  *, *::before, *::after { box-sizing:border-box; }

  /* Sidebar nav items */
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

  /* Workflow card */
  .wf-card {
    background:#0f172a; border:1px solid #1e293b; border-radius:16px;
    cursor:pointer; transition:border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    position:relative; overflow:hidden;
  }
  .wf-card:hover {
    border-color:rgba(99,102,241,0.40);
    box-shadow:0 0 0 1px rgba(99,102,241,0.15), 0 12px 40px rgba(0,0,0,0.5);
    transform:translateY(-4px);
  }
  .wf-card:active { transform:translateY(-2px); }

  /* Project item hover */
  .proj-row { transition:background 0.15s; border-radius:10px; }
  .proj-row:hover { background:#1e293b; }

  /* Skeleton shimmer */
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .skeleton {
    background: linear-gradient(90deg, #0f172a 25%, #1e293b 50%, #0f172a 75%);
    background-size: 600px 100%; animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }

  /* Spinner */
  @keyframes spin { to { transform:rotate(360deg); } }
  .spinner { animation:spin 0.75s linear infinite; }

  /* Fade in */
  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  .fade-in { animation:fadeIn 0.4s ease both; }

  /* Glow pulse on active card accent */
  @keyframes glow-pulse {
    0%,100% { opacity:0.6; } 50% { opacity:1; }
  }
  .glow-pulse { animation:glow-pulse 2.5s ease-in-out infinite; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const WORKSPACE_MODES = [
  {
    id:       "dev",
    panels:   3,
    Icon:     Code,
    accent:   "#6366f1",
    accentBg: "rgba(99,102,241,0.12)",
    tag:      "Development Mode",
    tagMono:  "3-PANEL",
    title:    "Code & Build",
    desc:     "Optimized for coding and technical problem-solving. AI chat, live editor, and inline notes in a streamlined 3-panel view.",
    panelLabels: ["AI Chat", "Code Editor", "Notes"],
    stat:     "Best for: Coding, debugging, algorithms",
  },
  {
    id:       "research",
    panels:   5,
    Icon:     FileSearch,
    accent:   "#a78bfa",
    accentBg: "rgba(167,139,250,0.12)",
    tag:      "Insight & Research",
    tagMono:  "5-PANEL",
    title:    "Analyze & Discover",
    desc:     "Analyze complex documents, PDFs, and cross-reference data in a powerful 5-panel layout built for deep thinking.",
    panelLabels: ["AI Chat", "PDF Viewer", "Notes", "Whiteboard", "Sources"],
    stat:     "Best for: Research, analysis, reports",
  },
  {
    id:       "learn",
    panels:   4,
    Icon:     GraduationCap,
    accent:   "#67e8f9",
    accentBg: "rgba(103,232,249,0.12)",
    tag:      "Learning Hub",
    tagMono:  "4-PANEL",
    title:    "Learn & Retain",
    desc:     "Balanced layout for watching tutorials, taking structured notes, and interactive AI assistance — all in sync.",
    panelLabels: ["AI Chat", "Video / Resources", "Notes", "Whiteboard"],
    stat:     "Best for: Tutorials, revision, concepts",
  },
];

const RECENT_PROJECTS = [
  { id: "p1", emoji: "💻", title: "System Design Notes",  tag: "Development", lastActive: "2 hours ago",  progress: 68, color: "#6366f1" },
  { id: "p2", emoji: "🔬", title: "Cybersecurity Research", tag: "Research",   lastActive: "Yesterday",    progress: 42, color: "#a78bfa" },
  { id: "p3", emoji: "📱", title: "Mobile App Project",   tag: "Development", lastActive: "3 days ago",   progress: 25, color: "#67e8f9" },
];

const QUICK_ACTIONS = [
  { Icon: MessageSquare, label: "Ask AI",       sub: "Start a conversation",  color: "#6366f1", bg: "rgba(99,102,241,0.12)",  mode: "dev"      },
  { Icon: Upload,        label: "Upload PDF",   sub: "Analyze a document",    color: "#a78bfa", bg: "rgba(167,139,250,0.12)", mode: "research" },
  { Icon: Clock,         label: "Continue",     sub: "Resume last session",   color: "#67e8f9", bg: "rgba(103,232,249,0.12)", mode: null       },
];

const STATS = [
  { Icon: Flame,       label: "Day Streak",     value: "5",    sub: "Keep it up",       color: C.orange },
  { Icon: BookOpen,    label: "Sessions",        value: "23",   sub: "This month",       color: C.blue   },
  { Icon: TrendingUp,  label: "Avg Focus",       value: "78%",  sub: "Productivity",     color: C.green  },
  { Icon: Calendar,    label: "Weekly Goal",     value: "5/7",  sub: "Days active",      color: C.amber  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LOADING OVERLAY — shown during workspace transition
   ═══════════════════════════════════════════════════════════════════════════ */
function WorkspaceTransition({ mode }) {
  const panels = mode?.panelLabels ?? [];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: C.bg0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 32,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Animated panel preview */}
      <div style={{ display: "flex", gap: 8, height: 120, width: Math.min(560, panels.length * 120) }}>
        {panels.map((p, i) => (
          <div
            key={p}
            style={{
              flex: 1, borderRadius: 10, border: `1px solid ${mode.accent}30`,
              background: i === 0 ? `${mode.accent}18` : C.bg1,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "flex-end", paddingBottom: 10,
              animation: `fadeIn 0.4s ${i * 0.1}s ease both`,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? mode.accent : C.textLow, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>{p.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Spinner + label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <svg className="spinner" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke={C.bg2} strokeWidth="3" />
          <path d="M14 3 A11 11 0 0 1 25 14" stroke={mode?.accent ?? C.blue} strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textMid }}>
          Loading <span style={{ color: mode?.accent ?? C.blue }}>{mode?.tag}</span>…
        </div>
        <div style={{ fontSize: 11, color: C.textLow, fontFamily: "'JetBrains Mono', monospace" }}>
          {mode?.tagMono} · {mode?.panels} panels
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════════════════════ */
function Sidebar({ locale, activeSection, onNav, collapsed, onToggle }) {
  const router  = useRouter();
  const navItems = [
    { id: "home",     Icon: Home,       label: "Home"        },
    { id: "projects", Icon: FolderOpen, label: "My Projects" },
    { id: "profile",  Icon: User,       label: "Profile"     },
  ];

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      flexShrink: 0,
      background: C.bg1,
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
      transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
      overflow: "hidden",
      zIndex: 10,
    }}>
      {/* Logo + collapse toggle */}
      <div style={{
        height: 64, display: "flex", alignItems: "center",
        padding: collapsed ? "0 16px" : "0 16px",
        borderBottom: `1px solid ${C.border}`,
        gap: 10, flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: C.grad,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
        }}>
          <Code2 size={16} color="white" />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 15, fontWeight: 800, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>DevSathi</div>
            <div style={{ fontSize: 9, color: C.textLow, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>Your AI Companion</div>
          </div>
        )}
        <button
          onClick={onToggle}
          style={{
            marginLeft: "auto", background: "none", border: "none",
            cursor: "pointer", color: C.textLow, padding: 4, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, transition: "color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.textMid}
          onMouseLeave={e => e.currentTarget.style.color = C.textLow}
        >
          {collapsed ? <ChevronRight size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(({ id, Icon, label }) => (
          <button
            key={id}
            className={`dash-nav${activeSection === id ? " active" : ""}`}
            onClick={() => onNav(id)}
            title={collapsed ? label : undefined}
            style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "10px" : "10px 14px" }}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom: logout */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.border}` }}>
        <button
          className="dash-nav"
          onClick={() => router.push(`/${locale}`)}
          title={collapsed ? "Sign Out" : undefined}
          style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "10px" : "10px 14px", color: C.textLow }}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: 13 }}>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOP BAR
   ═══════════════════════════════════════════════════════════════════════════ */
function TopBar({ locale, onWorkspace }) {
  const router = useRouter();
  return (
    <header style={{
      height: 64, flexShrink: 0,
      background: "rgba(2,6,23,0.80)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 20,
    }}>
      {/* Page title */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh }}>Dashboard</div>
        <div style={{ fontSize: 11, color: C.textLow, fontFamily: "'JetBrains Mono', monospace" }}>Command Center</div>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* User avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: C.grad, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }} onClick={() => router.push(`/${locale}/profile`)}>
          <User size={16} color="white" />
        </div>

        {/* Open Workspace CTA */}
        <button
          onClick={() => onWorkspace(WORKSPACE_MODES[0])}
          style={{
            background: C.grad, color: "white", fontFamily: "inherit",
            fontSize: 13, fontWeight: 700, padding: "8px 18px",
            borderRadius: 8, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.50)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.35)"; }}
        >
          Open Workspace <ArrowRight size={14} />
        </button>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS ROW
   ═══════════════════════════════════════════════════════════════════════════ */
function StatsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
      {STATS.map(({ Icon, label, value, sub, color }) => (
        <div key={label} style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={18} color={color} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.textHigh, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 11, color: C.textMid, marginTop: 1 }}>{label}</div>
            <div style={{ fontSize: 10, color: C.textLow, marginTop: 1 }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WORKSPACE MODE CARD
   ═══════════════════════════════════════════════════════════════════════════ */
function WorkflowCard({ mode, onLaunch }) {
  const { Icon, accent, accentBg, tag, tagMono, title, desc, panelLabels, stat } = mode;
  return (
    <div className="wf-card" onClick={() => onLaunch(mode)} style={{ padding: "26px 24px" }}>
      {/* Subtle gradient top-edge glow */}
      <div className="glow-pulse" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, borderRadius: "16px 16px 0 0" }} />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 11, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={accent} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: `${accent}14`, color: accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
          {tagMono}
        </span>
      </div>

      {/* Tag + title */}
      <div style={{ fontSize: 11, fontWeight: 600, color: accent, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tag}</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: C.textHigh, marginBottom: 10 }}>{title}</div>
      <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.65, margin: "0 0 18px" }}>{desc}</p>

      {/* Mini panel mockup */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {panelLabels.map((p, i) => (
          <div key={p} style={{
            flex: 1, height: 28, borderRadius: 6,
            background: i === 0 ? `${accent}18` : C.bg2,
            border: `1px solid ${i === 0 ? accent + "35" : C.border}`,
            display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
          }}>
            <div style={{ fontSize: 7, color: i === 0 ? accent : C.textLow, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em" }}>{p.replace(/ .*/,"").toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, color: C.textLow }}>{stat}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: accent, fontSize: 12, fontWeight: 700 }}>
          Launch <ChevronRight size={13} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RECENT PROJECTS
   ═══════════════════════════════════════════════════════════════════════════ */
function RecentProjects({ onLaunch }) {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      {/* Section header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 4 }}>Recent</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh }}>My Projects</div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: C.textLow, padding: 4 }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {RECENT_PROJECTS.map((p) => (
          <div
            key={p.id}
            className="proj-row"
            onClick={() => onLaunch(WORKSPACE_MODES[0])}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 10px", cursor: "pointer" }}
          >
            {/* Emoji icon */}
            <div style={{ width: 36, height: 36, borderRadius: 9, background: C.bg2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
              {p.emoji}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textHigh, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
              <div style={{ fontSize: 11, color: C.textLow, marginTop: 2 }}>{p.tag} · {p.lastActive}</div>
            </div>

            {/* Progress bar */}
            <div style={{ width: 64, flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: C.textLow, textAlign: "right", marginBottom: 4 }}>{p.progress}%</div>
              <div style={{ height: 4, background: C.bg3, borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}cc)`, borderRadius: 99 }} />
              </div>
            </div>

            <ChevronRight size={14} color={C.textLow} style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUICK ACTIONS
   ═══════════════════════════════════════════════════════════════════════════ */
function QuickActions({ onLaunch }) {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 4 }}>Actions</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh, marginBottom: 14 }}>Jump right in</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {QUICK_ACTIONS.map(({ Icon, label, sub, color, bg, mode: modeId }) => {
          const mode = WORKSPACE_MODES.find(m => m.id === modeId);
          return (
            <button
              key={label}
              onClick={() => mode && onLaunch(mode)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 13px", borderRadius: 10, cursor: "pointer",
                background: C.bg2, border: `1px solid ${C.border}`,
                fontFamily: "inherit", transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.bg3; e.currentTarget.style.borderColor = C.borderBright; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.bg2; e.currentTarget.style.borderColor = C.border; }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={color} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.textHigh }}>{label}</div>
                <div style={{ fontSize: 11, color: C.textLow, marginTop: 1 }}>{sub}</div>
              </div>
              <ChevronRight size={13} color={C.textLow} style={{ marginLeft: "auto" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACTIVITY FEED
   ═══════════════════════════════════════════════════════════════════════════ */
const ACTIVITY = [
  { icon: "💬", text: "AI session: Architecture patterns",  time: "2h ago",  tag: "Development" },
  { icon: "📄", text: "Uploaded: Research brief PDF",       time: "1d ago",  tag: "Research"    },
  { icon: "✅", text: "Completed: Async/Await deep dive",   time: "3d ago",  tag: "Learning"    },
];

function ActivityFeed() {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 4 }}>Activity</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh, marginBottom: 14 }}>Recent Sessions</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {ACTIVITY.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: C.bg2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textHigh }}>{item.text}</div>
              <div style={{ fontSize: 11, color: C.textLow, marginTop: 2 }}>{item.time}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 99, background: C.gradSoft, color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)", whiteSpace: "nowrap" }}>
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const params             = useParams();
  const router             = useRouter();
  const locale             = params?.locale ?? "en";

  const [activeNav,   setActiveNav]   = useState("home");
  const [collapsed,   setCollapsed]   = useState(false);
  const [transition,  setTransition]  = useState(null);   /* null | mode object */
  const [greeting,    setGreeting]    = useState("Good morning");

  /* Dynamic greeting based on time */
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12)      setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else             setGreeting("Good evening");
  }, []);

  /* Launch workspace with transition */
  const launchWorkspace = useCallback((mode) => {
    setTransition(mode);
    /* Store selected mode in sessionStorage so Workspace reads it */
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ds_workspace_mode", JSON.stringify({ id: mode.id, panels: mode.panels }));
    }
    /* 800ms animated reveal then navigate */
    setTimeout(() => {
      router.push(`/${locale}/workspace`);
    }, 900);
  }, [locale, router]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DASH_CSS }} />

      {/* Workspace transition overlay */}
      {transition && <WorkspaceTransition mode={transition} />}

      <div style={{ display: "flex", minHeight: "100vh", background: C.bg0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── SIDEBAR ── */}
        <Sidebar
          locale={locale}
          activeSection={activeNav}
          onNav={setActiveNav}
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        />

        {/* ── MAIN ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopBar locale={locale} onWorkspace={launchWorkspace} />

          <main style={{ flex: 1, padding: "32px 28px 48px", overflowY: "auto" }}>

            {/* ── WELCOME ── */}
            <div className="fade-in" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                  {greeting}
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: C.textHigh, margin: 0, letterSpacing: -0.5 }}>
                  Welcome back, <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>User</span> 👋
                </h1>
                <p style={{ color: C.textMid, marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>
                  Pick a mode and continue where you left off.
                </p>
              </div>
            </div>

            {/* ── STATS ── */}
            <div className="fade-in" style={{ animationDelay: "0.05s" }}>
              <StatsRow />
            </div>

            {/* ── WORKSPACE MODE CARDS ── */}
            <div className="fade-in" style={{ animationDelay: "0.10s", marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.blue, marginBottom: 4 }}>Workspace</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.textHigh }}>Choose Your Mode</div>
                </div>
                <span style={{ fontSize: 11, color: C.textLow }}>Click a card to launch ↗</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {WORKSPACE_MODES.map(mode => (
                  <WorkflowCard key={mode.id} mode={mode} onLaunch={launchWorkspace} />
                ))}
              </div>
            </div>

            {/* ── LOWER GRID: Projects + Quick Actions + Activity ── */}
            <div className="fade-in" style={{ animationDelay: "0.15s", display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, marginBottom: 16 }}>
              <RecentProjects onLaunch={launchWorkspace} />
              <QuickActions   onLaunch={launchWorkspace} />
            </div>

            <div className="fade-in" style={{ animationDelay: "0.20s" }}>
              <ActivityFeed />
            </div>

          </main>
        </div>
      </div>
    </>
  );
}