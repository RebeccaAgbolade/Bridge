import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ORIGINS = [
  { name: "Syria", coords: [38.9968, 34.8021] as [number,number], count: 2840, profiles: [
    {name:"Amir Mohammadi",role:"Software Engineer",dest:"UK",skills:["Python","React","AWS"],score:98,av:"AM",color:"#f59e0b"},
    {name:"Layla Hassan",role:"Civil Engineer",dest:"Germany",skills:["AutoCAD","BIM"],score:91,av:"LH",color:"#60a5fa"},
  ]},
  { name: "Ukraine", coords: [31.1656, 48.3794] as [number,number], count: 3120, profiles: [
    {name:"Sophia Andreou",role:"Data Scientist",dest:"Netherlands",skills:["R","Power BI","SQL"],score:89,av:"SA",color:"#a78bfa"},
    {name:"Olena Kovalenko",role:"Architect",dest:"Germany",skills:["Urban Planning","Revit"],score:93,av:"OK",color:"#34d399"},
  ]},
  { name: "Sudan", coords: [30.2176, 12.8628] as [number,number], count: 1890, profiles: [
    {name:"Fatima Khalid",role:"Cardiologist",dest:"Germany",skills:["Cardiology","Surgery"],score:95,av:"FK",color:"#22c55e"},
    {name:"Ahmed Farouk",role:"Neurosurgeon",dest:"Australia",skills:["Neurosurgery","Research"],score:92,av:"AF",color:"#fbbf24"},
  ]},
  { name: "Afghanistan", coords: [67.7100, 33.9391] as [number,number], count: 2210, profiles: [
    {name:"Leila Rostami",role:"Particle Physicist",dest:"France",skills:["CERN","Python"],score:94,av:"LR",color:"#fb7185"},
    {name:"Khalid Ahmadi",role:"Economist",dest:"UK",skills:["Forecasting","R"],score:87,av:"KA",color:"#f59e0b"},
  ]},
  { name: "DR Congo", coords: [23.6560, -2.8770] as [number,number], count: 980, profiles: [
    {name:"Emmanuel Nkrumah",role:"Civil Engineer",dest:"Canada",skills:["Structural","BIM"],score:91,av:"EN",color:"#a78bfa"},
    {name:"Yusuf Okonkwo",role:"Software Dev",dest:"Canada",skills:["JavaScript","React"],score:85,av:"YO",color:"#f59e0b"},
  ]},
  { name: "Myanmar", coords: [95.9560, 16.8661] as [number,number], count: 1340, profiles: [
    {name:"Priya Venkataraman",role:"Architect",dest:"UK",skills:["Design","Urban Planning"],score:87,av:"PV",color:"#34d399"},
    {name:"Min Thu",role:"Data Analyst",dest:"Australia",skills:["SQL","Python"],score:83,av:"MT",color:"#60a5fa"},
  ]},
  { name: "Nigeria", coords: [8.6753, 9.0820] as [number,number], count: 1560, profiles: [
    {name:"Chioma Okonkwo",role:"Petroleum Engineer",dest:"Canada",skills:["Reservoir","Drilling"],score:88,av:"CO",color:"#fbbf24"},
    {name:"Tunde Adeyemi",role:"Cardiologist",dest:"UK",skills:["Cardiology","Surgery"],score:93,av:"TA",color:"#22c55e"},
  ]},
  { name: "Ethiopia", coords: [40.4897, 9.1450] as [number,number], count: 1120, profiles: [
    {name:"Biruk Tadesse",role:"Software Engineer",dest:"Germany",skills:["Python","ML","Django"],score:89,av:"BT",color:"#60a5fa"},
    {name:"Tigist Haile",role:"Public Health Specialist",dest:"Sweden",skills:["Epidemiology","Research"],score:84,av:"TH",color:"#fb7185"},
  ]},
  { name: "Somalia", coords: [45.3418, 5.1521] as [number,number], count: 870, profiles: [
    {name:"Hodan Abdi",role:"Paediatrician",dest:"Norway",skills:["Paediatrics","Research"],score:90,av:"HA",color:"#22c55e"},
    {name:"Omar Farah",role:"Environmental Engineer",dest:"Sweden",skills:["GIS","Water Systems"],score:86,av:"OF",color:"#34d399"},
  ]},
  { name: "Venezuela", coords: [-66.5897, 6.4238] as [number,number], count: 760, profiles: [
    {name:"Maria Gonzalez",role:"Economist",dest:"Canada",skills:["Macro","Finance","R"],score:86,av:"MG",color:"#fb7185"},
    {name:"Carlos Ruiz",role:"Petroleum Engineer",dest:"Canada",skills:["Reservoir","GIS"],score:88,av:"CR",color:"#fbbf24"},
  ]},
];

const DESTINATIONS = [
  { name: "UK", coords: [-3.4360, 55.3781] as [number,number], count: 1240, profiles: [
    {name:"NHS England",role:"Employer · 34 open roles",dest:"Hiring Doctors & Nurses",skills:["Healthcare","Clinical"],score:0,av:"NHS",color:"#22c55e",isEmployer:true},
    {name:"Google DeepMind",role:"Employer · 12 open roles",dest:"Hiring ML Engineers",skills:["ML","AI","Research"],score:0,av:"G",color:"#60a5fa",isEmployer:true},
  ]},
  { name: "Germany", coords: [10.4515, 51.1657] as [number,number], count: 980, profiles: [
    {name:"Siemens AG",role:"Employer · 8 open roles",dest:"Hiring Engineers",skills:["Engineering","CAD"],score:0,av:"S",color:"#fbbf24",isEmployer:true},
    {name:"SAP",role:"Employer · 15 open roles",dest:"Hiring Developers",skills:["Software","Cloud"],score:0,av:"SAP",color:"#60a5fa",isEmployer:true},
  ]},
  { name: "Canada", coords: [-96.8147, 56.1304] as [number,number], count: 870, profiles: [
    {name:"Shopify",role:"Employer · 18 open roles",dest:"Hiring Developers",skills:["Tech","Product"],score:0,av:"SH",color:"#34d399",isEmployer:true},
  ]},
  { name: "France", coords: [2.2137, 46.2276] as [number,number], count: 720, profiles: [
    {name:"MSF",role:"Employer · 22 open roles",dest:"Hiring Medics",skills:["Medicine","Surgery"],score:0,av:"MSF",color:"#fb7185",isEmployer:true},
  ]},
  { name: "Australia", coords: [133.7751, -25.2744] as [number,number], count: 430, profiles: [
    {name:"Rio Tinto",role:"Employer · 9 open roles",dest:"Hiring Engineers",skills:["Mining","Engineering"],score:0,av:"RT",color:"#fbbf24",isEmployer:true},
  ]},
  { name: "Netherlands", coords: [5.2913, 52.1326] as [number,number], count: 540, profiles: [
    {name:"ASML",role:"Employer · 11 open roles",dest:"Hiring Engineers",skills:["Semiconductor","Physics"],score:0,av:"AS",color:"#a78bfa",isEmployer:true},
  ]},
  { name: "Sweden", coords: [18.6435, 60.1282] as [number,number], count: 390, profiles: [
    {name:"Spotify",role:"Employer · 7 open roles",dest:"Hiring Developers",skills:["Tech","Data"],score:0,av:"SP",color:"#22c55e",isEmployer:true},
  ]},
  { name: "Norway", coords: [8.4689, 60.4720] as [number,number], count: 280, profiles: [
    {name:"Equinor",role:"Employer · 6 open roles",dest:"Hiring Engineers",skills:["Energy","Engineering"],score:0,av:"EQ",color:"#60a5fa",isEmployer:true},
  ]},
];

const ARC_PAIRS: [[number,number],[number,number]][] = [
  [[38.99, 34.80], [-3.43, 55.37]],
  [[31.16, 48.37], [10.45, 51.16]],
  [[30.21, 12.86], [2.21, 46.22]],
  [[67.71, 33.93], [2.21, 46.22]],
  [[23.65, -2.87], [-96.81, 56.13]],
  [[95.95, 16.86], [133.77, -25.27]],
  [[8.67, 9.08], [-3.43, 55.37]],
  [[40.48, 9.14], [10.45, 51.16]],
  [[45.34, 5.15], [18.64, 60.12]],
  [[-66.58, 6.42], [-96.81, 56.13]],
];

const PROFILES_ALL = [
  {id:1,name:"Amir Mohammadi",origin:"Syria",dest:"UK",role:"Senior Software Engineer",exp:8,skills:["Python","React","AWS","ML"],score:98,avatar:"AM",color:"#f59e0b"},
  {id:2,name:"Fatima Khalid",origin:"Sudan",dest:"Germany",role:"Cardiologist",exp:12,skills:["Cardiology","Surgery","Research"],score:95,avatar:"FK",color:"#22c55e"},
  {id:3,name:"Emmanuel Nkrumah",origin:"DR Congo",dest:"Canada",role:"Civil Engineer",exp:6,skills:["Structural","AutoCAD","BIM"],score:91,avatar:"EN",color:"#a78bfa"},
  {id:4,name:"Sophia Andreou",origin:"Ukraine",dest:"Netherlands",role:"Data Scientist",exp:5,skills:["R","Power BI","SQL","Forecasting"],score:89,avatar:"SA",color:"#60a5fa"},
  {id:5,name:"Leila Rostami",origin:"Afghanistan",dest:"France",role:"Particle Physicist",exp:10,skills:["CERN","Data Analysis","Python"],score:94,avatar:"LR",color:"#fb7185"},
  {id:6,name:"Ahmed Farouk",origin:"Sudan",dest:"Australia",role:"Neurosurgeon",exp:15,skills:["Neurosurgery","Research","Teaching"],score:92,avatar:"AF",color:"#fbbf24"},
  {id:7,name:"Priya Venkataraman",origin:"Myanmar",dest:"UK",role:"Architect",exp:7,skills:["Design","AutoCAD","BIM","Urban Planning"],score:87,avatar:"PV",color:"#34d399"},
  {id:8,name:"Chioma Okonkwo",origin:"Nigeria",dest:"Canada",role:"Petroleum Engineer",exp:9,skills:["Reservoir","Drilling","GIS"],score:88,avatar:"CO",color:"#fbbf24"},
  {id:9,name:"Biruk Tadesse",origin:"Ethiopia",dest:"Germany",role:"Software Engineer",exp:6,skills:["Python","ML","Django"],score:89,avatar:"BT",color:"#60a5fa"},
  {id:10,name:"Hodan Abdi",origin:"Somalia",dest:"Norway",role:"Paediatrician",exp:8,skills:["Paediatrics","Research","ICU"],score:90,avatar:"HA",color:"#22c55e"},
];

const EMPLOYERS = [
  {id:1,name:"NHS England",sector:"Healthcare",country:"UK",roles:34,hiring:["Doctors","Nurses","Specialists"],logo:"NHS",color:"#22c55e"},
  {id:2,name:"Google DeepMind",sector:"Technology",country:"UK",roles:12,hiring:["ML Engineers","Researchers","Data Scientists"],logo:"G",color:"#60a5fa"},
  {id:3,name:"Siemens AG",sector:"Engineering",country:"Germany",roles:8,hiring:["Civil Engineers","Mechanical","Project Managers"],logo:"S",color:"#fbbf24"},
  {id:4,name:"Shopify",sector:"Technology",country:"Canada",roles:18,hiring:["Developers","Product Managers","Designers"],logo:"SH",color:"#34d399"},
  {id:5,name:"MSF",sector:"Healthcare",country:"France",roles:22,hiring:["Doctors","Nurses","Logistics"],logo:"MSF",color:"#fb7185"},
  {id:6,name:"ASML",sector:"Technology",country:"Netherlands",roles:11,hiring:["Engineers","Physicists","Data Scientists"],logo:"AS",color:"#a78bfa"},
];

const FEED = [
  {type:"hired",name:"Rania Al-Hassan",detail:"Médecins Sans Frontières",time:"2 min ago"},
  {type:"matched",name:"Yusuf Okonkwo",detail:"Software Dev → Shopify Canada",time:"5 min ago"},
  {type:"new",name:"Dilnoza Yusupova",detail:"Economist · Tashkent → Oslo",time:"8 min ago"},
  {type:"hired",name:"Marco Esposito",detail:"Deutsche Bank · Risk Analyst",time:"12 min ago"},
  {type:"matched",name:"Priya Venkataraman",detail:"Architect → Foster + Partners",time:"18 min ago"},
  {type:"hired",name:"Leila Rostami",detail:"CERN · Particle Physicist",time:"31 min ago"},
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [matchForm, setMatchForm] = useState({name:"",role:"",origin:"",skills:""});
  const [matched, setMatched] = useState(false);
  const [tooltip, setTooltip] = useState<any>(null);

  const s: any = {
    app:{minHeight:"100vh",background:"#110a02",color:"#fff5e6",fontFamily:"'DM Sans','Segoe UI',sans-serif"},
    nav:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 32px",borderBottom:"1px solid rgba(245,158,11,0.08)",background:"rgba(17,10,2,0.97)",position:"sticky" as const,top:0,zIndex:100},
    card:{background:"rgba(255,245,230,0.04)",border:"1px solid rgba(245,158,11,0.08)",borderRadius:16,padding:20},
    input:{width:"100%",background:"rgba(255,245,230,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:10,color:"#fff5e6",padding:"10px 14px",fontSize:14,outline:"none",boxSizing:"border-box" as const},
    btn:{background:"#f59e0b",color:"#110a02",border:"none",borderRadius:10,padding:"12px 24px",fontSize:14,fontWeight:800,cursor:"pointer",width:"100%"},
    tag:(color:string)=>({padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:color+"18",color,border:`1px solid ${color}28`}),
    badge:(type:string)=>({padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700,background:type==="hired"?"rgba(34,197,94,0.15)":type==="matched"?"rgba(245,158,11,0.15)":"rgba(96,165,250,0.15)",color:type==="hired"?"#22c55e":type==="matched"?"#f59e0b":"#60a5fa"}),
    navLink:(active:boolean)=>({padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:active?700:400,background:active?"rgba(245,158,11,0.12)":"transparent",color:active?"#f59e0b":"rgba(255,245,230,0.35)",border:active?"1px solid rgba(245,158,11,0.2)":"1px solid transparent",transition:"all 0.2s"}),
  };

  const filteredProfiles = PROFILES_ALL.filter(p =>
    (!filterSkill || p.skills.some(sk => sk.toLowerCase().includes(filterSkill.toLowerCase()))) &&
    (!filterOrigin || p.origin.toLowerCase().includes(filterOrigin.toLowerCase()))
  );

  const renderMap = () => (
    <div style={{position:"relative",background:"#080500",borderRadius:16,overflow:"hidden",border:"1px solid rgba(245,158,11,0.08)"}}>
      <div style={{position:"absolute",top:14,left:16,fontSize:10,fontWeight:700,color:"rgba(245,158,11,0.6)",letterSpacing:1.5,zIndex:5}}>LIVE CONNECTIONS</div>
      <div style={{position:"absolute",top:14,right:16,display:"flex",alignItems:"center",gap:5,fontSize:9,color:"#f59e0b",fontWeight:700,zIndex:5}}>
        <div style={{width:5,height:5,background:"#f59e0b",borderRadius:"50%"}}></div>LIVE · click any marker
      </div>
      <div style={{position:"absolute",bottom:14,left:16,display:"flex",gap:12,zIndex:5}}>
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:"rgba(255,245,230,0.4)"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ef4444"}}></div>Origin countries
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:"rgba(255,245,230,0.4)"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e"}}></div>Destinations
        </div>
      </div>

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{scale:145,center:[10,10]}}
        style={{width:"100%",height:"auto",background:"#080500"}}
      >
        <Geographies geography={GEO_URL}>
          {({geographies}) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#141008"
                stroke="#1e1808"
                strokeWidth={0.4}
                style={{default:{outline:"none"},hover:{outline:"none",fill:"#1e1508"},pressed:{outline:"none"}}}
              />
            ))
          }
        </Geographies>

        {ARC_PAIRS.map(([from, to], i) => (
          <Line
            key={i}
            from={from}
            to={to}
            stroke="#f59e0b"
            strokeWidth={0.6}
            strokeOpacity={0.2}
            strokeDasharray="4 3"
          />
        ))}

        {ORIGINS.map(o => (
          <Marker key={o.name} coordinates={o.coords} onClick={() => setSelectedMarker(selectedMarker?.name === o.name ? null : {...o, type:"origin"})}>
            <circle r={8} fill="#ef4444" fillOpacity={0.15} stroke="none"/>
            <circle r={5} fill="#ef4444" fillOpacity={0.9} stroke="#110a02" strokeWidth={0.5} style={{cursor:"pointer"}}/>
            <text textAnchor="middle" y={-10} style={{fontFamily:"sans-serif",fontSize:6,fontWeight:700,fill:"#ef4444",pointerEvents:"none"}}>{o.name}</text>
          </Marker>
        ))}

        {DESTINATIONS.map(d => (
          <Marker key={d.name} coordinates={d.coords} onClick={() => setSelectedMarker(selectedMarker?.name === d.name ? null : {...d, type:"destination"})}>
            <circle r={8} fill="#22c55e" fillOpacity={0.15} stroke="none"/>
            <circle r={5} fill="#22c55e" fillOpacity={0.9} stroke="#110a02" strokeWidth={0.5} style={{cursor:"pointer"}}/>
            <text textAnchor="middle" y={-10} style={{fontFamily:"sans-serif",fontSize:6,fontWeight:700,fill:"#22c55e",pointerEvents:"none"}}>{d.name}</text>
          </Marker>
        ))}
      </ComposableMap>

      {selectedMarker && (
        <div style={{padding:"16px 20px",borderTop:"1px solid rgba(245,158,11,0.1)",background:"rgba(10,6,0,0.97)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:"#fff5e6"}}>{selectedMarker.type==="origin"?"Professionals from":"Employers in"} {selectedMarker.name}</div>
              <div style={{fontSize:11,color:"rgba(255,245,230,0.35)",marginTop:2}}>{selectedMarker.count?.toLocaleString()} {selectedMarker.type==="origin"?"registered professionals":"placements made"}</div>
            </div>
            <button onClick={()=>setSelectedMarker(null)} style={{padding:"5px 12px",background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",color:"#f59e0b",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Close</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {selectedMarker.profiles?.map((p:any,i:number) => (
              <div key={i} style={{padding:"12px 14px",background:"rgba(255,245,230,0.03)",border:"1px solid rgba(245,158,11,0.08)",borderRadius:12}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:p.color+"18",color:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{p.av}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff5e6"}}>{p.name}</div>
                    <div style={{fontSize:10,color:"rgba(255,245,230,0.35)",marginTop:1}}>{p.role}</div>
                    <div style={{fontSize:10,color:"rgba(245,158,11,0.6)",marginTop:1}}>{p.isEmployer ? p.dest : "→ "+p.dest}</div>
                  </div>
                  {!p.isEmployer && <div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:900,color:"#22c55e"}}>{p.score}%</div><div style={{fontSize:8,color:"rgba(255,245,230,0.3)"}}>match</div></div>}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {p.skills.map((sk:string)=><span key={sk} style={s.tag(p.color)}>{sk}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderHome = () => (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:500}}>
        <div style={{padding:"52px 32px 36px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:20,padding:"5px 14px",marginBottom:20,width:"fit-content"}}>
            <div style={{width:6,height:6,background:"#f59e0b",borderRadius:"50%"}}></div>
            <span style={{fontSize:11,color:"#f59e0b",fontWeight:700,letterSpacing:1}}>14,382 professionals ready to contribute</span>
          </div>
          <div style={{fontSize:46,fontWeight:900,lineHeight:1.05,letterSpacing:-2,color:"#fff5e6",marginBottom:16}}>
            Skills know<br/>no <span style={{color:"#f59e0b"}}>borders.</span><br/>Neither do <span style={{color:"#ef4444"}}>we.</span>
          </div>
          <p style={{fontSize:14,color:"rgba(255,245,230,0.45)",lineHeight:1.7,maxWidth:400,marginBottom:28}}>
            Bridge connects displaced professionals with employers who need exactly their skills. No bias. No barriers. Just talent meeting opportunity.
          </p>
          <div style={{display:"flex",gap:10,marginBottom:28}}>
            <button style={{...s.btn,width:"auto"}} onClick={()=>setTab("talent")}>Find your match</button>
            <button style={{...s.btn,width:"auto",background:"rgba(255,245,230,0.06)",color:"#fff5e6",border:"1px solid rgba(255,245,230,0.1)"}} onClick={()=>setTab("employers")}>Post a role</button>
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{display:"flex"}}>
              {[["AM","#f59e0b","#3a1a05"],["FK","#22c55e","#1a3a05"],["EN","#a78bfa","#1a0530"],["SA","#60a5fa","#051a3a"],["LR","#fb7185","#3a0515"]].map(([av,c,bg])=>(
                <div key={av} style={{width:26,height:26,borderRadius:"50%",background:bg,color:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,border:"2px solid #110a02",marginLeft:-5}}>{av}</div>
              ))}
            </div>
            <span style={{fontSize:12,color:"rgba(255,245,230,0.35)"}}><span style={{color:"#f59e0b",fontWeight:700}}>3,941 placements</span> made this year alone</span>
          </div>
        </div>
        <div style={{padding:"20px 20px 20px 0"}}>
          {renderMap()}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:"1px solid rgba(245,158,11,0.06)"}}>
        {[["14,382","Skilled professionals","↑ 312 this week","#f59e0b"],["3,941","Successful placements","↑ 27.4% this quarter","#22c55e"],["48","Countries connected","↑ 6 new this year","#ef4444"],["87.3%","AI match accuracy","↑ 4.1% improvement","#a78bfa"]].map(([n,l,d,c])=>(
          <div key={l} style={{padding:"20px 24px",borderRight:"1px solid rgba(245,158,11,0.06)"}}>
            <div style={{fontSize:28,fontWeight:900,letterSpacing:-1,color:c as string}}>{n}</div>
            <div style={{fontSize:11,color:"rgba(255,245,230,0.3)",marginTop:2}}>{l}</div>
            <div style={{fontSize:10,fontWeight:700,color:"#f59e0b",marginTop:3}}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{padding:"32px",borderTop:"1px solid rgba(245,158,11,0.06)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(245,158,11,0.4)",letterSpacing:2,marginBottom:20}}>LIVE ACTIVITY</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {FEED.map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(255,245,230,0.03)",borderRadius:10,border:"1px solid rgba(245,158,11,0.06)"}}>
              <span style={s.badge(f.type)}>{f.type==="hired"?"Hired":f.type==="matched"?"Matched":"New"}</span>
              <span style={{fontSize:13,fontWeight:700,color:"#fff5e6"}}>{f.name}</span>
              <span style={{fontSize:12,color:"rgba(255,245,230,0.35)"}}>— {f.detail}</span>
              <span style={{fontSize:11,color:"rgba(255,245,230,0.2)",marginLeft:"auto"}}>{f.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"0 32px 40px"}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(245,158,11,0.4)",letterSpacing:2,marginBottom:20}}>HOW BRIDGE WORKS</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {[["01","Build your profile","Upload credentials and skills. Our AI verifies qualifications across borders.","#f59e0b"],["02","Get matched","Our algorithm surfaces top roles that fit your skills — no bias, no gatekeeping.","#ef4444"],["03","Connect directly","Message employers directly. We handle translation and legal guidance.","#22c55e"],["04","Start your future","Begin your new role with on-the-ground support and mentorship from day one.","#a78bfa"]].map(([n,t,d,c])=>(
            <div key={n} style={{padding:18,background:"rgba(255,245,230,0.03)",border:`1px solid rgba(255,245,230,0.06)`,borderRadius:12,borderTop:`2px solid ${c}`}}>
              <div style={{fontSize:10,fontWeight:800,color:"rgba(255,245,230,0.2)",marginBottom:6}}>{n}</div>
              <div style={{fontSize:12,fontWeight:800,color:"#fff5e6",marginBottom:4}}>{t}</div>
              <div style={{fontSize:10,color:"rgba(255,245,230,0.3)",lineHeight:1.5}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTalent = () => (
    <div style={{padding:32}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:24,fontWeight:900,color:"#fff5e6",marginBottom:4}}>Talent Pool</div>
        <div style={{fontSize:13,color:"rgba(255,245,230,0.35)"}}>Browse {PROFILES_ALL.length} skilled professionals ready for placement</div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:24}}>
        <input style={s.input} placeholder="Filter by skill (e.g. Python, Surgery...)" value={filterSkill} onChange={e=>setFilterSkill(e.target.value)}/>
        <input style={{...s.input,maxWidth:220}} placeholder="Filter by origin country" value={filterOrigin} onChange={e=>setFilterOrigin(e.target.value)}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {filteredProfiles.map(p=>(
          <div key={p.id} onClick={()=>setSelectedProfile(selectedProfile?.id===p.id?null:p)} style={{...s.card,cursor:"pointer",border:selectedProfile?.id===p.id?`1px solid ${p.color}40`:"1px solid rgba(245,158,11,0.08)"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:p.color+"18",color:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,flexShrink:0}}>{p.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff5e6"}}>{p.name}</div>
                <div style={{fontSize:12,color:"rgba(255,245,230,0.4)",marginTop:2}}>{p.role} · {p.exp} yrs</div>
                <div style={{fontSize:11,color:"rgba(255,245,230,0.25)",marginTop:2}}>{p.origin} → {p.dest}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
                  {p.skills.map(sk=><span key={sk} style={s.tag(p.color)}>{sk}</span>)}
                </div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:"#22c55e"}}>{p.score}%</div>
                <div style={{fontSize:9,color:"rgba(255,245,230,0.3)"}}>match</div>
              </div>
            </div>
            {selectedProfile?.id===p.id&&(
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(245,158,11,0.1)"}}>
                <div style={{fontSize:12,color:"rgba(255,245,230,0.4)",marginBottom:10}}>Ready to connect with {p.name}?</div>
                <div style={{display:"flex",gap:8}}>
                  <button style={{...s.btn,padding:"8px 16px",fontSize:12}}>Request introduction</button>
                  <button style={{padding:"8px 16px",background:"rgba(255,245,230,0.05)",color:"#fff5e6",border:"1px solid rgba(255,245,230,0.1)",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>View full profile</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmployers = () => (
    <div style={{padding:32}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:24,fontWeight:900,color:"#fff5e6",marginBottom:4}}>Partner Employers</div>
        <div style={{fontSize:13,color:"rgba(255,245,230,0.35)"}}>{EMPLOYERS.length} organisations actively hiring refugee talent</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {EMPLOYERS.map(e=>(
          <div key={e.id} style={s.card}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <div style={{width:42,height:42,borderRadius:10,background:e.color+"18",color:e.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900}}>{e.logo}</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff5e6"}}>{e.name}</div>
                <div style={{fontSize:11,color:"rgba(255,245,230,0.35)"}}>{e.sector} · {e.country}</div>
              </div>
            </div>
            <div style={{fontSize:22,fontWeight:900,color:e.color,marginBottom:2}}>{e.roles}</div>
            <div style={{fontSize:11,color:"rgba(255,245,230,0.3)",marginBottom:12}}>open roles</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
              {e.hiring.map(h=><span key={h} style={s.tag(e.color)}>{h}</span>)}
            </div>
            <button style={{...s.btn,padding:"8px 14px",fontSize:12}}>Browse roles</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMatch = () => (
    <div style={{padding:32,maxWidth:560,margin:"0 auto"}}>
      <div style={{marginBottom:28,textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:900,color:"#fff5e6",marginBottom:8}}>Find your match</div>
        <div style={{fontSize:14,color:"rgba(255,245,230,0.4)"}}>Tell us about yourself and we'll connect you with the right opportunity</div>
      </div>
      {!matched?(
        <div style={s.card}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[["Full name","e.g. Amir Mohammadi","name"],["Your profession","e.g. Software Engineer, Doctor...","role"],["Country of origin","e.g. Syria, Ukraine, Sudan...","origin"],["Key skills (comma separated)","e.g. Python, Surgery, AutoCAD...","skills"]].map(([label,ph,key])=>(
              <div key={key}>
                <label style={{fontSize:12,color:"#f59e0b",fontWeight:700,display:"block",marginBottom:6}}>{label}</label>
                <input style={s.input} placeholder={ph} value={(matchForm as any)[key]} onChange={e=>setMatchForm({...matchForm,[key]:e.target.value})}/>
              </div>
            ))}
            <button style={s.btn} onClick={()=>{if(matchForm.name&&matchForm.role)setMatched(true);}}>Find my matches →</button>
          </div>
        </div>
      ):(
        <div>
          <div style={{...s.card,textAlign:"center",marginBottom:20,border:"1px solid rgba(34,197,94,0.2)"}}>
            <div style={{fontSize:32,fontWeight:900,color:"#22c55e",marginBottom:4}}>Match found!</div>
            <div style={{fontSize:14,color:"rgba(255,245,230,0.4)"}}>We found 3 strong matches for {matchForm.name}</div>
          </div>
          {PROFILES_ALL.slice(0,3).map(p=>(
            <div key={p.id} style={{...s.card,marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:p.color+"18",color:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800}}>{p.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff5e6"}}>{p.role}</div>
                <div style={{fontSize:11,color:"rgba(255,245,230,0.35)",marginTop:2}}>{p.dest} · {p.exp} years experience</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:"#22c55e"}}>{p.score}%</div>
                <div style={{fontSize:9,color:"rgba(255,245,230,0.3)"}}>match</div>
              </div>
            </div>
          ))}
          <button style={{...s.btn,marginTop:8}} onClick={()=>setMatched(false)}>Start over</button>
        </div>
      )}
    </div>
  );

  return (
    <div style={s.app}>
      <div style={s.nav}>
        <div style={{fontSize:20,fontWeight:900,color:"#fff5e6",letterSpacing:-0.5}}>Bridge<span style={{color:"#f59e0b"}}>.</span></div>
        <div style={{display:"flex",gap:6}}>
          {[["home","Home"],["talent","Talent Pool"],["employers","Employers"],["match","Find a Match"]].map(([id,label])=>(
            <button key={id} style={s.navLink(tab===id)} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>
        <button style={{padding:"9px 20px",background:"#f59e0b",color:"#110a02",border:"none",borderRadius:8,fontSize:13,fontWeight:800,cursor:"pointer"}} onClick={()=>setTab("match")}>Get started</button>
      </div>
      {tab==="home"&&renderHome()}
      {tab==="talent"&&renderTalent()}
      {tab==="employers"&&renderEmployers()}
      {tab==="match"&&renderMatch()}
    </div>
  );
}
