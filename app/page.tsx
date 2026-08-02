import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";

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

const selectedWork = [
  {
    index: "01",
    type: "Revenue operations platform",
    title: "Recover Revenue",
    brief: "A fragmented follow-up process reframed as one operational system for lead recovery, communication, and owner visibility.",
    contribution: ["Product narrative", "Workflow architecture", "Interface system", "Automation pathways"],
  },
  {
    index: "02",
    type: "Opportunity platform",
    title: "NextRole",
    brief: "A complex job-search workflow organized into a legible product journey—from discovery and fit to application readiness and tracking.",
    contribution: ["Information architecture", "Product UX", "System states", "Application workflow"],
  },
];

const stakeholders = [
  ["Applicants", "Can I see where I fit and what happens next?"],
  ["Partners", "Is the work substantial, aligned, and credible?"],
  ["Funders", "What is the model, evidence, and potential impact?"],
  ["Recruits", "Who is doing the work—and why should I join?"],
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
        <AtmosphericSceneClient />
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
            <a href="#work">Work</a>
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

      <section className="signal-section" aria-labelledby="signal-title">
        <div className="shell signal-layout">
          <div className="signal-sticky">
            <p className="eyebrow dark">One presence. Different decisions.</p>
            <h2 id="signal-title">Credibility changes with the person looking.</h2>
            <p>A serious digital presence does not push one generic pitch. It gives every important stakeholder the evidence and next step they need.</p>
          </div>
          <div className="stakeholder-stack">
            {stakeholders.map(([name, question], index) => (
              <article key={name} data-reveal>
                <span>0{index + 1}</span>
                <div><h3>{name}</h3><p>{question}</p></div>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
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

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="work-heading">
            <div><p className="eyebrow">Selected systems</p><span>Evidence, not a logo wall</span></div>
            <h2 id="work-title">See how complex work becomes a clear digital experience.</h2>
          </div>
          <div className="work-list">
            {selectedWork.map((project) => (
              <article key={project.title} data-reveal>
                <div className="work-meta"><span>{project.index}</span><span>{project.type}</span></div>
                <div className="work-copy"><h3>{project.title}</h3><p>{project.brief}</p></div>
                <ul aria-label={`${project.title} contribution`}>
                  {project.contribution.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="work-window" aria-hidden="true">
                  <div className="window-bar"><i/><i/><i/><span>{project.title.toLowerCase().replace(" ", "-")}.system</span></div>
                  <div className="window-canvas">
                    <span className="window-kicker">From fragmented</span>
                    <strong>{project.title}</strong>
                    <div className="window-flow"><i/><i/><i/></div>
                    <span className="window-result">to directed action</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="work-note">These are product and system studies. No client outcomes or performance figures are presented without verified evidence.</p>
        </div>
      </section>

      <section className="continuity-section" aria-labelledby="continuity-title">
        <div className="shell continuity-layout">
          <div>
            <p className="eyebrow dark">After launch</p>
            <h2 id="continuity-title">A digital presence is never actually finished.</h2>
          </div>
          <div className="continuity-loop" aria-label="Continuous improvement cycle">
            <div><span>01</span><strong>Observe</strong><p>Analytics, behavior, accessibility, and changing priorities.</p></div>
            <div><span>02</span><strong>Decide</strong><p>Identify the highest-value credibility and conversion improvement.</p></div>
            <div><span>03</span><strong>Improve</strong><p>Ship focused changes, measure the response, and repeat.</p></div>
          </div>
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
