import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";

const audiences = [
  ["Higher education", "Programs, labs, centers, and academic initiatives."],
  ["Research & innovation", "Complex work translated into a clear public story."],
  ["Nonprofits", "Mission, evidence, and participation made easier to understand."],
  ["Professional firms", "Expertise presented with the authority it deserves."],
  ["Selected B2B ventures", "Early credibility for serious products and teams."],
];

const services = [
  {
    number: "01",
    title: "Organization websites",
    copy: "Clear digital homes for institutions, programs, firms, and public-interest work.",
    labels: ["Positioning", "Structure", "Launch"],
  },
  {
    number: "02",
    title: "Portfolio systems",
    copy: "Professional narratives that connect experience, evidence, and direction.",
    labels: ["Experience", "Selected work", "Direction"],
  },
  {
    number: "03",
    title: "Digital platforms",
    copy: "Useful portals and systems for information, workflows, and participation.",
    labels: ["Input", "System", "Action"],
  },
];

const method = [
  ["Message", "What should people understand immediately?"],
  ["Evidence", "What proves the work is credible?"],
  ["Action", "What should the visitor do next?"],
];

export default function Home() {
  return (
    <main id="main-content" className="northline-home">
      <MotionController />
      <AtmosphericSceneClient />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="scroll-rail" aria-label="Page chapters">
        <span className="scroll-rail-progress" />
        <a href="#overview" data-rail-link="overview"><i>01</i><span>Overview</span></a>
        <a href="#audience" data-rail-link="audience"><i>02</i><span>Audience</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Services</span></a>
        <a href="#method" data-rail-link="method"><i>04</i><span>Method</span></a>
        <a href="#engagements" data-rail-link="engagements"><i>05</i><span>Engage</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="atmosphere" aria-hidden="true">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="grid-plane" />
          <span className="grain" />
        </div>

        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home">
            <span className="wordmark-mark" aria-hidden="true">N</span>
            <span>Northline</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#method">Method</a>
            <a href="#engagements">Engagements</a>
            <a className="nav-cta" href="#contact">Start a project</a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Digital credibility for consequential work</p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Make the first impression</span></span>
              <em className="hero-line-mask"><span data-hero-line>match the work.</span></em>
            </h1>
            <p className="hero-description" data-hero-support>
              We design websites and digital platforms that make serious work easier to understand, trust, and act on.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary" href="#contact">Start a project <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href="#services">See what we build</a>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-halo" />
            <div className="interface-stack interface-stack-back">
              <span className="interface-label">Evidence</span>
              <div className="interface-lines"><i/><i/><i/></div>
            </div>
            <div className="interface-stack interface-stack-mid">
              <span className="interface-label">Message</span>
              <div className="interface-heading" />
              <div className="interface-copy" />
            </div>
            <div className="interface-stack interface-stack-front">
              <div className="interface-nav"><i/><span/><span/><b/></div>
              <div className="interface-hero"><strong>Make important work clear.</strong><span/></div>
              <div className="interface-cards"><i/><i/><i/></div>
            </div>
          </div>
        </div>

        <div className="hero-caption shell" data-hero-support>
          <span>Message</span><i>→</i><span>Evidence</span><i>→</i><span>Action</span>
        </div>
      </section>

      <section className="audience-section scene-section" id="audience" data-scene="audience" data-scene-strength=".46" aria-labelledby="audience-title">
        <div className="shell audience-shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">Who we build for</p>
            <h2 id="audience-title">Digital credibility for consequential work.</h2>
            <p>For organizations whose website affects trust, participation, funding, recruitment, or growth.</p>
          </header>
          <div className="audience-grid">
            {audiences.map(([title, copy], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section scene-section" id="services" data-scene="services" data-scene-strength=".28" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading" data-reveal>
            <p className="eyebrow">What we build</p>
            <h2 id="services-title">Three formats. One clear standard.</h2>
          </header>

          <div className="service-showcase">
            {services.map((service, index) => (
              <article key={service.title} className="service-scene" data-service data-reveal>
                <div className="service-copy">
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <div className={`service-object service-object-${index + 1}`} aria-hidden="true">
                  {service.labels.map((label, labelIndex) => (
                    <div key={label} style={{ "--layer": labelIndex } as React.CSSProperties}>
                      <span>{label}</span><i/><i/>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section scene-section" id="method" data-scene="method" data-scene-strength=".55" aria-labelledby="method-title">
        <div className="shell method-shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">The credibility system</p>
            <h2 id="method-title">Message <i>→</i> Evidence <i>→</i> Action</h2>
            <p>Every project is organized around three questions.</p>
          </header>

          <div className="method-flow" aria-label="Message, Evidence, Action process">
            {method.map(([title, copy], index) => (
              <article key={title} data-method-card data-reveal>
                <span>0{index + 1}</span>
                <div className="method-icon" aria-hidden="true"><i/><i/></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
            <div className="method-line" aria-hidden="true"><span/></div>
          </div>
        </div>
      </section>

      <section className="continuity-section scene-section" data-scene="continuity" data-scene-strength=".32" aria-labelledby="continuity-title">
        <div className="shell continuity-shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">Continuous improvement</p>
            <h2 id="continuity-title">Observe. Decide. Improve.</h2>
          </header>
          <div className="continuity-rings" aria-label="Continuous improvement cycle">
            {[
              ["Observe", "See what is unclear."],
              ["Decide", "Choose the highest-value change."],
              ["Improve", "Ship, learn, and repeat."],
            ].map(([title, copy], index) => (
              <article key={title} data-reveal>
                <div className="ring" aria-hidden="true"><i/><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="engagements scene-section" id="engagements" data-scene="engagements" data-scene-strength=".42" aria-labelledby="engagements-title">
        <div className="shell engagement-shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">Ways to work together</p>
            <h2 id="engagements-title">Launch once—or keep improving.</h2>
          </header>
          <div className="engagement-grid">
            <article data-reveal>
              <span>Defined engagement</span>
              <h3>One-time build</h3>
              <p>Strategy, design, development, launch, and a structured handoff.</p>
              <ul><li>Clear scope</li><li>Complete build</li><li>Ownership transfer</li></ul>
            </article>
            <article className="featured" data-reveal>
              <span>Ongoing partnership</span>
              <h3>Managed digital presence</h3>
              <p>Continuous oversight and improvement after launch.</p>
              <ul><li>Maintenance</li><li>Content refinement</li><li>Reporting and iteration</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section scene-section" id="contact" data-scene="contact" data-scene-strength=".22" aria-labelledby="contact-title">
        <div className="shell contact-shell" data-reveal>
          <p className="eyebrow">Start with the gap</p>
          <h2 id="contact-title">Show us what the digital presence is failing to communicate.</h2>
          <a className="button button-primary" href="mailto:hello@northline.studio?subject=Project%20review">Request a project review <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span className="wordmark-mark" aria-hidden="true">N</span><span>Northline</span></a>
        <p>Digital credibility for consequential work.</p>
      </footer>
    </main>
  );
}
