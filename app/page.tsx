import dynamic from "next/dynamic";
import { MotionController } from "./components/MotionController";

const AtmosphericScene = dynamic(
  () => import("./components/AtmosphericScene").then((module) => module.AtmosphericScene),
  { ssr: false },
);

const audiences = [
  "Higher education",
  "Research & innovation",
  "Nonprofits",
  "Professional services",
  "Selected B2B ventures",
];

const method = [
  {
    number: "01",
    title: "Message",
    description: "Make the work, its relevance, and its audience immediately clear.",
  },
  {
    number: "02",
    title: "Evidence",
    description: "Structure the people, projects, outcomes, and proof that make it credible.",
  },
  {
    number: "03",
    title: "Action",
    description: "Guide each visitor toward the next step that matters.",
  },
];

const services = [
  {
    number: "01",
    kind: "website",
    title: "Organization websites",
    audience: "Institutions, programs, nonprofits, firms, and ventures",
    outcome: "Turn fragmented information into a clear, credible digital presence.",
  },
  {
    number: "02",
    kind: "portfolio",
    title: "Portfolio systems",
    audience: "Researchers, founders, leaders, and emerging professionals",
    outcome: "Connect experience, work, and direction into a convincing narrative.",
  },
  {
    number: "03",
    kind: "platform",
    title: "Digital platforms",
    audience: "Organizations with complex information or operational workflows",
    outcome: "Create useful portals, dashboards, internal tools, and connected systems.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <MotionController />
      <aside className="scroll-rail" aria-hidden="true">
        <span className="scroll-rail-progress" />
        <i>01</i><i>02</i><i>03</i><i>04</i>
      </aside>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <section className="hero" aria-labelledby="hero-title">
        <AtmosphericScene />
        <div className="atmosphere" aria-hidden="true">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="grid-plane" />
          <span className="grain" />
        </div>

        <header className="site-header shell">
          <a className="wordmark" href="#main-content" aria-label="Northline home">
            <span className="wordmark-mark" aria-hidden="true">N</span>
            <span>Northline</span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#method">Method</a>
            <a href="#services">Services</a>
            <a href="#engagements">Engagements</a>
            <a href="#contact">Start a project</a>
          </nav>
        </header>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>
              Digital credibility for consequential work
            </p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Make the first impression</span></span>
              <em className="hero-line-mask"><span data-hero-line>match the work.</span></em>
            </h1>
            <p className="hero-description" data-hero-support>
              We build and continuously improve websites, portfolios, and
              digital platforms that make important work easier to understand,
              trust, and act on.
            </p>

            <div className="hero-actions" id="contact" data-hero-support>
              <a className="button button-primary" href="mailto:hello@northline.studio?subject=Project%20review">
                Request a project review
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#method">
                Explore our method
              </a>
            </div>
          </div>

          <aside className="credibility-panel" aria-label="Northline credibility framework">
            <div className="panel-topline">
              <span>Northline framework</span>
              <span className="status"><i /> Active</span>
            </div>
            <p className="panel-question">What should this experience make possible?</p>
            <ol>
              {method.map((item) => (
                <li key={item.number}>
                  <span>{item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="panel-outcome">
              <span>Outcome</span>
              <strong>Clarity that earns trust and directs action.</strong>
            </div>
          </aside>
        </div>

        <div className="audience-strip shell" aria-label="Organizations we serve">
          <span className="strip-label">Built for</span>
          <div>
            {audiences.map((audience) => <span key={audience}>{audience}</span>)}
          </div>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="shell">
          <div className="services-heading">
            <p className="eyebrow dark">What we build</p>
            <h2 id="services-title">Different outputs. One credibility system.</h2>
            <p>
              The format changes with the need. The standard does not: every
              engagement clarifies the message, strengthens the evidence, and
              creates a purposeful path forward.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article key={service.number} data-reveal data-service={service.kind}>
                <span className="service-number">{service.number}</span>
                <div>
                  <p className="service-audience">{service.audience}</p>
                  <h3>{service.title}</h3>
                </div>
                <div className="service-result">
                  <p className="service-outcome">{service.outcome}</p>
                  <div className={`service-visual visual-${service.kind}`} aria-hidden="true">
                    {service.kind === "website" && <><span>Message</span><span>Evidence</span><span>Action</span></>}
                    {service.kind === "portfolio" && <><span className="portfolio-card">Experience</span><span className="portfolio-card">Selected work</span><span className="portfolio-card">Direction</span></>}
                    {service.kind === "platform" && <><span className="platform-node">Input</span><span className="platform-core">System</span><span className="platform-node">Action</span></>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section shell" id="method" aria-labelledby="method-title">
        <div className="section-intro">
          <p className="eyebrow dark">The credibility system</p>
          <h2 id="method-title">Substance should never be buried under a weak digital presence.</h2>
          <p>
            We turn complex programs, expertise, and organizations into a clear
            narrative supported by real evidence and purposeful conversion paths.
          </p>
        </div>

        <div className="method-grid">
          {method.map((item) => (
            <article key={item.number} data-reveal>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="engagements" id="engagements" aria-labelledby="engagements-title">
        <div className="shell engagement-layout">
          <div className="section-intro light">
            <p className="eyebrow">Ways to work together</p>
            <h2 id="engagements-title">Launch once—or keep improving.</h2>
            <p>
              Choose a defined build with handoff, or an ongoing partnership
              that protects and improves your digital credibility after launch.
            </p>
          </div>

          <div className="engagement-cards">
            <article>
              <span className="card-label">Defined engagement</span>
              <h3>One-time build</h3>
              <p>Strategy, narrative, design, development, launch, and a structured handoff.</p>
              <ul>
                <li>Clear scope and delivery plan</li>
                <li>Accessible, responsive implementation</li>
                <li>Documentation and ownership transfer</li>
              </ul>
            </article>

            <article className="featured-card">
              <span className="card-label">Ongoing partnership</span>
              <h3>Managed digital presence</h3>
              <p>Continuous oversight and improvements informed by performance, content, and organizational change.</p>
              <ul>
                <li>Maintenance, security, and accessibility</li>
                <li>Content and conversion improvements</li>
                <li>Analytics reviews and strategic updates</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="standards-section" aria-labelledby="standards-title">
        <div className="shell standards-layout">
          <div>
            <p className="eyebrow dark">Evidence before decoration</p>
            <h2 id="standards-title">Credibility cannot be manufactured with polish alone.</h2>
          </div>
          <div className="standards-copy">
            <p>
              We do not invent metrics, testimonials, partnerships, or outcomes.
              When proof is limited, we improve how the real work is documented,
              explained, and experienced.
            </p>
            <dl>
              <div><dt>01</dt><dd>Real work over unsupported claims</dd></div>
              <div><dt>02</dt><dd>Functional experiences over decorative demos</dd></div>
              <div><dt>03</dt><dd>Accessible clarity over visual noise</dd></div>
              <div><dt>04</dt><dd>Continuous improvement over launch-and-forget</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-main">
          <p className="eyebrow">Start with the current version</p>
          <h2>Show us what the digital presence is failing to communicate.</h2>
          <a className="button button-primary" href="mailto:hello@northline.studio?subject=Project%20review">
            Request a project review <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="shell footer-bottom">
          <span>Northline</span>
          <span>Message → Evidence → Action</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
