import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const problems = [
  ["01", "The first screen asks visitors to work too hard", "Internal language, broad claims, and competing priorities hide the one thing a visitor needs to understand first."],
  ["02", "The proof exists, but it is buried", "Research, programs, outcomes, people, publications, and partnerships are present without a system that makes their relationship obvious."],
  ["03", "The website feels smaller than the organization", "Strong work can look uncertain when the digital experience lacks hierarchy, confidence, polish, or technical discipline."],
  ["04", "Attention reaches a dead end", "Applicants, partners, funders, clients, and participants can understand the mission and still have no clear next move."],
];

const evidence = [
  {
    type: "Messaging transformation",
    title: "Turn institutional complexity into a public story",
    problem: "Most complex organizations know exactly what they do internally. The problem is translating that knowledge into a first-time visitor experience without flattening the substance.",
    decision: "Build the page around one dominant message, a visible proof layer, and a clear next action—then let deeper detail unfold as the visitor moves.",
    delivered: ["Audience hierarchy", "Homepage narrative", "Page-level messaging", "CTA system"],
    note: "Complexity → signal → trust",
    className: "work-research",
  },
  {
    type: "Information architecture",
    title: "Make scattered evidence feel like one system",
    problem: "Research, programs, people, publications, events, and outcomes lose credibility when they live as disconnected islands with no visible logic.",
    decision: "Map the evidence, define reusable relationships, and organize the experience around the questions visitors actually bring—not the internal org chart.",
    delivered: ["Evidence inventory", "Sitemap", "Content relationships", "Reusable page modules"],
    note: "Fragments → structure → coherence",
    className: "work-architecture",
  },
  {
    type: "Responsive delivery standard",
    title: "Ship the experience—not just the mockup",
    problem: "A dramatic desktop concept stops being premium the moment it becomes slow, confusing, inaccessible, or fragile on a real device.",
    decision: "Treat motion, responsive behavior, keyboard access, reduced-motion support, performance, and form states as part of the design system itself.",
    delivered: ["Responsive implementation", "Keyboard and focus states", "Reduced-motion support", "Performance fallbacks"],
    note: "Intent → behavior → dependable delivery",
    className: "work-delivery",
  },
];

const story = [
  {
    number: "01",
    label: "Signal",
    title: "Make the value legible in seconds.",
    copy: "The opening experience decides what deserves attention. We strip away internal noise, establish a visual point of view, and make the central value unmistakable before asking the visitor to read deeply.",
    outcome: "A clear first impression",
  },
  {
    number: "02",
    label: "Depth",
    title: "Let evidence appear exactly when trust needs it.",
    copy: "Instead of stacking claims, we choreograph proof—programs, people, outcomes, research, process, and detail—so each layer answers the question created by the one before it.",
    outcome: "A story that earns belief",
  },
  {
    number: "03",
    label: "Movement",
    title: "Turn understanding into a next move.",
    copy: "The experience should not end at admiration. We create obvious pathways for the visitor to apply, partner, contact, donate, explore, register, or hire without breaking the narrative flow.",
    outcome: "Attention converted into action",
  },
];

const services = [
  {
    number: "01",
    title: "Institutional websites",
    copy: "For organizations, centers, initiatives, and expert-led teams whose real-world credibility is stronger than their current digital presence.",
    labels: ["Positioning", "Information architecture", "Design and development", "CMS and launch"],
  },
  {
    number: "02",
    title: "Program and initiative platforms",
    copy: "For experiences that need to do real work—applications, resources, directories, events, participation, reporting, and structured public workflows.",
    labels: ["User flows", "Platform architecture", "Forms and workflows", "Integrations"],
  },
  {
    number: "03",
    title: "Digital presence improvement",
    copy: "For organizations that already have a useful foundation and need sharper messaging, stronger UX, better performance, or a more capable visual system—not another unnecessary rebuild.",
    labels: ["Messaging audit", "UX and accessibility", "Performance", "Ongoing releases"],
  },
];

const method = [
  ["01", "Message", "What must become obvious?", "We define the audience, positioning, hierarchy, and core narrative before visual complexity enters the room.", "Messaging brief and page architecture"],
  ["02", "Evidence", "What earns the visitor's trust?", "We organize outcomes, research, programs, people, publications, partnerships, and proof into a system that can be scanned and explored.", "Evidence map and content system"],
  ["03", "Action", "What should the visitor do next?", "We design the path from understanding to a concrete action—apply, contact, partner, donate, attend, explore, or hire.", "Conversion paths and measurable actions"],
];

const engagements = [
  ["Defined engagement", "Foundation", "A complete website or institutional launch when the message, structure, visual system, and delivery all need to move together.", ["Strategy and positioning", "Custom design and development", "CMS, testing, and launch"]],
  ["Complex build", "Platform", "A functional digital system when the experience includes structured content, workflows, applications, integrations, or operational logic.", ["User and stakeholder flows", "Functional platform development", "Data, integrations, and deployment"]],
  ["Ongoing partnership", "Continuous improvement", "Focused digital ownership after launch, guided by clarity, usability, performance, content, and what visitors are actually doing.", ["Content and page improvements", "Accessibility and performance", "Monthly planning and releases"]],
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
        <a href="#story" data-rail-link="story"><i>02</i><span>Story</span></a>
        <a href="#evidence" data-rail-link="evidence"><i>03</i><span>Evidence</span></a>
        <a href="#services" data-rail-link="services"><i>04</i><span>Services</span></a>
        <a href="#method" data-rail-link="method"><i>05</i><span>Method</span></a>
        <a href="#contact" data-rail-link="contact"><i>06</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="atmosphere" aria-hidden="true"><span className="grid-plane" /><span className="grain" /></div>
        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Digital credibility studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#story">Approach</a>
            <a href="#evidence">Evidence</a>
            <a href="#services">Services</a>
            <a className="nav-cta" href="#contact">Request a review</a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Strategy, design, development, and digital systems for complex organizations</p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Make important work</span></span>
              <em className="hero-line-mask"><span data-hero-line>impossible to overlook.</span></em>
            </h1>
            <p className="hero-description" data-hero-support>
              Northline turns complex organizations into clear digital experiences—so people understand the value faster, trust the evidence behind it, and know exactly where to go next.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary" href="#story">See the story system <span aria-hidden="true">↘</span></a>
              <a className="button button-secondary" href="#contact">Request a project review</a>
            </div>
            <p className="hero-fit" data-hero-support>For universities, research programs, nonprofits, initiatives, and expert organizations whose website should feel as capable as the work behind it.</p>
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
        <div className="hero-caption shell" data-hero-support><span>Signal</span><i>→</i><span>Depth</span><i>→</i><span>Movement</span></div>
      </section>

      <section className="proof-strip scene-section" data-scene="proof" data-scene-strength=".42" aria-label="Northline standards">
        <div className="shell proof-grid">
          <p><strong>Clear positioning</strong><span>The value is understandable before the visitor starts hunting for it.</span></p>
          <p><strong>Visible evidence</strong><span>Claims are backed by outcomes, people, process, and real work.</span></p>
          <p><strong>Functional delivery</strong><span>Motion, responsiveness, accessibility, and performance ship together.</span></p>
          <p><strong>Direct ownership</strong><span>Strategy and execution stay connected from the first decision through launch.</span></p>
        </div>
      </section>

      <section className="story-section scene-section" id="story" data-scene="story" data-scene-strength=".66" aria-labelledby="story-title">
        <div className="shell story-shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">A website should unfold like an argument</p><h2 id="story-title">Not more information. Better sequencing.</h2></div>
            <p>Premium digital experiences feel simple because complexity is revealed in the right order. Each chapter should create the question that the next chapter answers.</p>
          </header>
          <div className="story-stage">
            <div className="story-visual" aria-hidden="true">
              <div className="story-orbit story-orbit-one" />
              <div className="story-orbit story-orbit-two" />
              <div className="story-core"><span>Signal</span><i/><span>Depth</span><i/><span>Movement</span></div>
            </div>
            <div className="story-steps">
              {story.map((item) => (
                <article className="story-step" data-story-step key={item.number}>
                  <span className="story-number">{item.number}</span>
                  <div><p className="story-label">{item.label}</p><h3>{item.title}</h3><p>{item.copy}</p><strong>{item.outcome}</strong></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work-section scene-section" id="evidence" data-scene="work" data-scene-strength=".78" aria-labelledby="evidence-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">Evidence in the work</p><h2 id="evidence-title">The proof should look like the thing being sold.</h2></div>
            <p>Until client case studies are public, Northline shows the strategic and technical standard directly through the site: message hierarchy, information architecture, interaction, accessibility, responsive behavior, and delivery discipline. No invented metrics.</p>
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
          <header className="section-heading centered" data-reveal><p className="eyebrow">Where digital credibility breaks</p><h2 id="problems-title">Strong organizations can still look uncertain online.</h2></header>
          <div className="problem-grid">
            {problems.map(([number, title, copy]) => <article key={title} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="services-section scene-section" id="services" data-scene="services" data-scene-strength=".3" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">What we build</p><h2 id="services-title">Three engagement types. One standard.</h2></div>
            <p>Every project connects positioning, information architecture, visual design, interaction, engineering, and launch. The work is treated as one experience instead of a relay race between disconnected specialists.</p>
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
          <header className="section-heading centered" data-reveal><p className="eyebrow">The credibility system</p><h2 id="method-title">Message <i>→</i> Evidence <i>→</i> Action</h2><p>One framework translated into concrete decisions, interfaces, and deliverables.</p></header>
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
          <header className="section-heading split-heading" data-reveal><div><p className="eyebrow">Ways to work together</p><h2 id="engagements-title">Build what is missing. Improve what is already working.</h2></div><p>The right engagement depends on whether the gap is the public presence, a functional platform, or ongoing digital ownership after launch.</p></header>
          <div className="engagement-grid">
            {engagements.map(([label, title, copy, items], index) => (
              <article className={index === 1 ? "featured" : ""} data-reveal key={String(title)}><span>{label}</span><h3>{title}</h3><p>{copy}</p><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section scene-section" id="about" data-scene="about" data-scene-strength=".28" aria-labelledby="about-title">
        <div className="shell about-grid">
          <div className="section-heading" data-reveal><p className="eyebrow">How Northline operates</p><h2 id="about-title">One line of thinking from strategy through launch.</h2></div>
          <div className="about-copy" data-reveal>
            <p>Northline keeps strategy, content structure, interaction design, and development close enough that the original communication problem survives every design and technical decision.</p>
            <div className="standards-grid">
              <article><strong>Direct collaboration</strong><span>You stay close to the people making the strategic and technical decisions instead of working through layers of account handoff.</span></article>
              <article><strong>Accessible by default</strong><span>Keyboard use, reduced motion, contrast, semantics, and responsive behavior are treated as product quality—not a cleanup pass.</span></article>
              <article><strong>Performance discipline</strong><span>Motion and 3D are used to deepen hierarchy and narrative, with deliberate fallbacks for lower-power devices.</span></article>
              <article><strong>Ownership after launch</strong><span>The system is documented and structured so the organization can operate, update, and extend it without becoming trapped by the build.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section scene-section" id="contact" data-scene="contact" data-scene-strength=".22" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <div className="contact-copy" data-reveal><p className="eyebrow">Start with the gap</p><h2 id="contact-title">Where is the current digital experience losing trust, clarity, or momentum?</h2><p>Share the existing site, the audience that matters, and what is not working. Northline will use that context to identify the most useful next step rather than forcing every inquiry into the same sales process.</p><ul><li>Institutional websites</li><li>Program and initiative platforms</li><li>Focused digital improvements</li></ul></div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span>Northline</span><small>Digital credibility studio</small></a>
        <p>Signal. Evidence. Action.</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}
