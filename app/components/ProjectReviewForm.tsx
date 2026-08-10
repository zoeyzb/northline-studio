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
      setStatus("Add your name, email, and a short note about what you want to improve.");
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

    setStatus("Ready. Your email app will open with the message prepared.");
    window.location.href = `mailto:hello@northline.studio?subject=${subject}&body=${body}`;
  };

  return (
    <form className="review-form simplified-form" onSubmit={submit} data-reveal noValidate>
      <div className="form-intro">
        <span>Project inquiry</span>
        <h3>Keep it simple.</h3>
        <p>Tell us what you are building or what feels wrong with the current site. That is enough to start.</p>
      </div>

      <div className="form-row">
        <label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label>Email <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
      </div>

      <label>Current website <small>optional</small><input name="website" type="url" inputMode="url" placeholder="https://" /></label>

      <label>What do you want to improve or build? <span>*</span>
        <textarea name="need" rows={5} placeholder="Example: Our site feels outdated and confusing. We want a clearer story, stronger visuals, and a better way for people to contact us." required />
      </label>

      <button className="button button-primary magnetic" type="submit">Send project details <span aria-hidden="true">↗</span></button>
      <p className="form-note">Nothing is submitted automatically. This prepares an email for you to review and send.</p>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
