"use client";

import { FormEvent, useMemo, useState } from "react";

const EMAIL = "hello@northline.studio";
const NOTE_ID = "project-review-note";
const STATUS_ID = "project-review-status";

export function ProjectReviewForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const element = event.currentTarget;
    const form = new FormData(element);
    const organization = String(form.get("organization") || "").trim();
    const website = String(form.get("website") || "").trim();
    const gap = String(form.get("gap") || "").trim();
    const outcome = String(form.get("outcome") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();

    if (!organization || !gap || !outcome || !name || !email) {
      setStatus("Complete the required fields before continuing.");
      element.reportValidity();
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("Enter a valid email address.");
      element.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }

    if (website) {
      try {
        new URL(website);
      } catch {
        setStatus("Enter the website as a full URL, including https://");
        element.querySelector<HTMLInputElement>('input[name="website"]')?.focus();
        return;
      }
    }

    const plainText = [
      `Organization: ${organization}`,
      `Website: ${website || "Not provided"}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Timeline: ${timeline || "Not specified"}`,
      "",
      "What is unclear or underperforming?",
      gap,
      "",
      "What needs to happen next?",
      outcome,
    ].join("\n");

    const subject = encodeURIComponent(`Project review — ${organization}`);
    const body = encodeURIComponent(plainText);

    setBusy(true);
    setStatus("Preparing your project review…");

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainText);
        setStatus("Project details copied. Opening your email app…");
      } else {
        setStatus("Opening your email app with the project details prepared…");
      }
    } catch {
      setStatus("Opening your email app with the project details prepared…");
    }

    window.location.assign(`mailto:${EMAIL}?subject=${subject}&body=${body}`);
    window.setTimeout(() => setBusy(false), 1200);
  };

  return (
    <form className="review-form" onSubmit={submit} data-reveal aria-describedby={`${NOTE_ID} ${STATUS_ID}`}>
      <div className="form-row">
        <label>Organization <span aria-hidden="true">*</span><input name="organization" autoComplete="organization" required /></label>
        <label>Existing website<input name="website" type="url" inputMode="url" placeholder="https://example.org" /></label>
      </div>
      <label>What is unclear or underperforming? <span aria-hidden="true">*</span><textarea name="gap" rows={4} required placeholder="What feels confusing, dated, difficult to navigate, or too hard to explain?" /></label>
      <label>What needs to happen next? <span aria-hidden="true">*</span><textarea name="outcome" rows={4} required placeholder="What should the new experience make easier, clearer, or more credible?" /></label>
      <label>Desired timeline<select name="timeline" defaultValue=""><option value="">Select one</option><option>Within 4–6 weeks</option><option>Within 2–3 months</option><option>Within 3–6 months</option><option>Exploring options</option></select></label>
      <div className="form-row">
        <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required /></label>
        <label>Email <span aria-hidden="true">*</span><input name="email" type="email" inputMode="email" autoComplete="email" required /></label>
      </div>
      <button className="button button-primary" type="submit" disabled={busy} aria-busy={busy}>
        {busy ? "Preparing…" : "Open project review email"} <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note" id={NOTE_ID}>Required fields are marked with an asterisk. This prepares an email draft on your device; nothing is sent until you choose to send it.</p>
      <p className="form-status" id={STATUS_ID} role="status" aria-live="polite">{status}</p>
    </form>
  );
}
