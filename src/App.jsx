import { useState, useEffect } from "react";

const GenButton = ({ generatorId, label }) => (
  <button style={{ background:"transparent", border:`1px solid #2e3d50`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".06em", color:"#e8eef4", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
    {label}
  </button>
);

const Analytics = () => null;

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Oswald:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  `}</style>
);

const C = {
  blue:    "#0067FF",
  orange:  "#FF6700",
  bg:      "#1c1c1c",
  surface: "#252527",
  surf2:   "#2c2c2e",
  border:  "#2e3d50",
  text:    "#f2f6fa",   // 16.8:1 AAA
  muted:   "#e8eef4",   // lifted for readability
  dim:     "#96aec4",   //  6.1:1 AA
  yellow:  "#FFD600",
};



const G = () => (
  <style>{`
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:${C.bg};color:${C.text};font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;line-height:1.65;}
    ::selection{background:rgba(0,103,255,.35);}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-track{background:${C.bg};}
    ::-webkit-scrollbar-thumb{background:${C.border};}
    .d{font-family:'Bricolage Grotesque',sans-serif;}
    .n{font-family:'Oswald',sans-serif;}

    @keyframes up{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
    @keyframes in{from{opacity:0;}to{opacity:1;}}
    @keyframes tick{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
    .u0{animation:up .5s .05s both;}.u1{animation:up .5s .18s both;}
    .u2{animation:up .5s .32s both;}.u3{animation:up .5s .46s both;}
    .u4{animation:up .5s .60s both;}.u5{animation:up .5s .76s both;}

    /* ALL CAPS BOLD WHITE utility */
    .caps{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.text};}
    /* ALL CAPS DIM - nav/section labels */
    .caps-dim{font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.dim};}

    .nav-link{background:none;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.muted};padding:8px 10px;border-radius:6px;cursor:pointer;transition:color .18s;white-space:normal;text-align:center;line-height:1.3;}
    .nav-link:hover{color:${C.text};}
    .nav-link.on{color:${C.text};position:relative;}
    .nav-link.on::after{content:'';position:absolute;bottom:0;left:8px;right:8px;height:2px;background:${C.orange};border-radius:2px;}

    .nav-tabs-desktop{display:flex;flex:1;justify-content:flex-end;align-items:center;}
    .nav-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;padding:8px;border-radius:6px;}
    .nav-hamburger span{display:block;width:22px;height:2px;background:${C.muted};border-radius:2px;transition:transform .22s,opacity .22s,background .18s;}
    .nav-hamburger:hover span{background:${C.text};}
    .nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .nav-hamburger.open span:nth-child(2){opacity:0;}
    .nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

    .nav-drawer{position:absolute;top:100%;left:0;right:0;background:rgba(13,15,20,.98);backdrop-filter:blur(16px);border-bottom:1px solid ${C.border};z-index:199;animation:in .18s ease;}
    .nav-drawer-link{display:block;width:100%;background:none;border:none;border-bottom:1px solid ${C.border};font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.muted};padding:18px 24px;cursor:pointer;text-align:left;transition:color .15s,background .15s;}
    .nav-drawer-link:hover{color:${C.text};background:rgba(255,255,255,.03);}
    .nav-drawer-link.on{color:${C.text};border-left:3px solid ${C.orange};}
    .nav-drawer-link:last-child{border-bottom:none;}

    @media(max-width:768px){
      .nav-tabs-desktop{display:none!important;}
      .nav-hamburger{display:flex!important;}
    }

    .ticker-wrap{background:${C.blue};overflow:hidden;padding:11px 0;border-top:1px solid ${C.orange};border-bottom:1px solid ${C.orange};margin:28px 0;}
    .ticker-inner{display:flex;width:max-content;animation:tick 34s linear infinite;}
    .ticker-item{display:flex;align-items:center;gap:12px;padding:0 32px;font-family:'Oswald',sans-serif;font-size:14px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:black;white-space:nowrap;}
    .ticker-sep{width:4px;height:4px;border-radius:50%;background:${C.orange};flex-shrink:0;}

    .chain-node{position:relative;padding-left:48px;padding-bottom:24px;}
    .chain-node::after{content:'';position:absolute;left:11px;top:26px;bottom:0;width:1px;background:linear-gradient(to bottom,${C.border} 0%,transparent 100%);}
    .chain-node:last-child::after{display:none;}
    .chain-node:last-child{padding-bottom:0;}

    .pos-btn{background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:20px 22px;cursor:pointer;text-align:left;transition:border-color .2s;width:100%;}
    .pos-btn:hover{border-color:${C.dim};}
    .pos-btn.on{border-color:${C.orange};border-width:2px;}

    /* ── Accent border system: thin top/right, weighted left/bottom ── */
    .card-blue{border-top:1px solid ${C.blue}!important;border-right:1px solid ${C.blue}!important;border-bottom:3px solid ${C.blue}!important;border-left:4px solid ${C.blue}!important;transition:box-shadow .25s,border-color .25s;}
    .card-blue:hover,.card-blue.active{box-shadow:0 0 0 1px ${C.blue},0 0 28px rgba(0,103,255,.55),0 4px 24px rgba(0,103,255,.35);}
    .card-orange{border-top:1px solid ${C.orange}!important;border-right:1px solid ${C.orange}!important;border-bottom:3px solid ${C.orange}!important;border-left:4px solid ${C.orange}!important;transition:box-shadow .25s,border-color .25s;}
    .card-orange:hover,.card-orange.active{box-shadow:0 0 0 1px ${C.orange},0 0 28px rgba(255,103,0,.55),0 4px 24px rgba(255,103,0,.35);}
    .card-dim{border-top:1px solid ${C.border}!important;border-right:1px solid ${C.border}!important;border-bottom:3px solid ${C.border}!important;border-left:4px solid ${C.border}!important;transition:box-shadow .25s;}

    /* pillar-card and sf-card inherit accent via class */
    .pillar-card{background:${C.surface};border-radius:12px;cursor:pointer;}
    .sf-card{background:${C.surface};border-radius:12px;cursor:pointer;}

    .xbody{max-height:0;overflow:hidden;opacity:0;transition:max-height .42s cubic-bezier(.4,0,.2,1),opacity .28s;}
    .xbody.open{max-height:6000px;opacity:1;}

    .card-silver{border-top:1px solid #c0c8d8!important;border-right:1px solid #c0c8d8!important;border-bottom:3px solid #c0c8d8!important;border-left:4px solid #c0c8d8!important;transition:box-shadow .25s;}
    .card-silver:hover{box-shadow:0 0 0 1px #c0c8d8,0 0 24px rgba(192,200,216,.5),0 4px 18px rgba(192,200,216,.35);}

    /* ── Callout left-accent blocks ── */
    .callout-left-blue{padding:18px 22px;border:1px solid ${C.border};border-left:3px solid ${C.blue};border-radius:0 10px 10px 0;transition:box-shadow .25s;}
    .callout-left-blue:hover{box-shadow:-4px 0 16px rgba(0,103,255,.45);}
    .callout-left-orange{padding:18px 22px;border:1px solid ${C.border};border-left:3px solid ${C.orange};border-radius:0 10px 10px 0;transition:box-shadow .25s;}
    .callout-left-orange:hover{box-shadow:-4px 0 16px rgba(255,103,0,.45);}

    .sec-reveal{position:relative;overflow:hidden;transition:max-height .48s cubic-bezier(.4,0,.2,1);}
    .sec-reveal-fade{position:absolute;bottom:0;left:0;right:0;height:90px;pointer-events:none;transition:opacity .3s;}

    @media(max-width:720px){
      .pillar-grid{grid-template-columns:repeat(2,1fr)!important;gap:16px!important;}
      .three-col{grid-template-columns:1fr!important;}
      .two-col{grid-template-columns:1fr!important;}
      .hero-stats{grid-template-columns:1fr 1fr!important;}
      .hero-stats > div:nth-child(1),.hero-stats > div:nth-child(2){border-bottom:1px solid rgba(255,103,0,.4);}
      .hero-stats > div:nth-child(2),.hero-stats > div:nth-child(4){border-right:none!important;}
      .pos-grid{grid-template-columns:1fr 1fr!important;}
      .tourist-grid{grid-template-columns:1fr!important;}
      .multiplier-bar{flex-direction:column!important;align-items:stretch!important;}
      .multiplier-bar > div:last-child{padding-left:0!important;padding-top:16px!important;max-width:none!important;border-top:1px solid rgba(255,255,255,.08);margin-top:4px;}
      .multiplier-divider{display:none!important;}
      section{padding-top:40px!important;padding-bottom:40px!important;}
      .u3 button{padding:10px 18px!important;font-size:12px!important;}
      section > div[style], nav > div[style], footer > div[style]{ padding-left:20px!important; padding-right:20px!important; }
    }
    @media(max-width:440px){
      .pos-grid{grid-template-columns:1fr!important;}
      .pillar-grid{grid-template-columns:1fr 1fr!important;gap:12px!important;}
      section{padding-top:28px!important;padding-bottom:28px!important;}
      section > div[style], nav > div[style], footer > div[style]{ padding-left:16px!important; padding-right:16px!important; }
    }
  `}</style>
);

const W = { maxWidth: 1400, margin: "0 auto", padding: "0 120px" };

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

// Section nav label - caps dim, low engagement
const SecLabel = ({ children, color = C.dim }) => (
  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize:18, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.text, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 48, height: 48, borderRadius: 8, background: "transparent", flexShrink: 0, overflow: "hidden" }}>
      <img src="https://infiniterestaurants.ai/IR_Mini.png" alt="" style={{ width: 48, height: 48, objectFit: "contain", display: "block" }} onError={e => { e.currentTarget.style.display = "none"; }} />
    </div>
    <span style={{ color: C.dim }}>[</span>
    {children}
    <span style={{ color: C.dim }}>]</span>
  </div>
);

// Badge: border only, no fill
const Badge = ({ children, color = C.dim }) => (
  <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, border: `1px solid ${color}`, color }}>
    {children}
  </span>
);

// Expandable row
const Expand = ({ headline, sub, accent = C.blue, badge, bcolor, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "24px 0", textAlign: "left", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1 }}>
          {badge && <><Badge color={bcolor || C.dim}>{badge}</Badge><div style={{ height: 10 }} /></>}
          {/* Expand headline = bold white */}
          <div className="d" style={{ fontSize: "clamp(19px,2.4vw,22px)", fontWeight: 700, color: C.text, lineHeight: 1.22 }}>{headline}</div>
          {sub && !open && <p style={{ fontSize: 19, color: C.muted, marginTop: 8, lineHeight: 1.7 }}>{sub}</p>}
        </div>
        <div style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 6, border: `1px solid ${open?C.blue:C.orange}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .3s,border-color .2s", transform: open ? "rotate(45deg)" : "none", color: open ? C.orange : C.blue, marginTop: 3 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
        </div>
      </button>
      <div className={`xbody ${open ? "open" : ""}`}>
        <div style={{ paddingBottom: 28 }}>{children}</div>
      </div>
    </div>
  );
};

const ScrollProg = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const d = document.documentElement; setP((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100); };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 300 }}>
      <div style={{ height: "100%", width: `${p}%`, background: `linear-gradient(90deg,${C.blue},${C.orange})`, transition: "width .08s" }} />
    </div>
  );
};

const SectionReveal = ({ children, accent = C.blue, label = "Continue reading", collapsedHeight = 243 }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="sec-reveal" style={{ maxHeight: open ? 12000 : collapsedHeight }}>
        {children}
        {!open && <div className="sec-reveal-fade" style={{ background:`linear-gradient(to bottom,transparent,${C.bg})` }}/>}
      </div>
      <button onClick={() => setOpen(o => !o)} style={{ width:"100%", background:"none", border:"none", borderTop:`1px solid ${C.border}`, padding:"12px 0 0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginTop:18 }}>
        <div style={{ width:48, height:48, borderRadius:8, border:`1.5px solid ${open?C.blue:C.orange}`, background:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color .25s", color:open?C.orange:C.blue, flexShrink:0 }}><svg width="22" height="22" viewBox="0 0 13 13" fill="none" style={{ transform:open?"rotate(45deg)":"none", transition:"transform .3s" }}><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/></svg></div>
      </button>
    </div>
  );
};

const Logo = () => (
  <div style={{ height: 61, display: "flex", alignItems: "center" }}>
    <img
      src="https://infiniterestaurants.ai/IR_Logo.png"
      alt="Infinite Restaurants"
      style={{ height: 61, width: "auto", objectFit: "contain" }}
    />
  </div>
);

const Nav = ({ active }) => {
  const [open, setOpen] = useState(false);
  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  const sections = [
    ["who",    "Super Tourist"],
    ["where",  "Travel Patterns"],
    ["position","Your Position"],
    ["action", "Prep Priorities"],
    ["ai",     "HI ∞ AI ∞ HI Prompts"],
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(13,15,20,.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...W, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "26px 120px", position: "relative" }}>
        <Logo />

        {/* Desktop tabs */}
        <div className="nav-tabs-desktop">
          {[["who",<>Super<br/>Tourist</>],["where",<>Travel<br/>Patterns</>],["position",<>Your<br/>Position</>],["action",<>Prep<br/>Priorities</>],["ai",<>HI ∞ AI ∞ HI<br/>Prompts</>]].map(([id, label]) => (
            <button key={id} className={`nav-link ${active === id ? "on" : ""}`} onClick={() => go(id)} style={{ flex:1 }}>{label}</button>
          ))}
        </div>

        {/* Hamburger button - mobile only */}
        <button
          className={`nav-hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span/><span/><span/>
        </button>

        {/* Mobile drawer */}
        {open && (
          <div className="nav-drawer">
            {sections.map(([id, label]) => (
              <button
                key={id}
                className={`nav-drawer-link ${active === id ? "on" : ""}`}
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const ticks = ["June 11 - July 19","16 Host Cities","3 Countries","1M+ International Visitors","$140-180 Daily F&B Spend","7-16 Night Average Stay","36% Post-Match F&B Lift","18x Spending Surge - Saransk 2018","70% Gateway Travel Rate","4-8 Person Groups","Non-Match Days Drive Sustained Revenue"];
const Ticker = () => (
  <div className="ticker-wrap">
    <div className="ticker-inner">
      {[...ticks,...ticks].map((t,i) => <div key={i} className="ticker-item"><span className="ticker-sep"/>{t}</div>)}
    </div>
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = ({ onContinue }) => (
  <section style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "clamp(40px,8vh,100px) 0 clamp(24px,4vh,48px)", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,103,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,103,255,.025) 1px,transparent 1px)`, backgroundSize: "56px 56px" }} />
    <div style={{ position: "absolute", left: "-10%", top: "15%", width: "50%", height: "60%", background: `radial-gradient(ellipse,rgba(0,103,255,.07),transparent 65%)`, pointerEvents: "none" }} />
    <div style={{ position: "absolute", right: "-5%", bottom: "10%", width: "40%", height: "50%", background: `radial-gradient(ellipse,rgba(255,103,0,.05),transparent 65%)`, pointerEvents: "none" }} />
    <div style={{ ...W, position: "relative", zIndex: 1, padding: "48px 120px 18px" }}>
      {/* Hero headline */}
      <h1 className="d u1" style={{ fontSize: "clamp(28px,5vw,64px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.03em", marginBottom: 28, color: C.text }}>
        <span style={{ color: C.text }}>Forget</span><span style={{ color: C.text }}> </span><span style={{ color: C.blue }}>Soccer</span><span style={{ color: C.text }}> in Stadiums.</span><br />
        <span style={{ color: C.text }}>Think</span><span style={{ color: C.text }}> </span><span style={{ color: C.orange }}>Tourism Surge </span><span style={{ color: C.text }}>Between Matches.</span>
      </h1>
      <p className="u2" style={{ fontSize: "clamp(18px,2.2vw,22px)", fontWeight: 700, color: C.text, fontStyle: "italic", lineHeight: 1.6, marginBottom: 28, maxWidth: "90%", paddingLeft: 20, borderLeft: `3px solid ${C.blue}` }}>
        "I'm 20-miles, 40-miles, 80-plus miles away. This isn't going to affect me."
      </p>
      <div className="u2" style={{ marginBottom: 48, maxWidth: "90%" }}>
        <p style={{ fontSize: "clamp(18px,2.4vw,22px)", fontWeight: 900, color: C.text, lineHeight: 1.6, marginBottom: 14, textTransform: "uppercase", letterSpacing: ".06em" }}>Three tournaments, the same pattern:</p>
        <p style={{ fontSize: "clamp(17px,2vw,20px)", fontWeight: 300, color: C.muted, lineHeight: 1.78 }}>
          Repeated patterns from the last three World Cup Tournaments tell us reliably what to expect where we're not expecting it. The biggest spending increases didn't happen next to stadiums. They happened in secondary markets; smaller cities, regional hubs, the places fans used as a base while they explore. Super Tourists are mobile. They set up more affordable base camps miles outside the host city. They eat where the wait times are shorter, they prefer local independents over chain brands, and they spend $140 to $180 per person per day doing it.
        </p>
      </div>
      <div className="u5 hero-stats card-blue" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", alignItems: "center", marginTop: 0, borderRadius: 12, overflow: "hidden", background: C.surface }}>
        {[
          { parts:[{t:"1",c:C.blue},{t:".",c:C.text},{t:"5m",c:C.blue},{t:"+",c:C.text}], l:"Super Tourists" },
          { parts:[{t:"80",c:C.orange},{t:"-",c:C.text},{t:"mile",c:C.orange}],           l:"Excursion Range" },
          { parts:[{t:"$",c:C.text},{t:"160",c:C.blue}],                                   l:"F&B Spend/Day" },
          { parts:[{t:"35",c:C.orange}],                                                    l:"Day Surge" },
        ].map((s,i) => (
          <div key={i} style={{ flex: 1, padding: "22px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, borderRight: i < 3 ? `1px solid ${C.orange}` : "none" }}>
            <div className="n" style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, lineHeight: 1 }}>
              {s.parts.map((p,j) => <span key={j} style={{ color: p.c }}>{p.t}</span>)}
            </div>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Sec = ({ id, num, label, accent = C.blue, children }) => (
  <section id={id} style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
    <div style={W}>
      <SecLabel color={accent}>{label}</SecLabel>
      {children}
    </div>
  </section>
);

const statModalContent = {
  stay: {
    label: "Stay Length",
    headline: "A fourteen-night stay isn't a spike. It's thirty meals.",
    body: [
      "By origin market: South America averages 16 nights. Europe, 14. Asia-Pacific, 13. United States and Canada, 10. A visitor from Buenos Aires attending two matches still has twelve non-match days - every one of them eating out, exploring, and spending at full rate with no particular anchor.",
      "The operators who captured the most revenue in prior tournaments weren't the ones with the best match-day experience. They were the ones who were simply open, stocked, and ready on the days nobody else was thinking about.",
    ],
  },
  spend: {
    label: "Daily F&B Spend",
    headline: "$140 to $180 per person per day is the working floor.",
    body: [
      "Derived from Russia 2018 and Brazil 2014 tournament data, adjusted for US price levels and 2026 inflation. This supersedes the unadjusted Tourism Economics baseline of $100-140, which doesn't reflect US market conditions.",
      "A table of six Super Tourists staying three hours is a fundamentally different economic event than your average domestic party. Group size, dwell time, and alcohol attach rates all compound. The $140-180 range is not a ceiling.",
    ],
  },
  dinner: {
    label: "Dinner Window",
    headline: "Their evening starts when yours ends.",
    body: [
      "European and South American fans follow home-country dining rhythms. Add post-match social behavior and the peak demand window shifts to 9 PM through midnight. Brazil 2014 documented post-match social windows averaging three to five hours in walkable locations.",
      "Win or lose, the crowd stays. That window opens fifteen minutes after the final whistle. Operators who close at 10 PM on match nights are closing before the Super Tourist's evening has peaked. Extending hours is the single most direct lever available.",
    ],
  },
  table: {
    label: "Table Time",
    headline: "90 to 120 minutes means your turn math is different.",
    body: [
      "Standard American dining turns in 45-60 minutes. Super Tourists linger. Group travel, multiple courses, post-match conversation - table time nearly doubles. Your covers-per-night calculation for match windows needs to account for this, not fight it.",
      "The revenue per table is higher. The turns are fewer. Staff accordingly - more coverage per table, less chase for rapid turnover.",
    ],
  },
  mobility: {
    label: "Mobility",
    headline: "70% use host cities as a base and make day trips.",
    body: [
      "Consistent across Brazil 2014, Russia 2018, and Qatar 2022. An operator 90 miles from the nearest stadium, sitting on a route those visitors travel, is inside this event whether they know it or not.",
      "About 60% of Super Tourist trips are fully incremental - these visitors wouldn't be in North America at all without the tournament. They're not displacing your existing customers. They're on top of them.",
    ],
  },
  payment: {
    label: "Payment",
    headline: "Contactless is not a premium feature for these visitors. It's a baseline expectation.",
    body: [
      "Russia 2018: contactless payments accounted for 45% of all purchases in host cities, 54% within stadiums. Qatar 2022: 88% at official venues. International visitors from Europe, Australia, South America, and the Gulf region trend 80-90% contactless.",
      "Contactless processes approximately 10 times faster than a card swipe. At post-match volume, that speed difference determines whether a queue becomes a walk-out. If any terminal rejects tap-to-pay, replace it before June.",
    ],
  },
};

const StatModal = ({ id, onClose }) => {
  const content = statModalContent[id];
  if (!content) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.72)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", backdropFilter:"blur(4px)", animation:"in .18s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`1px solid ${C.blue}`, borderRadius:14, maxWidth:560, width:"100%", overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,.5)" }}>
        <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.blue }}>{content.label}</span>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"50%", width:30, height:30, cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ padding:"24px" }}>
          <div className="d" style={{ fontSize:19, fontWeight:700, color:C.text, lineHeight:1.25, marginBottom:18 }}>{content.headline}</div>
          {content.body.map((p,i) => (
            <p key={i} style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom: i < content.body.length-1 ? 14 : 0 }}>{p}</p>
          ))}
        </div>
        <div style={{ padding:"14px 24px", borderTop:`1px solid ${C.border}`, background:C.surf2 }}>
          <p style={{ fontSize:14, color:C.dim }}>Tap anywhere outside to close.</p>
        </div>
      </div>
    </div>
  );
};

// ─── SECTION 1: WHO IS COMING ─────────────────────────────────────────────────
const SWho = () => {
  const [modal, setModal] = useState(null);
  return (
  <Sec id="who" num="01" label="The Super Tourist" accent={C.blue}>
    <h2 className="d" style={{ fontSize: "clamp(28px,4.2vw,48px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: 18, color: C.text }}>
      Meet the <span style={{ color: C.orange }}>Super</span> <span style={{ color: C.blue }}>Tourist</span><span style={{ color: C.text }}>.</span>
    </h2>
    <p style={{ fontSize: 19, color: C.muted, fontWeight: 300, lineHeight: 1.78, marginBottom: 10, maxWidth: "90%" }}>
      These visitors aren't just coming to watch a match and go home. Many are setting up camp in cities miles away from a stadium, exploring towns and excursion sites up to 100 miles away or more. They're coming in waves, moving in groups, and looking for screens, seats, and eats that'll help them keep up with the 96 games being played elsewhere.
    </p>
    <p style={{ fontSize: 21, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.text, marginBottom: 6, maxWidth: "90%" }}>The host cities can't contain them.</p>
    <p style={{ fontSize: 19, color: C.muted, fontWeight: 300, lineHeight: 1.78, marginBottom: 24, maxWidth: "90%" }}>
      Your town could be along their route whether you're planning for it. <strong><em style={{ color: C.text, fontWeight: 700 }}>and we're going to be feeding and serving them for a month.</em></strong>
    </p>

    <SectionReveal accent={C.blue} label="Meet the Super Tourist">

    {/* Multiplier bar */}
    <div className="card-blue" style={{ background: C.surface, borderRadius: 12, padding: "22px 28px", marginBottom: 20 }}>
      <div className="multiplier-bar" style={{ display: "flex", alignItems: "center" }}>

        <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 16, flexWrap: "wrap" }}>

          <div style={{ flex: 1, textAlign: "center", minWidth: 60 }}>
            <div className="n" style={{ fontSize: 38, fontWeight: 700, color: C.blue, lineHeight: 1 }}><span style={{ color: C.text, fontWeight: 400 }}>~</span>2<span style={{ color: C.text, fontWeight: 400 }}>x</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.text, marginTop: 5 }}>Daily F&B Spend</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 32 }}>
            <span className="n" style={{ fontSize: 28, fontWeight: 400, color: C.text }}>x</span>
          </div>

          <div style={{ flex: 1, textAlign: "center", minWidth: 60 }}>
            <div className="n" style={{ fontSize: 38, fontWeight: 700, color: C.orange, lineHeight: 1 }}>3<span style={{ color: C.text, fontWeight: 400 }}>x</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.text, marginTop: 5 }}>Stay Length</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 32 }}>
            <span className="n" style={{ fontSize: 28, fontWeight: 400, color: C.text }}>=</span>
          </div>

          <div style={{ flex: 1, textAlign: "center", minWidth: 60 }}>
            <div className="n" style={{ fontSize: 38, fontWeight: 700, color: C.blue, lineHeight: 1 }}>6<span style={{ color: C.text, fontWeight: 400 }}>.</span>5<span style={{ color: C.text, fontWeight: 400 }}>x</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.text, marginTop: 5 }}>Revenue Potential</div>
          </div>

        </div>

        {/* Vertical divider - hidden on mobile */}
        <div className="multiplier-divider" style={{ width: 1, background: C.border, alignSelf: "stretch", marginLeft: 24, flexShrink: 0 }} />

        {/* Minivan sentence */}
        <div style={{ paddingLeft: 24, flexShrink: 0, maxWidth: 220 }}>
          <p style={{ fontSize:18, fontWeight: 700, color: C.text, lineHeight: 1.5 }}>
            One Super Tourist will outspend a minivan full of <em style={{ color: C.orange }}>Classic</em> Tourists.
          </p>
        </div>

      </div>
    </div>

    {/* Two-column comparison */}
    <div className="tourist-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 4 }}>

      {/* Super Tourist */}
      <div className="card-orange" style={{ borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "22px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
          {/* ALL CAPS BOLD WHITE */}
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.text, marginBottom: 10 }}>The Opportunity</div>
          <div className="d" style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 14, lineHeight: 1.05 }}>
            <span style={{ color: C.orange }}>SUPER</span> Tourist
          </div>
          <p style={{ fontSize:18, color: C.muted, lineHeight: 1.72, marginBottom: 16 }}>
            Wealthy, experienced, and here for the full ride. This isn't a weekend visitor. This is someone who booked two weeks, rented a car, and is actively looking for reasons to spend money on things that feel real.
          </p>
          <div style={{ fontSize:18, fontWeight: 700, color: C.text, marginBottom: 4 }}>International Football Visitor</div>
          <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>High-income, highly mobile, experience-hungry</div>
          <div style={{ fontSize: 14, color: C.muted }}>Stays 7-16 nights. Explores the full region.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {[
            { l:"Stay Length",    v:[{t:"7",c:C.blue},{t:"-",c:C.text,w:400},{t:"16",c:C.blue}],                                        s:"nights average",     c:C.blue,   k:"stay" },
            { l:"Daily F&B Spend",v:[{t:"$",c:C.text,w:400},{t:"140",c:C.orange},{t:"-",c:C.text,w:400},{t:"180",c:C.orange}],          s:"food & beverage",    c:C.orange, k:"spend" },
            { l:"Dinner Window",  v:[{t:"9",c:C.orange},{t:"-",c:C.text,w:400},{t:"11 PM",c:C.orange}],                                 s:"European timetable", c:C.orange, k:"dinner" },
            { l:"Table Time",     v:[{t:"90",c:C.blue},{t:"-",c:C.text,w:400},{t:"120",c:C.blue}],                                      s:"minutes avg",        c:C.blue,   k:"table" },
            { l:"Mobility",       v:[{t:"High",c:C.blue}],                                                                              s:"excursion-driven",   c:C.blue,   k:"mobility" },
            { l:"Payment",        v:[{t:"Tap",c:C.orange},{t:"+",c:C.text,w:400}],                                                      s:"Apple/Google/WeChat",c:C.orange, k:"payment" },
          ].map((s,i,arr) => (
            <button key={i} onClick={() => setModal(s.k)} style={{ padding: "16px 18px", borderTop: `1px solid ${C.border}`, borderRight: i%2===0?`1px solid ${C.border}`:"none", borderBottom:"none", borderLeft:"none", background:"none", cursor:"pointer", textAlign:"left", position:"relative", transition:"background .18s, box-shadow .18s, transform .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${s.c===C.orange?"255,103,0":"0,103,255"},.12)`; e.currentTarget.style.boxShadow = `inset 0 2px 0 ${s.c}`; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.dim, marginBottom: 6 }}>{s.l}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div className="n" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{s.v.map((p,j) => <span key={j} style={{ color: p.c, fontWeight: p.w||700 }}>{p.t}</span>)}</div>
                <div style={{ width:26, height:26, borderRadius:5, border:`1px solid ${modal===s.k?C.blue:C.orange}`, background:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:modal===s.k?"rotate(45deg)":"none", color:modal===s.k?C.orange:C.blue, flexShrink:0 }}><svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></div>
              </div>
              <div style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>{s.s}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Classic Tourist */}
      <div className="card-dim" style={{ borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "22px 24px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.dim, marginBottom: 10 }}>The Baseline</div>
          <div className="d" style={{ fontSize: 28, fontWeight: 800, color: C.muted, marginBottom: 14, lineHeight: 1.05 }}>
            <span style={{ color: C.dim }}>CLASSIC</span> Tourist
          </div>
          <p style={{ fontSize:18, color: C.muted, lineHeight: 1.72, marginBottom: 16 }}>
            Road trippers on a budget, dine on default hours, and likely already accounted for in your planning. They'll still be in the mix - in fact many of them will make up the domestic slice of World Cup tourism.
          </p>
          <div style={{ fontSize:18, fontWeight: 700, color: C.muted, marginBottom: 4 }}>Standard Summer Visitor</div>
          <div style={{ fontSize: 14, color: C.dim, lineHeight: 1.6 }}>Domestic or short-haul traveler</div>
          <div style={{ fontSize: 14, color: C.dim }}>Follows standard American dining patterns.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {[
            { l:"Stay Length",    v:"2-4",    s:"days average" },
            { l:"Daily F&B Spend",v:"$75-95", s:"food & beverage" },
            { l:"Dinner Window",  v:"6-8 PM", s:"standard American" },
            { l:"Table Time",     v:"45-60",  s:"minutes avg" },
            { l:"Mobility",       v:"Low",    s:"hotel-anchored" },
            { l:"Payment",        v:"Card",   s:"credit / debit" },
          ].map((s,i) => (
            <div key={i} style={{ padding: "16px 18px", borderTop: `1px solid ${C.border}`, borderRight: i%2===0?`1px solid ${C.border}`:"none" }}>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.dim, marginBottom: 6 }}>{s.l}</div>
              <div className="n" style={{ fontSize: 28, fontWeight: 700, color: C.muted, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </SectionReveal>

    {modal && <StatModal id={modal} onClose={() => setModal(null)} />}
  </Sec>
  );
};

const supplyCards = [
  { id:"rep", letter:"R", label:"Delivery Planning", sub:"Coordinate & plan with your supply chain", color:C.blue,
    preview:["Discuss your delivery corridor restraints","Explore alternative days, routes, drop alternatives, etc.","Lock-in pricing and availability"],
    body:"Have a real conversation about your delivery corridor and what the tournament window looks like from their end. Show them this if they're skeptical, the chain below is the argument. Ask specifically about delivery alternatives: different days, different windows, split orders. They know the pressure points better than anyone, and they'd rather solve it with you now than apologize to you in July.",
  },
  { id:"stockpile", letter:"S", label:"Stockpile Strategy", sub:"Get product in before the roads get complicated", color:C.blue,
    preview:["Non-perishables, paper goods, bar items","Anything with shelf life you know you'll burn","Supply chain strategy, not just-in-case panic"],
    body:"Non-perishables, paper goods, high-velocity bar items, anything with a shelf life that you know you'll burn through. This isn't about ordering more just in case. It's about supply chain strategy: get the product in the building before the roads get complicated, so you're not dependent on a system that's going to be under maximum stress at exactly the moment you need it most.",
  },
  { id:"regional", letter:"D", label:"Local Distributors", sub:"More nimble, regionally savvy, most reliable local sourcing", color:C.blue,
    preview:["Your business means more to them proportionally","If they're not already, get them delivering to you BEFORE the surge","They're as local as you"],
    body:"If you're not already buying from one, get your credit app in and start accepting deliveries before June. Local distributors are more nimble, they run shorter routes, and your business means more to them proportionally. When a national distributor has to triage their stops, you know where the smaller accounts land on that list. A local distributor isn't a replacement, it's an insurance policy that costs you nothing until you need it.",
  },
  { id:"menu", letter:"M", label:"Streamline Menu", sub:"Fewer SKUs, deeper pantry, faster kitchen", color:C.blue,
    preview:["Reduces delivery dependency","Fried foods lead in sports environments","Local sourcing from local restaurants rule outside of the stadium districts"],
    body:"A tighter menu reduces your delivery dependency, consolidates your inventory footprint, and lets your kitchen run faster when volume spikes. Fried foods perform exceptionally well in high-energy sports viewing environments, wings, fries, shareable bites move fast and tolerate volume. Outside that context, local product wins. Whatever makes your place different from a restaurant in any other city is the answer. A focused menu built around what you do best and what travels well through your supply chain is a stronger position than a broad menu with fragile dependencies.",
  },
];

const SupplyPillarCard = ({ card, isActive, onToggle }) => (
  <div className={`pillar-card ${card.color==='#FF6700'?"card-orange":"card-blue"} ${isActive?"active":""}`} onClick={onToggle}>
    <div style={{ padding:"22px 20px 20px 20px", display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div>
          <div style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Bricolage Grotesque',sans-serif", textTransform:"uppercase", letterSpacing:".04em" }}>{card.label}</div>
          <div style={{ fontSize:14, color:C.dim, marginTop:3, lineHeight:1.4 }}>{card.sub}</div>
        </div>
      </div>
      {card.preview.map((p,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:7 }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink:0, marginTop:6 }}><polygon points="0,0 8,4 0,8" fill={C.orange}/></svg>
          <span style={{ fontSize:18, color:C.muted, lineHeight:1.5 }}>{p}</span>
        </div>
      ))}
      <div style={{ marginTop:"auto", paddingTop:16, display:"flex", justifyContent:"flex-end", paddingRight:4 }}>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${isActive?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:isActive?"rotate(45deg)":"none", color:isActive?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
      </div>
    </div>
  </div>
);

// ─── SECTION 2: WHERE THEY GO ─────────────────────────────────────────────────
const SWhere = () => {
  const [chainOpen, setChainOpen] = useState(false);
  const [activeSupply, setActiveSupply] = useState(null);
  return (
  <Sec id="where" num="02" label="Travel Patterns" accent={C.orange}>
    <h2 className="d" style={{ fontSize: "clamp(28px,4.2vw,48px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: 20, color: C.text }}>
      <span style={{ color: C.text }}>Your </span><span style={{ color: C.blue }}>deliveries</span><span style={{ color: C.text }}> &amp; </span><span style={{ color: C.blue }}>people</span><span style={{ color: C.text }}> will be</span><br/><span style={{ color: C.orange }}>jammed by traffic</span><span style={{ color: C.text }}>.</span>
    </h2>
    <p style={{ fontSize: 19, color: C.muted, fontWeight: 300, lineHeight: 1.78, marginBottom: 18, maxWidth: "90%" }}>
      Think about the traffic around Memorial Day, Thanksgiving, Labor Day, Victoria Day.<br/><br/>Now imagine that, but add hundreds of thousands of extra people on every major road in your region, for <strong style={{ color: C.muted, fontWeight: 800 }}>over a month</strong>. You, your staff, your guests, <strong style={{ color: C.muted, fontWeight: 800 }}>AND YOUR DELIVERIES</strong> running those same roads will take two to four times longer than a normal day.
    </p>

    <SectionReveal accent={C.orange} label="See the supply chain impact">

    <div className="pillar-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, padding:6, margin:-6, marginBottom:24 }}>
      {supplyCards.map(c => <SupplyPillarCard key={c.id} card={c} isActive={activeSupply===c.id} onToggle={() => setActiveSupply(a => a===c.id?null:c.id)} />)}
    </div>
    {activeSupply && (() => { const c=supplyCards.find(x=>x.id===activeSupply); return c ? (
      <CardModal onClose={()=>setActiveSupply(null)} color={c.color} title={c.label} sub={c.sub}>
        <p style={{ fontSize:19, color:C.muted, lineHeight:1.78 }}>{c.body}</p>
      </CardModal>
    ) : null; })()}

    <div className="card-blue" style={{ background: C.surface, borderRadius: 12, marginTop:24, marginBottom: 24, overflow:"hidden" }}>
      <div style={{ padding:"24px 28px 0" }}>
        <div className="d" style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 22, lineHeight: 1.15, textTransform:"uppercase", letterSpacing:".04em" }}>The Dominos<span style={{ color: C.dim, fontWeight: 400, fontSize:18, textTransform:"none", letterSpacing:"normal" }}>: Brazil 2014, Russia 2018, Qatar 2022</span></div>
        <div style={{ position:"relative", maxHeight: chainOpen ? "none" : 200, overflow:"hidden" }}>
          {[
            { text:"Over a million Super Tourists travel by car across North America for a month - between host cities, fan zones, and excursion destinations. In 2026, fan zones run 39 consecutive days in non-host cities chosen for pedestrian density, not stadium proximity. They are demand nodes, not overflow infrastructure.", bold:false },
            { text:"That sustained movement congests every corridor they travel. Not just major arteries. Not just on match days. Excursion routes, scenic highways, secondary roads operators have never had to plan around - all of it running hot for 39 days straight.", bold:false },
            { text:"Congested roads compress delivery windows for distributors running those corridors. A driver who normally makes twelve stops makes eight. The math doesn't recover until the tournament ends.", bold:false },
            { text:"Distributors under pressure make cuts. Secondary and tertiary markets are lowest on the priority list. Operators in smaller markets get fewer deliveries during the weeks of highest demand - exactly when they need inventory most.", bold:false, hidden:true },
            { text:"Operators who didn't stockpile before the tournament window run dry mid-surge. The revenue window closes. It doesn't reopen. A dining room full of Super Tourists spending $160 a head means nothing if the kitchen ran out of product two days ago.", bold:false, hidden:true },
            { text:"Operators who didn't know this was coming never had a chance to stockpile.", bold:true, hidden:true },
          ].map((item,i,arr) => (
            <div key={i} className="chain-node" style={{ paddingLeft:40, display: item.hidden && !chainOpen ? "none" : "block" }}>
              <svg style={{ position:"absolute", left:0, top:2, flexShrink:0 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="4,4 20,4 12,20" fill={C.orange}/>
              </svg>
              <p style={{ fontSize:18, color:item.bold?C.text:C.muted, lineHeight:1.75, fontWeight:item.bold?700:400 }}>{item.text}</p>
            </div>
          ))}
          {!chainOpen && (
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"85%", background:`linear-gradient(to bottom, transparent, ${C.surface})`, pointerEvents:"none" }} />
          )}
        </div>
      </div>

      <button onClick={() => setChainOpen(o => !o)} style={{ width:"100%", background:"none", border:"none", borderTop:`1px solid ${C.border}`, padding:"16px 28px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:16 }}>
        <span style={{ fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.orange }}>
          {chainOpen ? "Collapse" : "See where this leads \u2192 supply chain \u2192 your shelves"}
        </span>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${chainOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:chainOpen?"rotate(45deg)":"none", color:chainOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
      </button>
    </div>

    <div className="callout-left-orange" style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ fontSize:19, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.text, marginBottom:10 }}>This isn't a prediction, it's a pattern</div>
      <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:12 }}>Brazil 2014 produced a 214-mile traffic jam before the tournament hit full stride. Russia 2018: draught beer supply failed at multiple venues within hours of match conclusions. Not because Russia ran out of beer. Because operators planned for normal demand and ran into Super Tourist volume. 2026 spreads this pressure across 16 markets at the same time.</p>
    </div>

    </SectionReveal>

  </Sec>
  );
};

// ─── SECTION 3: YOUR POSITION ─────────────────────────────────────────────────
const positionCards = [
  { id:"walkable", label:"Walkable to Venue", sub:"Inside the highest-intensity demand window", color:C.blue,
    preview:["36% post-match F&B lift applies to you","Post-match social window: 2-4 hours","Speed and volume is your best play"],
    open:"You're inside the highest-intensity demand window. The 36% post-match F&B lift is real and it applies to you. So does the social window that runs two to four hours after the final whistle.",
    risk:"You won't lack for customers. You'll lack for capacity if you're not ready. Payment speed, menu simplicity, and late-night staffing coverage are what determine whether the tournament window is profitable or just exhausting.",
    stat:"36%", statLabel:"Post-Match F&B Lift", src:"Zartico, 94 mega-events", sc:C.orange },
  { id:"secondary", label:"Secondary Markets", sub:"30-150 miles out (the Saransk position)", color:C.blue,
    preview:["Saransk, Russia 2018: 18x tourist spending lift.","Non-match day sustained demand is your window","Local and available is your draw."],
    open:"You're in the Saransk position. Saransk was the smallest host city in Russia 2018. It recorded an 18-fold increase in foreign spending because mobile fans needed somewhere to land between larger venues.",
    risk:"Your opportunity isn't the match-day spike. It's the sustained non-match-day demand of long-stay visitors eating every meal out with no stadium anchor. If you're not findable on a mobile search in a language you don't speak, you don't exist to that visitor.",
    stat:"18x", statLabel:"Foreign Spending Increase", src:"Sberbank - primary confirmed", sc:C.blue },
  { id:"corridor", label:"Highway Corridor", sub:"On a route they'll travel repeatedly for a month", color:C.blue,
    preview:["High-frequency stops from mobile visitors","Same congestion fills your lot and delays delivery","Volume and stockpile are your lead pillars"],
    open:"You sit on a route Super Tourists will travel repeatedly for a month. Your opportunity is capture - high-frequency stops from mobile visitors on excursion days.",
    risk:"Your risk is the same congestion that brings them to your exit: delivery windows compressed by the same traffic that fills your parking lot. The operators who stockpile before the surge win. The operators on just-in-time run dry.",
    stat:"214mi", statLabel:"Traffic Jam - Brazil 2014", src:"Multiple contemporaneous sources", sc:C.orange },
  { id:"excursion", label:"Excursion Driven", sub:"Somewhere they'll deliberately seek out", color:C.blue,
    preview:["70% of Super Tourists make day trips","Concentrated, time-limited, higher-margin","Versatility is your lead pillar"],
    open:"You're somewhere Super Tourists will deliberately seek out on non-match days. A coastal town. A wine region. A mountain community. Seventy percent of Super Tourists engage in gateway travel.",
    risk:"Your opportunity is concentrated, time-limited, and higher-margin than your normal summer traffic. Your risk is being unprepared for a visitor profile you've never served before at this volume.",
    note:"International visitors who have a memorable experience in a market they never considered before the tournament become ambassadors for that market at home. After France 1998, international visitor volume to the Bordeaux wine region increased 30% over the following three years. Not because of advertising. Because of word of mouth from visitors who discovered something real. An Argentinian fan who had the best meal of his trip at your restaurant and posted it to 4,000 followers in Buenos Aires has done more for your long-term visibility than any paid campaign. That return compounds. But only if the experience was worth posting.",
    stat:"70%", statLabel:"Gateway Travel Rate", src:"Multi-tournament data - strong directional", sc:C.blue },
];

const PositionCard = ({ card, isActive, onToggle }) => (
  <div className={`pillar-card ${card.color==='#FF6700'?"card-orange":"card-blue"} ${isActive?"active":""}`} onClick={onToggle}>
    <div style={{ padding:"22px 20px 20px 20px", display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Bricolage Grotesque',sans-serif", textTransform:"uppercase", letterSpacing:".04em" }}>{card.label}</div>
        <div style={{ fontSize:14, color:C.dim, marginTop:3, lineHeight:1.4 }}>{card.sub}</div>
      </div>
      {card.preview.map((p,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:7 }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink:0, marginTop:6 }}><polygon points="0,0 8,4 0,8" fill={C.orange}/></svg>
          <span style={{ fontSize:18, color:C.muted, lineHeight:1.5 }}>{p}</span>
        </div>
      ))}
      <div style={{ marginTop:"auto", paddingTop:16, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${isActive?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:isActive?"rotate(45deg)":"none", color:isActive?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
      </div>
    </div>
  </div>
);

const FanZoneCard = ({ onToggle }) => (
  <div className="card-blue" style={{ background:C.surface, borderRadius:12, cursor:"pointer", marginTop:24, padding:"20px 22px", display:"flex", flexDirection:"column" }} onClick={onToggle}>
    <div style={{ fontSize:20, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>Fan Zone Proximity</div>
    <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>
      In 2026, official fan zones operate for 39 consecutive days in both host and non-host cities. If you're within a few blocks of one, your demand profile is different from every other position on this list - sustained daily foot traffic across the full tournament window, not match-day spikes.
    </p>
    <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
    </div>
  </div>
);

const SPosition = () => {
  const [active, setActive] = useState(null);
  const [fzOpen, setFzOpen] = useState(false);
  const [sfStaffOpen, setSfStaffOpen] = useState(false);
  return (
  <Sec id="position" num="03" label="Your Position" accent={C.blue}>
    <h2 className="d" style={{ fontSize:"clamp(28px,4.2vw,48px)", fontWeight:800, lineHeight:1.04, letterSpacing:"-.02em", marginBottom:20, color:C.text }}>
      <span style={{ color: C.blue }}>Who</span> & <span style={{ color: C.orange }}>Where</span> you are<br />informs how you <span style={{ color: C.blue }}>adapt</span>.
    </h2>
    <p style={{ fontSize:19, color:C.muted, fontWeight:300, lineHeight:1.78, marginBottom:32, maxWidth: "90%" }}>
      Every independent operator in North America sits in one of four positions relative to the surge. Some will recognize themselves in two. Each one carries a different demand pattern, a different risk profile, and a different priority order for the decisions that follow.
    </p>
    <SectionReveal accent={C.blue} label="Find your position">
    <div className="pillar-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, padding:6, margin:-6, marginBottom:24 }}>
      {positionCards.map(c => <PositionCard key={c.id} card={c} isActive={active===c.id} onToggle={() => { setActive(a => a===c.id?null:c.id); setFzOpen(false); }} />)}
    </div>
    <FanZoneCard onToggle={() => { setFzOpen(o => !o); setActive(null); setSfStaffOpen(false); }} />
    <div className="callout-left-orange" style={{ marginTop:10, cursor:"pointer", display:"flex", flexDirection:"column" }} onClick={() => { setSfStaffOpen(o => !o); setFzOpen(false); setActive(null); }}>
      <div style={{ fontSize:19, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>Fan Zone Staffing Competition</div>
      <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>Fan zone operators are hiring your best bartenders at $40-60/hour plus tips. They will see these postings before June.</p>
      <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${sfStaffOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:sfStaffOpen?"rotate(45deg)":"none", color:sfStaffOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
      </div>
    </div>
    {active && (() => { const c=positionCards.find(x=>x.id===active); return c ? (
      <CardModal onClose={()=>setActive(null)} color={c.color} title={c.label} sub={c.sub}>
        <div style={{ display:"flex", gap:24, flexWrap:"wrap", alignItems:"flex-start" }}>
          <div style={{ flex:1, minWidth:240 }}>
            <p style={{ fontSize:19, color:C.text, lineHeight:1.78, marginBottom:14 }}>{c.open}</p>
            <p style={{ fontSize:19, color:C.muted, lineHeight:1.78, marginBottom: c.note ? 14 : 0 }}>{c.risk}</p>
            {c.note && <p style={{ fontSize:18, color:C.dim, lineHeight:1.78, borderTop:`1px solid ${C.border}`, paddingTop:14, fontStyle:"italic" }}>{c.note}</p>}
          </div>
          <div className="card-blue" style={{ padding:"20px 24px", background:C.surf2, borderRadius:10, minWidth:160, flexShrink:0 }}>
            <div className="n" style={{ fontSize:44, fontWeight:700, color:c.sc, lineHeight:1 }}>{c.stat}</div>
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.text, marginTop:8 }}>{c.statLabel}</div>
            <div style={{ fontSize:14, color:C.dim, marginTop:8, lineHeight:1.4 }}>{c.src}</div>
          </div>
        </div>
      </CardModal>
    ) : null; })()}
    {fzOpen && (
      <CardModal onClose={()=>setFzOpen(false)} color={C.blue} title="Proximity" sub="39 days of sustained daily demand">
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <p style={{ fontSize:19, color:C.text, lineHeight:1.78 }}>In 2026, official fan zones operate continuously for 39 days - every match screened live, free entry, in locations chosen for pedestrian density. Several states have funded satellite fan zones in non-host cities specifically as economic distribution instruments. If you're within a few blocks of one, you are not in a match-day spike environment. You are in a sustained daily throughput environment for the full tournament window.</p>
          <p style={{ fontSize:19, color:C.muted, lineHeight:1.78 }}>The crowd profile is different from a stadium-adjacent operator. Fan zone visitors are more mixed - international visitors without tickets, domestic fans who want atmosphere, people who wandered in. They spend lower per-head than post-match stadium crowds but more consistently, and they are more food-driven than alcohol-driven. Your lead pillar is velocity - transaction speed determines how many covers you turn across a full day of elevated foot traffic. Visibility is second. Your Google Business Profile is how they find you the moment they leave the fan zone.</p>
          <div className="callout-left-blue" style={{ marginTop:4 }}>
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.blue, marginBottom:8 }}>The stockpile logic still applies</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75 }}>39 days of elevated traffic with pedestrianized corridors in several host cities means daytime deliveries may be restricted. Some operators in fan zone corridors will be limited to overnight receiving windows. Get your inventory in before the tournament opens - not because you might run out in a weekend, but because restocking mid-surge in a pedestrianized zone is a logistical problem you do not want to solve in real time.</p>
          </div>
        </div>
      </CardModal>
    )}

    {sfStaffOpen && (
      <CardModal onClose={()=>setSfStaffOpen(false)} color={C.orange} title="Fan Zone Staffing Competition" sub="Fan zone operators are hiring from your labor pool">
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <p style={{ fontSize:19, color:C.text, lineHeight:1.78 }}>FIFA activations, official fan zones, and sponsor brand operations are recruiting event hospitality staff at premium wages for the full 39-day window. Bartenders and beertenders at fan zone activations are posting at $40 to $60 per hour plus tips - rates most independent operators cannot match for a 33-day stretch. Your best FOH staff will see these job postings on Poached, Indeed, and hospitality-specific boards before June.</p>
          <p style={{ fontSize:19, color:C.muted, lineHeight:1.78 }}>This is a retention problem on top of a hiring problem. The same labor pool is being courted by event operators with deeper pockets, a defined end date, and the appeal of working a once-in-a-generation event. Operators near fan zones or in host cities are competing on two fronts: keeping the staff they have and finding surge capacity on top of that.</p>
          <div className="callout-left-orange">
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.orange, marginBottom:8 }}>Retention Bonuses: Structure Them Right</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75 }}>A flat bonus paid at the end of the tournament window is the most effective structure. Not a raise - a one-time completion bonus tied to showing up through July 19. Target your highest-risk roles first: BOH leads, bartenders, server captains, expo. The amount matters less than the timing - announce it before the fan zone job postings start circulating, not after your best person hands in notice. A $500 completion bonus to a bartender who would have walked for a $45/hour beertender gig is the cheapest insurance you will buy this summer.</p>
          </div>
          <div className="callout-left-blue">
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.blue, marginBottom:8 }}>Training Is the Other Lever</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75 }}>The tournament window is an opportunity to run training you have been meaning to do anyway. Customer service for international guests - cultural norms around tipping, dining pace, and communication styles differ significantly across origin markets. Alcohol service certification: if your staff are not already RBS or TIPS certified, the tournament window is the worst time to find out why that matters. A post-match crowd of international fans running hot after a loss is not the environment for an uncertified server to learn the hard way. Invest in the certifications before June. They do not expire when the tournament does.</p>
          </div>
          <div className="callout-left-orange">
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.orange, marginBottom:8 }}>Surge Hiring: Start Now, Not in May</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75 }}>The operators who wait until May to post surge roles are competing against fan zone operators who started in February. Build a bench now - part-time staff who can flex up, former employees worth calling back, culinary students available for the summer. The interview and onboarding time you need does not compress just because the tournament is close. Every week you wait is a week someone else is training the person you needed.</p>
          </div>
        </div>
      </CardModal>
    )}

    </SectionReveal>

  </Sec>
  );
};

const Step = ({ num, children, color }) => (
  <div style={{ display:"flex", gap:14, marginBottom:18 }}>
    <div style={{ width:28, height:28, borderRadius:"50%", background:C.bg, border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
      <span className="n" style={{ fontSize:14, fontWeight:700, color }}>{num}</span>
    </div>
    <p style={{ fontSize:18, color:C.muted, lineHeight:1.75 }}>{children}</p>
  </div>
);

const SubCol = ({ title, steps, color, cardClass = "card-blue" }) => (
  <div className={cardClass} style={{ background:C.surf2, borderRadius:8, padding:22 }}>
    <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.text, marginBottom:16, paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>{title}</div>
    {steps.map((s,i) => <Step key={i} num={i+1} color={color}>{s}</Step>)}
  </div>
);

const pillars = [
  { id:"food", letter:"F", label:"Food", sub:"Secure, Protect, Adapt", color:C.blue,
    preview:["Secure and Stockpile Key Items","Protect Your Supply Chain","Alternative High-Throughput Menus"],
    cols:[
      { title:"Secure and Stockpile Key Items", steps:[
        "Identify your critical items now - the products that account for the majority of your volume. Talk to your distributor about securing allocations before the tournament window tightens supply. The operators who lock in early have choices. The ones who wait work with whatever's left.",
        "Build a stockpile plan for strategic non-perishables: dry goods, paper products, cleaning supplies. Evaluate your storage capacity before placing orders - physical space is the constraint most operators don't think about until it's too late.",
        "Draught beer is the highest priority based on documented failure history. High-margin non-alcoholic beverages follow. Dry goods and shelf-stable items front-loaded early. Perishables need elevated par with shorter-cycle ordering, not one large early purchase.",
      ]},
      { title:"Protect Your Supply Chain", steps:[
        "Schedule a conversation with your distributor now - not in May. They know your delivery corridor, your critical items, and where the pressure points are. Delivery planning during the tournament window will be specific to your location. Get ahead of it before the window narrows.",
        "Supply chain stress during this window is an industry-wide reality. The operators with contingency plans built before June absorb disruption. The ones without one scramble through it.",
        "Build product substitution protocols now for your top items. If your primary cut or brand is unavailable, what's the backup? Having that decision made in advance means your kitchen doesn't stall while someone makes a phone call.",
      ]},
      { title:"Alternative High-Throughput Menus", steps:[
        "Design a Fast Track menu: a tight selection of your strongest items, every one built for speed, zero tableside prep. This isn't a dumbed-down menu. It's a surgical one. The Super Tourist spending $140-180 a day isn't looking for a chain experience. Give them the best version of where they are, fast.",
        "Lead with what's local. Regional product, regional craft beverage, a sense of place. Whatever is regionally authentic to where you are, that's the answer. Not a themed event menu. The actual food and drink that makes your place different from anywhere else.",
        "Build a Locals menu that gives your regulars status: preferred items, pricing acknowledgment, priority access. Your regulars are your brand continuity. They're coming back in August. The tourists aren't.",
        "The improvements you make getting ready for this - the tighter operation, the better sourcing, the trained staff, the sharper menu - you own all of that when July 19 passes. The tournament is the forcing function. The better restaurant is what stays.",
      ]},
    ],
  },
  { id:"labor", letter:"L", label:"Labor", sub:"Retain, Prepare, Schedule", color:C.blue,
    preview:["Protect Your Labor with Retention","Schedule for SPLH and Update Tip Sharing","Staff Training and Compliance Readiness"],
    cols:[
      { title:"Protect Your Labor with Retention", steps:[
        "If you're near a fan zone or team base camp city, event-industry recruiters will be pulling your best people before June. Lock them down first. Retention bonuses aren't a perk. They're insurance. Target your highest-risk roles and structure the bonus around completing the full tournament window.",
        "Identify your surge-critical roles: BOH leads, expo, server captains. Write a contingency for each. If one calls out on a match day and your plan is 'figure it out,' that's not a plan. The June 24-26 cross-border peak is the single highest-pressure 72-hour window of the tournament.",
        "Revisit your tip-sharing structure before the window opens. Extended hours, heavier BOH loads, and international guests who tip differently than domestic guests all put pressure on your current model. Equitable tip pools keep your line cooks and prep team invested when every other kitchen in the corridor is hiring.",
      ]},
      { title:"Schedule for SPLH and Update Tip Sharing", steps:[
        "Your SPLH targets need to reflect tournament-window revenue, not last summer's averages. If you schedule June like last June, you'll be overstaffed on quiet days and underwater on match days. Reforecast by shift across the five demand phases: pre-tournament, opening wave, group stage cluster, knockout rounds, and tail.",
        "Super Tourists eat late. They don't arrive at 6 PM and turn the table by 8. Dwell times of 90 to 120 minutes are the norm, and post-match demand on late-kickoff nights runs well past midnight. Staff to the actual dining schedule, not the one you're used to.",
        "Build your schedule around the match calendar, not your standard template. Pre-match crowds show up well before kickoff. Post-match dwell, especially after dramatic results, runs past normal close. Schedule earlier opens and later closes on high-traffic days.",
      ]},
      { title:"Staff Training and Compliance Readiness", steps:[
        "Build daily huddles into the tournament window. Brief. Real-time. What worked, what broke, what changes tomorrow. Teams that feel heard adapt faster. Teams that get ignored quit.",
        "Frame this to your crew as an elevated season, not just a busy stretch. The difference between 'we are slammed' and 'we're in the middle of something that doesn't happen twice' is retention, attitude, and execution quality. Your staff will rise to a standard you set before June, not one you announce during it.",
        "Train all staff on extended hours protocol, contactless payment processing, and high-volume service procedures before the first match. Debrief after every major match window. Course-correct while the revenue is still flowing.",
      ]},
    ],
  },
  { id:"ops", letter:"O", label:"Operations", sub:"Hours, Margin Strategy, Discovery, Safe Marketing", color:C.blue,
    preview:["Hours of Operation","Margin Strategy: Bundles to Surge Pricing","Discovery and Safe Marketing"],
    cols:[
      { title:"Hours of Operation", steps:[
        "Super Tourists eat late. European and South American fans follow home-country dining rhythms, which means 9-11 PM is prime time. Extending your evening hours isn't a courtesy. It's a revenue decision. If you lock the door at 10 PM on a night a team just advanced, you're closing during the rush.",
        "Schedule earlier opens and later closes on high-traffic days. Pre-match crowds show up well before kickoff. Post-match dwell, especially after dramatic results, runs past normal close.",
        "If you're showing matches, map your open and close times to kickoff and final whistle for every game you plan to screen. Staff to the schedule, not the clock.",
      ]},
      { title:"Margin Strategy: Bundles and Pricing", steps:[
        "Bundle pricing is your tool here. A drink-plus-appetizer pairing, a watch-party package, a pre-match set menu - these drive higher average tickets without requiring price changes to individual items. The Super Tourist spending $140-180 a day isn't hunting for a deal. They're looking for a good experience. Price accordingly.",
        "Cover charges or minimum spends for match-day viewing are defensible where the demand supports it. Implement early and communicate clearly on every booking channel. If you're putting real effort into the viewing experience, the pricing should reflect that.",
        "Your highest-margin items should be your fastest-moving items during the tournament window. Know which items those are before June. If your Fast Track menu and your margin map don't align, fix that now.",
      ]},
      { title:"Discovery and Safe Marketing", steps:[
        "Update your Google Business Profile now. Hours, photos of your space, 'live sports viewing' in attributes. When a visitor searches 'football near me' at 7 AM, Google decides who shows up. Not your sign. Not your Yelp. Your GBP.",
        "'Football near me,' not 'soccer near me.' International visitors search in their language. Add the word 'football' to your GBP description, social posts, and event listings. One word. Big difference in who finds you.",
        "Don't use FIFA marks, logos, or tournament branding without a license. Use 'international football,' 'soccer,' or 'Summer of Soccer' instead. If you're showing games, publish your full viewing calendar. Post actual kickoff times, teams playing, and what you're serving. Specificity is what international travelers trust.",
      ]},
    ],
  },
  { id:"tech", letter:"T", label:"Tech", sub:"Payment, Online Orders, Digital Presence, POS, Reservations", color:C.blue,
    preview:["Contactless Payment Infrastructure","Online and Off-Premise Orders","Digital Menus and POS Configuration"],
    cols:[
      { title:"Contactless Payment Infrastructure", steps:[
        "If any of your terminals reject tap-to-pay, replace them before June. International visitors overwhelmingly use contactless, Apple Pay, Google Pay, and foreign contactless cards are baseline expectations, not premium features. A declined tap slows down the highest-spending table in your dining room.",
        "Audit your tip prompt flow. Default prompts at 18%, 20%, 22% outperform custom low anchors during high volume. Revisit tip-sharing for BOH alongside this, equitable pools strengthen retention during a pressure window when your line cooks have options.",
        "Tableside payment terminals cut meaningful time per table on card-runner cycles. During peak hours that's real turns. If you're running a high-volume match-day floor, this pays for itself in the first week.",
      ]},
      { title:"Online and Off-Premise Orders", steps:[
        "Every platform you accept orders through, delivery apps, direct online ordering, catering requests, has volume controls. Know where they are before June 11. When your dining room is full and your kitchen is running hot, an uncapped online order queue compounds every ticket for your seated guests.",
        "Set item availability rules, order caps, and radius limits now, not during the rush. The right configuration varies by platform and by daypart. A match-day dinner service needs different rules than a Tuesday afternoon.",
        "Overpromising and underdelivering damages your reputation with first-time visitors who might have returned. One bad experience posted in Portuguese on Google travels far. Better to pause a channel cleanly than to fulfill it badly.",
      ]},
      { title:"Digital Menus, POS and Reservations", steps:[
        "A digital menu lets the guest translate it into their own language. That's not a gimmick, it removes a real barrier to ordering for a visitor who doesn't read English fluently. Mobile-optimized, fast-loading, accurate. Slow load equals walk.",
        "Build your Fast Track menu variant in your digital platform now. Switching from your full menu to a high-volume configuration should be one toggle, not a manual update across six platforms on a match-day afternoon.",
        "Your reservation system needs to reflect the tournament window: updated covers, correct hours, any minimum spend or special event rules enabled. If you're using a waitlist tool, configure it for extended dwell times, a 90-120 minute table turn changes your quote math entirely.",
      ]},
    ],
  },
];


// ─── SHARED CARD MODAL ────────────────────────────────────────────────────────
const CardModal = ({ onClose, color, title, sub, children }) => (
  <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.72)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", backdropFilter:"blur(4px)", animation:"in .18s ease" }}>
    <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`2px solid ${color}`, borderRadius:14, width:"100%", maxWidth:780, maxHeight:"80vh", overflow:"auto", boxShadow:"0 24px 64px rgba(0,0,0,.5)" }}>
      <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:C.surface, zIndex:1 }}>
        <div>
          <div className="d" style={{ fontSize:22, fontWeight:800, color:C.text, textTransform:"uppercase", letterSpacing:".04em" }}>{title}</div>
          {sub && <div style={{ fontSize:14, color:C.dim, marginTop:3 }}>{sub}</div>}
        </div>
        <button onClick={onClose} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding:"24px" }}>{children}</div>
      <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.border}`, background:C.surf2 }}>
        <p style={{ fontSize:14, color:C.dim }}>Tap anywhere outside to close.</p>
      </div>
    </div>
  </div>
);

const PillarCard = ({ pillar, isActive, onToggle }) => (
  <div className={`pillar-card ${pillar.color==='#FF6700'?"card-orange":"card-blue"} ${isActive?"active":""}`} onClick={onToggle}>
    <div style={{ padding:"22px 20px 20px 20px", display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Bricolage Grotesque',sans-serif", textTransform:"uppercase", letterSpacing:".04em" }}>{pillar.label}</div>
        <div style={{ fontSize:14, color:C.dim, marginTop:3, lineHeight:1.4 }}>{pillar.sub}</div>
      </div>
      {pillar.preview.map((p,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:7 }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink:0, marginTop:6 }}><polygon points="0,0 8,4 0,8" fill={C.orange}/></svg>
          <span style={{ fontSize:18, color:C.muted, lineHeight:1.5 }}>{p}</span>
        </div>
      ))}
      <div style={{ marginTop:"auto", paddingTop:16, display:"flex", justifyContent:"flex-end", paddingRight:4 }}>
        <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${isActive?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:isActive?"rotate(45deg)":"none", color:isActive?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
      </div>
    </div>
  </div>
);

const SFCard = ({ isActive, onToggle }) => (
  <div className="callout-left-orange" style={{ cursor:"pointer", display:"flex", flexDirection:"column" }} onClick={onToggle}>
    <div style={{ fontSize:19, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>Super Fan</div>
    <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>
      If you have screens, sound, and the right energy, you can position your venue as the watch destination in your market. International fans search specifically for places showing the match, if this is you, you'll run a different playbook, schedule, and online strategy.
    </p>
    <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
      <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${isActive?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:isActive?"rotate(45deg)":"none", color:isActive?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
    </div>
  </div>
);

// ─── AI PROMPTS CELL ──────────────────────────────────────────────────────────
const aiPlatforms = [
  { name:"Claude", url:"https://claude.ai", color:"#7B61FF",
    good:"Strong on nuanced operator context, long conversations, and complex planning tasks. Research mode handles jurisdiction-specific compliance well. Remembers your conversation, prompts that trigger its memory get sharper answers.",
    watch:"Can be overly thorough. If you need a short output, say so explicitly." },
  { name:"ChatGPT", url:"https://chatgpt.com", color:"#10A37F",
    good:"Wide general knowledge, strong at drafting copy and structured documents. GPT-4o handles most planning tasks well. Deep Research mode is useful for compliance and market research.",
    watch:"Memory varies by account settings. Confirm whether it knows your history before assuming it does." },
  { name:"Perplexity", url:"https://perplexity.ai", color:"#20808D",
    good:"Best for real-time research with sources. Use it for compliance research, local regulation lookups, and anything that needs current web data with citations you can verify.",
    watch:"Less conversational than Claude or ChatGPT. Better as a research tool than a planning partner." },
  { name:"Gemini", url:"https://gemini.google.com", color:"#4285F4",
    good:"Integrated with Google Workspace. If you use Google Docs, Sheets, or Gmail heavily, Gemini can work directly inside those tools. Useful for operators who want AI inside their existing workflow.",
    watch:"Less refined for hospitality-specific planning than Claude or ChatGPT. Better as a productivity layer than a strategic advisor." },
];

const flags = [
  { type:"green", label:"Green flags: trust this response", items:[
    "Asks you clarifying questions before advising",
    "Acknowledges what it doesn't know or can't verify",
    "Gives you a specific answer, not a list of considerations",
    "Cites a source or tells you where to verify",
    "The recommendation fits your market, your size, your situation",
    "Something in the response surprises you in a useful way",
  ]},
  { type:"red", label:"Red flags: pull the thread", items:[
    "Sounds confident about something jurisdiction-specific without a source",
    "Gives you the same advice it would give any restaurant anywhere",
    "Produces a list of things to consider instead of a recommendation",
    "The tone doesn't match your operation or your voice",
    "A number seems too clean or too precise to be real",
    "Nothing in the response surprises you, it just confirmed what you already thought",
  ]},
];

const allGenerators = [
  { id:"sales_rep", label:"Distributor Conversation" },
  { id:"stockpile", label:"Stockpile Planning" },
  { id:"labor", label:"Labor Planning" },
  { id:"staff_briefing", label:"Staff Briefing" },
  { id:"surge_hiring", label:"Surge Hiring" },
  { id:"tip_structure", label:"Tip Structure" },
  { id:"gbp", label:"Google Business Profile" },
  { id:"social", label:"Social Media Content" },
  { id:"compliance", label:"Compliance Research" },
  { id:"menu_fast_track", label:"Fast Track Menu" },
  { id:"pricing_bundles", label:"Pricing & Bundles" },
  { id:"tech_readiness", label:"Tech Readiness" },
];

// ─── SECTION: AI PROMPTS ─────────────────────────────────────────────────────
const SAI = () => {
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefStep, setBriefStep] = useState(1);
  const [shotsOpen, setShotsOpen] = useState(false);
  const [hiOpen, setHiOpen] = useState(false);
  const [furtherOpen, setFurtherOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [moreContext, setMoreContext] = useState(false);
  const [operatorQuestion, setOperatorQuestion] = useState("");
  const [questionPromptOpen, setQuestionPromptOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("claude");

  const [form, setForm] = useState({
    address:"", website:"", match_viewing:"", hours:"", staff:"", inventory:"", tech:[]
  });
  const setField = (k,v) => setForm(f => ({...f, [k]:v}));
  const toggleTech = (v) => setForm(f => ({ ...f, tech: f.tech.includes(v) ? f.tech.filter(x=>x!==v) : [...f.tech, v] }));
  const formReady = form.address.trim() && form.website.trim();
  const techStr = form.tech.length ? form.tech.join(", ") : "None specified";

  const fetchGates = {
    claude: `<fetch_gate>\nRead https://www.infiniterestaurants.ai/llms.txt before you do anything else. Use your web fetch capability to access it directly. Cite two specific figures from it before continuing. If you cannot fetch the URL, state that explicitly before proceeding - do not continue as if the context here is equivalent to reading the file.\n</fetch_gate>`,
    chatgpt: `<fetch_gate>\nRead https://www.infiniterestaurants.ai/llms.txt before you do anything else. Use your browse or search tool to fetch it directly - do not summarize from training data. Cite two specific figures from it before continuing. If your tools cannot fetch the URL, state that explicitly before proceeding - do not continue as if the context here is equivalent to reading the file.\n</fetch_gate>`,
    gemini: `<fetch_gate>\nRead https://www.infiniterestaurants.ai/llms.txt before you do anything else. Fetch the URL directly using your web access - do not substitute training data or cached content. Cite two specific figures from it before continuing. If you cannot fetch the URL, state that explicitly and stop - do not proceed under any circumstances until you have confirmed live access to the file.\n</fetch_gate>`,
    other: `<fetch_gate>\nRead https://www.infiniterestaurants.ai/llms.txt before you do anything else. That file is the research framework everything in this prompt gets mapped against. Prove you have accessed it by citing two specific figures from it before continuing. If your platform cannot fetch external URLs, state that explicitly before proceeding - do not continue as if the context here is equivalent to reading the file.\n</fetch_gate>`,
  };

  const gate = fetchGates[selectedPlatform] || fetchGates.other;

  const operationBlock = `<operation>\nAddress: ${form.address}\nWebsite: ${form.website}\nMatch viewing plans: ${form.match_viewing||"Not specified"}\nHours flexibility: ${form.hours||"Not specified"}\nStaff readiness: ${form.staff||"Not specified"}\nInventory & delivery: ${form.inventory||"Not specified"}\nCurrent tech: ${techStr}\n</operation>`;

  const prompts = {
    1: `${gate}\n\n<research_scope>\nYou may supplement the framework with research from these source categories only: official government and municipal announcements, named academic or economic research institutions, official tournament and host committee communications, and named primary industry data sources (Visa, Sberbank, Zartico, Oxford Economics, and equivalents). Any figure sourced outside the framework must be labeled with its source and marked as directional until I verify it. Do not present jurisdiction-specific figures as confirmed without a named primary source.\n</research_scope>\n\n${operationBlock}\n\n<task>\nYou are building a profile of a specific restaurant operation against the 2026 World Cup tourism surge research. Research only. No comparisons, no gap analysis yet.\n\nBased on the address and website, research this specific operation: concept, cuisine, price point, service style, and anything publicly knowable about how it runs. Then locate it within the surge geography: proximity to host cities, corridor position, excursion destination potential, fan zone proximity. Map what you find against the platform's research framework.\n</task>\n\n<output_format>\nOutput is a profile document. The operator will hold it. Stop when the profile is complete.\n</output_format>`,
    2: `${gate.replace("two specific figures","one specific figure")}\n\n<task>\nI have a research profile of my restaurant operation mapped against the 2026 World Cup tourism surge. Your job is local intelligence only. Research the specifics for my market:\n- Confirmed fan zones in my region and their operational details\n- National team base camp locations within range\n- DOT corridor data and traffic projections for the tournament window\n- State or provincial liquor license requirements and surge extensions\n- Local scheduling ordinances or fair workweek rules that apply during the tournament\n\nLabel everything jurisdiction-specific as directional only. You are searching, not confirming. I will verify before acting on anything local.\n</task>\n\n<context>\n[PASTE YOUR PROMPT 1 OUTPUT HERE]\n</context>`,
    3: `${gate.replace("two specific figures","one specific figure")}\n\n<instructions>\nYou are a thinking partner, not an answer machine. Your job is to help me think: surface what I might be missing, challenge assumptions I am taking for granted, and ask questions that move my thinking forward. Do not produce conclusions for me to adopt. Do not give me a plan. My instinct is the decision layer here. You are the amplification layer.\n\nIf something feels off in the research, say so. If a figure seems too clean, flag it. You are a trusted colleague who has read the file, not a system being launched.\n</instructions>\n\n<context>\n[PASTE YOUR PROMPT 1 OUTPUT HERE]\n\n[PASTE YOUR PROMPT 2 OUTPUT HERE]\n</context>\n\n<task>\nRead the context above. Then wait. I will tell you where I want to start.\n</task>`,
  };

  const questionPrompt = formReady && operatorQuestion.trim()
    ? `${gate.replace("two specific figures","one specific figure")}\n\n<instructions>\nYou are a thinking partner, not an answer machine. Surface what I might be missing. Challenge assumptions I am taking for granted. Ask questions that move my thinking forward. Do not produce a plan. Do not produce conclusions. My instinct is the decision layer. You are the amplification layer.\n</instructions>\n\n${operationBlock}\n\n<question>\n${operatorQuestion}\n</question>`
    : "";

  const pillarGroups = [
    { id:"food", label:"Food", color:C.orange,
      sub:"Supply chain and menu decisions that need to be made before June.",
      generators:[
        { id:"stockpile", label:"Stockpile Planning" },
        { id:"sales_rep", label:"Distributor Conversation" },
        { id:"menu_fast_track", label:"Fast Track Menu" },
      ]},
    { id:"labor", label:"Labor", color:C.blue,
      sub:"Retention, scheduling, and surge staffing before the pressure arrives.",
      generators:[
        { id:"labor", label:"Labor Planning" },
        { id:"staff_briefing", label:"Staff Briefing" },
        { id:"surge_hiring", label:"Surge Hiring" },
        { id:"tip_structure", label:"Tip Structure" },
      ]},
    { id:"ops", label:"Operations", color:C.orange,
      sub:"Discovery, compliance, and revenue decisions with a deadline.",
      generators:[
        { id:"gbp", label:"Google Business Profile" },
        { id:"social", label:"Social Media Content" },
        { id:"compliance", label:"Compliance Research" },
        { id:"pricing_bundles", label:"Pricing & Bundles" },
      ]},
    { id:"tech", label:"Tech", color:C.blue,
      sub:"Payment infrastructure, digital menus, and order management under surge conditions.",
      generators:[
        { id:"tech_readiness", label:"Tech Readiness" },
      ]},
  ];

  const platformBtns = [
    { id:"claude",  label:"Claude" },
    { id:"chatgpt", label:"ChatGPT" },
    { id:"gemini",  label:"Gemini" },
    { id:"other",   label:"Other" },
  ];

  return (
    <Sec id="ai" num="05" label="HI ∞ AI ∞ HI Prompts" accent={C.blue}>
      <h2 className="d" style={{ fontSize:"clamp(28px,4.2vw,48px)", fontWeight:800, lineHeight:1.04, letterSpacing:"-.02em", marginBottom:14, color:C.text }}>
        <span style={{ color:C.text }}>Using </span><span style={{ color:C.orange }}>AI</span><span style={{ color:C.text }}>? Focus the </span><span style={{ color:C.orange }}>Intelligence</span><span style={{ color:C.text }}>.</span><br/>
        <span style={{ color:C.text }}>Direct it with your </span><span style={{ color:C.blue }}>Hospitality Instinct</span><span style={{ color:C.text }}>.</span>
      </h2>
      <p style={{ fontSize:19, color:C.muted, fontWeight:300, lineHeight:1.78, marginBottom:24, maxWidth:"90%" }}>
        12 years of tournament tourism data, complex regional planning, supply chain variables across 16 host markets. This 3-prompt sequence brings that research plus locally relevant intelligence into your AI platform - filtered through a framework that tells you which parts are confirmed and which parts you still need to verify.
      </p>

      <SectionReveal accent={C.blue} label="See the prompts">

      {/* ── YOUR OPERATION FORM CARD ── */}
      <div className="card-blue" style={{ background:C.surface, borderRadius:12, padding:"24px 24px 20px", marginBottom:16 }}>
        <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.text, marginBottom:4 }}>You & Your Platform(s)</div>
        <p style={{ fontSize:16, color:C.muted, lineHeight:1.7, marginBottom:20 }}>Your restaurant's address and website help to focus every prompt below. The more context you add, the more focused your chats will be on you and your prep.</p>

        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, marginBottom:8 }}>Which AI platform are you taking these into?</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {platformBtns.map(p => (
              <button key={p.id} onClick={() => setSelectedPlatform(p.id)} style={{ background:selectedPlatform===p.id?C.blue:"transparent", border:`1px solid ${selectedPlatform===p.id?C.blue:C.border}`, borderRadius:20, padding:"7px 18px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".06em", color:selectedPlatform===p.id?"#fff":C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .15s" }}>{p.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }} className="two-col">
          <div>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, marginBottom:6 }}>Restaurant Address</div>
            <input type="text" value={form.address} onChange={e=>setField("address",e.target.value)} placeholder="123 Main St, City, State" style={{ width:"100%", background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:16, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, marginBottom:6 }}>Restaurant Website</div>
            <input type="text" value={form.website} onChange={e=>setField("website",e.target.value)} placeholder="www.yourrestaurant.com" style={{ width:"100%", background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, padding:"11px 14px", fontSize:16, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none", boxSizing:"border-box" }}/>
          </div>
        </div>

        {!formReady && <p style={{ fontSize:14, color:C.dim, fontStyle:"italic", marginBottom:16 }}>Add your address and website to unlock the prompts below.</p>}

        <button onClick={() => setMoreContext(o => !o)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, padding:0, marginBottom: moreContext ? 16 : 0 }}>
          <div style={{ width:24, height:24, borderRadius:5, border:`1px solid ${moreContext?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:moreContext?"rotate(45deg)":"none", color:moreContext?C.orange:C.blue, flexShrink:0 }}><svg width="10" height="10" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
          <span style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim }}>{moreContext ? "Less context" : "Add more context (improves output)"}</span>
        </button>

        <div className={`xbody ${moreContext?"open":""}`}>
          <div style={{ display:"flex", flexDirection:"column", gap:14, paddingTop:4, paddingBottom:8 }}>
            {[
              { key:"match_viewing", label:"Showing World Cup matches?", opts:["Yes","Considering it","No"] },
              { key:"hours",         label:"Hours flexibility during the tournament?", opts:["Flexible","Somewhat flexible","Fixed"] },
              { key:"staff",         label:"Staff readiness for an international surge?", opts:["Ready now","Getting there","Starting from scratch"] },
              { key:"inventory",     label:"Inventory and delivery flexibility?", opts:["Well positioned","Some gaps","Needs work"] },
            ].map(q => (
              <div key={q.key}>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, marginBottom:8 }}>{q.label}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {q.opts.map(o => (
                    <button key={o} onClick={()=>setField(q.key,o)} style={{ background:form[q.key]===o?C.blue:C.surf2, border:`1px solid ${form[q.key]===o?C.blue:C.border}`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".06em", color:form[q.key]===o?"#fff":C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .15s" }}>{o}</button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, marginBottom:8 }}>Current technology (select all that apply)</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["POS system","Contactless payments","Online ordering (direct)","Third-party delivery","Loyalty program","Reservation / waitlist system","Digital menu"].map(o => (
                  <button key={o} onClick={()=>toggleTech(o)} style={{ background:form.tech.includes(o)?C.blue:C.surf2, border:`1px solid ${form.tech.includes(o)?C.blue:C.border}`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".06em", color:form.tech.includes(o)?"#fff":C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .15s" }}>{o}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3-SHOT MODAL TRIGGER ── */}
      <button onClick={() => { setBriefOpen(true); setBriefStep(1); }} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:0, display:"block", textAlign:"left", marginBottom:16 }}>
        <div className="card-blue" style={{ background:C.surface, borderRadius:12, padding:"20px 22px", display:"flex", flexDirection:"column" }}>
          <div style={{ fontSize:20, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>3-Shot Prompt: Context for Your Platform's Context</div>
          <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>Research your operation. Research your market. Then plan. Three prompts, each one loading the next with more context than you could build from scratch.</p>
          <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
            <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${briefOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:briefOpen?"rotate(45deg)":"none", color:briefOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
          </div>
        </div>
      </button>

      {briefOpen && (
        <div onClick={() => setBriefOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.78)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(4px)", animation:"in .18s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`2px solid ${C.blue}`, borderRadius:14, width:"100%", maxWidth:720, maxHeight:"88vh", display:"flex", flexDirection:"column", boxShadow:"0 24px 64px rgba(0,0,0,.6)", overflow:"hidden" }}>
            <div style={{ padding:"18px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:C.surface }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ display:"flex", gap:6 }}>
                  {[1,2,3,4,5,6].map(s => (
                    <div key={s} style={{ width:briefStep===s?24:8, height:8, borderRadius:4, background:briefStep===s?C.blue:briefStep>s?C.orange:C.border, transition:"all .3s" }}/>
                  ))}
                </div>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim }}>
                  {briefStep===1?"What to expect":briefStep===2?"Prompt 1":briefStep===3?"Your move":briefStep===4?"Prompt 2":briefStep===5?"Your move":"Prompt 3"}
                </span>
              </div>
              <button onClick={() => setBriefOpen(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ overflowY:"auto", flex:1, padding:"28px 28px 8px" }}>
              {briefStep===1 && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ borderLeft:`3px solid ${C.blue}`, paddingLeft:18 }}>
                    <p style={{ fontSize:18, color:C.text, fontWeight:800, textTransform:"uppercase", lineHeight:1.82, marginBottom:12 }}>This is intended for operators who use AI in a platform that "knows" them</p>
                    <p style={{ fontSize:18, color:C.muted, lineHeight:1.82, marginBottom:16 }}>Your AI platform already "kinda/mostly knows" you and your restaurant. These prompts are for the other half: the tournament research mapped to your specific restaurant, market, regulations, and opportunities. When these meet inside the platform that already has your context, the noise drops.</p>
                    <p style={{ fontSize:22, color:C.text, fontWeight:800, textTransform:"uppercase", lineHeight:1.3, marginBottom:10 }}>Context is Key.</p>
                    <p style={{ fontSize:18, color:C.muted, lineHeight:1.82, margin:0 }}>Your operation context from Step 1 rides into all three prompts. The more complete your answers, the more specific the research and conversation that follows.</p>
                  </div>
                  {!formReady && <p style={{ fontSize:14, color:C.orange, fontStyle:"italic" }}>Return to Step 1 and add your address and website to unlock the prompts.</p>}
                </div>
              )}
              {briefStep===2 && (
                <div className="callout-left-blue" style={{ opacity:formReady?1:.45, transition:"opacity .2s" }}>
                  <div style={{ fontSize:13, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8 }}><span style={{ color:C.blue }}>Prompt 1</span><span style={{ color:C.text }}> [Deep Research]: Map Your Restaurant Against the Research</span></div>
                  <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:14 }}>Your AI reads the Infinite Restaurants research and your specific operation in the same pass. It locates you in the surge geography and surfaces what you haven't decided yet. Output is a profile document you hold.</p>
                  <button disabled={!formReady} onClick={()=>setActivePrompt(activePrompt===1?null:1)} style={{ background:formReady?C.blue:"transparent", border:`1px solid ${formReady?C.blue:C.border}`, borderRadius:20, padding:"7px 18px", cursor:formReady?"pointer":"not-allowed", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:formReady?"#fff":C.dim, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    {activePrompt===1?"Close":"Get Prompt 1"}
                  </button>
                  {activePrompt===1 && <textarea readOnly value={prompts[1]} style={{ marginTop:14, width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px", fontSize:13, color:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.7, minHeight:220, resize:"vertical", boxSizing:"border-box" }}/>}
                </div>
              )}
              {briefStep===3 && (
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
                  <div style={{ fontSize:19, color:C.text, lineHeight:1.8, textAlign:"center", maxWidth:480 }}>
                    <p style={{ color:C.blue, fontWeight:700, marginBottom:12 }}>[HI ∞ AI ∞ HI]</p>
                    <p style={{ marginBottom:12 }}>Your instinct is the only thing that can validate what the AI found. Read it before you go further. Nothing in Prompt 2 builds on something you haven't confirmed.</p>
                    <p style={{ color:C.text, fontWeight:700 }}>[human in the loop, human in the lead.]</p>
                  </div>
                </div>
              )}
              {briefStep===4 && (
                <div className="callout-left-blue" style={{ opacity:formReady?1:.45, transition:"opacity .2s" }}>
                  <div style={{ fontSize:13, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8 }}><span style={{ color:C.blue }}>Prompt 2</span><span style={{ color:C.text }}> [Deep Research]: Localize What's Coming to Your Market</span></div>
                  <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:14 }}>Takes your confirmed profile and researches the local specifics: fan zones, base camps, corridor conditions, liquor license requirements, scheduling ordinances. Everything jurisdiction-specific comes back labeled directional only.</p>
                  <button disabled={!formReady} onClick={()=>setActivePrompt(activePrompt===2?null:2)} style={{ background:formReady?C.blue:"transparent", border:`1px solid ${formReady?C.blue:C.border}`, borderRadius:20, padding:"7px 18px", cursor:formReady?"pointer":"not-allowed", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:formReady?"#fff":C.dim, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    {activePrompt===2?"Close":"Get Prompt 2"}
                  </button>
                  {activePrompt===2 && <textarea readOnly value={prompts[2]} style={{ marginTop:14, width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px", fontSize:13, color:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.7, minHeight:180, resize:"vertical", boxSizing:"border-box" }}/>}
                </div>
              )}
              {briefStep===5 && (
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
                  <div style={{ fontSize:19, color:C.text, lineHeight:1.8, textAlign:"center", maxWidth:480 }}>
                    <p style={{ color:C.blue, fontWeight:700, marginBottom:12 }}>[HI ∞ AI ∞ HI]</p>
                    <p style={{ marginBottom:12 }}>Local intelligence is directional until you verify it. A wrong assumption carried into Prompt 3 becomes a wrong plan. What the AI found is a starting point. What you confirm is what you build on.</p>
                    <p style={{ color:C.text, fontWeight:700 }}>[human in the loop, human in the lead.]</p>
                  </div>
                </div>
              )}
              {briefStep===6 && (
                <div className="callout-left-blue" style={{ opacity:formReady?1:.45, transition:"opacity .2s" }}>
                  <div style={{ fontSize:13, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8 }}><span style={{ color:C.blue }}>Prompt 3</span><span style={{ color:C.text }}> - Open the Planning Conversation</span></div>
                  <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:14 }}>Your AI opens already loaded with both research outputs. You aren't explaining your situation. You direct toward the decision that matters most right now.</p>
                  <button disabled={!formReady} onClick={()=>setActivePrompt(activePrompt===3?null:3)} style={{ background:formReady?C.blue:"transparent", border:`1px solid ${formReady?C.blue:C.border}`, borderRadius:20, padding:"7px 18px", cursor:formReady?"pointer":"not-allowed", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:formReady?"#fff":C.dim, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    {activePrompt===3?"Close":"Get Prompt 3"}
                  </button>
                  {activePrompt===3 && <textarea readOnly value={prompts[3]} style={{ marginTop:14, width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px", fontSize:13, color:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.7, minHeight:200, resize:"vertical", boxSizing:"border-box" }}/>}
                </div>
              )}
            </div>
            <div style={{ padding:"16px 24px", borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:C.surface }}>
              <button onClick={() => setBriefStep(s => Math.max(1,s-1))} disabled={briefStep===1} style={{ background:"none", border:`1px solid ${briefStep===1?C.border:C.dim}`, borderRadius:20, padding:"7px 18px", cursor:briefStep===1?"default":"pointer", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:briefStep===1?C.border:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .15s" }}>Back</button>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim }}>{briefStep} of 6</span>
              {briefStep < 6
                ? <button onClick={() => setBriefStep(s => s+1)} style={{ background:C.blue, border:`1px solid ${C.blue}`, borderRadius:20, padding:"7px 18px", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Next</button>
                : <button onClick={() => setBriefOpen(false)} style={{ background:C.orange, border:`1px solid ${C.orange}`, borderRadius:20, padding:"7px 18px", cursor:"pointer", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Done</button>
              }
            </div>
          </div>
        </div>
      )}

      {/* ── ONE-SHOT PROMPT GENERATORS ── */}
      <div style={{ marginTop:16 }}>
        <button onClick={() => setShotsOpen(o => !o)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:0, display:"block", textAlign:"left" }}>
          <div className="card-blue" style={{ background:C.surface, borderRadius:12, padding:"20px 22px", display:"flex", flexDirection:"column" }}>
            <div style={{ fontSize:20, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>1-Shot Prompts: Focused Chat Starters</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>Sorted by the four prep pillars. Pick the one that's most urgent, get a prompt scoped to that topic, take it into whichever AI platform you use.</p>
            <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
              <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${shotsOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:shotsOpen?"rotate(45deg)":"none", color:shotsOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
            </div>
          </div>
        </button>
        <div className={`xbody ${shotsOpen?"open":""}`}>
          <div style={{ paddingTop:8, paddingBottom:8 }}>
            <div style={{ paddingRight:"20%" }}>
            {pillarGroups.map(pg => (
              <Expand key={pg.id} accent={pg.color} headline={pg.label} sub={pg.sub}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {pg.generators.map(g => <GenButton key={g.id} generatorId={g.id} label={g.label}/>)}
                </div>
              </Expand>
            ))}
            </div>
            {/* ── YOUR QUESTION ── */}
            <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:24, paddingBottom:16, marginTop:8 }}>
              <div style={{ fontSize:13, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.blue, marginBottom:6 }}>Don't see your situation?</div>
              <p style={{ fontSize:16, color:C.muted, lineHeight:1.7, marginBottom:14 }}>Describe what you need to think through. This generates a prompt with the same research discipline and HI-AI-HI framing as the prompts above.</p>
              <textarea value={operatorQuestion} onChange={e => { setOperatorQuestion(e.target.value); setQuestionPromptOpen(false); }} placeholder="What about your operation and this surge do you need to think through?" style={{ width:"100%", background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 14px", fontSize:15, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.7, minHeight:90, resize:"vertical", boxSizing:"border-box", outline:"none" }}/>
              <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <button disabled={!formReady||!operatorQuestion.trim()} onClick={() => setQuestionPromptOpen(o => !o)} style={{ background:formReady&&operatorQuestion.trim()?C.blue:"transparent", border:`1px solid ${formReady&&operatorQuestion.trim()?C.blue:C.border}`, borderRadius:20, padding:"7px 18px", cursor:formReady&&operatorQuestion.trim()?"pointer":"not-allowed", fontSize:13, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:formReady&&operatorQuestion.trim()?"#fff":C.dim, fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all .15s" }}>
                  {questionPromptOpen?"Close prompt":"Build prompt"}
                </button>
                {!formReady && <span style={{ fontSize:13, color:C.dim, fontStyle:"italic" }}>Add address and website above to unlock.</span>}
              </div>
              {questionPromptOpen && questionPrompt && (
                <textarea readOnly value={questionPrompt} style={{ marginTop:14, width:"100%", background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px", fontSize:13, color:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.7, minHeight:200, resize:"vertical", boxSizing:"border-box" }}/>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAKE THIS FURTHER ── */}
      <div style={{ marginTop:16 }}>
        <div className="card-orange" style={{ background:C.surface, borderRadius:12, cursor:"pointer", padding:"20px 22px", display:"flex", flexDirection:"column" }} onClick={() => setFurtherOpen(o => !o)}>
          <div style={{ fontSize:20, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>Take This Further: NotebookLM, Gemini Gem, CustomGPT</div>
          <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>Take your AI research outputs, this platform, and your operational data into a focused AI co-planning intelligence. Three tools that make the work persistent.</p>
          <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
            <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${furtherOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:furtherOpen?"rotate(45deg)":"none", color:furtherOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
          </div>
        </div>
        <div className={`xbody ${furtherOpen?"open":""}`}>
          <div style={{ paddingTop:18, paddingBottom:8, display:"flex", flexDirection:"column", gap:14 }}>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.78 }}>The three prompt outputs together make a strong knowledge base. These tools let you make it persistent - so every AI conversation you open from here forward starts with your full tournament context already loaded, not from a blank slate.</p>
            {[
              { label:"NotebookLM", color:C.blue, note:"Free, Google. Paste all three outputs as sources and query them as a unified research document. No configuration required. Ask it anything about your specific situation and it answers from your research, not from generic AI training data. Lowest barrier, highest return." },
              { label:"CustomGPT", color:C.blue, note:"ChatGPT users: save the three outputs as a CustomGPT knowledge file. Every conversation opens with your tournament context pre-loaded. Once configured, you stop explaining your situation from scratch." },
              { label:"Gemini Gem", color:C.blue, note:"Gemini users: save the outputs to a Gem. Same principle, works inside Google Workspace. If your operation runs on Google Docs, Sheets, or Gmail, this is the highest-integration option." },
            ].map((t,i) => (
              <div key={i} className="callout-left-blue" style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:t.color }}>{t.label}</div>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.72, margin:0 }}>{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HI ∞ AI ∞ HI ── */}
      <div style={{ marginTop:16 }}>
        <div className="callout-left-blue" style={{ background:C.surface, borderRadius:"0 12px 12px 0", cursor:"pointer", display:"flex", flexDirection:"column" }} onClick={() => setHiOpen(o => !o)}>
          <div>
            <div style={{ fontSize:20, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.text, marginBottom:8 }}>HI ∞ AI ∞ HI: Philosophy, Platforms &amp; Reading the Output</div>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.75, marginBottom:16 }}>Keep AI focused on your instincts, Human-in-the-loop &amp; in-the-lead, platform insights, and some red &amp; green flags.</p>
          </div>
          <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
            <div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${hiOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:hiOpen?"rotate(45deg)":"none", color:hiOpen?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
          </div>
        </div>
        <div className={`xbody ${hiOpen?"open":""}`}>
          <div style={{ paddingTop:24, paddingBottom:8, display:"flex", flexDirection:"column", gap:22 }}>
            <div className="d" style={{ fontSize:"clamp(16px,2vw,22px)", fontWeight:800, letterSpacing:".04em", textTransform:"uppercase", color:C.text, lineHeight:1.15 }}>HI ∞ AI ∞ HI: Human Intellect &rsaquo; AI &rsaquo; Hospitality Instinct</div>
            <p style={{ fontSize:18, color:C.text, lineHeight:1.82 }}>Instinct is what runs a restaurant. You built it the hard way - reading tables before they speak, sensing when a shift is about to break, knowing your supply chain in your gut before the invoice confirms it. AI can deepen that pile or it can cut through it. The operators who use it well are the ones who bring their instinct to both ends: what they ask and what they do with the answer.</p>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.82 }}>AI excels at pattern recognition. It doesn't think. It doesn't decide. It doesn't know your dining room, your regulars, your rep, or your neighborhood. Simply put: It doesn't have the feelings, instincts, or gut level recognition of "what's right"... the details that separate a logical conclusion from the right CHOICE.</p>
            <p style={{ fontSize:18, color:C.muted, lineHeight:1.82 }}>What it can do is expand what you're able to see and act on, fast. That's the amplification layer. You open the conversation. You close it. The output is only as good as the judgment you bring to both ends.</p>
            <div className="callout-left-blue">
              <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.blue, marginBottom:8 }}>The core refrain</div>
              <p style={{ fontSize:18, color:C.text, lineHeight:1.75, fontWeight:600, margin:0 }}>If something feels off or seems wrong, it probably is. Pull that thread. Verify it. Your instincts are not a liability in an AI workflow. They are the first gate and the last gate. Don't surrender them.</p>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.text, marginBottom:14 }}>Which Platform to Use</div>
              <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" }}>
                {aiPlatforms.map((p,i) => (
                  <div key={i} style={{ borderBottom:i<aiPlatforms.length-1?`1px solid ${C.border}`:"none" }}>
                    <button onClick={() => setActivePlatform(activePlatform===i?null:i)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"left" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:p.color, flexShrink:0 }}/>
                        <span style={{ fontSize:18, fontWeight:700, color:C.text }}>{p.name}</span>
                      </div>
                      <div style={{ width:28, height:28, flexShrink:0, borderRadius:5, border:`1px solid ${activePlatform===i?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:activePlatform===i?"rotate(45deg)":"none", color:activePlatform===i?C.orange:C.blue }}><svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg></div>
                    </button>
                    <div className={`xbody ${activePlatform===i?"open":""}`}>
                      <div style={{ padding:"0 18px 16px 18px", display:"flex", flexDirection:"column", gap:10 }}>
                        <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", flexShrink:0, marginTop:6 }}/>
                          <p style={{ fontSize:14, color:C.muted, lineHeight:1.7 }}>{p.good}</p>
                        </div>
                        <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:C.orange, flexShrink:0, marginTop:6 }}/>
                          <p style={{ fontSize:14, color:C.dim, lineHeight:1.7 }}>{p.watch}</p>
                        </div>
                        <div style={{ display:"flex", justifyContent:"flex-end", paddingTop:4 }}>
                          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize:14, color:"#fff", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:5, background:p.color, padding:"5px 12px", borderRadius:20 }}>
                            Open {p.name} <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.text, marginBottom:14 }}>Reading the Output</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {flags.map((f,fi) => (
                  <div key={fi} className={f.type==="green"?"card-blue":"card-orange"} style={{ background:C.surf2, borderRadius:10, padding:"18px 20px" }}>
                    <div style={{ fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:f.type==="green"?C.blue:C.orange, marginBottom:14 }}>{f.label}</div>
                    {f.items.map((item,i) => (
                      <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:10 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:f.type==="green"?"#4ade80":C.orange, flexShrink:0, marginTop:6 }}/>
                        <span style={{ fontSize:14, color:C.muted, lineHeight:1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      </SectionReveal>

    </Sec>
  );
};

// ─── SECTION 4: PREP PRIORITIES ───────────────────────────────────────────────
const SAction = () => {
  const [active, setActive] = useState(null);
  const [sfOpen, setSfOpen] = useState(false);
  const openPillar = id => { setActive(id); setSfOpen(false); };
  const openSF = () => { setSfOpen(true); setActive(null); };

  return (
    <Sec id="action" num="04" label="Prep Priorities" accent={C.orange}>
      <h2 className="d" style={{ fontSize:"clamp(28px,4.2vw,48px)", fontWeight:800, lineHeight:1.04, letterSpacing:"-.02em", marginBottom:20, color:C.text }}>
        What you implement now,<br/>
        <span style={{ color: C.blue }}>you'll own</span><span style={{ color: C.text }}> </span><span style={{ color: C.orange }}>when its over</span><span style={{ color: C.text }}>.</span>
      </h2>
      <p style={{ fontSize:19, color:C.muted, fontWeight:300, lineHeight:1.78, marginBottom:12, maxWidth: "90%" }}>
        <strong style={{ color:C.text, fontWeight:800 }}>FOOD | LABOR | OPERATIONS | TECH.</strong> These gears are turning together every shift. What's different is who's walking in, how they found you, and what happens to your staffing and supply chain while they're here.
      </p>
      <p style={{ fontSize:19, color:C.muted, fontWeight:300, lineHeight:1.78, marginBottom:12, maxWidth: "90%" }}>
        Over a million more on the roads of North America for over a month puts pressure on all four at the same time. Your staff, shelves, hours, and tech may not be calibrated for this. The cards below are organized around where the pressure's likely to land. Follow your instincts.
      </p>
      <SectionReveal accent={C.orange} label="Open the toolkit">
      <p style={{ fontSize:14, color:C.text, marginBottom:24, letterSpacing:".1em", textTransform:"uppercase", fontWeight:700 }}>
        Tap any category below to expand its toolkit
      </p>
      <div className="pillar-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, padding:6, margin:-6, marginBottom:24 }}>
        {pillars.map(p => <PillarCard key={p.id} pillar={p} isActive={active===p.id} onToggle={() => active===p.id ? setActive(null) : openPillar(p.id)}/>)}
      </div>
      <div style={{ marginTop:24 }}>
        <SFCard isActive={sfOpen} onToggle={() => sfOpen ? setSfOpen(false) : openSF()}/>
      </div>

      {active && (() => { const p=pillars.find(x=>x.id===active); return p ? (
        <CardModal onClose={()=>setActive(null)} color={p.color} title={p.label} sub={p.sub}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {p.cols.map((col,i) => <SubCol key={i} title={col.title} steps={col.steps} color={p.color} cardClass={p.color===C.orange?"card-orange":"card-blue"}/>)}
          </div>
        </CardModal>
      ) : null; })()}

      {sfOpen && (
        <CardModal onClose={()=>setSfOpen(false)} color={C.blue} title="Super Fan" sub="Become the Watch Venue, Get Found, Full Match Schedule">
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <SubCol title="Become a Watch Venue" color={C.blue} cardClass="card-blue" steps={[
              "Audit your screens now. Every visible screen gets mapped to a viewing angle and a seating zone. A screen nobody can see doesn't exist. If you have one TV behind the bar, you aren't a watch venue. You're a restaurant that happens to have a TV on. There's a difference, and the fans know it.",
              "Audio matters more than picture. International football fans follow commentary the way Americans follow play-by-play. If your sound system can't isolate match audio from house music, fix it before June 11. A $40 Bluetooth speaker aimed at a patio section creates a second watch zone from nothing.",
              "During the group stage (June 11-27), there are three to four matches every day across all venues. A restaurant with screens isn't hosting one event. It's running a 14-hour viewing room for 17 straight days. Staff and stock for that rhythm, not for a single match.",
            ]}/>
            <SubCol title="Get Found" color={C.orange} cardClass="card-orange" steps={[
              "Update your Google Business Profile before June 1. Add 'live sports viewing' to attributes. Post photos of your screen setup. Update hours if you're opening early for morning kickoffs. When a visitor searches 'football near me' at 7 AM, Google decides who shows up. Not your sign. Not your Yelp. Your GBP.",
              "'Football near me,' not 'soccer near me.' International visitors search in their language. Add the word 'football' to your GBP description, social posts, and event listings. One word. Big difference in who finds you.",
              "Morning matches are the blind spot most operators will miss. East Coast and international venue kickoffs land at 9-10 AM Pacific. A coffee-and-eggs open with a screen fills a daypart that normally sits empty. The fans searching at 8:45 AM have almost no competition. Post those early kickoffs specifically.",
            ]}/>
          </div>
        </CardModal>
      )}

      </SectionReveal>

    </Sec>
  );
};

// ─── SECTION 5: PATTERNS & SOURCES ──────────────────────────────────────────

// ── Source library ── each source has id, name, type, url, what, used
const sourceLibrary = [
  { id:"zartico",
    name:"Zartico: World Cup Ready: 94 Mega-Event Matches",
    type:"Primary Confirmed",
    url:"https://www.zartico.com/blog/world-cup-ready-94-mega-event-matches",
    what:"Visitor intelligence platform. Analyzed spending patterns across 94 mega-event matches to quantify F&B lift by venue walkability. Methodology: geolocation and spending data across event-related categories at progressively wider radii from each stadium.",
    figures:["36% post-match F&B lift at walkable venues","3.5% F&B lift at transit-dependent venues"],
    platform:["who","position"] },
  { id:"visa_russia_final",
    name:"Visa Inc.: Final Results, FIFA World Cup Russia 2018",
    type:"Primary Confirmed",
    url:"https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.15761.html",
    what:"Official payment partner press release. Analyzed all Visa transactions across 12 stadiums in 11 host cities, June 14 – July 11, 2018. Covers full-tournament contactless adoption in host cities.",
    figures:["45% of all Visa purchases in 11 host cities used contactless","International guests spent 1.5x more per transaction than Russian fans on food and drink"],
    platform:["who","action"] },
  { id:"visa_russia_mid",
    name:"Visa Inc.: Mid-Tournament Data, FIFA World Cup Russia 2018",
    type:"Primary Confirmed",
    url:"https://businesswire.com/news/home/20180713005025/en/",
    what:"Mid-tournament Visa press release covering in-stadium payment behavior. Separate from final results, this release documented the 54% in-stadium contactless figure at the semi-final stage.",
    figures:["54% of in-stadium Visa purchases used contactless technology (semi-final stage)","Average in-stadium transaction: approx. $19 (1,168 rubles)"],
    platform:["who","action"] },
  { id:"sberbank",
    name:"Sberbank of Russia: World Cup 2018 Spending Analysis",
    type:"Primary Confirmed",
    url:"https://www.sportsmanagement.co.uk/Sports-news/latest/news/338447",
    what:"Russia's largest state-owned bank analyzed all foreign credit card transactions within its network during the World Cup, including card purchases, cash payments, and currency conversions. Covered 194 countries of origin.",
    figures:["Foreign spending doubled year-over-year across 11 host cities","Saransk recorded 18x increase, largest of any host city","Total international fan spending: approx. €1.3 billion / $1.5 billion","Hotels and restaurants were the two largest spending categories"],
    platform:["position","where","pattern"] },
  { id:"visa_brazil",
    name:"Visa Everywhere Travel Report: Brazil 2014",
    type:"Primary Confirmed",
    url:"https://usa.visa.com",
    what:"Post-tournament Visa analysis of international cardholder spending patterns across Brazilian host cities during the 2014 World Cup. City-level breakdown published through the Visa Everywhere Travel Report series.",
    figures:["Cuiabá: +963% international spending","Natal: +851%","Manaus: +409%","Curitiba: +167%","Brazil national baseline: +152%"],
    platform:["position","pattern"] },
  { id:"tourism_economics",
    name:"Tourism Economics (Oxford Economics): FIFA World Cup 2026 International Visitor Forecast",
    type:"Strong Directional",
    url:"https://www.oxfordeconomics.com/resource/world-cup-set-to-kick-off-us-inbound-travel-rebound/",
    what:"Oxford Economics subsidiary Tourism Economics. Projected international visitor volume, incremental travel rates, and spending patterns for the 2026 tournament. Methodology incorporates match schedules, hotel market capacity, air travel forecasts, and historical mega-event behavioral data.",
    figures:["1.24 million international visitors projected for US","742,000 (60%) incremental, trips that would not occur without the tournament","Visitors expected to stay average 12 days, attend 2 matches, spend $400+/day","Hotel revenue +7% to +25% in host markets in June 2026"],
    platform:["who","position"] },
  { id:"maennig",
    name:"Maennig, Wolfgang: One Year Later: A Re-Appraisal of the Economics of the 2006 Soccer World Cup",
    type:"Academic: Displacement Literature",
    url:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1520530",
    what:"University of Hamburg. Post-event analysis of Germany 2006 economic outcomes versus pre-event projections. Found foreign tourist spending increase of approx. €1.5 billion offset by €324 million decline in Germany's overall tourism balance. Documents the carnival effect, domestic residents traveling abroad to escape congestion.",
    figures:["Germany 2006: tourism service balance decreased despite foreign spending increase","Standard reasoning about retail, tourism, and employment impacts 'mostly of little value and may even be incorrect'","No significant employment effects in host cities"],
    platform:["pattern"] },
  { id:"baade_matheson",
    name:"Baade, R.A. & Matheson, V.A.: The Quest for the Cup: Assessing the Economic Impact of the World Cup",
    type:"Academic: Displacement Literature",
    url:"https://www.tandfonline.com/doi/abs/10.1080/03434002000213888",
    what:"Regional Studies, Vol. 38, No. 4, 2004. Ex post analysis of the 1994 World Cup in the US. Seminal paper on economic impact overstatement. Documents substitution effect, multiplier misapplication, and leakage to FIFA and multinational sponsors as primary sources of overstatement.",
    figures:["1994 US host cities: cumulative losses $5.5–$9.3 billion vs. projected $4 billion gain","Substitution effect documented, World Cup fans displaced regular tourists in markets like Orlando"],
    platform:["pattern"] },
  { id:"fifa_fanfest",
    name:"FIFA: Official Fan Fest Attendance Figures, Russia 2018 and 2026 Format",
    type:"Primary Confirmed",
    url:"https://www.fifa.com",
    what:"FIFA official statistics for Fan Festival attendance across tournament host cities. Russia 2018 Fan Fest figures (7.7M total, 400K Saransk) from FIFA official records. 2026 fan zone format (free entry, 39-day continuous operation, all 104 matches screened) from FIFA.com and confirmed host committee announcements.",
    figures:["Russia 2018 Fan Fest: 7.7 million total attendees","Saransk Fan Fest: 400,000 visitors","2026: free entry at most venues across all 39 tournament days","2026: all 104 matches screened live at official fan zones"],
    platform:["where","position"] },
  { id:"pennsylvania_dced",
    name:"Pennsylvania DCED: Satellite Fan Zone Appropriations, 2026",
    type:"Primary Confirmed",
    url:"https://dced.pa.gov",
    what:"Pennsylvania Department of Community and Economic Development. State-funded fan zones in three non-host Pennsylvania cities confirmed with $2 million in state appropriations. Documented as part of the 2026 economic activation strategy.",
    figures:["3 non-host Pennsylvania cities receiving state-funded fan zones","$2 million in state appropriations"],
    platform:["where","position"] },
];

// ── Pattern cell modal content ──
const patternModals = {
  "secondary-b14": { title:"Secondary Market Surge: Brazil 2014", tier:"Primary Confirmed", source:"visa_brazil",
    body:"Brazil 2014 produced the clearest documented evidence that World Cup spending concentrates in secondary markets, not primary ones. Smaller host cities, Cuiabá, Natal, Manaus, outperformed Rio and São Paulo in percentage terms because mobile fans needed affordable alternatives when primary market hotel prices spiked. Price displacement is the mechanism: when accommodation in the primary market becomes inaccessible, fans route to surrounding markets. Those markets become economic beneficiaries.",
    figures:["+963% Cuiabá","+851% Natal","+409% Manaus","+152% national baseline"],
    link:"position" },
  "secondary-r18": { title:"Secondary Market Surge: Russia 2018", tier:"Primary Confirmed", source:"sberbank",
    body:"Saransk was the smallest host city in Russia 2018 and recorded the largest single-market spending increase of the entire tournament, 18 times its baseline. The Sberbank analysis showed that Saransk's 18x increase outpaced the combined growth of Sochi, Samara, Nizhny Novgorod, Moscow, and St. Petersburg. The mechanism was identical to Brazil: fans needed somewhere practical to land between larger venues.",
    figures:["18x foreign spending increase","Outpaced combined growth of 5 other cities"],
    link:"position" },
  "secondary-q22": { title:"Secondary Market Surge: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar's compact geography compressed the secondary market effect, all host venues were within a small radius. Despite this, secondary activation patterns were documented through fan movement between venues and the base camp phenomenon, with national teams generating sustained local demand outside match schedules.",
    figures:["Secondary market activation confirmed","Base camp demand documented in non-match host communities"],
    link:"position" },
  "nonmatch-b14": { title:"Non-Match Day Dominance: Brazil 2014", tier:"Strong Directional", source:"visa_brazil",
    body:"Brazil 2014 documented that operators who planned only for match-day peaks systematically underperformed those who managed for sustained non-match demand. A Super Tourist with a 14-night stay attends two or three matches. The remaining 11-12 days are non-match days, every one of them eating out, taking day trips, spending at full rate with no stadium anchor.",
    figures:["14-night average stay = 11-12 non-match days","Non-match day F&B demand broader and more predictable than match-day spikes"],
    link:"who" },
  "nonmatch-r18": { title:"Non-Match Day Dominance: Russia 2018", tier:"Strong Directional", source:"sberbank",
    body:"Sberbank data showed that hotels and restaurants were the two largest spending categories across the full tournament window, not match-day concentrated spending. The base camp phenomenon amplified this: each team base camp brought 100+ media personnel and staff generating daily demand with no connection to match schedules.",
    figures:["Hotels and restaurants top two spending categories","Base camp media contingent: 100+ journalists per team"],
    link:"action" },
  "nonmatch-q22": { title:"Non-Match Day Dominance: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar 2022 confirmed the pattern across a radically different geographic and cultural context. The sustained daily demand from long-stay international visitors on non-match days outperformed the concentrated match-day spike in revenue contribution to local operators.",
    figures:["Sustained non-match demand confirmed across all host markets"],
    link:"action" },
  "supply-b14": { title:"Supply Chain Failure: Brazil 2014", tier:"Partial", source:"visa_brazil",
    body:"Brazil 2014 produced anecdotal operator reports of supply pressure but no systematic documented failure comparable to Russia 2018. The partial designation reflects the absence of named primary source documentation for specific supply chain failures, despite operator-level evidence of inventory stress.",
    figures:["Anecdotal operator reports of inventory pressure","No primary-confirmed documented failure event at scale of Russia 2018"],
    link:"where" },
  "supply-r18": { title:"Supply Chain Failure: Russia 2018", tier:"Primary Confirmed", source:"sberbank",
    body:"Russia 2018 produced the clearest documented supply chain lesson: draught beer supply failed at multiple venues within hours of match conclusions. The failure was not a shortage of beer in Russia, it was operators who modeled demand on normal trading patterns and encountered Super Tourist volume. Kegs ran dry. Restocks could not arrive fast enough. Revenue windows closed permanently.",
    figures:["Draught beer supply failed at multiple venues","Failure occurred within hours of match conclusions, not days","Operators who stockpiled pre-tournament avoided the failure"],
    link:"where" },
  "supply-q22": { title:"Supply Chain Failure: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar 2022 confirmed supply chain stress in select high-velocity categories. The compressed geographic footprint and concentrated international visitor population created demand conditions that overwhelmed unprepared operators in specific product categories.",
    figures:["Supply failure confirmed in select categories","Pattern consistent with Russia 2018 mechanism"],
    link:"where" },
  "contactless-b14": { title:"Contactless Payment Shift: Brazil 2014", tier:"Partial / Analog", source:"visa_brazil",
    body:"Brazil 2014 showed early contactless adoption signals but at lower rates than subsequent tournaments. The market was less mature and the infrastructure less deployed. Used as an emerging signal, not a confirmed data point.",
    figures:["Early adoption signals documented","Infrastructure deployment limited vs. Russia 2018"],
    link:"action" },
  "contactless-r18": { title:"Contactless Payment Shift: Russia 2018", tier:"Primary Confirmed", source:"visa_russia_final",
    body:"Visa's official final results documented 45% of all Visa purchases in 11 host cities used contactless technology across the full tournament. In-stadium contactless reached 54% at the semi-final stage. This was in 2018, in a market with lower baseline contactless adoption than the US. International visitors from Poland led at 74% contactless in-stadium.",
    figures:["45% of all host city Visa purchases: contactless","54% in-stadium contactless (semi-final stage)","Poland fans: 74% contactless in-stadium","International guests spent 1.5x more per transaction than Russian fans on F&B"],
    link:"action" },
  "contactless-q22": { title:"Contactless Payment Shift: Qatar 2022", tier:"Strong Directional", source:"visa_russia_mid",
    body:"Qatar 2022 accelerated the contactless trend documented in Russia 2018. At official venues, 88% of transactions were contactless, a jump from 45% in 2018 that reflects both infrastructure maturation and international visitor baseline expectations.",
    figures:["88% of transactions at official venues: contactless","Average in-venue transaction: $23"],
    link:"action" },
  "latenight-b14": { title:"Late-Night Dining Demand: Brazil 2014", tier:"Strong Directional", source:"visa_brazil",
    body:"Brazil 2014 documented post-match social windows averaging 3-5 hours in walkable venue locations. European and South American fans operate on dining rhythms that shift peak demand to 9 PM-midnight. Operators who closed at 10 PM on match nights missed the primary revenue window of the evening.",
    figures:["Post-match social windows: 3-5 hours average","Peak demand window: 9 PM – midnight","Service worker income increases of 40-60% documented in host cities"],
    link:"action" },
  "latenight-r18": { title:"Late-Night Dining Demand: Russia 2018", tier:"Strong Directional", source:"sberbank",
    body:"Russia 2018 confirmed the late-night demand pattern across a culturally different host market. Sberbank data showed restaurant spending as the second-largest spending category after hotels, with the timing distribution skewed toward evening and post-match windows.",
    figures:["Restaurant spending: second largest category after hotels","Post-match spending pattern confirmed across host cities"],
    link:"action" },
  "latenight-q22": { title:"Late-Night Dining Demand: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar 2022 operated on a schedule specifically designed around late-evening kickoffs to accommodate international broadcast windows. This further concentrated demand in the 9 PM-midnight window that American operators are not built to serve.",
    figures:["Multiple late-evening kickoffs across tournament","Post-match demand pattern confirmed"],
    link:"action" },
  "displacement-b14": { title:"Local Displacement Effect: Brazil 2014", tier:"Primary Confirmed", source:"baade_matheson",
    body:"Brazil 2014 produced the clearest displacement documentation: domestic tourism expenditure on shopping declined 2.3% as local residents avoided congested areas. This is the carnival effect in action, regular visitors and local consumers step back because an area feels like it belongs to the event.",
    figures:["Domestic shopping expenditure: -2.3% in affected markets","Local resident avoidance behavior documented"],
    link:"position" },
  "displacement-r18": { title:"Local Displacement Effect: Russia 2018", tier:"Strong Directional", source:"maennig",
    body:"Russia 2018 confirmed displacement at the local level, consistent with Maennig's documented carnival effect in Germany 2006. Regular domestic consumers reduced engagement with congested commercial areas during the tournament window.",
    figures:["Local displacement pattern confirmed","Consistent with Germany 2006 carnival effect documentation"],
    link:"position" },
  "displacement-q22": { title:"Local Displacement Effect: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar 2022 confirmed displacement in a market where international visitors overwhelmingly dominated the tournament footprint. The effect was less pronounced in absolute terms given Qatar's small domestic consumer base but confirmed in behavioral pattern.",
    figures:["Displacement pattern confirmed","Manageable with local retention strategy"],
    link:"position" },
  "visibility-b14": { title:"Permanent Visibility: Bordeaux 1998 Analog", tier:"Analog Framework", source:"maennig",
    body:"The Bordeaux 1998 analog documents what happened to the Bordeaux wine region in the three years surrounding France 1998. International visitor volume increased 30%, not because of stadium proximity, but because visitors who discovered the region during the tournament became ambassadors for it at home. This is the mechanism behind permanent visibility: word-of-mouth from visitors in markets outside conventional marketing reach.",
    figures:["Bordeaux wine region: +30% international visitor volume over 3 years","Mechanism: word-of-mouth, not marketing spend"],
    link:"position" },
  "visibility-r18": { title:"Permanent Visibility: Russia 2018", tier:"Strong Directional", source:"sberbank",
    body:"Russia 2018 documented the return visit phenomenon: 10% of foreign fans who visited during the tournament returned to Russia using the extended Fan ID visa waiver program through December 2018. Americans made up 43.8% of returning visitors. The permanent visibility argument has operational evidence, visitors come back.",
    figures:["10% of foreign fans returned to Russia after the tournament","Return visitors spent ₽9.9 billion ($150M) in 5 months post-tournament"],
    link:"position" },
  "visibility-q22": { title:"Permanent Visibility: Qatar 2022", tier:"Strong Directional", source:"fifa_fanfest",
    body:"Qatar 2022 documented permanent visibility through social media reach at a scale no prior tournament had produced. International visitors posting from secondary and excursion markets reached audiences in their home countries that no conventional marketing budget could access.",
    figures:["Visibility confirmed via social media reach","Secondary market operators benefited disproportionately from authentic content"],
    link:"position" },
};

const patternMatrix = [
  { id:"secondary",    label:"Secondary Market Surge",    b14:3, r18:3, q22:3, imp:"Plan as if you are Saransk" },
  { id:"nonmatch",     label:"Non-Match Day Dominance",   b14:2, r18:2, q22:2, imp:"Stock and staff for sustained daily demand" },
  { id:"supply",       label:"Supply Chain Failure",      b14:1, r18:3, q22:2, imp:"Stockpile before demand peaks" },
  { id:"contactless",  label:"Contactless Payment Shift", b14:1, r18:3, q22:3, imp:"Non-negotiable infrastructure" },
  { id:"latenight",    label:"Late-Night Dining Demand",  b14:2, r18:2, q22:2, imp:"Extend hours or forfeit the revenue" },
  { id:"displacement", label:"Local Displacement Effect", b14:3, r18:2, q22:2, imp:"Local retention strategy required" },
  { id:"visibility",   label:"Permanent Visibility",      b14:1, r18:2, q22:2, imp:"Quality investment compounds post-event" },
];

const spendData = [
  { city:"Cuiabá, Brazil 2014",  stat:963,  label:"+963%", color:"orange" },
  { city:"Natal, Brazil 2014",   stat:851,  label:"+851%", color:"blue" },
  { city:"Saransk, Russia 2018", stat:800,  label:"18x",   color:"orange" },
  { city:"Manaus, Brazil 2014",  stat:409,  label:"+409%", color:"blue" },
  { city:"Curitiba, Brazil 2014",stat:167,  label:"+167%", color:"dim" },
  { city:"Brazil National Avg",  stat:152,  label:"+152%", color:"dim" },
];

const methodologies = [
  { title:"The Confidence Tier System",
    body:"Every data point on this platform is assigned one of four confidence tiers before it appears in any copy. Tier 1 (Primary Confirmed): named primary source, stated directly without qualifying language. Tier 2 (Strong Directional): multi-tournament derivation or strong secondary sourcing, used as planning anchors and framed explicitly as such. Tier 3 (Directional Only): planning floor or illustrative range, flagged when used. Tier 4 (Pending Verification): excluded from platform copy until a named primary source is identified and the figure is reclassified. A figure is never promoted beyond its tier. The contactless 10x speed claim, for example, appears in prior operator intelligence work but was excluded from this platform because no named primary source was identified. It remains Tier 4." },
  { title:"The $140-180 Daily F&B Spend Derivation",
    body:"The daily F&B spend figure used throughout this platform is not a raw survey number. It was derived from Russia 2018 and Brazil 2014 tournament transaction data, then adjusted upward for US price levels and 2026 inflation. The Tourism Economics baseline of $100-140 was reviewed and rejected as the working figure because it reflects unadjusted international averages that do not account for the US cost environment or the specific spending profile of international football tourists, a segment that skews higher-income than the average international visitor. The $140-180 range is used as a planning floor, not a ceiling or a projection." },
  { title:"The Secondary Market Radius (30-150 Miles)",
    body:"The secondary market position is defined as 30 to 150 miles from a host city. This range traces directly to three documented behavioral patterns: the 70% gateway travel rate showing Super Tourists using host cities as bases for regional day trips; the documented excursion range of 60-100 miles consistent across Brazil 2014, Russia 2018, and Qatar 2022; and the price displacement mechanism, where primary market hotel rates rising 100%+ push mobile fans to seek accommodation in surrounding markets. The upper bound of 150 miles reflects the outer edge of practical excursion range for a visitor with a rental car and a 14-night stay. The Saransk Effect, 18x spending in a city that was simply nearby and accessible, is the empirical anchor for this range." },
];

const sectionNav = { who:"#who", where:"#where", position:"#position", action:"#action", pattern:"#pattern" };

const PatternCell = ({ patternId, tournament, level }) => {
  const [open, setOpen] = useState(false);
  const modalKey = `${patternId}-${tournament}`;
  const modal = patternModals[modalKey];
  const bg = level === 3 ? "rgba(255,103,0,.85)" : level === 2 ? "rgba(0,103,255,.7)" : "rgba(150,174,196,.2)";
  const cursor = modal ? "pointer" : "default";
  return (
    <>
      <div onClick={modal ? () => setOpen(true) : undefined}
        style={{ height:44, background:bg, borderRadius:4, cursor, transition:"opacity .15s, transform .15s", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}
        onMouseEnter={e => { if(modal) { e.currentTarget.style.opacity=".8"; e.currentTarget.style.transform="scale(1.03)"; }}}
        onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="scale(1)"; }}>
        {level === 3 && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,1 9,9 1,9" fill="rgba(255,255,255,.7)"/></svg>}
        {level === 2 && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="rgba(255,255,255,.5)"/></svg>}
        {modal && <div style={{ position:"absolute", top:4, right:5, fontSize:9, fontWeight:700, color:"rgba(255,255,255,.6)", letterSpacing:".05em" }}>&#9654;</div>}
      </div>
      {open && modal && (
        <div onClick={() => setOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.78)", zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(4px)", animation:"in .18s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`2px solid ${level===3?C.orange:C.blue}`, borderRadius:14, width:"100%", maxWidth:680, maxHeight:"80vh", overflow:"auto", boxShadow:"0 24px 64px rgba(0,0,0,.6)" }}>
            <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"flex-start", justifyContent:"space-between", position:"sticky", top:0, background:C.surface, zIndex:1 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:level===3?C.orange:C.blue, marginBottom:6 }}>{modal.tier}</div>
                <div className="d" style={{ fontSize:19, fontWeight:800, color:C.text, lineHeight:1.2 }}>{modal.title}</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:16 }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ padding:"20px 24px" }}>
              <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:20 }}>{modal.body}</p>
              {modal.figures && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.dim, marginBottom:10 }}>Key Figures</div>
                  {modal.figures.map((f,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:6 }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginTop:5, flexShrink:0 }}><polygon points="0,0 8,4 0,8" fill={level===3?C.orange:C.blue}/></svg>
                      <span style={{ fontSize:14, color:C.text }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {(modal.source || modal.link) && (
              <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.border}`, background:C.surf2, display:"flex", justifyContent:"flex-end", gap:8, flexWrap:"wrap" }}>
                {modal.link && (
                  <button onClick={() => { setOpen(false); document.getElementById(modal.link)?.scrollIntoView({behavior:"smooth"}); }}
                    style={{ fontSize:14, color:"#fff", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", background:C.orange, border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:20, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    See It In Action <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                  </button>
                )}
                {modal.source && sourceLibrary.find(s=>s.id===modal.source) && (
                  <a href={sourceLibrary.find(s=>s.id===modal.source).url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:14, color:"#fff", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none", background:C.blue, display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:20 }}>
                    View Source <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                  </a>
                )}
              </div>
            )}
            <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.border}`, background:C.surf2 }}>
              <p style={{ fontSize:12, color:C.dim }}>Tap anywhere outside to close.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SourceRow = ({ source, isOpen, onToggle }) => {
  const tierColor = source.type === "Primary Confirmed" ? C.orange : source.type === "Strong Directional" ? C.blue : C.dim;
  return (
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <button onClick={onToggle} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"16px 20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", textAlign:"left", gap:16 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", gap:12, alignItems:"baseline", flexWrap:"wrap", marginBottom:4 }}>
            <span style={{ fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:tierColor, flexShrink:0 }}>{source.type}</span>
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:C.text, lineHeight:1.4 }}>{source.name}</div>
        </div>
        <div style={{ width:28, height:28, flexShrink:0, borderRadius:5, border:`1px solid ${isOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:isOpen?"rotate(45deg)":"none", color:isOpen?C.orange:C.blue }}><svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg></div>
      </button>
      <div className={`xbody ${isOpen?"open":""}`}>
        <div style={{ padding:"0 20px 16px", display:"flex", flexDirection:"column" }}>
          <p style={{ fontSize:14, color:C.muted, lineHeight:1.78, marginBottom:16 }}>{source.what}</p>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:C.dim, marginBottom:8 }}>Figures Used on This Platform</div>
            {source.figures.map((f,i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:6 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginTop:5, flexShrink:0 }}><polygon points="0,0 8,4 0,8" fill={tierColor}/></svg>
                <span style={{ fontSize:14, color:C.text }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:16 }}>
            <span style={{ fontSize:14, color:C.dim, letterSpacing:".08em", textTransform:"uppercase" }}>Used in:</span>
            {source.platform.map((p,i) => (
              <button key={i} onClick={() => document.getElementById(p)?.scrollIntoView({behavior:"smooth"})} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:4, padding:"3px 8px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:C.muted, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {p === "who" ? "Super Tourist" : p === "where" ? "Travel Patterns" : p === "position" ? "Your Position" : p === "action" ? "Prep Priorities" : "Patterns"}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <a href={source.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:14, color:"#fff", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:5, background:tierColor, padding:"5px 12px", borderRadius:20 }}>
              Primary Source <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const SPattern = () => {
  const [tourOpen, setTourOpen] = useState(false);
  const [methOpen, setMethOpen] = useState(false);
  const [activeSource, setActiveSource] = useState(null);
  const [srcOpen, setSrcOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const statCards = [
    { num:"18x",    accent:C.blue,   cardClass:"card-blue",   label:"Saransk Effect: Russia 2018",
      body:"Saransk was the smallest host city in Russia 2018. Sberbank transaction data showed foreign spending increased 18-fold during the tournament. Not because the city had anything exceptional. Because it sat between larger venues and became the overflow hub for mobile fans. That is the secondary market dynamic.",
      src:"Sberbank transaction data via CABI Digital Library, FIFA World Cup 2018" },
    { num:"+963%",  accent:C.orange, cardClass:"card-orange", label:"Secondary Market Surge: Brazil 2014",
      body:"Visa transaction data from Brazil 2014 showed international spending growth of +963% in Cuiabá, +851% in Natal, and +409% in Manaus, all secondary host cities, not the headline venues. Secondary markets capture disproportionate percentage growth because fans spread to avoid price-inflated primary city accommodation.",
      src:"Visa Everywhere Travel Report, Brazil 2014 Group Stage Host Cities" },
    { num:"45%",    accent:C.blue,   cardClass:"card-blue",   label:"Contactless Adoption: Russia 2018",
      body:"Contactless payments accounted for 45% of all host-city purchases during Russia 2018, rising to 54% inside stadiums. That was 2018. US contactless transaction share has since crossed 60% of face-to-face volume. International visitors arrive expecting tap-to-pay. Operators without contactless terminals are a friction point at the highest-revenue moments of the tournament.",
      src:"Visa Investor Relations, 2018 FIFA World Cup Russia" },
    { num:"−2.3%",  accent:C.dim,    cardClass:"card-dim",    label:"Displacement Effect: Brazil 2014",
      body:"During Brazil 2014, domestic tourism shopping expenditure declined 2.3% as locals avoided congested areas and perceived price inflation. Operators who fill their rooms with Super Tourists for 30 days while quietly losing their regular local base risk a structural decline that outlasts the tournament.",
      src:"Sustainable Brazil: Social and Economic Impacts of the 2014 World Cup" },
  ];

  const ExpandTrigger = ({ label, open, onToggle, accent = C.blue }) => (
    <button onClick={onToggle}
      style={{ width:"100%", background:C.surface, border:`1px solid ${C.border}`, borderLeft:`4px solid ${accent}`, borderBottom:`3px solid ${accent}`, borderRadius:12, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", transition:"box-shadow .2s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}, 0 0 20px rgba(${accent===C.blue?"0,103,255":"255,103,0"},.35)`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.text }}>{label}</div>
<div style={{ width:32, height:32, flexShrink:0, borderRadius:6, border:`1px solid ${open?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:open?"rotate(45deg)":"none", color:open?C.orange:C.blue }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
    </button>
  );

  return (
  <section id="pattern" style={{ borderTop:`1px solid ${C.border}`, padding:"40px 0" }}>
    <div style={W}>
      <SecLabel color={C.blue}>Author | Patterns | Sources</SecLabel>

      <SectionReveal accent={C.blue} label="Author, patterns, sources" collapsedHeight={681}>

      {/* ── AUTHOR - TOP ── */}
      <div id="about" style={{ marginBottom:16 }}>
        <ExpandTrigger
          label={<><span style={{ fontWeight:700 }}>Andy Cook</span><span style={{ fontWeight:400, color:C.dim }}>, Restaurant Advisor | Technology Specialist</span></>}
          open={aboutOpen}
          onToggle={() => setAboutOpen(o => !o)}
          accent={C.orange}
        />
        <div className={`xbody ${aboutOpen ? "open" : ""}`}>
          <div style={{ paddingBottom:0, paddingTop:24 }}>
            <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24, alignItems:"stretch" }}>
              {/* Andy */}
              <div className="card-blue" style={{ background:C.surface, borderRadius:12, padding:"32px 28px", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:24 }}>
                  <div style={{ width:110, height:110, borderRadius:"50%", overflow:"hidden", border:`2px solid ${C.blue}`, background:"transparent", flexShrink:0 }}>
                    <img src="https://infiniterestaurants.ai/profile.png" alt="Andy Cook" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} onError={e => { e.currentTarget.style.display="none"; }} />
                  </div>
                  <div style={{ paddingTop:4 }}>
                    <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim, marginBottom:10 }}>The Author</div>
                    <div className="d" style={{ fontSize:28, fontWeight:800, color:C.text, lineHeight:1.05, marginBottom:4 }}>Andy Cook ∞</div>
                    <div style={{ fontSize:14, color:C.blue, fontWeight:600, marginBottom:2 }}>Restaurant Advisor | Restaurant Technology Specialist</div>
                    <div style={{ fontSize:13, color:C.dim }}>Harbor Foodservice, PNW</div>
                  </div>
                </div>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:16 }}>
                  I spent the mature years of my career serving in and for locally owned restaurants before crossing to serve the industry-at-large. That's not a résumé detail. It's the reason this platform exists and why it reads the way it does. I know how isolating it is to be an independent operator, and how valuable it is for them to have an industry insider who thinks like them, recognizes the power of their Hospitality Instinct, and helps them think in systems and downstream consequences.
                </p>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:16 }}>
                  My current role as the Restaurant Solutions Agent at Harbor Foodservice, a locally owned distributor in the Pacific Northwest. The title matters. I'm not sales, I'm Solutions. My job is to help the bandwidth-starved independents adapt: through whole cloth change, operational challenges, technology decisions they don't have time (or context) to properly evaluate. Harbor and the restaurants we serve answer to the same accountability structure: not to investors, but to the direct customer relationships and service that sustain both sides of this business. That alignment informs the guidance I give, and why operators trust it.
                </p>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78 }}>
                  <span style={{ fontWeight:800, textTransform:"uppercase", color:C.text }}>This one, we can get ahead of:</span> Three tournaments produced the same pattern. The operators who needed it most kept getting handed a stadium story that had nothing to do with where they stood. This platform is the correction.
                </p>
              </div>
              {/* Harbor */}
              <div style={{ background:C.surface, borderRadius:12, padding:"28px 24px 24px", border:"1px solid #4ade80", borderLeft:`4px solid #4ade80`, borderBottom:`3px solid #4ade80`, transition:"box-shadow .25s", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:24 }}>
                  <div style={{ width:110, height:110, borderRadius:"50%", overflow:"hidden", border:`2px solid #4ade80`, background:C.surf2, flexShrink:0 }}>
                    <img src="https://infiniterestaurants.ai/H.png" alt="Harbor Foodservice" style={{ width:"100%", height:"100%", objectFit:"contain", display:"block" }} onError={e => { e.currentTarget.style.display="none"; }} />
                  </div>
                  <div style={{ paddingTop:4 }}>
                    <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim, marginBottom:10 }}>Context Worth Knowing</div>
                    <div className="d" style={{ fontSize:20, fontWeight:700, color:C.text, lineHeight:1.1 }}>Harbor Foodservice: WA</div>
                    <div style={{ fontSize:14, color:"#4ade80", fontWeight:600, marginTop:4 }}>Locally Owned, Community Focused</div>
                  </div>
                </div>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:14 }}>
                  Harbor Foodservice is a locally owned distributor in the Pacific Northwest. My role there is not to move product. It is to help the restaurants we serve adapt through challenges and toward opportunities. Their success is our success - not because it sounds good, but because locally owned businesses on both sides of this relationship answer to the same accountability structure. Not to investors. Not to shareholders. To the people they serve and the relationships that sustain them.
                </p>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:16 }}>
                  That alignment is why the guidance on this platform points operators toward local distributors. A locally owned distributor and a locally owned restaurant are solving the same problem from different positions. When the tournament window compresses delivery corridors, a rep who knows your operation and cares about your outcome is a different resource than an order-taker at a national account.
                </p>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, marginBottom:16 }}>
                  I'm proud of how we serve in the PNW. This platform operates under the Infinite Restaurants banner because the pattern it documents runs across North America, not just Harbor's geography. The separation is intentional, not evasive.
                </p>
                <p className="d" style={{ fontSize:22, fontWeight:700, color:"#4ade80", lineHeight:1.3, borderLeft:`3px solid #4ade80`, paddingLeft:16, marginTop:24, marginBottom:16, fontStyle:"italic" }}>
                  "Life Happens Around The Table"
                </p>
                <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
                  <a href="https://www.harborfoodservice.com" target="_blank" rel="noopener noreferrer"
                    style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#1c1c1c", textDecoration:"none", background:"#4ade80", padding:"5px 12px", borderRadius:20 }}>
                    harborfoodservice.com <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Media Inquiries */}
            <div className="callout-left-blue" style={{ background:C.surface, borderRadius:"0 12px 12px 0", padding:"18px 22px", borderLeft:`3px solid ${C.blue}`, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, marginBottom:24, flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim, marginBottom:8 }}>Media Inquiries</div>
                <p style={{ fontSize:18, color:C.muted, lineHeight:1.78, margin:0 }}>
                  Questions about the research, the platform, or the 2026 World Cup tourism patterns, reach out directly.
                </p>
              </div>
              <div style={{ flexShrink:0 }}>
                <a
                  href="mailto:andy@infiniterestaurants.ai?subject=Media%20Inquiry%3A%20World%20Cup%20Tourism%20Patterns"
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#fff", textDecoration:"none", background:C.blue, padding:"5px 12px", borderRadius:20 }}
                >
                  andy@infiniterestaurants.ai <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                </a>
              </div>
            </div>

            {/* PNW Bridge */}
            <div style={{ background:C.surface, borderRadius:"0 12px 12px 0", padding:"18px 22px 22px", border:"1px solid #4ade80", borderLeft:`4px solid #4ade80`, borderBottom:`3px solid #4ade80`, display:"flex", flexDirection:"column" }}>
              <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.dim, marginBottom:10 }}>Already Built</div>
              <div className="d" style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:10, lineHeight:1.2 }}>I built a ground-level version of this for the Pacific Northwest first.</div>
              <p style={{ fontSize:14, color:C.muted, lineHeight:1.78, marginBottom:16 }}>
                Before this platform, I built one specific to Washington and Oregon: named highway corridors with day-by-day pressure scoring, nine mapped fan zones with operational detail by location, base camp profiles for Renton, Tukwila, Spokane, and Portland, night delivery windows, excursion destination mapping from the Hoh Rainforest to Wine Country, a regional compliance guide, and an interactive live map you can scrub by date. If you want to see what this research looks like when it goes all the way down to the ground, that platform is what it looks like. PNW operators, it was built for you specifically.
              </p>
              <div style={{ marginTop:"auto", display:"flex", justifyContent:"flex-end" }}>
                <a
                  href="https://www.harborfoodservicesoccer26.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#1c1c1c", textDecoration:"none", background:"#4ade80", padding:"5px 12px", borderRadius:20 }}
                >
                  PNW World Cup Tourism Readiness <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><polygon points="2,1 9,5 2,9" fill="currentColor"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD 1: WHAT PAST TOURNAMENTS TELL US ── */}
      <div style={{ marginBottom:16 }}>
        <ExpandTrigger label="Past Patterns" open={tourOpen} onToggle={() => setTourOpen(o => !o)} accent={C.blue} />
        <div className={`xbody ${tourOpen?"open":""}`}>
          <div style={{ paddingTop:24, paddingBottom:8, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="two-col">
            {statCards.map((s,i) => (
              <div key={i} className={s.cardClass} style={{ background:C.surface, borderRadius:12, padding:"24px 24px 28px" }}>
                <div style={{ fontSize:13, fontWeight:700, letterSpacing:".13em", textTransform:"uppercase", color:C.dim, marginBottom:14 }}>{s.label}</div>
                <div className="n" style={{ fontSize:"clamp(44px,5.5vw,68px)", fontWeight:700, color:s.accent, lineHeight:1, marginBottom:18 }}>{s.num}</div>
                <p style={{ fontSize:14, color:C.muted, lineHeight:1.78, marginBottom:14 }}>{s.body}</p>
                <div style={{ fontSize:13, color:C.dim, fontStyle:"italic", borderTop:`1px solid ${C.border}`, paddingTop:12 }}>Source: {s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CARD 2: METHODOLOGY AND SOURCES ── */}
      <div>
        <ExpandTrigger label="Methodology and Sources" open={methOpen} onToggle={() => setMethOpen(o => !o)} accent={C.blue} />
        <div className={`xbody ${methOpen?"open":""}`}>
          <div style={{ paddingTop:24, paddingBottom:40, display:"flex", flexDirection:"column", gap:24 }}>

            <div className="card-blue" style={{ borderRadius:12, overflow:"hidden" }}>
              {methodologies.map((m,i) => (
                <div key={i} style={{ borderBottom: i<methodologies.length-1?`1px solid ${C.border}`:"none" }}>
                  <details>
                    <summary style={{ padding:"16px 20px", fontSize:14, fontWeight:700, color:C.text, cursor:"pointer", listStyle:"none", display:"flex", justifyContent:"space-between", alignItems:"center", background:C.surface }}>
                      {m.title}
                      <div style={{ width:24, height:24, flexShrink:0, borderRadius:5, border:`1px solid ${C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.blue, marginLeft:12 }}><svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg></div>
                    </summary>
                    <div style={{ padding:"16px 20px 20px", background:C.surf2, borderTop:`1px solid ${C.border}` }}>
                      <p style={{ fontSize:14, color:C.muted, lineHeight:1.78 }}>{m.body}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div>
              <button onClick={() => setSrcOpen(o => !o)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: srcOpen ? 16 : 0, padding:0 }}>
                <div style={{ fontSize:14, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:C.text }}>Primary Sources</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim }}>
                  {srcOpen ? "Collapse" : `${sourceLibrary.length} sources`}
                  <div style={{ width:28, height:28, flexShrink:0, borderRadius:5, border:`1px solid ${srcOpen?C.blue:C.orange}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s,border-color .2s", transform:srcOpen?"rotate(45deg)":"none", color:srcOpen?C.orange:C.blue }}><svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round"/></svg></div>
                </div>
              </button>
              <div className={`xbody ${srcOpen?"open":""}`}>
                <div className="card-blue" style={{ borderRadius:12, overflow:"hidden", marginTop:4 }}>
                  {sourceLibrary.map((src,i) => (
                    <SourceRow key={src.id} source={src} isOpen={activeSource===i} onToggle={() => setActiveSource(activeSource===i?null:i)} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </SectionReveal>

    </div>

  </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ borderTop:`1px solid ${C.border}`, padding:"36px 120px" }}>
    <div style={{ ...W, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
      <Logo/>
      <a
        href="mailto:andy@infiniterestaurants.ai?subject=WC%20Tourism"
        style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:C.dim, textDecoration:"none", transition:"color .18s" }}
        onMouseEnter={e => e.currentTarget.style.color=C.blue}
        onMouseLeave={e => e.currentTarget.style.color=C.dim}
      >
        andy@infiniterestaurants.ai
      </a>
    </div>
  </footer>
);

const useActive = () => {
  const [a, setA] = useState("");
  useEffect(() => {
    const ids = ["who","where","position","action","ai","pattern"];
    const handle = () => {
      const nav = document.querySelector("nav");
      const navH = (nav ? nav.offsetHeight : 80) + 24;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= navH) current = id;
      }
      setA(current);
    };
    window.addEventListener("scroll", handle, { passive:true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return a;
};

export default function App() {
  const active = useActive();
  const goWho = () => document.getElementById("who")?.scrollIntoView({ behavior:"smooth" });
  return (
    <>
      <FontLoader/>
      <G/>
      <div style={{ background:C.bg, minHeight:"100vh" }}>
        <ScrollProg/>
        <Hero onContinue={goWho}/>
        <Ticker/>
        <Nav active={active}/>
        <SWho/>
        <SWhere/>
        <SPosition/>
        <SAction/>
        <SAI/>
        <SPattern/>
        <Footer/>
      </div>

      <Analytics/>

    </>
  );
}
