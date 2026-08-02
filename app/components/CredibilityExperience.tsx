"use client";

import { useState } from "react";

const reviewAreas = [
  { id: "clarity", label: "Clarity", finding: "The purpose is visible, but the value is buried beneath internal language.", change: "Lead with the decision a visitor needs to make—not the organization chart." },
  { id: "proof", label: "Proof", finding: "Expertise is claimed before projects, people, and outcomes make it believable.", change: "Move evidence into the path of each claim and label what is verified." },
  { id: "path", label: "Action", finding: "Different visitors reach the same generic contact route.", change: "Create specific next steps for applicants, partners, funders, and recruits." },
] as const;

const gaps = [
  {
    id: "message",
    number: "01",
    label: "Message",
    question: "Can the right visitor understand the work in seconds?",
    before: "A broad mission statement asks visitors to interpret the organization for themselves.",
    after: "A precise opening names the work, who it serves, why it matters, and the next question to answer.",
    signal: "Comprehension",
  },
  {
    id: "evidence",
    number: "02",
    label: "Evidence",
    question: "Does every important claim have something behind it?",
    before: "Projects, people, results, and institutional signals sit on disconnected pages—or never appear.",
    after: "Relevant proof appears beside the claim, with clear context, ownership, and honest status labels.",
    signal: "Confidence",
  },
  {
    id: "action",
    number: "03",
    label: "Action",
    question: "Does each stakeholder know what to do next?",
    before: "One vague contact button serves applicants, partners, funders, recruits, and prospective clients.",
    after: "Each journey ends in a specific, low-friction next step with the information needed to act.",
    signal: "Movement",
  },
] as const;

export function HeroReview() {
  const [activeId, setActiveId] = useState<(typeof reviewAreas)[number]["id"]>("clarity");
  const active = reviewAreas.find((area) => area.id === activeId) ?? reviewAreas[0];

  return (
    <aside className="review-console" aria-label="Website review example">
      <div className="review-console-bar">
        <span><i /> Digital presence review</span>
        <b>Website review example</b>
      </div>
      <div className="review-console-body">
        <div className="review-console-title">
          <span><small>REVIEW / 001</small><strong>What is the current presence failing to communicate?</strong></span>
          <span className="review-state">In review</span>
        </div>
        <div className="review-tabs" aria-label="What we examine">
          {reviewAreas.map((area) => (
            <button type="button" key={area.id} onClick={() => setActiveId(area.id)} aria-pressed={active.id === area.id}>
              <span>{area.label}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="review-finding" aria-live="polite">
          <small>OBSERVED GAP</small>
          <p>{active.finding}</p>
          <div><span>Northline direction</span><strong>{active.change}</strong></div>
        </div>
        <div className="review-output">
          <span><i /> What we examine</span>
          <span>Message</span><span>Evidence</span><span>Visitor paths</span><span>Performance</span>
        </div>
      </div>
    </aside>
  );
}

export function CredibilityGapWalkthrough() {
  const [activeId, setActiveId] = useState<(typeof gaps)[number]["id"]>("message");
  const active = gaps.find((gap) => gap.id === activeId) ?? gaps[0];

  return (
    <div className="gap-experience">
      <div className="gap-tabs" aria-label="Choose a credibility gap">
        {gaps.map((gap) => (
          <button type="button" key={gap.id} onClick={() => setActiveId(gap.id)} aria-pressed={gap.id === active.id}>
            <span>{gap.number}</span><strong>{gap.label}</strong><i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>
      <article className="gap-panel" aria-live="polite">
        <div className="gap-panel-heading"><span>{active.number} / {active.label}</span><h3>{active.question}</h3></div>
        <div className="gap-comparison">
          <div><small>WHEN IT IS WEAK</small><p>{active.before}</p></div>
          <i aria-hidden="true">→</i>
          <div className="gap-after"><small>WHAT CHANGES</small><p>{active.after}</p></div>
        </div>
        <div className="gap-signal"><span>What changes after launch</span><strong>{active.signal}</strong></div>
      </article>
    </div>
  );
}
