"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Code2, Globe, ChevronRight, ArrowRight,
  Check, Menu, X, Sparkles,
  LayoutDashboard, Languages, Wrench,
  Columns3, FileSearch, Cpu,
  Shield, Zap, School, BookOpen,
  Github, Instagram, Youtube
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg0: "#020617",
  bg1: "#0f172a",
  bg2: "#1e293b",
  blue: "#6366f1",
  purple: "#7c3aed",
  grad: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
  gradSoft: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(124,58,237,0.15) 100%)",
  gradHero: "linear-gradient(160deg, #020617 0%, #0d1232 50%, #0f0a25 100%)",
  textHigh: "#f1f5f9",
  textMid: "#94a3b8",
  textLow: "#475569",
  border: "#1e293b",
  borderAccent: "rgba(99,102,241,0.35)",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
  html { scroll-behavior: smooth; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; transition: background 0.4s ease, color 0.4s ease; }

  .ds-nav { font-size: 14px; font-weight: 500; text-decoration: none; padding: 6px 2px; transition: color 0.15s; }
  .ds-btn {
    background: ${C.grad};
    color: #fff !important; font-weight: 700; font-size: 15px; padding: 13px 32px; border-radius: 10px; border: none; cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s;
  }
  .ds-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.5); }
  .ds-card { border-radius: 20px; transition: all 0.3s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.55s ease both; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   UI HELPERS (DEFINED FIRST TO PREVENT REFERENCE ERRORS)
   ═══════════════════════════════════════════════════════════════════════════ */
const Section = ({ id, children, bg, style = {} }) => (
  <section id={id} style={{ background: bg, transition: "background 0.4s ease", ...style }}>
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 24px", ...style }}>{children}</div>
  </section>
);

const Eyebrow = ({ children }) => (
  <div style={{ background: C.gradSoft, border: `1px solid ${C.borderAccent}`, color: "#a5b4fc", borderRadius: 99, padding: "5px 14px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 16, fontFamily: "'JetBrains Mono', monospace", display: "inline-flex", alignItems: "center", gap: 6 }}>
    <Sparkles size={10} /> {children}
  </div>
);

const Headline = ({ children, size = 40, center = false, color }) => (
  <h2 style={{ fontSize: `clamp(32px, 5vw, ${size}px)`, fontWeight: 900, color: color, textAlign: center ? "center" : "left", marginBottom: 16, letterSpacing: "-0.02em", transition: "color 0.4s" }}>{children}</h2>
);

const Sub = ({ children, center = false, color }) => (
  <p style={{ fontSize: 18, color: color, lineHeight: 1.75, maxWidth: 700, margin: center ? "0 auto 48px" : "0 0 48px", textAlign: center ? "center" : "left", transition: "color 0.4s" }}>{children}</p>
);

const GradText = ({ children }) => <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{children}</span>;

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Header({ locale, isDarkMode, setIsDarkMode }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const theme = {
    headerBg: isDarkMode 
      ? (scrolled ? "rgba(2,6,23,0.85)" : "transparent") 
      : (scrolled ? "rgba(255,255,255,0.9)" : "transparent"),
    logoText: isDarkMode ? "#ffffff" : "#020617",
    selectBg: isDarkMode ? "#1e293b" : "#f1f5f9",
    selectText: isDarkMode ? "#ffffff" : "#020617",
    border: isDarkMode ? "#1e293b" : "#e2e8f0"
  };

  return (
    <header style={{ 
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 75, 
      background: theme.headerBg, 
      backdropFilter: scrolled ? "blur(16px)" : "none", 
      borderBottom: `1px solid ${scrolled ? theme.border : "transparent"}`, 
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", transition: "0.3s" 
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}><Code2 size={20} color="white" /></div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, color: theme.logoText, lineHeight: 1 }}>DevSathi</div>
          <div style={{ fontSize: 9, color: C.blue, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 2 }}>Empowering Bharat</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
          {isDarkMode ? (
            <Zap size={20} fill="#fbbf24" color="#fbbf24" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.3))" }} />
          ) : (
            <Zap size={20} color="#64748b" />
          )}
        </button>

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Globe size={16} style={{ position: "absolute", left: 10, color: C.blue, pointerEvents: "none" }} />
          <select style={{ 
            background: theme.selectBg, color: theme.selectText, border: `1px solid ${theme.border}`, 
            padding: "6px 12px 6px 34px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", appearance: "none", cursor: "pointer"
          }}>
            <option>English</option>
            <option>मराठी</option>
            <option>हिंदी</option>
          </select>
        </div>

        <button onClick={() => router.push(`/${locale}/signup`)} className="ds-btn" style={{ padding: "10px 24px", fontSize: '14px' }}>Sign In <ArrowRight size={16} /></button>
      </div>
    </header>
  );
}

function Hero({ onGetStarted, isDarkMode }) {
  return (
    <div style={{ background: isDarkMode ? C.gradHero : "#f8fafc", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", transition: "0.4s" }}>
      {!isDarkMode && <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }} />}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "140px 24px", textAlign: "center", width: "100%", position: "relative" }}>
        <Eyebrow>The AI Student Revolution</Eyebrow>
        <h1 className="fade-up" style={{ fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 900, color: isDarkMode ? "white" : "#020617", marginBottom: 24, lineHeight: 1.1, letterSpacing: "-0.04em" }}>
          Your AI Coding Companion,<br/><GradText>in Your Language.</GradText>
        </h1>
        <Sub center color={isDarkMode ? C.textMid : "#475569"}>The all-in-one workspace designed for Bharat. Experience a multi-panel environment that adapts to your workflow in your local language.</Sub>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={onGetStarted} className="ds-btn" style={{ fontSize: 17, padding: "16px 42px" }}>Get Started <ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}

function AIValueSection({ isDarkMode }) {
  return (
    <Section id="why-ai" bg={isDarkMode ? C.bg1 : "#ffffff"} style={{ borderTop: `1px solid ${isDarkMode ? C.border : "#f1f5f9"}` }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}><Eyebrow>The Solution</Eyebrow><Headline center color={isDarkMode ? "white" : "#020617"}>Show, Don't Just Tell</Headline></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="ds-card" style={{ padding: '40px', background: isDarkMode ? C.bg2 : "#f8fafc", border: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}`, boxShadow: isDarkMode ? "none" : "0 10px 30px rgba(0,0,0,0.05)" }}>
          <h3 style={{ color: isDarkMode ? "white" : "#020617", marginBottom: '20px', fontSize: 20 }}>Why AI?</h3>
          <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.08)', padding: '15px', borderRadius: '12px', borderLeft: `4px solid ${C.blue}`, marginBottom: 15 }}>
            <div style={{ fontSize: 13, color: isDarkMode ? "white" : "#020617", fontWeight: 600 }}>Zero Context Learning</div>
            <div style={{ fontSize: 12, color: isDarkMode ? C.textMid : "#64748b" }}>Searching YouTube for hours is over. AI knows your specific university notes.</div>
          </div>
          <p style={{ color: isDarkMode ? C.textMid : "#475569", fontSize: 14 }}>AWS Bedrock acts as your personal tutor that has already read your books.</p>
        </div>
        <div className="ds-card" style={{ padding: '40px', background: isDarkMode ? C.bg2 : "#f8fafc", border: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}`, boxShadow: isDarkMode ? "none" : "0 10px 30px rgba(0,0,0,0.05)" }}>
          <h3 style={{ color: isDarkMode ? "white" : "#020617", marginBottom: '20px', fontSize: 20 }}>Bharat-First</h3>
          <p style={{ color: isDarkMode ? C.textMid : "#475569", fontSize: 15, lineHeight: 1.6 }}>English-only code is hard. Our AI translates <b>technical logic</b> into <b>regional context</b>. Learn in Marathi, Hindi, or Tamil without losing quality.</p>
        </div>
      </div>
    </Section>
  );
}

function FeaturesSection({ isDarkMode }) {
  return (
    <Section id="features" bg={isDarkMode ? C.bg0 : "#f8fafc"} style={{ borderTop: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}` }}>
      <Eyebrow>Productivity</Eyebrow><Headline color={isDarkMode ? "white" : "#020617"}>3 to 5 Adaptive Panels</Headline>
      <Sub color={isDarkMode ? C.textMid : "#475569"}>Automatically reconfigures based on whether you are coding, researching, or revising.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {[
          { t: "Research Mode", d: "AI Chat + PDF Viewer + Whiteboard", i: <FileSearch size={24} color={C.blue}/> },
          { t: "Code Mode", d: "AI Chat + Editor + Debugger", i: <Cpu size={24} color={C.purple}/> },
          { t: "Deep Dive", d: "Full 5-Panel Mastery", i: <Columns3 size={24} color="#67e8f9"/> }
        ].map(f => (
          <div key={f.t} className="ds-card" style={{ padding: 32, background: isDarkMode ? C.bg1 : "#ffffff", border: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}`, boxShadow: isDarkMode ? "none" : "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div style={{ marginBottom: 20 }}>{f.i}</div>
            <h4 style={{ color: isDarkMode ? "white" : "#020617", marginBottom: 8 }}>{f.t}</h4>
            <p style={{ color: isDarkMode ? C.textMid : "#64748b", fontSize: 14 }}>{f.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Footer({ isDarkMode }) {
  return (
    <footer style={{ background: isDarkMode ? C.bg1 : "#f1f5f9", padding: "60px 40px", borderTop: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><Code2 size={18} color="white" /></div>
            <span style={{ fontSize: 20, fontWeight: 800, color: isDarkMode ? "white" : "#020617" }}>DevSathi</span>
          </div>
          <p style={{ color: isDarkMode ? C.textLow : "#64748b", fontSize: 14, maxWidth: 300 }}>The AI-powered workspace for Bharat.</p>
        </div>
        <div style={{ display: "flex", gap: 80 }}>
          <div>
            <div style={{ color: isDarkMode ? "white" : "#020617", fontWeight: 700, marginBottom: 20, fontSize: 14 }}>Connect</div>
            <a href="https://github.com/palakgoda" target="_blank" style={{ display: "flex", alignItems: "center", gap: 8, color: isDarkMode ? C.textLow : "#64748b", fontSize: 13, marginBottom: 12, textDecoration: "none" }}><Github size={14}/> GitHub</a>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, color: isDarkMode ? C.textLow : "#64748b", fontSize: 13, marginBottom: 12, textDecoration: "none" }}><Instagram size={14}/> Instagram</a>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, color: isDarkMode ? C.textLow : "#64748b", fontSize: 13, textDecoration: "none" }}><Youtube size={14}/> YouTube</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: "40px auto 0", paddingTop: 40, borderTop: `1px solid ${isDarkMode ? C.border : "#e2e8f0"}`, display: "flex", justifyContent: "center", color: isDarkMode ? C.textLow : "#64748b", fontSize: 12 }}>
        <span>Handcrafted for <b style={{color: C.blue}}>Bharat’s Digital Future</b> ✦ 2026</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const params = useParams();
  const locale = params?.locale ?? "en";
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // This handles the real-time background color switch of the body
    document.body.style.backgroundColor = isDarkMode ? "#020617" : "#ffffff";
    document.body.style.color = isDarkMode ? "#f1f5f9" : "#020617";
  }, [isDarkMode]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div style={{ background: isDarkMode ? C.bg0 : "#ffffff", transition: "0.4s" }}>
        <Header locale={locale} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Hero onGetStarted={() => router.push(`/${locale}/signup`)} isDarkMode={isDarkMode} />
        <AIValueSection isDarkMode={isDarkMode} /> 
        <FeaturesSection isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}