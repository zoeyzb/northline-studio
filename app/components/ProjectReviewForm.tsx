"use client";

import { FormEvent, useState } from "react";

export function ProjectReviewForm() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const organization = String(form.get("organization") || "").trim();
    const website = String(form.get("website") || "").trim();
    const gap = String(form.get("gap") || "").trim();
    const outcome = String(form.get("outcome") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();

    if (!organization || !gap || !outcome || !name || !email) {
      setStatus("Please complete the required fields.");
      return;
    }

    const subject = encodeURIComponent(`Project review — ${organization}`);
    const body = encodeURIComponent([
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
    ].join("\n"));

    setStatus("Opening your email app with the project details prepared.");
    window.location.href = `mailto:hello@northline.studio?subject=${subject}&body=${body}`;
  };

  return (
    <form className="review-form" onSubmit={submit} data-reveal noValidate>
      <div className="form-row">
        <label>Organization <span>*</span><input name="organization" autoComplete="organization" required /></label>
        <label>Existing website<input name="website" type="url" inputMode="url" placeholder="https://" /></label>
      </div>
      <label>What is unclear or underperforming? <span>*</span><textarea name="gap" rows={4} required /></label>
      <label>What needs to happen next? <span>*</span><textarea name="outcome" rows={4} required /></label>
      <label>Desired timeline<select name="timeline" defaultValue=""><option value="">Select one</option><option>Within 4–6 weeks</option><option>Within 2–3 months</option><option>Within 3–6 months</option><option>Exploring options</option></select></label>
      <div className="form-row">
        <label>Your name <span>*</span><input name="name" autoComplete="name" required /></label>
        <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <button className="button button-primary" type="submit">Prepare project review <span aria-hidden="true">↗</span></button>
      <p className="form-note">Your details stay in your email app until you choose to send them.</p>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
