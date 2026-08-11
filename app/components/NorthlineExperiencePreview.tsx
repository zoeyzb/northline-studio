"use client";

import { useState } from "react";

const modes = [
  {
    id: "strategy",
    label: "Strategy",
    eyebrow: "POSITIONING",
    title: "Make the first idea impossible to miss.",
    note: "Message hierarchy · audience path · conversion intent",
    cards: ["Core promise", "Proof order", "Primary action"],
  },
  {
    id: "structure",
    label: "Structure",
    eyebrow: "EXPERIENCE MAP",
    title: "Turn scattered content into one obvious path.",
    note: "Information architecture · page roles · interaction flow",
    cards: ["Entry", "Evidence", "Decision"],
  },
  {
    id: "motion",
    label: "Motion",
    eyebrow: "SPATIAL SYSTEM",
    title: "Use depth and movement to guide attention.",
    note: "Parallax · scene transitions · micro-interactions",
    cards: ["Reveal", "Depth", "Response"],
  },
  {
    id: "build",
    label: "Build",
    eyebrow: "PRODUCTION",
    title: "Ship the visual idea without flattening it.",
    note: "Responsive engineering · accessibility · performance",
    cards: ["Desktop", "Mobile", "Launch"],
  },
] as const;

export function NorthlineExperiencePreview() {
  const [activeId, setActiveId] = useState<(typeof modes)[number]["id"]>("strategy");
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0];

  return (
    <div className="nl-preview interactive-card" data-hero-preview data-parallax aria-label="Interactive Northline project system example">
      <div className="nl-preview-glow" aria-hidden="true" />
      <div className="nl-preview-shell">
        <div className="nl-preview-topbar">
          <span><i /><i /><i /></span>
          <small>INTERACTIVE PROJECT SYSTEM</small>
          <b>LIVE EXAMPLE</b>
        </div>
        <div className="nl-preview-body">
          <aside aria-label="Choose a Northline discipline">
            <strong>N</strong>
            {modes.map((mode, index) => (
              <button
                type="button"
                key={mode.id}
                className={active.id === mode.id ? "active" : ""}
                aria-pressed={active.id === mode.id}
                onClick={() => setActiveId(mode.id)}
              >
                <span>0{index + 1}</span>
                {mode.label}
              </button>
            ))}
          </aside>
          <div className="nl-preview-content" key={active.id}>
            <div className="nl-preview-heading">
              <small>{active.eyebrow}</small>
              <strong>{active.title}</strong>
              <p>{active.note}</p>
            </div>
            <div className="nl-preview-cards">
              {active.cards.map((card, index) => (
                <article key={card} style={{ "--preview-index": index } as React.CSSProperties}>
                  <span>0{index + 1}</span>
                  <b>{card}</b>
                  <i />
                  <i />
                </article>
              ))}
            </div>
            <div className="nl-preview-status">
              <span><i /> {active.label} system active</span>
              <b>Move through the disciplines →</b>
            </div>
          </div>
        </div>
      </div>
      <span className="nl-preview-float float-one">CLARITY</span>
      <span className="nl-preview-float float-two">DEPTH</span>
      <span className="nl-preview-float float-three">ACTION</span>
    </div>
  );
}
