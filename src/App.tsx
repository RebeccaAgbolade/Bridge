import { useState } from "react";

const ORIGINS = [
  { id: "syria", name: "Syria", x: 58, y: 42, count: 2840, color: "#ef4444" },
  { id: "ukraine", name: "Ukraine", x: 51, y: 32, count: 3120, color: "#ef4444" },
  { id: "sudan", name: "Sudan", x: 52, y: 52, count: 1890, color: "#ef4444" },
  { id: "afghanistan", name: "Afghanistan", x: 65, y: 40, count: 2210, color: "#ef4444" },
  { id: "drc", name: "DR Congo", x: 50, y: 58, count: 980, color: "#ef4444" },
  { id: "myanmar", name: "Myanmar", x: 76, y: 47, count: 1340, color: "#ef4444" },
];

const DESTINATIONS = [
  { id: "uk", name: "United Kingdom", x: 44, y: 30, count: 1240, color: "#22c55e" },
  { id: "germany", name: "Germany", x: 49, y: 31, count: 980, color: "#22c55e" },
  { id: "canada", name: "Canada", x: 18, y: 32, count: 870, color: "#22c55e" },
  { id: "france", name: "France", x: 46, y: 33, count: 720, color: "#22c55e" },
  { id: "netherlands", name: "Netherlands", x: 47, y: 29, count: 540, color: "#22c55e" },
  { id: "australia", name: "Australia", x: 82, y: 68, count: 430, color: "#22c55e" },
];

const PROFILES = [
  { id: 1, name: "Amir Mohammadi", origin: "Syria", dest: "UK", role: "Senior Software Engineer", exp: 8, skills: ["Python", "React", "AWS", "ML"], score: 98, avatar: "AM", color: "#f59e0b" },
  { id: 2, name: "Fatima Khalid", origin: "Sudan", dest: "Germany", role: "Cardiologist", exp: 12, skills: ["Cardiology", "Surgery", "Research"], score: 95, avatar: "FK", color: "#22c55e" },
  { id: 3, name: "Emmanuel Nkrumah", origin: "DR Congo", dest: "Canada", role: "Civil Engineer", exp: 6, skills: ["Structural", "AutoCAD", "BIM"], score: 91, avatar: "EN", color: "#a78bfa" },
  { id: 4, name: "Sophia Andreou", origin: "Ukraine", dest: "Netherlands", role: "Data Scientist", exp: 5, skills: ["R", "Power BI", "SQL", "Forecasting"], score: 89, avatar: "SA", color: "#60a5fa" },
  { id: 5, name: "Leila Rostami", origin: "Afghanistan", dest: "France", role: "Particle Physicist", exp: 10, skills: ["CERN", "Data Analysis", "Python"], score: 94, avatar: "LR", color: "#fb7185" },
  { id: 6, name: "Ahmed Farouk", origin: "Sudan", dest: "Australia", role: "Neurosurgeon", exp: 15, skills: ["Neurosurgery", "Research", "Teaching"], score: 92, avatar: "AF", color: "#fbbf24" },
  { id: 7, name: "Priya Venkataraman", origin: "Myanmar", dest: "UK", role: "Architect", exp: 7, skills: ["Design", "AutoCAD", "BIM", "Urban Planning"], score: 87, avatar: "PV", color: "#34d399" },
  { id: 8, name: "Yusuf Okonkwo", origin: "DR Congo", dest: "Canada", role: "Software Developer", exp: 4, skills: ["JavaScript", "Node.js", "React"], score: 85, avatar: "YO", color: "#f59e0b" },
];

const EMPLOYERS = [
  { id: 1, name: "NHS England", sector: "Healthcare", country: "UK", roles: 34, hiring: ["Doctors", "Nurses", "Specialists"], logo: "NHS", color: "#22c55e" },
  { id: 2, name: "Google DeepMind", sector: "Technology", country: "UK", roles: 12, hiring: ["ML Engineers", "Researchers", "Data Scientists"], logo: "G", color: "#60a5fa" },
  { id: 3, name: "Siemens AG", sector: "Engineering", country: "Germany", roles: 8, hiring: ["Civil Engineers", "Mechanical", "Project Managers"], logo: "S", color: "#fbbf24" },
  { id: 4, name: "CERN", sector: "Research", country: "Switzerland", roles: 5, hiring: ["Physicists", "Data Scientists", "Engineers"], logo: "C", color: "#a78bfa" },
  { id: 5, name: "Shopify", sector: "Technology", country: "Canada", roles: 18, hiring: ["Developers", "Product Managers", "Designers"], logo: "SH", color: "#34d399" },
  { id: 6, name: "Foster + Partners", sector: "Architecture", country: "UK", roles: 6, hiring: ["Architects", "Urban Planners", "Designers"], logo: "F", color: "#fb7185" },
];

const FEED = [
  { type: "hired", name: "Rania Al-Hassan", detail: "Médecins Sans Frontières", time: "2 min ago" },
  { type: "matched", name: "Yusuf Okonkwo", detail: "Software Dev → Shopify Canada", time: "5 min ago" },
  { type: "new", name: "Dilnoza Yusupova", detail: "Economist · Tashkent → Oslo", time: "8 min ago" },
  { type: "hired", name: "Marco Esposito", detail: "Deutsche Bank · Risk Analyst", time: "12 min ago" },
  { type: "matched", name: "Priya Venkataraman", detail: "Architect → Foster + Partners", time: "18 min ago" },
  { type: "hired", name: "Leila Rostami", detail: "CERN · Particle Physicist", time: "31 min ago" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedDot, setSelectedDot] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [matchForm, setMatchForm] = useState({ name: "", role: "", origin: "", skills: "" });
  const [matched, setMatched] = useState(false);

  const s: any = {
    app: { minHeight: "100vh", background: "#110a02", color: "#fff5e6", fontFamily: "'DM Sans','Segoe UI',sans-serif" },
    nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(245,158,11,0.08)", background: "rgba(17,10,2,0.95)", position: "sticky" as const, top: 0, zIndex: 100 },
    logo: { fontSize: 20, fontWeight: 900, color: "#fff5e6", letterSpacing: -0.5 },
    navLinks: { display: "flex", gap: 6 },
    navLink: (active: boolean) => ({ padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400, background: active ? "rgba(245,158,11,0.12)" : "transparent", color: active ? "#f59e0b" : "rgba(255,245,230,0.35)", border: active ? "1px solid rgba(245,158,11,0.2)" : "1px solid transparent", transition: "all 0.2s" }),
    navBtn: { padding: "9px 20px", background: "#f59e0b", color: "#110a02", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: "pointer" },
    card: { background: "rgba(255,245,230,0.04)", border: "1px solid rgba(245,158,11,0.08)", borderRadius: 16, padding: 20 },
    tag: (color: string) => ({ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "18", color, border: `1px solid ${color}28` }),
    badge: (type: string) => ({
      padding: "3px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700,
      background: type === "hired" ? "rgba(34,197,94,0.15)" : type === "matched" ? "rgba(245,158,11,0.15)" : "rgba(96,165,250,0.15)",
      color: type === "hired" ? "#22c55e" : type === "matched" ? "#f59e0b" : "#60a5fa",
    }),
    input: { width: "100%", background: "rgba(255,245,230,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, color: "#fff5e6", padding: "10px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" as const },
    btn: { background: "#f59e0b", color: "#110a02", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", width: "100%" },
  };

  const filteredProfiles = PROFILES.filter(p =>
    (!filterSkill || p.skills.some(sk => sk.toLowerCase().includes(filterSkill.toLowerCase()))) &&
    (!filterOrigin || p.origin.toLowerCase().includes(filterOrigin.toLowerCase()))
  );

  const renderHome = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520 }}>
        <div style={{ padding: "52px 32px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 20, width: "fit-content" }}>
            <div style={{ width: 6, height: 6, background: "#f59e0b", borderRadius: "50%" }}></div>
            <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 700, letterSpacing: 1 }}>14,382 professionals ready to contribute</span>
          </div>
          <div style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, color: "#fff5e6", marginBottom: 16 }}>
            Skills know<br />no <span style={{ color: "#f59e0b" }}>borders.</span><br />Neither do <span style={{ color: "#ef4444" }}>we.</span>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,245,230,0.45)", lineHeight: 1.7, maxWidth: 400, marginBottom: 28 }}>
            Bridge connects displaced professionals with employers who need exactly their skills. No bias. No barriers. Just talent meeting opportunity.
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <button style={s.btn} onClick={() => setTab("talent")}>Find your match</button>
            <button style={{ ...s.btn, background: "rgba(255,245,230,0.06)", color: "#fff5e6", border: "1px solid rgba(255,245,230,0.1)" }} onClick={() => setTab("employers")}>Post a role</button>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              {[["AM","#f59e0b","#3a1a05"],["FK","#22c55e","#1a3a05"],["EN","#a78bfa","#1a0530"],["SA","#60a5fa","#051a3a"],["LR","#fb7185","#3a0515"]].map(([av,c,bg]) => (
                <div key={av} style={{ width: 26, height: 26, borderRadius: "50%", background: bg, color: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, border: "2px solid #110a02", marginLeft: -5 }}>{av}</div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,245,230,0.35)" }}><span style={{ color: "#f59e0b", fontWeight: 700 }}>3,941 placements</span> made this year alone</span>
          </div>
        </div>

        <div style={{ padding: "20px 20px 20px 0", position: "relative" }}>
          <div style={{ background: "rgba(245,158,11,0.03)", border: "1px solid rgba(245,158,11,0.08)", borderRadius: 20, height: "100%", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 14, left: 16, fontSize: 10, fontWeight: 700, color: "rgba(245,158,11,0.6)", letterSpacing: 1.5, zIndex: 5 }}>LIVE CONNECTIONS</div>
            <div style={{ position: "absolute", top: 14, right: 16, display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "#f59e0b", fontWeight: 700, zIndex: 5 }}>
              <div style={{ width: 5, height: 5, background: "#f59e0b", borderRadius: "50%" }}></div>LIVE
            </div>

            <svg width="100%" viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
              <rect width="480" height="360" fill="#0e0801" />
              {[["M60 120 Q80 110 100 115 Q120 118 130 125 Q140 130 135 140 Q130 148 120 150 Q110 155 100 152 Q85 148 75 140 Q65 132 60 120Z"],["M130 125 Q145 120 160 122 Q170 124 175 130 Q178 136 172 142 Q165 148 155 146 Q145 144 138 138 Q132 132 130 125Z"],["M55 145 Q70 148 80 155 Q88 162 85 172 Q80 182 68 185 Q55 187 45 180 Q35 172 38 160 Q42 150 55 145Z"],["M85 155 Q98 150 110 155 Q120 160 122 170 Q124 180 116 188 Q108 195 96 193 Q84 190 80 180 Q77 170 85 155Z"],["M140 128 Q158 122 178 125 Q195 128 200 138 Q204 148 196 157 Q188 165 172 165 Q156 163 147 153 Q139 143 140 128Z"],["M178 125 Q198 118 220 122 Q238 126 244 136 Q250 146 244 156 Q237 165 220 167 Q203 168 192 158 Q180 148 178 125Z"],["M230 105 Q255 95 285 100 Q310 105 320 118 Q328 130 322 145 Q315 158 295 162 Q272 166 252 156 Q232 145 228 128 Q225 116 230 105Z"],["M285 100 Q310 88 340 94 Q365 100 372 115 Q378 130 368 145 Q357 158 335 160 Q312 162 298 148 Q284 134 285 100Z"],["M340 94 Q368 86 395 92 Q418 98 424 115 Q428 130 418 144 Q406 156 385 157 Q362 158 350 144 Q338 130 340 94Z"],["M395 92 Q418 86 440 95 Q458 104 460 120 Q462 136 448 146 Q434 156 415 154 Q396 152 388 138 Q380 124 395 92Z"],["M230 165 Q255 158 278 162 Q296 166 300 178 Q304 190 293 200 Q280 210 260 210 Q240 210 230 198 Q220 186 220 175 Q222 168 230 165Z"],["M278 162 Q300 154 322 160 Q340 166 344 180 Q347 194 335 204 Q322 213 303 212 Q284 210 276 197 Q268 183 278 162Z"],["M155 200 Q172 192 190 196 Q205 200 208 212 Q210 222 200 230 Q188 237 173 235 Q158 232 152 220 Q147 210 155 200Z"],["M190 196 Q210 188 228 194 Q244 200 247 214 Q249 226 237 234 Q224 241 208 238 Q192 234 187 220 Q182 208 190 196Z"],["M40 200 Q55 192 68 196 Q78 200 80 212 Q81 222 72 230 Q62 237 50 234 Q38 230 35 218 Q33 207 40 200Z"]].map((d, i) => (
                <path key={i} d={d[0]} fill="#1e1208" stroke="#f59e0b" strokeWidth="0.4" opacity="0.7" />
              ))}
              {ORIGINS.map(o => (
                <g key={o.id} style={{ cursor: "pointer" }} onClick={() => setSelectedDot(selectedDot?.id === o.id ? null : o)}>
                  <circle cx={o.x * 4.8} cy={o.y * 3.6} r={selectedDot?.id === o.id ? 7 : 5} fill={o.color} opacity="0.9" />
                  <circle cx={o.x * 4.8} cy={o.y * 3.6} r="10" fill={o.color} opacity="0.15" />
                  <circle cx={o.x * 4.8} cy={o.y * 3.6} r="16" fill={o.color} opacity="0.06" />
                  <text x={o.x * 4.8 + 8} y={o.y * 3.6 + 4} fontSize="7" fill={o.color} fontWeight="700" fontFamily="sans-serif">{o.name}</text>
                </g>
              ))}
              {DESTINATIONS.map(d => (
                <g key={d.id} style={{ cursor: "pointer" }} onClick={() => setSelectedDot(selectedDot?.id === d.id ? null : d)}>
                  <circle cx={d.x * 4.8} cy={d.y * 3.6} r={selectedDot?.id === d.id ? 7 : 5} fill={d.color} opacity="0.9" />
                  <circle cx={d.x * 4.8} cy={d.y * 3.6} r="10" fill={d.color} opacity="0.15" />
                  <text x={d.x * 4.8 + 8} y={d.y * 3.6 + 4} fontSize="7" fill={d.color} fontWeight="700" fontFamily="sans-serif">{d.name}</text>
                </g>
              ))}
              {ORIGINS.slice(0, 3).map((o, i) => {
                const dest = DESTINATIONS[i];
                return <path key={o.id} d={`M${o.x * 4.8} ${o.y * 3.6} Q${(o.x + dest.x) * 2.4} ${Math.min(o.y, dest.y) * 3.6 - 30} ${dest.x * 4.8} ${dest.y * 3.6}`} stroke="#f59e0b" strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="4,3" />;
              })}
              <rect x="12" y="320" width="10" height="8" rx="1" fill="#ef4444" opacity="0.8" />
              <text x="25" y="328" fontSize="8" fill="rgba(255,245,230,0.5)" fontFamily="sans-serif">Origin</text>
              <rect x="65" y="320" width="10" height="8" rx="1" fill="#22c55e" opacity="0.8" />
              <text x="78" y="328" fontSize="8" fill="rgba(255,245,230,0.5)" fontFamily="sans-serif">Destination</text>
              <line x1="130" y1="324" x2="148" y2="324" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
              <text x="152" y="328" fontSize="8" fill="rgba(255,245,230,0.5)" fontFamily="sans-serif">Active placement</text>
            </svg>

            {selectedDot && (
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(17,10,2,0.95)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, padding: "12px 18px", zIndex: 10, minWidth: 200, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(245,158,11,0.5)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{selectedDot.color === "#ef4444" ? "ORIGIN COUNTRY" : "DESTINATION COUNTRY"}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: selectedDot.color, marginBottom: 2 }}>{selectedDot.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,245,230,0.4)" }}>{selectedDot.count?.toLocaleString()} {selectedDot.color === "#ef4444" ? "professionals registered" : "placements made"}</div>
                <button onClick={() => { setTab("talent"); setSelectedDot(null); }} style={{ marginTop: 10, padding: "6px 14px", background: "#f59e0b", color: "#110a02", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: "pointer" }}>View profiles</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(245,158,11,0.06)" }}>
        {[["14,382","Skilled professionals","↑ 312 this week","#f59e0b"],["3,941","Successful placements","↑ 27.4% this quarter","#22c55e"],["48","Countries connected","↑ 6 new this year","#ef4444"],["87.3%","AI match accuracy","↑ 4.1% improvement","#a78bfa"]].map(([n,l,d,c]) => (
          <div key={l} style={{ padding: "20px 24px", borderRight: "1px solid rgba(245,158,11,0.06)" }}>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, color: c as string }}>{n}</div>
            <div style={{ fontSize: 11, color: "rgba(255,245,230,0.3)", marginTop: 2 }}>{l}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", marginTop: 3 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "32px", borderTop: "1px solid rgba(245,158,11,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,158,11,0.4)", letterSpacing: 2, marginBottom: 20 }}>LIVE ACTIVITY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FEED.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,245,230,0.03)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.06)" }}>
              <span style={s.badge(f.type)}>{f.type === "hired" ? "Hired" : f.type === "matched" ? "Matched" : "New"}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff5e6" }}>{f.name}</span>
              <span style={{ fontSize: 12, color: "rgba(255,245,230,0.35)" }}>— {f.detail}</span>
              <span style={{ fontSize: 11, color: "rgba(255,245,230,0.2)", marginLeft: "auto" }}>{f.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTalent = () => (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#fff5e6", marginBottom: 4 }}>Talent Pool</div>
        <div style={{ fontSize: 13, color: "rgba(255,245,230,0.35)" }}>Browse {PROFILES.length} skilled professionals ready for placement</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input style={s.input} placeholder="Filter by skill (e.g. Python, Surgery...)" value={filterSkill} onChange={e => setFilterSkill(e.target.value)} />
        <input style={{ ...s.input, maxWidth: 200 }} placeholder="Filter by origin country" value={filterOrigin} onChange={e => setFilterOrigin(e.target.value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filteredProfiles.map(p => (
          <div key={p.id} onClick={() => setSelectedProfile(selectedProfile?.id === p.id ? null : p)} style={{ ...s.card, cursor: "pointer", border: selectedProfile?.id === p.id ? `1px solid ${p.color}40` : "1px solid rgba(245,158,11,0.08)", transition: "all 0.2s" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.color + "18", color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff5e6" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,245,230,0.4)", marginTop: 2 }}>{p.role} · {p.exp} yrs</div>
                <div style={{ fontSize: 11, color: "rgba(255,245,230,0.25)", marginTop: 2 }}>{p.origin} → {p.dest}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                  {p.skills.map(sk => <span key={sk} style={s.tag(p.color)}>{sk}</span>)}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#22c55e" }}>{p.score}%</div>
                <div style={{ fontSize: 9, color: "rgba(255,245,230,0.3)" }}>match</div>
              </div>
            </div>
            {selectedProfile?.id === p.id && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(245,158,11,0.1)" }}>
                <div style={{ fontSize: 12, color: "rgba(255,245,230,0.4)", marginBottom: 10 }}>Ready to connect with {p.name}?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...s.btn, padding: "8px 16px", fontSize: 12 }}>Request introduction</button>
                  <button style={{ padding: "8px 16px", background: "rgba(255,245,230,0.05)", color: "#fff5e6", border: "1px solid rgba(255,245,230,0.1)", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View full profile</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmployers = () => (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#fff5e6", marginBottom: 4 }}>Partner Employers</div>
        <div style={{ fontSize: 13, color: "rgba(255,245,230,0.35)" }}>{EMPLOYERS.length} organisations actively hiring refugee talent</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {EMPLOYERS.map(e => (
          <div key={e.id} style={s.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: e.color + "18", color: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{e.logo}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff5e6" }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,245,230,0.35)" }}>{e.sector} · {e.country}</div>
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: e.color, marginBottom: 2 }}>{e.roles}</div>
            <div style={{ fontSize: 11, color: "rgba(255,245,230,0.3)", marginBottom: 12 }}>open roles</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
              {e.hiring.map(h => <span key={h} style={s.tag(e.color)}>{h}</span>)}
            </div>
            <button style={{ ...s.btn, padding: "8px 14px", fontSize: 12 }}>Browse roles</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMatch = () => (
    <div style={{ padding: 32, maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#fff5e6", marginBottom: 8 }}>Find your match</div>
        <div style={{ fontSize: 14, color: "rgba(255,245,230,0.4)" }}>Tell us about yourself and we'll connect you with the right opportunity</div>
      </div>
      {!matched ? (
        <div style={s.card}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, display: "block", marginBottom: 6 }}>Full name</label>
              <input style={s.input} placeholder="e.g. Amir Mohammadi" value={matchForm.name} onChange={e => setMatchForm({ ...matchForm, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, display: "block", marginBottom: 6 }}>Your profession</label>
              <input style={s.input} placeholder="e.g. Software Engineer, Doctor, Architect..." value={matchForm.role} onChange={e => setMatchForm({ ...matchForm, role: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, display: "block", marginBottom: 6 }}>Country of origin</label>
              <input style={s.input} placeholder="e.g. Syria, Ukraine, Sudan..." value={matchForm.origin} onChange={e => setMatchForm({ ...matchForm, origin: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, display: "block", marginBottom: 6 }}>Key skills (comma separated)</label>
              <input style={s.input} placeholder="e.g. Python, Surgery, AutoCAD..." value={matchForm.skills} onChange={e => setMatchForm({ ...matchForm, skills: e.target.value })} />
            </div>
            <button style={s.btn} onClick={() => { if (matchForm.name && matchForm.role) setMatched(true); }}>Find my matches →</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ ...s.card, textAlign: "center", marginBottom: 20, border: "1px solid rgba(34,197,94,0.2)" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e", marginBottom: 4 }}>Match found!</div>
            <div style={{ fontSize: 14, color: "rgba(255,245,230,0.4)" }}>We found 3 strong matches for {matchForm.name}</div>
          </div>
          {PROFILES.slice(0, 3).map(p => (
            <div key={p.id} style={{ ...s.card, marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: p.color + "18", color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff5e6" }}>{p.role}</div>
                <div style={{ fontSize: 11, color: "rgba(255,245,230,0.35)", marginTop: 2 }}>{p.dest} · {p.exp} years experience required</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#22c55e" }}>{p.score}%</div>
                <div style={{ fontSize: 9, color: "rgba(255,245,230,0.3)" }}>match</div>
              </div>
            </div>
          ))}
          <button style={{ ...s.btn, marginTop: 8 }} onClick={() => setMatched(false)}>Start over</button>
        </div>
      )}
    </div>
  );

  return (
    <div style={s.app}>
      <div style={s.nav}>
        <div style={s.logo}>Bridge<span style={{ color: "#f59e0b" }}>.</span></div>
        <div style={s.navLinks}>
          {[["home","Home"],["talent","Talent Pool"],["employers","Employers"],["match","Find a Match"]].map(([id, label]) => (
            <button key={id} style={s.navLink(tab === id)} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        <button style={s.navBtn} onClick={() => setTab("match")}>Get started</button>
      </div>
      {tab === "home" && renderHome()}
      {tab === "talent" && renderTalent()}
      {tab === "employers" && renderEmployers()}
      {tab === "match" && renderMatch()}
    </div>
  );
}
