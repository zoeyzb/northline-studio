import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const problems = [
  {
    number: "01",
    title: "Complex work is difficult to explain",
    copy: "The organization understands its value internally, but visitors cannot quickly see what it does or why it matters.",
  },
  {
    number: "02",
    title: "Evidence is scattered",
    copy: "Programs, research, outcomes, people, publications, and partnerships live across disconnected pages and files.",
  },
  {
    number: "03",
    title: "The website understates the institution",
    copy: "The digital presence feels smaller, less established, or less capable than the work behind it.",
  },
  {
    number: "04",
    title: "Visitors do not know what to do next",
    copy: "Applicants, partners, funders, clients, and participants cannot find a clear path forward.",
  },
];

const work = [
  {
    type: "Revenue operations platform",
    title: "Recover Revenue",
    problem: "A complex operational system needed a clear product story and a usable path from lead recovery to booked work.",
    decision: "Organize the experience around missed opportunity, operational proof, and the next action an operator should take.",
    delivered: ["Product positioning", "Workflow architecture", "Responsive interface", "Operational dashboards"],
    href: "https://recoverrevenue.company/",
    label: "View live platform",
    className: "work-recover",
  },
  {
    type: "Career automation platform",
    title: "NextRole",
    problem: "Job-search automation can feel opaque and risky when users cannot see what the system is doing or control key actions.",
    decision: "Make progress, evidence, and human checkpoints visible throughout the workflow.",
    delivered: ["Product narrative", "Application workflow", "Trust states", "Responsive product UI"],
    href: "https://next-role-web-nine.vercel.app/",
    label: "View live platform",
    className: "work-nextrole",
  },
  {
    type: "Institutional concept system",
    title: "Research initiative platform",
    problem: "Programs often need to explain research, people, opportunities, and impact to several audiences at once.",
    decision: "Create one hierarchy connecting the initiative, its evidence, and routes to participate.",
    delivered: ["Information architecture", "Evidence modules", "Program pathways", "Accessible content system"],
    href: "#method",
    label: "See the approach",
    className: "work-research",
  },
];

const services = [
  {
    number: "01",
    title: "Institutional websites",
    copy: "For organizations, programs, centers, initiatives, and expert-led firms that need a clearer and more credible public presence.",
    labels: ["Positioning", "Information architecture", "Design and development", "CMS and launch"],
  },
  {
    number: "02",
    title: "Program and initiative platforms",
    copy: "For applications, resources, directories, events, participation, reporting, and other structured public experiences.",
    labels: ["User flows", "Platform architecture", "Forms and workflows", "Integrations"],
  },
  {
    number: "03",
    title: "Digital presence improvement",
    copy: "For organizations with an existing site that needs focused improvement rather than another unnecessary rebuild.",
    labels: ["Messaging audit", "UX and accessibility", "Performance", "Ongoing releases"],
  },
];

const method = [
  {
    number: "01",
    title: "Message",
    question: "What must the visitor understand?",
    copy: "We define the audience, positioning, page hierarchy, and core narrative before design begins.",
    output: "Messaging brief and page architecture",
  },
  {
    number: "02",
    title: "Evidence",
    question: "What makes the work believable?",
    copy: "We organize outcomes, research, programs, people, publications, partnerships, and proof into useful modules.",
    output: "Evidence map and content system",
  },
  {
    number: "03",
    title: "Action",
    question: "What should happen next?",
    copy: "We create clear pathways to apply, contact, partner, donate, attend, explore, or hire.",
    output: "Conversion paths and measurable actions",
  },
];

const engagements = [
  {
    label: "Defined engagement",
    title: "Foundation",
    copy: "A complete website or institutional launch with a clear scope and structured handoff.",
    items: ["Strategy and positioning", "Custom design and development", "CMS, testing, and launch"],
  },
  {
    label: "Complex build",
    title: "Platform",
    copy: "A functional digital system involving structured content, workflows, applications, or integrations.",
    items: ["User and stakeholder flows", "Functional platform development", "Data, integrations, and deployment"],
  },
  {
    label: "Ongoing partnership",
    title: "Continuous improvement",
    copy: "Focused ownership after launch, guided by clarity, usability, performance, and content needs.",
    items: ["Content and page improvements", "Accessibility and performance", "Monthly planning and releases"],
  },
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
        <a href="#work" data-rail-link="work"><i>02</i><span>Work</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Services</span></a>
        <a href="#method" data-rail-link="method"><i>04</i><span>Method</span></a>
        <a href="#contact" data-rail-link="contact"><i>05</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="atmosphere" aria-hidden="true"><span className="grid-plane" /><span className="grain" /></div>

        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Credibility studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#method">Method</a>
            <a className="nav-cta" href="#contact">Request a review</a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Websites and digital platforms for institutions and expert organizations</p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Turn complex work into</span></span>
              <em className="hero-line-mask"><span data-hero-line>a clear digital presence.</span></em>
            </h1>
            <p className="hero-description" data-hero-support>
              Northline helps universities, research programs, nonprofits, and professional organizations explain what they do, prove why it matters, and guide visitors toward the right next step.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary" href="#work">Review our work <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="#method">See how we work</a>
            </div>
            <p className="hero-fit" data-hero-support>Best suited for complex, evidence-heavy work that deserves to be understood quickly.</p>
          </div>

          <div className="hero-object" aria-label="A fragmented interface becoming a clear website system">
            <div className="hero-halo" aria-hidden="true" />
            <div className="interface-fragment fragment-one"><span>Research</span><i/><i/></div>
            <div className="interface-fragment fragment-two"><span>Programs</span><i/><i/></div>
            <div className="interface-fragment fragment-three"><span>Outcomes</span><i/><i/></div>
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
              <div className="interface-action">Clear next step <span>→</span></div>
            </div>
          </div>
        </div>

        <div className="hero-caption shell" data-hero-support><span>Message</span><i>→</i><span>Evidence</span><i>→</i><span>Action</span></div>
      </section>

      <section className="proof-strip scene-section" data-scene="proof" data-scene-strength=".42" aria-label="Northline standards">
        <div className="shell proof-grid">
          <p><strong>Clear positioning</strong><span>Visitors understand the organization quickly.</span></p>
          <p><strong>Visible evidence</strong><span>Claims are supported by outcomes, people, and work.</span></p>
          <p><strong>Functional delivery</strong><span>Responsive, accessible systems—not static concepts.</span></p>
          <p><strong>Direct ownership</strong><span>Strategy, design, development, and launch stay connected.</span></p>
        </div>
      </section>

      <section className="work-section scene-section" id="work" data-scene="work" data-scene-strength=".78" aria-labelledby="work-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">Selected work</p><h2 id="work-title">Evidence before promises.</h2></div>
            <p>Each project starts with a communication problem, turns evidence into structure, and ends with a useful digital experience.</p>
          </header>

          <div className="work-list">
            {work.map((project, index) => (
              <article className="work-card" data-work-card data-reveal key={project.title}>
                <div className="work-copy">
                  <span className="work-index">0{index + 1} / {project.type}</span>
                  <h3>{project.title}</h3>
                  <dl>
                    <div><dt>Problem</dt><dd>{project.problem}</dd></div>
                    <div><dt>Decision</dt><dd>{project.decision}</dd></div>
                  </dl>
                  <ul>{project.delivered.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>{project.label} <span>↗</span></a>
                </div>
                <div className={`work-visual ${project.className}`} aria-hidden="true">
                  <div className="browser-bar"><i/><i/><i/><span/></div>
                  <div className="work-screen">
                    <aside><b/><i/><i/><i/></aside>
                    <section><span className="screen-kicker"/><strong/><p/><div className="screen-grid"><i/><i/><i/></div></section>
                  </div>
                  <div className="decision-note">{index === 0 ? "Opportunity → proof → action" : index === 1 ? "Progress → control → trust" : "Initiative → evidence → participation"}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="problems-section scene-section" id="problems" data-scene="problems" data-scene-strength=".34" aria-labelledby="problems-title">
        <div className="shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">Where clarity breaks down</p>
            <h2 id="problems-title">The work is valuable. The digital story is not keeping up.</h2>
          </header>
          <div className="problem-grid">
            {problems.map((problem) => (
              <article key={problem.title} data-reveal><span>{problem.number}</span><h3>{problem.title}</h3><p>{problem.copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section scene-section" id="services" data-scene="services" data-scene-strength=".3" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">What we build</p><h2 id="services-title">One standard across three kinds of work.</h2></div>
            <p>Every engagement connects positioning, structure, visual design, engineering, and launch instead of treating them as separate layers.</p>
          </header>
          <div className="service-showcase">
            {services.map((service, index) => (
              <article key={service.title} className="service-scene" data-service data-reveal>
                <div className="service-copy"><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.labels.map((label) => <li key={label}>{label}</li>)}</ul></div>
                <div className={`service-object service-object-${index + 1}`} aria-hidden="true">
                  <div className="service-frame"><span>{service.title}</span><i/><i/><div><b/><b/><b/></div></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section scene-section" id="method" data-scene="method" data-scene-strength=".62" aria-labelledby="method-title">
        <div className="shell method-shell">
          <header className="section-heading centered" data-reveal>
            <p className="eyebrow">The credibility system</p>
            <h2 id="method-title">Message <i>→</i> Evidence <i>→</i> Action</h2>
            <p>One framework, translated into concrete decisions and deliverables.</p>
          </header>
          <div className="method-stage">
            <div className="method-preview" aria-hidden="true">
              <div className="method-layer method-message"><span>Message</span><strong>What must be understood?</strong></div>
              <div className="method-layer method-evidence"><span>Evidence</span><div><i/><i/><i/></div></div>
              <div className="method-layer method-action"><span>Action</span><b>Participate →</b></div>
            </div>
            <div className="method-flow">
              {method.map((step) => (
                <article key={step.title} data-method-card data-reveal>
                  <span>{step.number}</span><p className="method-question">{step.question}</p><h3>{step.title}</h3><p>{step.copy}</p><strong>Output: {step.output}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="engagements scene-section" id="engagements" data-scene="engagements" data-scene-strength=".4" aria-labelledby="engagements-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">Ways to work together</p><h2 id="engagements-title">Build what is needed. Keep improving what matters.</h2></div>
            <p>The right engagement depends on whether the gap is a public presence, a functional platform, or ongoing digital ownership.</p>
          </header>
          <div className="engagement-grid">
            {engagements.map((engagement, index) => (
              <article className={index === 1 ? "featured" : ""} data-reveal key={engagement.title}><span>{engagement.label}</span><h3>{engagement.title}</h3><p>{engagement.copy}</p><ul>{engagement.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section scene-section" id="about" data-scene="about" data-scene-strength=".28" aria-labelledby="about-title">
        <div className="shell about-grid">
          <div className="section-heading" data-reveal><p className="eyebrow">How Northline operates</p><h2 id="about-title">A focused studio, not a layered agency handoff.</h2></div>
          <div className="about-copy" data-reveal>
            <p>Northline connects strategy, content structure, interaction design, and development so the original communication problem does not get lost between specialists.</p>
            <div className="standards-grid">
              <article><strong>Direct collaboration</strong><span>You work close to the people making the strategic and technical decisions.</span></article>
              <article><strong>Accessible by default</strong><span>Keyboard use, reduced motion, contrast, semantics, and responsive behavior are part of delivery.</span></article>
              <article><strong>Performance discipline</strong><span>Motion and 3D are used selectively, with fallbacks for lower-power devices.</span></article>
              <article><strong>Ownership and handoff</strong><span>The system is documented and built for the organization to operate after launch.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section scene-section" id="contact" data-scene="contact" data-scene-strength=".22" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Start with the gap</p>
            <h2 id="contact-title">What is the current digital presence failing to communicate?</h2>
            <p>Share the existing site, the audience that matters, and what needs to become clearer. Northline will respond with the most useful next step—not an automatic sales call.</p>
            <ul><li>Institutional websites</li><li>Program and initiative platforms</li><li>Focused digital improvements</li></ul>
          </div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span>Northline</span><small>Credibility studio</small></a>
        <p>Clear message. Visible evidence. Useful action.</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}
