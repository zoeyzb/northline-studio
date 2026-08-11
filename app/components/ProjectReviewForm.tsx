"use client";

import { FormEvent, useState } from "react";

export function ProjectReviewForm() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const website = String(form.get("website") || "").trim();
    const need = String(form.get("need") || "").trim();

    if (!name || !email || !need) {
      setStatus("Add your name, email, and a short note.");
      return;
    }

    const subject = encodeURIComponent(`Northline project inquiry — ${name}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Website: ${website || "Not provided"}`,
      "",
      "What I want to improve or build:",
      need,
    ].join("\n"));

    setStatus("Ready. Your email app will open next.");
    window.location.href = `mailto:hello@northline.studio?subject=${subject}&body=${body}`;
  };

  return (
    <form className="review-form simplified-form" onSubmit={submit} data-reveal noValidate>
      <div className="form-intro">
        <span>Project inquiry</span>
        <h3>Tell us the gap.</h3>
        <p>Site, idea, or product. A few lines are enough.</p>
      </div>

      <div className="form-row">
        <label>Name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label>Email <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
      </div>

      <label>Current site <small>optional</small><input name="website" type="url" inputMode="url" placeholder="https://" /></label>

      <label>What should feel better? <span>*</span>
        <textarea name="need" rows={4} placeholder="Our site feels flat. We want a clearer story and stronger experience." required />
      </label>

      <button className="button button-primary magnetic" type="submit">Send project details <span aria-hidden="true">↗</span></button>
      <p className="form-note">Opens a prepared email. Nothing sends automatically.</p>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
