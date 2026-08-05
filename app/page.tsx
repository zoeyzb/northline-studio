import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const problems = [
  ["01", "Complex work is difficult to explain", "The organization understands its value internally, but visitors cannot quickly see what it does or why it matters."],
  ["02", "Evidence is scattered", "Programs, research, outcomes, people, publications, and partnerships live across disconnected pages and files."],
  ["03", "The website understates the institution", "The digital presence feels smaller, less established, or less capable than the work behind it."],
  ["04", "Visitors do not know what to do next", "Applicants, partners, funders, clients, and participants cannot find a clear path forward."],
];

const evidence = [
  {
    type: "Messaging transformation",
    title: "From internal language to a clear public story",
    problem: "Institutional websites often lead with department language, broad claims, and long descriptions that assume visitors already understand the work.",
    decision: "Reduce the first screen to one audience, one core value proposition, visible proof, and one primary next step.",
    delivered: ["Audience hierarchy", "Homepage narrative", "Page-level messaging", "CTA system"],
    note: "Complex language → clear message → next step",
    className: "work-research",
  },
  {
    type: "Information architecture",
    title: "Turning scattered evidence into a usable system",
    problem: "Research, programs, people, publications, events, and outcomes are frequently separated across pages with no visible relationship.",
    decision: "Create an evidence map, define reusable content modules, and organize navigation around visitor questions rather than internal departments.",
    delivered: ["Evidence inventory", "Sitemap", "Content relationships", "Reusable page modules"],
    note: "Scattered material → evidence map → coherent structure",
    className: "work-architecture",
  },
  {
    type: "Responsive delivery standard",
    title: "A working website, not a static concept",
    problem: "A visually impressive desktop design is not credible if it becomes confusing, inaccessible, or slow on real devices.",
    decision: "Treat responsive behavior, keyboard access, reduced motion, performance, and clear form states as part of the design itself.",
    delivered: ["Responsive implementation", "Keyboard and focus states", "Reduced-motion support", "Performance fallbacks"],
    note: "Design intent → tested behavior → dependable delivery",
    className: "work-delivery",
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
  ["01", "Message", "What must the visitor understand?", "We define the audience, positioning, page hierarchy, and core narrative before design begins.", "Messaging brief and page architecture"],
  ["02", "Evidence", "What makes the work believable?", "We organize outcomes, research, programs, people, publications, partnerships, and proof into useful modules.", "Evidence map and content system"],
  ["03", "Action", "What should happen next?", "We create clear pathways to apply, contact, partner, donate, attend, explore, or hire.", "Conversion paths and measurable actions"],
];

const engagements = [
  ["Defined engagement", "Foundation", "A complete website or institutional launch with a clear scope and structured handoff.", ["Strategy and positioning", "Custom design and development", "CMS, testing, and launch"]],
  ["Complex build", "Platform", "A functional digital system involving structured content, workflows, applications, or integrations.", ["User and stakeholder flows", "Functional platform development", "Data, integrations, and deployment"]],
  ["Ongoing partnership", "Continuous improvement", "Focused ownership after launch, guided by clarity, usability, performance, and content needs.", ["Content and page improvements", "Accessibility and performance", "Monthly planning and releases"]],
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
        <a href="#evidence" data-rail-link="evidence"><i>02</i><span>Evidence</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Services</span></a>
        <a href="#method" data-rail-link="method"><i>04</i><span>Method</span></a>
        <a href="#contact" data-rail-link="contact"><i>05</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="atmosphere" aria-hidden="true"><span className="grid-plane" /><span className="grain" /></div>
        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Credibility studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#evidence">Evidence</a>
            <a href="#services">Services</a>
            <a href="#method">Method</a>
            <a className="nav-cta" href="#contact">Request a review</a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Websites and digital platforms for institutions and expert organizations</p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Make complex work</span></span>
              <em className="hero-line-mask"><span data-hero-line>clear and credible.</span></em>
            </h1>
            <p className="hero-description" data-hero-support>
              Northline helps universities, research programs, nonprofits, and professional organizations explain what they do, organize the evidence behind it, and guide visitors toward the right next step.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary" href="#evidence">See the standard <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="#method">See how we work</a>
            </div>
            <p className="hero-fit" data-hero-support>For valuable work that is currently harder to understand online than it should be.</p>
          </div>

          <div className="hero-object" aria-label="A fragmented interface becoming a clear website system">
            <div className="hero-halo" aria-hidden="true" />
            <div className="interface-fragment fragment-one"><span>Research</span><i/><i/></div>
            <div className="interface-fragment fragment-two"><span>Programs</span><i/><i/></div>
            <div className="interface-fragment fragment-three"><span>Outcomes</span><i/><i/></div>
            <div className="interface-stack interface-stack-back"><span className="interface-label">Evidence</span><div className="interface-lines"><i/><i/><i/></div></div>
            <div className="interface-stack interface-stack-mid"><span className="interface-label">Message</span><div className="interface-heading" /><div className="interface-copy" /></div>
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

      <section className="work-section scene-section" id="evidence" data-scene="work" data-scene-strength=".78" aria-labelledby="evidence-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">Evidence in the work</p><h2 id="evidence-title">Proof should match the service being sold.</h2></div>
            <p>Until client case studies are available, Northline shows the exact strategic and technical standards used to build credible institutional websites. No unrelated products. No invented results.</p>
          </header>
          <div className="work-list">
            {evidence.map((item, index) => (
              <article className="work-card" data-work-card data-reveal key={item.title}>
                <div className="work-copy">
                  <span className="work-index">0{index + 1} / {item.type}</span>
                  <h3>{item.title}</h3>
                  <dl>
                    <div><dt>Common failure</dt><dd>{item.problem}</dd></div>
                    <div><dt>Northline decision</dt><dd>{item.decision}</dd></div>
                  </dl>
                  <ul>{item.delivered.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
                  <p className="evidence-label">Demonstrated through this site and the delivery process.</p>
                </div>
                <div className={`work-visual ${item.className}`} aria-hidden="true">
                  <div className="browser-bar"><i/><i/><i/><span/></div>
                  <div className="work-screen">
                    <aside><b/><i/><i/><i/></aside>
                    <section><span className="screen-kicker"/><strong/><p/><div className="screen-grid"><i/><i/><i/></div></section>
                  </div>
                  <div className="decision-note">{item.note}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="problems-section scene-section" id="problems" data-scene="problems" data-scene-strength=".34" aria-labelledby="problems-title">
        <div className="shell">
          <header className="section-heading centered" data-reveal><p className="eyebrow">Where clarity breaks down</p><h2 id="problems-title">The work is valuable. The digital story is not keeping up.</h2></header>
          <div className="problem-grid">
            {problems.map(([number, title, copy]) => <article key={title} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
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
                <div className={`service-object service-object-${index + 1}`} aria-hidden="true"><div className="service-frame"><span>{service.title}</span><i/><i/><div><b/><b/><b/></div></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section scene-section" id="method" data-scene="method" data-scene-strength=".62" aria-labelledby="method-title">
        <div className="shell method-shell">
          <header className="section-heading centered" data-reveal><p className="eyebrow">The credibility system</p><h2 id="method-title">Message <i>→</i> Evidence <i>→</i> Action</h2><p>One framework, translated into concrete decisions and deliverables.</p></header>
          <div className="method-stage">
            <div className="method-preview" aria-hidden="true">
              <div className="method-layer method-message"><span>Message</span><strong>What must be understood?</strong></div>
              <div className="method-layer method-evidence"><span>Evidence</span><div><i/><i/><i/></div></div>
              <div className="method-layer method-action"><span>Action</span><b>Participate →</b></div>
            </div>
            <div className="method-flow">
              {method.map(([number, title, question, copy, output]) => (
                <article key={title} data-method-card data-reveal><span>{number}</span><p className="method-question">{question}</p><h3>{title}</h3><p>{copy}</p><strong>Output: {output}</strong></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="engagements scene-section" id="engagements" data-scene="engagements" data-scene-strength=".4" aria-labelledby="engagements-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal><div><p className="eyebrow">Ways to work together</p><h2 id="engagements-title">Build what is needed. Keep improving what matters.</h2></div><p>The right engagement depends on whether the gap is a public presence, a functional platform, or ongoing digital ownership.</p></header>
          <div className="engagement-grid">
            {engagements.map(([label, title, copy, items], index) => (
              <article className={index === 1 ? "featured" : ""} data-reveal key={String(title)}><span>{label}</span><h3>{title}</h3><p>{copy}</p><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></article>
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
          <div className="contact-copy" data-reveal><p className="eyebrow">Start with the gap</p><h2 id="contact-title">What is the current digital presence failing to communicate?</h2><p>Share the existing site, the audience that matters, and what needs to become clearer. Northline will respond with the most useful next step—not an automatic sales call.</p><ul><li>Institutional websites</li><li>Program and initiative platforms</li><li>Focused digital improvements</li></ul></div>
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
