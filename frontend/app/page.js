"use client";
import { useState, useRef, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";

const API = "http://localhost:8000";
const COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899"];

const SUGGESTIONS = [
  "Which column has the highest average?",
  "Show me the top 5 rows",
  "What is the total sum of each column?",
  "Are there any missing values?",
  "Show a trend over time",
  "Give me a full summary of the data",
];

export default function Home() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [expandedCode, setExpandedCode] = useState({});
  const fileRef = useRef();
  const bottomRef = useRef();
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [question]);

  const handleFile = async (f) => {
    if (!f || !f.name.endsWith(".csv")) { alert("Please upload a CSV file"); return; }
    setFile(f); setUploading(true); setMessages([]);
    const form = new FormData();
    form.append("file", f);
    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body: form });
      const data = await res.json();
      setSessionId(data.session_id); setColumns(data.columns); setRows(data.rows);
      setMessages([{ role: "system", text: `Ready to analyze **${data.filename}** — ${data.rows.toLocaleString()} rows · ${data.columns.length} columns.` }]);
    } catch { alert("Upload failed. Make sure the backend is running on port 8000."); }
    setUploading(false);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

  const handleQuery = async (q) => {
    const query = (q || question).trim();
    if (!query || !sessionId || loading) return;
    setQuestion("");
    setMessages(prev => [...prev, { role: "user", text: query }]);
    setLoading(true);
    try {
      const res = await fetch(`${API}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query, session_id: sessionId })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.answer, code: data.code_used, chart: data.chart_data, table: data.table_data, error: data.error }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Connection error. Please check the backend server.", error: "Backend unreachable" }]);
    }
    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const renderChart = (chartData) => {
    if (!chartData?.labels) return null;
    const data = chartData.labels.map((label, i) => ({ name: label, value: Number(chartData.values[i]) || 0 }));
    const type = chartData.chart_type || "bar";

    return (
      <div style={{ marginTop: "16px", background: "#060610", borderRadius: "12px", padding: "20px", border: "1px solid #1e293b" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", marginBottom: "16px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {type === "line" ? "Trend chart" : type === "pie" ? "Distribution" : "Comparison chart"}
        </p>
        <ResponsiveContainer width="100%" height={220}>
          {type === "pie" ? (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#1e293b" }}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0", fontSize: "12px" }} />
            </PieChart>
          ) : type === "line" ? (
            <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0", fontSize: "12px" }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: "8px", color: "#e2e8f0", fontSize: "12px" }} cursor={{ fill: "#10b98110" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  const renderTable = (tableData) => {
    if (!tableData?.headers) return null;
    return (
      <div style={{ marginTop: "16px", background: "#060610", borderRadius: "12px", border: "1px solid #1e293b", overflow: "hidden" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", padding: "12px 16px 8px", letterSpacing: "0.12em", textTransform: "uppercase", borderBottom: "1px solid #0f172a" }}>
          Data table · {tableData.rows.length} rows
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                {tableData.headers.map(h => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#475569", fontWeight: 500, borderBottom: "1px solid #0f172a", background: "#0a0a14", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #0a0a14" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "8px 14px", color: "#64748b", fontFamily: "'DM Mono',monospace", fontSize: "11px", whiteSpace: "nowrap" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#060610", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #10b98125; color: #10b981; }
        textarea { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        .msg-enter { animation: msgIn 0.3s ease forwards; }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .upload-zone:hover { border-color: #10b98166 !important; background: #10b98106 !important; }
        .send-btn:hover:not(:disabled) { background: #0ea572 !important; transform: scale(1.05); }
        .send-btn:active:not(:disabled) { transform: scale(0.97); }
        .suggestion-btn:hover { border-color: #10b98155 !important; color: #10b981 !important; background: #10b98108 !important; }
        .code-toggle:hover { color: #10b981 !important; }
        strong { color: #e2e8f0; font-weight: 600; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
      `}</style>

      {/* HEADER */}
      <header style={{ height: "56px", borderBottom: "1px solid #0f172a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12L6 7L9 10L12 6L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="4" r="1.5" fill="white"/></svg>
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "16px", color: "#f8fafc", letterSpacing: "-0.3px" }}>QueryMind</span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#10b981", background: "#10b98112", border: "1px solid #10b98125", padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.08em" }}>BETA</span>
        </div>
        {sessionId && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "8px", padding: "6px 12px" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M2 6h8M2 9h5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#64748b" }}>{file?.name}</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#334155" }}>·</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#475569" }}>{rows?.toLocaleString()} rows</span>
          </div>
        )}
      </header>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "240px", flexShrink: 0, borderRight: "1px solid #0f172a", display: "flex", flexDirection: "column", overflowY: "auto", padding: "16px" }}>
          <div className="upload-zone" onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current.click()}
            style={{ border: `1.5px dashed ${dragOver ? "#10b981" : sessionId ? "#10b98140" : "#1e293b"}`, borderRadius: "10px", padding: "20px 12px", textAlign: "center", cursor: "pointer", background: dragOver ? "#10b98108" : "transparent", marginBottom: "16px", transition: "all 0.25s" }}>
            <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
            {uploading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "20px", height: "20px", border: "2px solid #1e293b", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#475569" }}>Processing...</p>
              </div>
            ) : sessionId ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "28px", height: "28px", background: "#10b98115", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
                <p style={{ fontSize: "12px", color: "#10b981", fontWeight: 500 }}>{file?.name.length > 22 ? file.name.slice(0, 19) + "..." : file?.name}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#334155" }}>Click to replace</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "36px", height: "36px", background: "#0d1117", border: "1px solid #1e293b", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 5l3-3 3 3M3 11v2h10v-2" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>Drop CSV here</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#334155" }}>or click to browse</p>
              </div>
            )}
          </div>

          {columns.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>Columns · {columns.length}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {columns.map(col => (
                  <div key={col} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "6px", background: "#0d1117" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{col}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sessionId && (
            <div>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#334155", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>Suggestions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} className="suggestion-btn" onClick={() => handleQuery(s)}
                    style={{ textAlign: "left", background: "transparent", border: "1px solid #1e293b", borderRadius: "7px", padding: "7px 10px", cursor: "pointer", fontSize: "11px", color: "#475569", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.4, transition: "all 0.2s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* CHAT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>

            {messages.length === 0 && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "400px", gap: "16px" }}>
                <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 20L10 13L15 17L20 11L24 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="8" r="2.5" fill="white"/></svg>
                </div>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-1px", lineHeight: 1.1 }}>
                  Ask your data<br /><span style={{ WebkitTextStroke: "1px #1e293b", color: "transparent" }}>anything</span>
                </h1>
                <p style={{ color: "#334155", fontSize: "14px", maxWidth: "340px", lineHeight: 1.7 }}>Upload a CSV and ask questions in plain English. QueryMind writes the code, runs it, and explains the results.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                  {["No SQL needed", "Instant charts", "Data tables", "AI explanations"].map(tag => (
                    <span key={tag} style={{ fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#334155", background: "#0d1117", border: "1px solid #1e293b", padding: "4px 10px", borderRadius: "999px" }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="msg-enter" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "10px" }}>
                {msg.role !== "user" && (
                  <div style={{ width: "28px", height: "28px", background: msg.role === "system" ? "#0d1117" : "linear-gradient(135deg,#10b981,#059669)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", border: msg.role === "system" ? "1px solid #1e293b" : "none" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9L4.5 6L7 8L9 5.5L11 7" stroke={msg.role === "system" ? "#475569" : "white"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
                <div style={{ maxWidth: msg.role === "user" ? "65%" : "100%", width: msg.role === "assistant" ? "calc(100% - 38px)" : "auto" }}>
                  {msg.role === "user" ? (
                    <div style={{ background: "#10b981", borderRadius: "14px 14px 4px 14px", padding: "10px 16px" }}>
                      <p style={{ fontSize: "14px", color: "#052e16", lineHeight: 1.7, fontWeight: 500 }}>{msg.text}</p>
                    </div>
                  ) : (
                    <div style={{ background: "#0a0a14", border: "1px solid #0f172a", borderRadius: "4px 14px 14px 14px", padding: "16px 18px" }}>
                      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: msg.role === "system" ? "#334155" : "#10b981", marginBottom: "8px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {msg.role === "system" ? "System" : "QueryMind AI"}
                      </p>
                      <p style={{ fontSize: "14px", lineHeight: 1.85, color: "#94a3b8", whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      {msg.code && (
                        <div style={{ marginTop: "12px" }}>
                          <button className="code-toggle" onClick={() => setExpandedCode(prev => ({ ...prev, [i]: !prev[i] }))}
                            style={{ background: "none", border: "none", fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "#334155", padding: "0", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", transition: "color 0.2s" }}>
                            <span>{expandedCode[i] ? "▼" : "▶"}</span> View pandas code
                          </button>
                          {expandedCode[i] && (
                            <div style={{ marginTop: "8px", background: "#060610", borderRadius: "8px", padding: "12px 14px", border: "1px solid #1e293b", overflowX: "auto" }}>
                              <code style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#10b981", whiteSpace: "pre" }}>{msg.code}</code>
                            </div>
                          )}
                        </div>
                      )}
                      {msg.chart && renderChart(msg.chart)}
                      {msg.table && renderTable(msg.table)}
                      {msg.error && (
                        <div style={{ marginTop: "10px", padding: "8px 12px", background: "#ef444410", border: "1px solid #ef444430", borderRadius: "8px" }}>
                          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#f87171" }}>Error: {msg.error}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-enter" style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9L4.5 6L7 8L9 5.5L11 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ background: "#0a0a14", border: "1px solid #0f172a", borderRadius: "4px 14px 14px 14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", animation: `pulse 1.2s ease-in-out infinite`, animationDelay: `${i*0.2}s` }} />)}
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "#334155" }}>Analyzing with AI...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid #0f172a", padding: "16px 32px 20px", background: "#060610" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", background: "#0a0a14", border: `1px solid ${sessionId ? "#1e293b" : "#0d1117"}`, borderRadius: "14px", padding: "10px 12px 10px 16px", transition: "border-color 0.2s" }}>
              <textarea ref={textareaRef} value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleQuery(); } }}
                disabled={!sessionId || loading}
                placeholder={sessionId ? "Ask anything about your data... (↵ to send)" : "Upload a CSV file to begin"}
                style={{ flex: 1, background: "transparent", border: "none", color: "#e2e8f0", fontSize: "14px", fontFamily: "'DM Sans',sans-serif", resize: "none", lineHeight: 1.6, minHeight: "22px", maxHeight: "120px", opacity: sessionId ? 1 : 0.3, paddingTop: "1px" }}
                rows={1} />
              <button className="send-btn" onClick={() => handleQuery()} disabled={!sessionId || !question.trim() || loading}
                style={{ background: sessionId && question.trim() && !loading ? "#10b981" : "#0d1117", color: sessionId && question.trim() && !loading ? "#052e16" : "#334155", border: "1px solid", borderColor: sessionId && question.trim() && !loading ? "transparent" : "#1e293b", borderRadius: "9px", width: "34px", height: "34px", cursor: sessionId && question.trim() && !loading ? "pointer" : "not-allowed", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 600, transition: "all 0.2s" }}>
                ↑
              </button>
            </div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", color: "#1e293b", marginTop: "8px", textAlign: "center", letterSpacing: "0.06em" }}>
              AI-generated analysis · Always verify critical decisions independently
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}