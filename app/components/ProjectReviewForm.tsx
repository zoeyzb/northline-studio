"use client";

import { FormEvent, useState } from "react";

export function ProjectReviewForm() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const organization = String(form.get("organization") || "").trim();
    const website = String(form.get("website") || "").trim();
    const projectType = String(form.get("projectType") || "").trim();
    const gap = String(form.get("gap") || "").trim();
    const outcome = String(form.get("outcome") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const budget = String(form.get("budget") || "").trim();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();

    if (!organization || !projectType || !gap || !outcome || !name || !email) {
      setStatus("Please complete the required fields before opening the review email.");
      return;
    }

    const subject = encodeURIComponent(`Northline project review — ${organization}`);
    const body = encodeURIComponent([
      `Organization: ${organization}`,
      `Existing website: ${website || "Not provided"}`,
      `Project type: ${projectType}`,
      `Desired timeline: ${timeline || "Not specified"}`,
      `Budget range: ${budget || "Not specified"}`,
      `Contact: ${name} (${email})`,
      "",
      "Where is the current digital experience losing trust, clarity, or momentum?",
      gap,
      "",
      "What should be stronger when the work is finished?",
      outcome,
    ].join("\n"));

    setStatus("Your project review is prepared. Nothing is sent until you choose to send it in your email app.");
    window.location.href = `mailto:hello@northline.studio?subject=${subject}&body=${body}`;
  };

  return (
    <form className="review-form" onSubmit={submit} data-reveal noValidate>
      <div className="form-intro">
        <span>Project review</span>
        <h3>Give us the useful context.</h3>
        <p>Required fields are marked with an asterisk. The form prepares an email on your device; nothing is sent automatically.</p>
      </div>

      <div className="form-row">
        <label>Organization <span>*</span><input name="organization" autoComplete="organization" required /></label>
        <label>Existing website<input name="website" type="url" inputMode="url" placeholder="https://" /></label>
      </div>

      <label>What kind of project is this? <span>*</span>
        <select name="projectType" defaultValue="" required>
          <option value="" disabled>Select one</option>
          <option>Flagship website</option>
          <option>Digital product or platform</option>
          <option>Existing-site transformation</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <label>Where is the current experience losing trust, clarity, or momentum? <span>*</span><textarea name="gap" rows={4} required /></label>
      <label>What should be stronger when the work is finished? <span>*</span><textarea name="outcome" rows={4} required /></label>

      <div className="form-row">
        <label>Desired timeline
          <select name="timeline" defaultValue="">
            <option value="">Select one</option>
            <option>Within 4–6 weeks</option>
            <option>Within 2–3 months</option>
            <option>Within 3–6 months</option>
            <option>Exploring options</option>
          </select>
        </label>
        <label>Planned investment
          <select name="budget" defaultValue="">
            <option value="">Select one</option>
            <option>Under $5k</option>
            <option>$5k–$10k</option>
            <option>$10k–$25k</option>
            <option>$25k+</option>
            <option>Need help scoping</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>Your name <span>*</span><input name="name" autoComplete="name" required /></label>
        <label>Email <span>*</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>

      <button className="button button-primary magnetic" type="submit">Open project review email <span aria-hidden="true">↗</span></button>
      <p className="form-note">Privacy by design: your answers stay in your browser until your email app opens, and nothing is sent until you choose to send it.</p>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
