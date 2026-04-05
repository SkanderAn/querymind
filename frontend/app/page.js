import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 15L7 10L11 13L15 8L17 10" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="15" cy="6" r="2" fill="#10b981"/>
      </svg>
    ),
    title: "Natural language queries",
    desc: "Ask questions in plain English. No SQL, no formulas, no technical knowledge required.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#6366f1" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Instant visualizations",
    desc: "Bar charts, line charts, pie charts and data tables — generated automatically based on your question.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 10h8M6 7h8M6 13h5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="#f59e0b" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Code transparency",
    desc: "Every answer shows the exact Pandas code used. Learn while you analyze — no black boxes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="#ec4899" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Powered by LLaMA 3.3 70B",
    desc: "State-of-the-art language model via Groq for blazing fast, accurate data analysis.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 14l3-3 3 3 3-4 3 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="#10b981" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Any CSV file",
    desc: "Sales data, financial reports, survey results, sports stats — if it's a CSV, QueryMind can analyze it.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 10l4 4 6-7" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="7" stroke="#6366f1" strokeWidth="1.5"/>
      </svg>
    ),
    title: "No setup needed",
    desc: "Upload your file and start asking immediately. No account, no configuration, no learning curve.",
  },
];

const steps = [
  { num: "01", title: "Upload your CSV", desc: "Drag and drop any CSV file. QueryMind instantly reads its structure and prepares for analysis." },
  { num: "02", title: "Ask in plain English", desc: 'Type your question naturally — "Which product had the highest revenue?" or "Show me a monthly trend".' },
  { num: "03", title: "Get instant insights", desc: "QueryMind generates the code, runs it, and returns a clear answer with charts or tables." },
];

export default function Landing() {
  return (
    <main style={{ background: "#060610", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #10b98125; color: #10b981; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        .nav-link { color: #475569; font-size: 14px; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #e2e8f0; }
        .cta-primary { background: #10b981; color: #052e16; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none; transition: all 0.2s; display: inline-block; font-family: 'DM Sans', sans-serif; }
        .cta-primary:hover { background: #0ea572; transform: translateY(-1px); }
        .cta-secondary { border: 1px solid #1e293b; color: #94a3b8; font-weight: 500; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none; transition: all 0.2s; display: inline-block; font-family: 'DM Sans', sans-serif; }
        .cta-secondary:hover { border-color: #10b98155; color: #10b981; }
        .feature-card { background: #0a0a14; border: 1px solid #0f172a; border-radius: 14px; padding: 24px; transition: border-color 0.2s, transform 0.2s; }
        .feature-card:hover { border-color: #1e293b; transform: translateY(-2px); }
        .step-card { background: #0a0a14; border: 1px solid #0f172a; border-radius: 14px; padding: 28px; position: relative; }
        .grid-bg { background-image: linear-gradient(#1e293b0a 1px, transparent 1px), linear-gradient(90deg, #1e293b0a 1px, transparent 1px); background-size: 48px 48px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #0f172a", background: "rgba(6,6,16,0.92)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 12L6 7L9 10L12 6L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="4" r="1.5" fill="white"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "17px", color: "#f8fafc" }}>QueryMind</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#10b981", background: "#10b98112", border: "1px solid #10b98125", padding: "2px 6px", borderRadius: "4px" }}>BETA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link href="/app" className="cta-primary" style={{ padding: "8px 20px", fontSize: "13px" }}>Launch App</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "#10b98108", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "780px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "999px", padding: "6px 14px", marginBottom: "32px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#64748b" }}>Powered by LLaMA 3.3 70B via Groq</span>
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(40px,8vw,80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: "#f8fafc", marginBottom: "24px" }}>
            Your data, explained<br />
            <span style={{ WebkitTextStroke: "1.5px #1e293b", color: "transparent" }}>in plain English</span>
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,19px)", color: "#475569", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Upload any CSV file and ask questions naturally. QueryMind writes the code, runs it on your data, and returns instant charts, tables, and explanations — no SQL required.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/app" className="cta-primary">Start analyzing for free →</Link>
            <a href="#how-it-works" className="cta-secondary">See how it works</a>
          </div>
          <p style={{ marginTop: "20px", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#1e293b" }}>
            No account required · No credit card · Free to use
          </p>
        </div>

        {/* Mock UI preview */}
        <div style={{ marginTop: "72px", width: "100%", maxWidth: "860px", background: "#0a0a14", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden", position: "relative", zIndex: 1 }}>
          <div style={{ background: "#060610", borderBottom: "1px solid #0f172a", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
            {["#ef4444","#f59e0b","#10b981"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />)}
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#334155", marginLeft: "8px" }}>querymind.app</span>
          </div>
          <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px", minHeight: "280px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ border: "1.5px dashed #10b98140", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                <div style={{ width: "24px", height: "24px", background: "#10b98115", borderRadius: "6px", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M2 6h8M2 9h5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
                <p style={{ fontSize: "11px", color: "#10b981", fontWeight: 500 }}>sales_data.csv</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", marginTop: "2px" }}>1,240 rows · 5 cols</p>
              </div>
              {["month","product","sales","revenue","customers"].map(col => (
                <div key={col} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "6px", background: "#0d1117" }}>
                  <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#475569" }}>{col}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ background: "#060610", border: "1px solid #0f172a", borderRadius: "10px", padding: "12px 14px" }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", marginBottom: "6px" }}>QUERYMIND AI</p>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>Laptop had the highest total revenue at <strong style={{ color: "#e2e8f0" }}>$511,500</strong> — significantly ahead of Phone ($329,000) and Tablet ($69,000).</p>
                <div style={{ marginTop: "10px", background: "#0a0a14", borderRadius: "8px", padding: "8px 12px", border: "1px solid #1e293b" }}>
                  <code style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#10b981" }}>result = df.groupby('product')['revenue'].sum().idxmax()</code>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: "#10b981", borderRadius: "12px 12px 4px 12px", padding: "8px 14px", maxWidth: "70%" }}>
                  <p style={{ fontSize: "13px", color: "#052e16", fontWeight: 500 }}>Which product had the highest revenue?</p>
                </div>
              </div>
              <div style={{ background: "#0a0a14", border: "1px solid #0f172a", borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#334155", flex: 1 }}>Ask anything about your data...</span>
                <div style={{ width: "28px", height: "28px", background: "#10b981", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#052e16", fontSize: "14px", fontWeight: 700 }}>↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#10b981", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Features</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: "16px" }}>Everything you need to understand your data</h2>
          <p style={{ color: "#475569", fontSize: "16px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>No more spreadsheet formulas, no more SQL queries. Just ask.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div style={{ width: "36px", height: "36px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 500, color: "#f8fafc", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: "#0a0a14", borderTop: "1px solid #0f172a", borderBottom: "1px solid #0f172a", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#10b981", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>How it works</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px" }}>Three steps to instant insights</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {steps.map((s, i) => (
              <div key={s.num} className="step-card">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "36px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.num}</span>
                  {i < steps.length - 1 && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginTop: "8px", opacity: 0.3 }}>
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#f8fafc", marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#10b981", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Pricing</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: "16px" }}>Simple, transparent pricing</h2>
          <p style={{ color: "#475569", fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}>Start for free. No credit card required.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
          {[
            {
              name: "Free", price: "$0", period: "forever",
              features: ["Up to 5 CSV uploads/day", "Up to 20 queries/day", "Bar, line & pie charts", "Data tables", "Code transparency"],
              cta: "Get started free", primary: false,
            },
            {
              name: "Pro", price: "$12", period: "per month",
              features: ["Unlimited CSV uploads", "Unlimited queries", "All chart types", "Export reports as PDF", "Priority AI responses", "Email support"],
              cta: "Coming soon", primary: true,
            },
          ].map(plan => (
            <div key={plan.name} style={{ background: plan.primary ? "#0d1117" : "#0a0a14", border: `1px solid ${plan.primary ? "#10b98140" : "#0f172a"}`, borderRadius: "16px", padding: "32px", position: "relative" }}>
              {plan.primary && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#10b981", color: "#052e16", fontFamily: "'DM Mono',monospace", fontSize: "10px", fontWeight: 600, padding: "4px 14px", borderRadius: "999px", whiteSpace: "nowrap" }}>
                  Most popular
                </div>
              )}
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#475569", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{plan.name}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "40px", fontWeight: 800, color: "#f8fafc" }}>{plan.price}</span>
                <span style={{ color: "#475569", fontSize: "13px" }}>/{plan.period}</span>
              </div>
              <div style={{ borderTop: "1px solid #1e293b", margin: "20px 0", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: "13px", color: "#64748b" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href={plan.primary ? "#" : "/app"}
                style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: "9px", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", textDecoration: "none", background: plan.primary ? "#10b981" : "transparent", color: plan.primary ? "#052e16" : "#94a3b8", border: plan.primary ? "none" : "1px solid #1e293b", opacity: plan.primary ? 0.6 : 1, cursor: plan.primary ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "#0a0a14", borderTop: "1px solid #0f172a", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", marginBottom: "20px" }}>
          Ready to understand your data?
        </h2>
        <p style={{ color: "#475569", fontSize: "16px", maxWidth: "420px", margin: "0 auto 36px", lineHeight: 1.7 }}>
          Upload your first CSV and get insights in seconds. No setup, no account required.
        </p>
        <Link href="/app" className="cta-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
          Start analyzing for free →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #0f172a", padding: "32px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "24px", height: "24px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 12L6 7L9 10L12 6L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "14px", color: "#f8fafc" }}>QueryMind</span>
          </div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#1e293b" }}>
            Built by <a href="https://github.com/SkanderAn" style={{ color: "#334155", textDecoration: "none" }}>Skander Andolsi</a> · Powered by LangChain + Groq
          </p>
        </div>
      </footer>
    </main>
  );
}