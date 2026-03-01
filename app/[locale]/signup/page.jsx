"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Code2, ArrowRight, Loader2, Sparkles, ChevronLeft 
} from "lucide-react";

const C = {
  bg0: "#020617",
  bg1: "#0f172a",
  blue: "#6366f1",
  grad: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
  textHigh: "#f1f5f9",
  textMid: "#94a3b8",
  border: "#1e293b",
};

export default function SignupFlow() {
  const router = useRouter();
  const { locale } = useParams();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    university: "", course: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    // ✅ Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = "Required";
      if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
      if (formData.password.length < 8) newErrors.password = "Min 8 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords must match";
      if (!formData.university.trim()) newErrors.university = "Required";
    }
    return newErrors;
  };

  const handleAction = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      router.push(`/${locale}/dashboard`);
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    
    // Redirect back to Sign In step
    setLoading(false);
    setStep(1); 
    setFormData({ name: "", email: "", password: "", confirmPassword: "", university: "", course: "" });
    alert("Account created! Please sign in.");
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg0, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <style jsx global>{`
        input { color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #1e293b inset !important;
          -webkit-text-fill-color: #ffffff !important;
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "440px", background: C.bg1, border: `1px solid ${C.border}`, borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", overflow: "hidden" }}>
        <div style={{ height: "4px", background: C.grad }} />
        
        <div style={{ padding: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><Code2 size={18} color="white" /></div>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#6366f1" }}>DevSathi</span>
          </div>

          {step === 1 ? (
            /* --- SIGN IN --- */
            <div className="fade-in">
              <h1 style={{ fontSize: "26px", fontWeight: "800", color: C.textHigh, marginBottom: "8px" }}>Sign In</h1>
              <p style={{ color: C.textMid, fontSize: "14px", marginBottom: "32px" }}>Welcome back to your workspace.</p>
              <form onSubmit={handleAction} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                   <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>EMAIL</label>
                   <input type="email" name="email" required onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                   <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>PASSWORD</label>
                   <input type="password" name="password" required onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                </div>
                <button type="submit" style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: C.grad, color: "white", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"} <ArrowRight size={18} />
                </button>
                <p style={{ textAlign: "center", fontSize: "13px", color: C.textMid, marginTop: "12px" }}>
                  New here? <button type="button" onClick={() => setStep(2)} style={{ background: "none", border: "none", color: C.blue, fontWeight: "700", cursor: "pointer" }}>Create an account</button>
                </p>
              </form>
            </div>
          ) : (
            /* --- REGISTRATION --- */
            <div className="fade-in">
              <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: C.textMid, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", marginBottom: "20px" }}>
                <ChevronLeft size={14} /> Back to Sign In
              </button>
              <h1 style={{ fontSize: "24px", fontWeight: "800", color: C.textHigh, marginBottom: "8px" }}>Registration</h1>
              <p style={{ color: C.textMid, fontSize: "14px", marginBottom: "24px" }}>Start your personalized learning journey.</p>

              <form onSubmit={handleAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* 1. Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>FULL NAME</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: errors.name ? "1px solid #ef4444" : "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                </div>

                {/* 2. Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>EMAIL ID</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: errors.email ? "1px solid #ef4444" : "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                  {errors.email && <span style={{ color: "#ef4444", fontSize: "10px" }}>{errors.email}</span>}
                </div>

                {/* 3. Passwords (Row) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                   <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>PASSWORD</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: errors.password ? "1px solid #ef4444" : "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>CONFIRM</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: errors.confirmPassword ? "1px solid #ef4444" : "1px solid #334155", borderRadius: "10px", outline: "none" }} />
                  </div>
                </div>
                {errors.confirmPassword && <span style={{ color: "#ef4444", fontSize: "10px" }}>{errors.confirmPassword}</span>}

                {/* 4. University & Course (Row) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>UNIVERSITY</label>
                    <input type="text" name="university" value={formData.university} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: errors.university ? "1px solid #ef4444" : "1px solid #334155", borderRadius: "10px", outline: "none", fontSize: "13px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "700", color: C.textMid }}>COURSE</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} style={{ width: "100%", padding: "12px", background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", outline: "none", fontSize: "13px" }} />
                  </div>
                </div>

                <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: C.grad, color: "white", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px" }}>
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Create Account"} <Sparkles size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}