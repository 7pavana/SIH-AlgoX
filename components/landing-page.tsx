"use client";

import { ArrowDown, ArrowUpRight, Menu, MoveRight, Plus, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const links = ["Overview", "Technology", "Screening", "Research", "About"];
const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.7 } };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function ScientificField() {
  const reduce = useReducedMotion();
  return <div className="science-field" aria-hidden="true">
    <svg viewBox="0 0 600 510" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M27 315C91 264 90 135 218 135C349 135 321 359 451 359C519 359 536 295 579 255" className="orbit orbit-a" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 2.5 }} />
      <motion.path d="M10 178C108 246 146 363 265 331C388 298 355 93 570 93" className="orbit orbit-b" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 2.8, delay: 0.2 }} />
      <path d="M92 80C148 22 264 40 289 123C312 201 203 211 224 285C246 362 373 325 420 407" className="orbit orbit-c" />
      <path d="M47 398C137 360 162 453 247 415C322 381 334 245 445 253C516 258 530 326 579 354" className="orbit orbit-d" />
      {[[92,80],[218,135],[265,331],[451,359],[570,93],[420,407],[445,253],[224,285]].map(([cx,cy], i) => <motion.circle key={i} cx={cx} cy={cy} r={i === 2 ? 7 : 4} className={i === 2 || i === 4 ? "node lavender-node" : "node"} animate={reduce ? {} : { opacity: [0.45,1,0.45] }} transition={{ duration: 3 + i / 2, repeat: Infinity }} />)}
      <path d="M287 174h78M326 135v78M307 155l38 38M345 155l-38 38" className="circuit" />
    </svg>
    <div className="field-note top-note">01 / clinical patterns</div><div className="field-note bottom-note">q. state / 0.72</div>
  </div>;
}

function ProcessFlow() {
  const steps = ["Clinical Data", "Feature Processing", "Quantum Model", "Risk Analysis", "Early Screening Insight"];
  return <div className="process-flow">{steps.map((step, i) => <div className={`process-step ${i === 2 ? "quantum" : ""}`} key={step}><span>0{i + 1}</span><strong>{step}</strong>{i < steps.length - 1 && <i><ArrowDown size={16} /></i>}</div>)}</div>;
}

export function LandingPage() {
  const [open, setOpen] = useState(false);
  return <main>
    <nav className="nav-shell" aria-label="Primary navigation"><a href="#top" className="wordmark">[PROJECT NAME]<sup>®</sup></a><div className="nav-links">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}<a className="nav-cta" href="/screening">Start screening <ArrowUpRight size={15}/></a></div><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{links.map(link => <a key={link} onClick={() => setOpen(false)} href={`#${link.toLowerCase()}`}>{link}</a>)}<a href="/screening" className="button primary">Start screening <ArrowUpRight size={16}/></a></motion.div>}</AnimatePresence></nav>

    <section className="hero" id="top"><div className="hero-copy"><motion.p className="eyebrow" initial={{opacity:0}} animate={{opacity:1}}><span />Early detection / decision support</motion.p><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }}>Detect earlier.<br/><em>Understand deeper.</em></motion.h1><motion.div className="hero-bottom" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .32 }}><p>A quantum-assisted clinical screening platform designed to analyse health indicators and surface patterns associated with elevated disease risk.</p><div className="actions"><a href="/screening" className="button primary">Start screening <ArrowUpRight size={17}/></a><a href="#technology" className="text-link">Explore the technology <MoveRight size={18}/></a></div></motion.div></div><ScientificField /><div className="hero-rule"><span>Independent clinical decision support</span><span>Scroll to explore <ArrowDown size={15}/></span></div></section>

    <section className="statement section" id="overview"><motion.div {...fade}><SectionLabel>Why earlier matters</SectionLabel><h2>Disease progression<br/>doesn&apos;t wait <em>for diagnosis.</em></h2></motion.div><motion.div className="statement-side" {...fade}><p>Subtle changes can precede symptoms. Screening creates a thoughtful opportunity to examine health signals sooner—supporting conversations with clinicians, not replacing them.</p><a className="text-link" href="#research">Our research approach <ArrowUpRight size={17}/></a></motion.div></section>

    <section className="process-section section" id="technology"><motion.div {...fade}><SectionLabel>From signal to insight</SectionLabel><div className="process-heading"><h2>A measured path through complex information.</h2><p>Every stage is designed as a transparent part of a future clinical workflow. This interface is a product preview, not a diagnostic tool.</p></div></motion.div><motion.div {...fade} className="flow-wrap"><ProcessFlow /><div className="flow-detail"><span className="detail-number">03</span><p>Quantum model</p><small>A research-focused layer for exploring complex health-indicator relationships.</small></div></motion.div></section>

    <section className="quantum section"><div className="quantum-graphic" aria-hidden="true"><div className="q-grid" />{["00","01","10","11"].map((n,i)=><div className={`q-node q${i}`} key={n}><span>{n}</span></div>)}<svg viewBox="0 0 600 280"><path d="M20 75H580M20 140H580M20 205H580"/><path d="M142 75v130M315 75v130M459 75v130"/><circle cx="142" cy="75" r="24"/><circle cx="315" cy="140" r="24"/><circle cx="459" cy="205" r="24"/></svg></div><motion.div className="quantum-copy" {...fade}><SectionLabel>Quantum, with restraint</SectionLabel><h2>Designed to ask<br/>better questions.</h2><p>Quantum models are an emerging area of research. Here, they are presented as one future component in a wider, clinically grounded process—not as a promise of certainty.</p><div className="small-rule"><span>RESEARCH PROTOTYPE</span><span>Q / 01—04</span></div></motion.div></section>

    <section className="screening section" id="screening"><motion.div className="screening-intro" {...fade}><SectionLabel>Screening interface / preview</SectionLabel><h2>A calmer view<br/>of the signals.</h2><p>A considered workspace for reviewing patient parameters and discussing possible next steps.</p></motion.div><motion.div className="app-preview" {...fade}><div className="app-top"><span>SCREENING WORKSPACE</span><span>DEMO DATA ONLY</span></div><div className="app-body"><div className="parameters"><h3>Patient parameters</h3>{[["Age range","45–54"],["Blood pressure","128 / 84"],["Glucose","98 mg/dL"]].map(([a,b])=><div className="parameter" key={a}><span>{a}</span><strong>{b}</strong></div>)}<button className="analysis-button">Run analysis <ArrowUpRight size={16}/></button></div><div className="risk-panel"><div><p>Pattern review</p><h3>Elevated risk<br/>indicators <em>detected.</em></h3></div><div className="risk-meter"><svg viewBox="0 0 180 100"><path d="M15 88A75 75 0 0 1 165 88" className="meter-bg"/><path d="M15 88A75 75 0 0 1 128 25" className="meter-fill"/></svg><strong>Review</strong><small>Further clinical evaluation may be recommended.</small></div></div></div></motion.div></section>

    <section className="closing" id="research"><div><SectionLabel>Research-led screening</SectionLabel><h2>Make space for<br/><em>earlier attention.</em></h2></div><a href="#top" className="closing-link">Explore the platform <ArrowUpRight size={24}/></a><footer id="about"><span>[PROJECT NAME] / SIH prototype</span><span>Early disease detection using quantum models</span><span>© 2026</span></footer></section>
  </main>;
}
