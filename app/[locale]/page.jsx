"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Code2, Globe, ChevronRight, ArrowRight,
  Check, Menu, X, Sparkles,
  LayoutDashboard, Languages, Wrench,
  Columns3, FileSearch, Cpu,
  Shield, Zap, Users,
  Github, Linkedin,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — Deep navy/slate, workspace-matched (LOCKED v3)
   ═══════════════════════════════════════════════════════════════════════════ */
const C = {
  /* Backgrounds — slate-950 / slate-900 / slate-800 family */
  bg0:          "#020617",   /* slate-950  — page base             */
  bg1:          "#0f172a",   /* slate-900  — header / footer / cards */
  bg2:          "#1e293b",   /* slate-800  — raised surfaces        */
  bg3:          "#334155",   /* slate-700  — input / subtle         */

  /* Accent — indigo-600 → violet-600 */
  blue:         "#6366f1",   /* indigo-500                          */
  blueDark:     "#4f46e5",   /* indigo-600                          */
  purple:       "#7c3aed",   /* violet-600                          */
  grad:         "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
  gradSoft:     "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(124,58,237,0.15) 100%)",
  gradHero:     "linear-gradient(160deg, #020617 0%, #0d1232 50%, #0f0a25 100%)",

  /* Text */
  textHigh:     "#f1f5f9",   /* slate-100                           */
  textMid:      "#94a3b8",   /* slate-400                           */
  textLow:      "#475569",   /* slate-600                           */

  /* Borders */
  border:       "#1e293b",   /* slate-800                           */
  borderBright: "#334155",   /* slate-700 — hover                   */
  borderAccent: "rgba(99,102,241,0.35)",

  /* Glows */
  glowBlue:     "0 0 40px rgba(99,102,241,0.20)",
  glowCard:     "0 0 0 1px rgba(99,102,241,0.12), 0 8px 32px rgba(0,0,0,0.4)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
  html { scroll-behavior: smooth; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020617; color: #f1f5f9; font-family: 'Plus Jakarta Sans', sans-serif; }

  /* Nav links */
  .ds-nav { color: #94a3b8; font-size: 14px; font-weight: 500; text-decoration: none;
    padding: 6px 2px; position: relative; transition: color 0.15s; }
  .ds-nav::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1.5px; background: linear-gradient(90deg, #6366f1, #7c3aed);
    transform: scaleX(0); transition: transform 0.2s; transform-origin: left; }
  .ds-nav:hover { color: #c7d2fe; }
  .ds-nav:hover::after { transform: scaleX(1); }

  /* Primary gradient button */
  .ds-btn {
    background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
    color: #fff; font-weight: 700; font-size: 15px; font-family: inherit;
    padding: 13px 32px; border-radius: 10px; border: none; cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    box-shadow: 0 4px 20px rgba(99,102,241,0.35);
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s;
    position: relative; overflow: hidden;
  }
  .ds-btn::before { content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.2s; }
  .ds-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px rgba(99,102,241,0.5); }
  .ds-btn:hover::before { opacity: 1; }
  .ds-btn:active { transform: translateY(0) scale(0.99); }

  /* Ghost button */
  .ds-btn-ghost {
    color: #94a3b8; font-weight: 600; font-size: 14px; font-family: inherit;
    padding: 10px 20px; border-radius: 8px; cursor: pointer; text-decoration: none;
    border: 1px solid #1e293b; background: transparent; display: inline-flex;
    align-items: center; gap: 6px; transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .ds-btn-ghost:hover { color: #c7d2fe; border-color: #334155; background: rgba(99,102,241,0.06); }

  /* Cards */
  .ds-card {
    background: #0f172a; border: 1px solid #1e293b; border-radius: 16px;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  .ds-card:hover { border-color: rgba(99,102,241,0.35); box-shadow: 0 0 0 1px rgba(99,102,241,0.12), 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-3px); }

  /* Inputs */
  .ds-input {
    width: 100%; padding: 11px 14px; font-size: 14px; font-family: inherit;
    background: #1e293b; border: 1px solid #334155; border-radius: 9px;
    color: #f1f5f9; outline: none; transition: border-color 0.15s, box-shadow 0.15s;
  }
  .ds-input::placeholder { color: #475569; }
  .ds-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

  /* Select */
  .ds-select {
    appearance: none; -webkit-appearance: none;
    width: 100%; padding: 10px 32px 10px 12px; font-size: 13px; font-family: inherit;
    background: #1e293b; border: 1px solid #334155; border-radius: 8px;
    color: #94a3b8; outline: none; cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .ds-select:hover { border-color: #475569; color: #f1f5f9; }
  .ds-select option { background: #1e293b; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; }
  }
  .fade-up { animation: fadeUp 0.55s ease both; }
  .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.13s; }
  .d3 { animation-delay: 0.21s; } .d4 { animation-delay: 0.29s; }

  /* Mobile */
  @media (max-width: 768px) {
    .ds-desktop-nav { display: none !important; }
    .ds-mobile-btn  { display: flex !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   LANGUAGE LIST
   ═══════════════════════════════════════════════════════════════════════════ */
const LANGUAGES = [
  { code: "en", label: "English"  },
  { code: "hi", label: "हिंदी"    },
  { code: "ta", label: "தமிழ்"    },
  { code: "te", label: "తెలుగు"   },
  { code: "bn", label: "বাংলা"    },
  { code: "mr", label: "मराठी"    },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════════════════════ */
function Header({ locale, onLoginClick }) {
  const router                        = useRouter();
  const [scrolled,   setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [lang,       setLang]         = useState(locale ?? "en");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Persist locale change in URL */
  const handleLang = (code) => {
    setLang(code);
    const path = window.location.pathname.replace(/^\/[a-z]{2}/, "") || "/";
    router.push(`/${code}${path}`);
  };

  const navLinks = [
    { label: "Features",    href: "#features"   },
    { label: "How It Works",href: "#studymodes"  },
    { label: "About",       href: "#about"       },
    { label: "Pricing",     href: "#pricing"     },
  ];

  const headerBg = scrolled
    ? "rgba(2,6,23,0.88)"
    : "transparent";
  const headerBorder = scrolled ? C.border : "transparent";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        background: headerBg,
        backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
        borderBottom: `1px solid ${headerBorder}`,
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px",
      }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, background: C.grad,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
          }}>
            <Code2 size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DevSathi</div>
            <div style={{ fontSize: 9, fontWeight: 500, color: C.textLow, marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Your AI Companion</div>
          </div>
        </a>

        {/* Center nav */}
        <nav className="ds-desktop-nav" style={{ display: "flex", gap: 28 }}>
          {navLinks.map(n => <a key={n.label} href={n.href} className="ds-nav">{n.label}</a>)}
        </nav>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language select */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Globe size={13} style={{ position: "absolute", left: 9, color: C.textLow, pointerEvents: "none", zIndex: 1 }} />
            <select
              value={lang}
              onChange={e => handleLang(e.target.value)}
              className="ds-select"
              style={{ paddingLeft: 28, paddingRight: 28, paddingTop: 7, paddingBottom: 7, fontSize: 13, width: "auto", minWidth: 110 }}
            >
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <ChevronRight size={11} style={{ position: "absolute", right: 8, color: C.textLow, pointerEvents: "none", transform: "rotate(90deg)" }} />
          </div>

          {/* Login */}
          <button onClick={onLoginClick} className="ds-btn" style={{ fontSize: 13, padding: "9px 20px" }}>
            Sign In <ArrowRight size={14} />
          </button>

          {/* Hamburger */}
          <button
            className="ds-mobile-btn"
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.textMid, padding: 4 }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: C.bg1, borderBottom: `1px solid ${C.border}`,
          padding: "16px 24px 20px",
        }}>
          {navLinks.map(n => (
            <a key={n.label} href={n.href} className="ds-nav"
              style={{ display: "block", padding: "11px 0", borderBottom: `1px solid ${C.border}` }}
              onClick={() => setMobileOpen(false)}
            >{n.label}</a>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH MODAL — Sign In / Create Account (real validation)
   ═══════════════════════════════════════════════════════════════════════════ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthModal({ locale, onClose }) {
  const router                        = useRouter();
  const [mode,    setMode]            = useState("login");
  const [loading, setLoading]         = useState(false);
  const [form,    setForm]            = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors,  setErrors]          = useState({});

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim())
      e.name = "Name is required.";
    if (!EMAIL_RE.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (mode === "register" && form.password !== form.confirm)
      e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // swap → real auth
    router.push(`/${locale}/dashboard`);
  };

  const switchMode = m => { setMode(m); setErrors({}); setForm({ name: "", email: "", password: "", confirm: "" }); };

  const Field = ({ id, label, type = "text", placeholder, autoComplete }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: C.textMid, letterSpacing: "0.03em" }}>{label}</label>
      <input
        id={id} type={type} placeholder={placeholder} autoComplete={autoComplete}
        value={form[id]} onChange={set(id)}
        className="ds-input"
      />
      {errors[id] && <span style={{ fontSize: 11, color: "#f87171" }}>{errors[id]}</span>}
    </div>
  );

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(2,6,23,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div style={{
        width: "100%", maxWidth: 400, background: C.bg1,
        border: `1px solid ${C.border}`, borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)",
        overflow: "hidden",
      }}>
        {/* Accent bar */}
        <div style={{ height: 3, background: C.grad }} />

        {/* Header */}
        <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Code2 size={15} color="white" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DevSathi</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.textHigh }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>
              {mode === "login"
                ? "Sign in to access your AI workspace."
                : "Start building smarter — for free."}
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textLow, padding: 4, marginTop: -4 }}>
            <X size={18} />
          </button>
        </div>

        {/* Toggle tabs */}
        <div style={{ display: "flex", margin: "20px 28px 0", background: C.bg2, borderRadius: 9, padding: 3 }}>
          {["login", "register"].map(m => (
            <button key={m} onClick={() => switchMode(m)} style={{
              flex: 1, padding: "8px", borderRadius: 7, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: 600,
              background: mode === m ? C.bg1 : "transparent",
              color: mode === m ? C.textHigh : C.textMid,
              boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
              transition: "all 0.18s",
            }}>
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <Field id="name" label="Full Name" placeholder="Your name" autoComplete="name" />
          )}
          <Field id="email" label="Email Address" type="email" placeholder="you@example.com" autoComplete="email" />
          <Field id="password" label="Password" type="password" placeholder={mode === "login" ? "••••••••" : "Min. 8 characters"} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          {mode === "register" && (
            <Field id="confirm" label="Confirm Password" type="password" placeholder="Re-enter password" autoComplete="new-password" />
          )}

          {/* Global error */}
          {errors._global && (
            <div style={{ fontSize: 12, color: "#f87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 7, padding: "9px 12px" }}>
              {errors._global}
            </div>
          )}

          <button type="submit" className="ds-btn" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px", marginTop: 2, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={15} />}
          </button>

          <p style={{ fontSize: 12, color: C.textLow, textAlign: "center", marginTop: 4 }}>
            {mode === "login"
              ? <>New to DevSathi?{" "}<button type="button" onClick={() => switchMode("register")} style={{ background: "none", border: "none", color: "#818cf8", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Create an account</button></>
              : <>Already registered?{" "}<button type="button" onClick={() => switchMode("login")} style={{ background: "none", border: "none", color: "#818cf8", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Sign in</button></>
            }
          </p>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */
const Section = ({ id, children, bg, style = {} }) => (
  <section id={id} style={{ background: bg ?? C.bg0, ...style }}>
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 24px", ...style }}>
      {children}
    </div>
  </section>
);

const Eyebrow = ({ children }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: C.gradSoft, border: `1px solid ${C.borderAccent}`,
    color: "#a5b4fc", borderRadius: 99, padding: "5px 14px",
    fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
    marginBottom: 16, fontFamily: "'JetBrains Mono', monospace",
  }}>
    <Sparkles size={10} /> {children}
  </div>
);

const Headline = ({ children, size = 40, center = false, style = {} }) => (
  <h2 style={{
    fontSize: `clamp(26px, 4vw, ${size}px)`, fontWeight: 900, lineHeight: 1.12,
    letterSpacing: -0.8, color: C.textHigh, margin: "0 0 16px",
    textAlign: center ? "center" : "left", ...style,
  }}>{children}</h2>
);

const Sub = ({ children, center = false }) => (
  <p style={{
    fontSize: 17, color: C.textMid, lineHeight: 1.75,
    maxWidth: 600, margin: center ? "0 auto 48px" : "0 0 48px",
    textAlign: center ? "center" : "left",
  }}>{children}</p>
);

const GradText = ({ children }) => (
  <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    {children}
  </span>
);

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero({ onGetStarted }) {
  return (
    <div style={{
      background: C.gradHero, minHeight: "100vh",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: -160, right: -180, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -120, left: -140, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{
        maxWidth: 1080, margin: "0 auto", padding: "140px 24px 100px",
        width: "100%", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <h1 className="fade-up d1" style={{
          fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.08,
          letterSpacing: -2.5, color: C.textHigh, margin: "0 0 24px", maxWidth: 860,
        }}>
          Your AI Coding Companion,{" "}
          <GradText>in Your Language.</GradText>
        </h1>

        <p className="fade-up d2" style={{
          fontSize: "clamp(16px, 2vw, 18px)", color: C.textMid,
          lineHeight: 1.8, maxWidth: 620, margin: "0 0 44px",
        }}>
          The all-in-one AI workspace designed for Bharat. Experience a dynamic,
          multi-panel environment that adapts to your workflow — whether you are
          writing code, conducting research, or managing complex projects
          in your local language.
        </p>

        <div className="fade-up d3">
          <button onClick={onGetStarted} className="ds-btn" style={{ fontSize: 16, padding: "15px 40px", borderRadius: 12 }}>
            Get Started <ChevronRight size={18} />
          </button>
        </div>

        {/* Stats strip */}
        <div className="fade-up d4" style={{ marginTop: 64, display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { n: "100M+", l: "Students to empower" },
            { n: "6",     l: "Indian languages"     },
            { n: "3–5",   l: "Adaptive panels"      },
          ].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <div style={{ width: 1, height: 32, background: C.border, margin: "0 36px" }} />}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: C.textLow, marginTop: 2 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VALUE CARDS — 3-col, universal
   ═══════════════════════════════════════════════════════════════════════════ */
const VALUE_CARDS = [
  {
    Icon: LayoutDashboard, color: "#818cf8", bg: "rgba(129,140,248,0.10)",
    title: "Smart Workspace",
    body: "Adaptive layouts for any task. Switch between 3 to 5 panels as your project demands — coding, research, or creative work.",
  },
  {
    Icon: Languages, color: "#a78bfa", bg: "rgba(167,139,250,0.10)",
    title: "Multilingual AI",
    body: "Break language barriers in your own tongue. Communicate with your AI assistant in Hindi, Tamil, Telugu, and more.",
  },
  {
    Icon: Wrench, color: "#67e8f9", bg: "rgba(103,232,249,0.10)",
    title: "Universal Tools",
    body: "Integrated notes, research aids, and analysis tools — designed for productivity and clarity for both tech and non-tech users.",
  },
];

function ValueCards() {
  return (
    <div style={{ background: C.bg0, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
          {VALUE_CARDS.map(({ Icon, color, bg, title, body }) => (
            <div key={title} className="ds-card" style={{ padding: "32px 28px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Icon size={24} color={color} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: C.textHigh, margin: "0 0 10px" }}>{title}</h3>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   #FEATURES — Panel deep-dive
   ═══════════════════════════════════════════════════════════════════════════ */
const PANEL_CONFIGS = [
  { n: 3, Icon: Cpu,        label: "Focus Mode",    desc: "AI Chat · Code Editor · Notes",                    color: "#818cf8" },
  { n: 4, Icon: FileSearch, label: "Research Mode", desc: "AI Chat · PDF Viewer · Whiteboard · Notes",        color: "#a78bfa" },
  { n: 5, Icon: Columns3,   label: "Deep Mode",     desc: "AI Chat · Code · PDF · Whiteboard · Notes",        color: "#67e8f9" },
];

const FEATURE_LIST = [
  "Auto-switches between 3–5 panels based on your active task",
  "Horizontal layout for 1–3 panels; stacked view for 4–5",
  "PDF highlights sync directly into AI chat context",
  "Resize any panel without losing conversation history",
  "Collaborative whiteboard for brainstorming and diagrams",
  "Remembers your last layout per project automatically",
];

function FeaturesSection() {
  return (
    <Section id="features" bg={C.bg1} style={{ borderTop: `1px solid ${C.border}` }}>
      <Eyebrow>Features</Eyebrow>
      <Headline><GradText>3 to 5 Panels.</GradText> One Intelligent View.</Headline>
      <Sub>DevSathi detects your task — coding, research, or revision — and reconfigures your panels automatically. No manual toggling. Just flow.</Sub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
        {PANEL_CONFIGS.map(({ n, Icon, label, desc, color }) => (
          <div key={n} className="ds-card" style={{ padding: "26px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={20} color={color} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: `${color}14`, color, fontFamily: "'JetBrains Mono', monospace" }}>{n}-PANEL</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.textHigh, marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>{desc}</div>
            <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 32, borderRadius: 6, background: i === 0 ? `${color}16` : C.bg2, border: `1px solid ${i === 0 ? color + "30" : C.border}` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {FEATURE_LIST.map(f => (
          <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.gradSoft, border: `1px solid ${C.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Check size={11} color="#818cf8" strokeWidth={3} />
            </div>
            <span style={{ fontSize: 14, color: C.textMid, lineHeight: 1.55 }}>{f}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   #HOW IT WORKS (studymodes anchor) — universal workflow cards
   ═══════════════════════════════════════════════════════════════════════════ */
const WORKFLOWS = [
  {
    emoji: "💻", accent: "#818cf8",
    tag: "Developers",
    title: "Write & debug faster",
    body: "Open your code editor alongside AI chat. Get suggestions, explanations, and refactors — all without leaving your flow.",
    panels: ["AI Chat", "Code Editor", "Notes"],
  },
  {
    emoji: "🔬", accent: "#a78bfa",
    tag: "Researchers",
    title: "Analyze documents intelligently",
    body: "Upload PDFs, highlight key passages, and let the AI summarize, cross-reference, and generate structured notes instantly.",
    panels: ["AI Chat", "PDF Viewer", "Whiteboard", "Notes"],
  },
  {
    emoji: "🌐", accent: "#67e8f9",
    tag: "Everyone",
    title: "Work in your language",
    body: "Ask questions, receive explanations, and collaborate in Hindi, Tamil, Telugu, Bengali, Marathi, or English — seamlessly.",
    panels: ["AI Chat", "Multilingual", "Workspace"],
  },
];

function StudyModesSection() {
  return (
    <Section id="studymodes" bg={C.bg0} style={{ borderTop: `1px solid ${C.border}` }}>
      <Eyebrow>How It Works</Eyebrow>
      <Headline>Built for your workflow.</Headline>
      <Sub>Whether you're a developer, researcher, student, or entrepreneur — DevSathi adapts to how you think and work.</Sub>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {WORKFLOWS.map(({ emoji, accent, tag, title, body, panels }) => (
          <div key={tag} className="ds-card" style={{ padding: "30px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: `${accent}14`, color: accent, fontFamily: "'JetBrains Mono', monospace" }}>{tag.toUpperCase()}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: C.textHigh, margin: "0 0 10px" }}>{title}</h3>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
            <div style={{ background: C.bg2, borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, color: C.textLow, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Workspace · {panels.length} panels</div>
              <div style={{ display: "flex", gap: 5 }}>
                {panels.map((p, i) => (
                  <div key={p} style={{ flex: 1, background: i === 0 ? `${accent}14` : C.bg3, border: `1px solid ${i === 0 ? accent + "30" : C.border}`, borderRadius: 7, padding: "8px 6px" }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: i === 0 ? accent : C.textLow, marginBottom: 5, letterSpacing: "0.04em" }}>{p.toUpperCase()}</div>
                    {[1,2,3].map(j => <div key={j} style={{ height: 3, borderRadius: 2, background: i === 0 ? `${accent}40` : C.border, marginBottom: 3, width: j === 3 ? "55%" : "100%" }} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   #ABOUT
   ═══════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <Section id="about" bg={C.bg1} style={{ borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Eyebrow>Our Mission</Eyebrow>
        <Headline center size={44}>Breaking the <GradText>Language Barrier</GradText> in Tech</Headline>
        <p style={{ fontSize: 17, color: C.textMid, lineHeight: 1.8, marginBottom: 48 }}>
          Over <strong style={{ color: C.textHigh }}>100 million people</strong> in India navigate technology in a language that isn't their first.
          DevSathi exists to close that gap — bringing world-class AI tools to every user, regardless of the language they think in.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {[
            { n: "100M+", l: "People to empower",   c: "#818cf8" },
            { n: "6",     l: "Languages supported",  c: "#a78bfa" },
            { n: "∞",     l: "Use cases",            c: "#67e8f9" },
          ].map(s => (
            <div key={s.n} className="ds-card" style={{ padding: "22px 30px", textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {["हिंदी", "தமிழ்", "తెలుగు", "বাংলা", "मराठी", "English"].map(l => (
            <span key={l} style={{ padding: "6px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600, background: C.gradSoft, border: `1px solid ${C.borderAccent}`, color: "#a5b4fc" }}>{l}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   #PRICING — Beta / Coming Soon card
   ═══════════════════════════════════════════════════════════════════════════ */
function PricingSection({ onGetStarted }) {
  const perks = [
    "Full AI workspace access",
    "3 to 5 adaptive panels",
    "Multilingual AI assistant",
    "PDF upload & summarization",
    "Notes, whiteboard & more",
    "Priority feedback channel",
  ];

  return (
    <Section id="pricing" bg={C.bg0} style={{ borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <Eyebrow>Pricing</Eyebrow>
      <Headline center>Free during Beta</Headline>
      <Sub center>We're in early access. Everything is free while we build together with our users. Pricing tiers will launch later — and early users will be rewarded.</Sub>

      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div className="ds-card" style={{ padding: "36px 32px", position: "relative", overflow: "hidden", textAlign: "left" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.grad }} />

          <div style={{ display: "inline-block", marginBottom: 18, padding: "4px 12px", borderRadius: 99, fontSize: 10, fontWeight: 700, background: C.gradSoft, color: "#a5b4fc", border: `1px solid ${C.borderAccent}`, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>
            BETA ACCESS
          </div>

          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 52, fontWeight: 900, color: C.textHigh, lineHeight: 1 }}>₹0</span>
            <span style={{ fontSize: 15, color: C.textMid, marginLeft: 6 }}>/month</span>
          </div>
          <p style={{ fontSize: 13, color: C.textLow, marginBottom: 24 }}>Free during beta. No card required.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 28 }}>
            {perks.map(p => (
              <div key={p} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.gradSoft, border: `1px solid ${C.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={10} color="#818cf8" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 13, color: C.textMid }}>{p}</span>
              </div>
            ))}
          </div>

          <button onClick={onGetStarted} className="ds-btn" style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px" }}>
            Join Beta — Free <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER — Minimal horizontal, dark matching header
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const GhIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );

  const centerLinks = [
    { label: "Features", href: "#features"   },
    { label: "About",    href: "#about"       },
    { label: "Pricing",  href: "#pricing"     },
    { label: "GitHub",   href: "https://github.com/palakgoda", external: true },
  ];

  const linkStyle = { fontSize: 13, fontWeight: 500, color: C.textLow, textDecoration: "none", transition: "color 0.15s" };

  return (
    <footer style={{ background: C.bg1, borderTop: `1px solid ${C.border}` }}>
      {/* Main row */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>

        {/* Left — Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Code2 size={15} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DevSathi</div>
            <div style={{ fontSize: 9, color: C.textLow, marginTop: 2, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Your AI Companion</div>
          </div>
        </div>

        {/* Center — Nav */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          {centerLinks.map(({ label, href, external }) => (
            <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = "#a5b4fc"}
              onMouseLeave={e => e.currentTarget.style.color = C.textLow}
            >
              {label === "GitHub" ? (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><GhIcon /> GitHub</span>
              ) : label}
            </a>
          ))}
        </nav>

        {/* Right — Copyright */}
        <span style={{ fontSize: 12, color: C.textLow }}>© 2026 DevSathi</span>
      </div>

      {/* Bottom micro bar */}
      <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 1080, margin: "0 auto", padding: "10px 32px", display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 10, color: C.textLow, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>Made for AI for Bharat ✦</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const params               = useParams();
  const locale               = params?.locale ?? "en";
  const [authOpen, setAuth]  = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: C.bg0 }}>
        <Header      locale={locale} onLoginClick={() => setAuth(true)} />
        <Hero        onGetStarted={() => setAuth(true)} />
        <ValueCards  />
        <FeaturesSection />
        <StudyModesSection />
        <AboutSection />
        <PricingSection onGetStarted={() => setAuth(true)} />
        <Footer />
        {authOpen && <AuthModal locale={locale} onClose={() => setAuth(false)} />}
      </div>
    </>
  );
}
