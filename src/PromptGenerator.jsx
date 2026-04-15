// PromptGenerator.jsx
// Modal UI component for prompt generation
// Reads from generators map in promptTemplates.js
// Usage: <GenButton generatorId="sales_rep" label="Generate a Distributor Conversation Prompt" />
// Supports question types: options (single-select), multiselect, text
// build() can return a string (single prompt) or array of prompt objects (multi-prompt)
// Multi-prompt object shape: { label, sequence, outputNote, humanMoment (optional), text }

import { useState } from "react";
import { generators, KNOWLEDGE_FILE_CONTENT } from "./promptTemplates";

const C = {
  blue:    "#0067FF",
  orange:  "#FF6700",
  surface: "#252527",
  surf2:   "#2c2c2e",
  border:  "#2e3d50",
  text:    "#f2f6fa",
  muted:   "#e8eef4",
  dim:     "#96aec4",
};

// Map platformOverride ids (from PlatformModal: "claude" | "chatgpt" | "gemini")
// onto the answer values the generators branch on ("Claude" | "ChatGPT" | "Gemini").
const PLATFORM_ID_MAP = { claude: "Claude", chatgpt: "ChatGPT", gemini: "Gemini" };

const PromptGenerator = ({ generatorId, platformOverride, onClose }) => {
  const gen = generators[generatorId];
  const overridePlatform = platformOverride ? PLATFORM_ID_MAP[platformOverride] || null : null;
  const [answers, setAnswers] = useState(overridePlatform ? { platform: overridePlatform } : {});
  const [step, setStep] = useState(0);
  const [prompts, setPrompts] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!gen) return null;

  // When platform is already known, skip the platform question.
  const questions = overridePlatform
    ? gen.questions.filter(q => q.id !== "platform")
    : gen.questions;
  const currentQ = questions[step];
  const accentColor = gen.color === "orange" ? C.orange : C.blue;

  const finalize = (finalAnswers) => {
    const result = gen.build(finalAnswers);
    if (Array.isArray(result)) {
      setPrompts(result);
    } else {
      setPrompts([{ label: null, sequence: gen.promptSequence || null, outputNote: gen.outputNote || null, text: result }]);
    }
  };

  const handleSingleSelect = (qId, val) => {
    const newAnswers = { ...answers, [qId]: val };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(s => s + 1), 180);
    } else {
      setTimeout(() => finalize(newAnswers), 180);
    }
  };

  const handleMultiToggle = (qId, val) => {
    const current = answers[qId] || [];
    const next = current.includes(val)
      ? current.filter(v => v !== val)
      : [...current, val];
    setAnswers(a => ({ ...a, [qId]: next }));
  };

  const handleAdvance = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      finalize({ ...answers });
    }
  };

  const handleTextContinue = () => {
    if (answers[currentQ.id]?.trim()) handleAdvance();
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const multiSelected = (qId) => answers[qId] || [];
  const isMultiPrompt = prompts && prompts.length > 1;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.82)", zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", padding:24, backdropFilter:"blur(6px)", animation:"in .18s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:C.surface, border:`2px solid ${accentColor}`, borderRadius:14, width:"100%", maxWidth:680, maxHeight:"88vh", overflow:"auto", boxShadow:`0 24px 64px rgba(0,0,0,.6), 0 0 40px ${gen.color==="orange"?"rgba(255,103,0,.15)":"rgba(0,103,255,.15)"}` }}>

        {/* Header */}
        <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:C.surface, zIndex:1 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:accentColor, marginBottom:4 }}>Prompt Generator</div>
            <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:19, fontWeight:800, color:C.text }}>{gen.label}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", color:C.muted, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div style={{ padding:"24px" }}>
          {!prompts ? (
            <>
              {/* Progress */}
              <div style={{ display:"flex", gap:6, marginBottom:28 }}>
                {questions.map((q,i) => (
                  <div key={i} style={{ height:3, flex:1, borderRadius:2, background: i <= step ? accentColor : C.border, opacity: i <= step ? 1 : 0.4, transition:"background .2s" }}/>
                ))}
              </div>

              <div style={{ marginBottom:20 }}>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:19, fontWeight:700, color:C.text, lineHeight:1.3, marginBottom:20 }}>{currentQ.text}</div>

                {/* TEXT */}
                {currentQ.type === "text" && (
                  <div>
                    <input
                      type="text"
                      placeholder={currentQ.placeholder || "Type your answer..."}
                      value={answers[currentQ.id] || ""}
                      onChange={e => setAnswers(a => ({ ...a, [currentQ.id]: e.target.value }))}
                      style={{ width:"100%", background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, padding:"12px 16px", fontSize:15, color:C.text, fontFamily:"'Jost',sans-serif", outline:"none", boxSizing:"border-box" }}
                      onKeyDown={e => { if (e.key === "Enter") handleTextContinue(); }}
                    />
                    <button
                      onClick={handleTextContinue}
                      disabled={!answers[currentQ.id]?.trim()}
                      style={{ marginTop:12, background: answers[currentQ.id]?.trim() ? accentColor : C.surf2, border:"none", borderRadius:8, padding:"11px 24px", cursor: answers[currentQ.id]?.trim() ? "pointer" : "default", fontSize:13, fontWeight:700, color: answers[currentQ.id]?.trim() ? "white" : C.dim, fontFamily:"'Jost',sans-serif", letterSpacing:".08em", textTransform:"uppercase", transition:"all .2s" }}>
                      Continue
                    </button>
                  </div>
                )}

                {/* SINGLE SELECT */}
                {!currentQ.type && currentQ.options && (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {currentQ.options.map((opt, i) => (
                      <button key={i} onClick={() => handleSingleSelect(currentQ.id, opt)}
                        style={{ background: answers[currentQ.id] === opt ? `rgba(${gen.color==="orange"?"255,103,0":"0,103,255"},.12)` : C.surf2, border:`1px solid ${answers[currentQ.id] === opt ? accentColor : C.border}`, borderRadius:8, padding:"12px 16px", cursor:"pointer", textAlign:"left", fontSize:15, color: answers[currentQ.id] === opt ? accentColor : C.muted, fontFamily:"'Jost',sans-serif", transition:"all .15s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        {opt}
                        {answers[currentQ.id] === opt && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* MULTISELECT */}
                {currentQ.type === "multiselect" && (
                  <div>
                    <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                      {currentQ.options.map((opt, i) => {
                        const selected = multiSelected(currentQ.id).includes(opt);
                        return (
                          <button key={i} onClick={() => handleMultiToggle(currentQ.id, opt)}
                            style={{ background: selected ? `rgba(${gen.color==="orange"?"255,103,0":"0,103,255"},.12)` : C.surf2, border:`1px solid ${selected ? accentColor : C.border}`, borderRadius:8, padding:"12px 16px", cursor:"pointer", textAlign:"left", fontSize:15, color: selected ? accentColor : C.muted, fontFamily:"'Jost',sans-serif", transition:"all .15s", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            {opt}
                            {selected && (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={handleAdvance}
                      style={{ background:accentColor, border:"none", borderRadius:8, padding:"11px 24px", cursor:"pointer", fontSize:13, fontWeight:700, color:"white", fontFamily:"'Jost',sans-serif", letterSpacing:".08em", textTransform:"uppercase" }}>
                      {multiSelected(currentQ.id).length === 0
                        ? "Continue — none selected"
                        : `Continue — ${multiSelected(currentQ.id).length} selected`}
                    </button>
                  </div>
                )}
              </div>

              {/* Previous answers */}
              {step > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:16 }}>
                  {questions.slice(0, step).map((q, i) => {
                    const val = answers[q.id];
                    if (!val) return null;
                    const display = Array.isArray(val) ? (val.length === 0 ? "None" : val.join(", ")) : val;
                    return <div key={i} style={{ fontSize:12, color:C.dim, background:C.surf2, border:`1px solid ${C.border}`, borderRadius:20, padding:"3px 10px" }}>{display}</div>;
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ display:"flex", flexDirection:"column", gap: isMultiPrompt ? 28 : 16 }}>
                {prompts.map((p, i) => (
                  <div key={i}>
                    {p.label && (
                      <div style={{ fontSize:13, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:accentColor, marginBottom:10 }}>{p.label}</div>
                    )}

                    <div style={{ background:C.surf2, border:`1px solid ${C.border}`, borderRadius:8, padding:"16px 18px", fontSize:14, color:C.muted, lineHeight:1.78, whiteSpace:"pre-wrap", maxHeight:280, overflow:"auto", marginBottom:12 }}>{p.text}</div>

                    <button onClick={() => handleCopy(p.text, i)}
                      style={{ background: copiedIndex === i ? "rgba(0,103,255,.15)" : accentColor, border:"none", borderRadius:8, padding:"10px 20px", cursor:"pointer", fontSize:13, fontWeight:700, color: copiedIndex === i ? C.blue : "white", fontFamily:"'Jost',sans-serif", letterSpacing:".06em", textTransform:"uppercase", transition:"all .2s", display:"inline-flex", alignItems:"center", gap:8 }}>
                      {copiedIndex === i ? (
                        <>Copied <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                      ) : `Copy${p.label ? " " + p.label : " Prompt"}`}
                    </button>

                    {p.outputNote && (
                      <p style={{ fontSize:13, color:C.dim, marginTop:10, lineHeight:1.6 }}>{p.outputNote}</p>
                    )}

                    {p.humanMoment && i < prompts.length - 1 && (
                      <div style={{ marginTop:20, padding:"14px 18px", border:`1px solid ${C.border}`, borderLeft:`3px solid ${accentColor}`, borderRadius:"0 8px 8px 0" }}>
                        <div style={{ fontSize:12, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:accentColor, marginBottom:6 }}>Before Prompt 2</div>
                        <p style={{ fontSize:14, color:C.muted, lineHeight:1.65, margin:0 }}>{p.humanMoment}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop:24, paddingTop:20, borderTop:`1px solid ${C.border}`, display:"flex", gap:10, flexWrap:"wrap" }}>
                <button onClick={() => { setPrompts(null); setAnswers(overridePlatform ? { platform: overridePlatform } : {}); setStep(0); setCopiedIndex(null); }}
                  style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 20px", cursor:"pointer", fontSize:13, fontWeight:700, color:C.dim, fontFamily:"'Jost',sans-serif", letterSpacing:".06em", textTransform:"uppercase" }}>
                  Start Over
                </button>
                <button onClick={() => {
                  const blob = new Blob([KNOWLEDGE_FILE_CONTENT], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "ir-knowledge-file.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                  style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 20px", cursor:"pointer", fontSize:13, fontWeight:700, color:C.dim, fontFamily:"'Jost',sans-serif", letterSpacing:".06em", textTransform:"uppercase", display:"inline-flex", alignItems:"center", gap:7 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 6l3 3 3-3M1 10h10" stroke={C.dim} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download Knowledge File
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ padding:"12px 24px", borderTop:`1px solid ${C.border}`, background:C.surf2 }}>
          <p style={{ fontSize:12, color:C.dim }}>Tap anywhere outside to close.</p>
        </div>
      </div>
    </div>
  );
};

export const GenButton = ({ generatorId, label }) => {
  const [open, setOpen] = useState(false);
  const gen = generators[generatorId];
  if (!gen) return null;
  const color = gen.color === "orange" ? C.orange : C.blue;
  return (
    <>
      <button
        onClick={e => { e.stopPropagation(); setOpen(true); }}
        style={{ display:"inline-flex", alignItems:"center", gap:7, background:"none", border:`1px solid ${color}`, borderRadius:6, padding:"7px 14px", cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color, fontFamily:"'Jost',sans-serif", transition:"background .15s" }}
        onMouseEnter={e => e.currentTarget.style.background = `rgba(${gen.color==="orange"?"255,103,0":"0,103,255"},.1)`}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" fill={color}/>
          <rect x="6.5" y="1" width="3.5" height="3.5" rx="0.5" fill={color}/>
          <rect x="1" y="6.5" width="3.5" height="3.5" rx="0.5" fill={color}/>
          <rect x="6.5" y="6.5" width="3.5" height="3.5" rx="0.5" fill={color}/>
        </svg>
        {label || "Generate Prompt"}
      </button>
      {open && <PromptGenerator generatorId={generatorId} onClose={() => setOpen(false)} />}
    </>
  );
};

export default PromptGenerator;
