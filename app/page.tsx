import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const storySteps = [
  {
    number: "01",
    kicker: "Signal",
    title: "Make the value legible in seconds.",
    copy: "We strip away internal language, competing messages, and visual noise until the audience can immediately understand what matters and why.",
    tags: ["Positioning", "Narrative", "Hierarchy"],
  },
  {
    number: "02",
    kicker: "Structure",
    title: "Turn complexity into a system people can navigate.",
    copy: "Programs, proof, people, services, research, and resources become one deliberate information architecture instead of a collection of pages.",
    tags: ["Information architecture", "Content systems", "User paths"],
  },
  {
    number: "03",
    kicker: "Depth",
    title: "Let evidence appear exactly when trust needs it.",
    copy: "Claims are paired with outcomes, process, people, examples, and standards at the moment a visitor starts asking whether the organization is credible.",
    tags: ["Proof design", "Trust", "Interaction"],
  },
  {
    number: "04",
    kicker: "Movement",
    title: "Turn understanding into a next move.",
    copy: "Every screen earns its place by helping the right visitor explore, inquire, apply, partner, buy, attend, or contact with less friction.",
    tags: ["Conversion paths", "Product thinking", "Delivery"],
  },
];

const services = [
  {
    number: "01",
    label: "Digital flagship",
    title: "Websites that make serious work feel as strong as it is.",
    copy: "For companies, institutions, expert teams, programs, and ambitious organizations whose current site undersells their value.",
    bullets: ["Positioning and messaging", "Custom art direction", "Responsive development", "CMS and launch"],
  },
  {
    number: "02",
    label: "Digital product",
    title: "Platforms that need to work, not just look impressive.",
    copy: "For portals, directories, applications, resources, reporting, membership, internal tools, and structured public experiences.",
    bullets: ["User flows", "Product architecture", "Functional interfaces", "Integrations"],
  },
  {
    number: "03",
    label: "Transformation",
    title: "A sharper version of the website you already have.",
    copy: "For teams that do not need another unnecessary rebuild, but do need stronger clarity, motion, conversion, accessibility, or performance.",
    bullets: ["UX and messaging audit", "High-impact redesign", "Motion and interaction", "Performance cleanup"],
  },
];

const proofSystems = [
  {
    index: "01",
    label: "Narrative system",
    title: "From internal language to a public story.",
    before: "Multiple audiences. Department language. No clear first impression.",
    after: "One hierarchy. One core promise. Proof placed around the questions visitors actually ask.",
    outcome: "Complexity becomes understandable without making the work feel simplistic.",
  },
  {
    index: "02",
    label: "Information system",
    title: "From scattered material to visible relationships.",
    before: "Programs, people, results, publications, and resources living in separate silos.",
    after: "A reusable content model that connects the parts and gives every page a clear role.",
    outcome: "Visitors stop hunting and start understanding how the organization fits together.",
  },
  {
    index: "03",
    label: "Delivery system",
    title: "From polished mockup to dependable experience.",
    before: "Desktop-first design, ornamental motion, slow pages, and interaction states nobody tested.",
    after: "Responsive behavior, reduced-motion fallbacks, keyboard access, performance discipline, and real launch ownership.",
    outcome: "The finished site keeps the quality of the concept on actual devices.",
  },
];

const standards = [
  ["No invented proof", "No fake case studies, fabricated metrics, or made-up client quotes to manufacture trust."],
  ["Direct ownership", "Strategy, design, interaction, and development stay connected instead of disappearing through layers of handoff."],
  ["Accessible by default", "Keyboard use, contrast, semantics, focus states, and reduced motion are part of the build—not a later checklist."],
  ["Performance discipline", "3D and motion degrade intentionally on smaller or lower-power devices so spectacle never breaks usability."],
  ["Responsive art direction", "Mobile is composed deliberately rather than treated as the desktop site squeezed into a narrow column."],
  ["Launch-ready systems", "The work includes states, content behavior, handoff, and the practical details required to operate after launch."],
];

const process = [
  ["01", "Find the signal", "Audience, positioning, competitive context, goals, and the one thing the site must make unmistakable."],
  ["02", "Build the structure", "Sitemap, page roles, content relationships, conversion paths, and the sequence visitors should experience."],
  ["03", "Direct the experience", "Typography, interface language, 3D depth, motion choreography, responsive behavior, and visual proof."],
  ["04", "Engineer the system", "Production components, CMS or data model, interactions, accessibility, performance, analytics, and integrations."],
  ["05", "Ship and sharpen", "Cross-device testing, launch, measurement, content refinement, and focused post-launch improvements."],
];

const engagements = [
  ["Flagship build", "A complete strategic website from positioning through production launch."],
  ["Product build", "A functional platform with structured content, workflows, data, or integrations."],
  ["Focused transformation", "A targeted engagement for the highest-leverage problems in an existing digital presence."],
];

export default function Home() {
  return (
    <main id="main-content" className="northline-home">
      <MotionController />
      <AtmosphericSceneClient />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="scroll-rail" aria-label="Page chapters">
        <span className="scroll-rail-track"><span className="scroll-rail-progress" /></span>
        <a href="#overview" data-rail-link="overview"><i>01</i><span>Overview</span></a>
        <a href="#story" data-rail-link="story"><i>02</i><span>System</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Services</span></a>
        <a href="#work" data-rail-link="work"><i>04</i><span>Proof</span></a>
        <a href="#contact" data-rail-link="contact"><i>05</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Digital studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#story">Approach</a>
            <a href="#services">Services</a>
            <a href="#work">Proof</a>
            <a className="nav-cta magnetic" href="#contact">Request a review <span>↗</span></a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Strategy · design · interaction · development</p>
            <h1 id="hero-title" aria-label="Make important work impossible to overlook.">
              <span className="hero-line-mask"><span data-hero-line>Make important work</span></span>
              <span className="hero-line-mask hero-line-accent"><span data-hero-line>impossible to overlook.</span></span>
            </h1>
            <p className="hero-description" data-hero-support>
              Northline turns complicated organizations, products, and ideas into digital experiences that feel clear, credible, and unmistakably considered.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary magnetic" href="#story">Experience the approach <span>↓</span></a>
              <a className="button button-secondary magnetic" href="#contact">Request a project review <span>↗</span></a>
            </div>
            <div className="hero-proof" data-hero-support>
              <span>Custom direction</span><i />
              <span>Production build</span><i />
              <span>Performance-aware motion</span>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-fragment fragment-a"><span>Research</span><b /><b /></div>
            <div className="hero-fragment fragment-b"><span>Programs</span><b /><b /></div>
            <div className="hero-fragment fragment-c"><span>Evidence</span><b /><b /></div>
            <div className="hero-fragment fragment-d"><span>Action</span><b /><b /></div>
            <div className="hero-screen screen-back"><span>01 / signal</span><i /><i /><i /></div>
            <div className="hero-screen screen-mid"><span>02 / structure</span><strong /><i /><i /></div>
            <div className="hero-screen screen-front">
              <div className="screen-nav"><i /><span /><span /><b /></div>
              <div className="screen-copy"><small>Northline system</small><strong>Clear enough to understand. Strong enough to remember.</strong><span /></div>
              <div className="screen-cards"><i /><i /><i /></div>
              <div className="screen-action">Useful next action <span>→</span></div>
            </div>
          </div>
        </div>

        <div className="hero-scroll shell" data-hero-support><span>Scroll to turn complexity into clarity</span><i>↓</i></div>
      </section>

      <section className="trust-strip scene-section" data-scene="trust" data-scene-strength=".68" aria-label="Northline delivery standards">
        <div className="shell trust-strip-grid">
          <p><strong>One line of thinking</strong><span>From strategy through launch.</span></p>
          <p><strong>Real production</strong><span>Not a static concept handoff.</span></p>
          <p><strong>Motion with purpose</strong><span>Depth supports the story.</span></p>
          <p><strong>No fabricated proof</strong><span>Trust without theater.</span></p>
        </div>
      </section>

      <section className="story scene-section" id="story" data-scene="story" data-scene-strength=".86" aria-labelledby="story-title">
        <div className="story-sticky shell">
          <div className="story-heading">
            <p className="eyebrow">From complexity → clarity</p>
            <h2 id="story-title">Not more information. <em>Better sequencing.</em></h2>
            <p>Northline treats a website as a guided experience. Each scroll should answer the next question, reveal the next layer of proof, and make the next action feel obvious.</p>
          </div>

          <div className="story-stage" aria-hidden="true">
            <div className="story-core"><span>Northline</span><strong>Signal</strong></div>
            <div className="story-plane story-plane-a"><i /><i /><i /></div>
            <div className="story-plane story-plane-b"><i /><i /><i /><i /></div>
            <div className="story-plane story-plane-c"><span>Evidence</span><b /><b /><b /></div>
            <div className="story-path"><i /><i /><i /><i /></div>
          </div>

          <div className="story-steps">
            {storySteps.map((step) => (
              <article key={step.number} data-story-step>
                <div className="story-step-index"><span>{step.number}</span><small>{step.kicker}</small></div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <ul>{step.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section scene-section" id="services" data-scene="services" data-scene-strength=".62" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">What we build</p><h2 id="services-title">Three ways to make the digital presence match the ambition.</h2></div>
            <p>Every engagement connects message, structure, visual direction, interaction, engineering, and launch. The shape changes. The standard does not.</p>
          </header>

          <div className="service-stack">
            {services.map((service, index) => (
              <article className="service-card" data-service-card key={service.number}>
                <div className="service-copy">
                  <div className="service-meta"><span>{service.number}</span><small>{service.label}</small></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul>{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
                <div className={`service-visual visual-${index + 1}`} aria-hidden="true">
                  <div className="service-browser">
                    <div className="browser-top"><i /><i /><i /><span /></div>
                    <div className="browser-body">
                      <aside><b /><i /><i /><i /></aside>
                      <section><small>{service.label}</small><strong /><span /><div><i /><i /><i /></div></section>
                    </div>
                  </div>
                  <div className="service-depth depth-one" /><div className="service-depth depth-two" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section scene-section" id="work" data-scene="work" data-scene-strength=".78" aria-labelledby="work-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">Evidence in the work</p><h2 id="work-title">The proof should look like the thing being sold.</h2></div>
            <p>Until public client case studies can be shown with permission, Northline demonstrates the actual strategic and technical systems behind the work—without fake outcomes or unrelated portfolio filler.</p>
          </header>

          <div className="proof-system-list">
            {proofSystems.map((item) => (
              <article className="proof-system" data-proof-system key={item.index}>
                <div className="proof-system-head"><span>{item.index}</span><small>{item.label}</small><h3>{item.title}</h3></div>
                <div className="proof-transition" aria-hidden="true">
                  <div className="proof-before"><small>Before</small><i /><i /><i /><i /><i /></div>
                  <div className="proof-arrow">→</div>
                  <div className="proof-after"><small>Northline</small><strong /><span /><div><i /><i /><i /></div></div>
                </div>
                <div className="proof-system-copy">
                  <p><span>Common state</span>{item.before}</p>
                  <p><span>Design decision</span>{item.after}</p>
                  <p><span>What changes</span>{item.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="standards-section scene-section" data-scene="standards" data-scene-strength=".48" aria-labelledby="standards-title">
        <div className="shell standards-layout">
          <header className="section-heading" data-reveal><p className="eyebrow">Trust, without theater</p><h2 id="standards-title">What you can verify before hiring Northline.</h2><p>A premium site should be more than an expensive-looking homepage. These standards are part of how the work is built.</p></header>
          <div className="standards-grid">
            {standards.map(([title, copy], index) => <article data-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="process-section scene-section" id="process" data-scene="process" data-scene-strength=".66" aria-labelledby="process-title">
        <div className="shell">
          <header className="section-heading centered" data-reveal><p className="eyebrow">How the work moves</p><h2 id="process-title">One line of thinking from strategy through launch.</h2><p>Each phase hands a clearer system to the next. No strategic deck that gets forgotten when design starts. No visual concept that collapses when development begins.</p></header>
          <div className="process-track">
            <div className="process-line" aria-hidden="true"><span /></div>
            {process.map(([number, title, copy]) => (
              <article data-process-step key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="engagement-section scene-section" data-scene="engagements" data-scene-strength=".38" aria-labelledby="engagement-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal><div><p className="eyebrow">Ways to work together</p><h2 id="engagement-title">Build what is needed. Nothing ornamental in the scope.</h2></div><p>Northline scopes around the actual digital problem: a flagship presence, a functional product, or a focused transformation.</p></header>
          <div className="engagement-grid">
            {engagements.map(([title, copy], index) => <article data-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">Discuss the fit <i>↗</i></a></article>)}
          </div>
        </div>
      </section>

      <section className="studio-section scene-section" data-scene="studio" data-scene-strength=".3" aria-labelledby="studio-title">
        <div className="shell studio-grid">
          <div className="studio-statement" data-reveal><p className="eyebrow">Northline studio</p><h2 id="studio-title">Sophisticated does not mean complicated.</h2></div>
          <div className="studio-copy" data-reveal><p>The best digital experiences can feel rich without feeling busy, animated without becoming distracting, and technically ambitious without forcing visitors to understand the technology underneath.</p><p>Northline uses depth, motion, interface systems, and development to make the message easier to feel—not harder to find.</p></div>
        </div>
      </section>

      <section className="contact-section scene-section" id="contact" data-scene="contact" data-scene-strength=".92" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Start with the gap</p>
            <h2 id="contact-title">Where is the current digital experience losing trust, clarity, or momentum?</h2>
            <p>Share the existing site, the audience that matters, and what needs to become stronger. Northline will respond with the most useful next step—not an automatic sales script.</p>
            <div className="contact-points"><span>Clear recommendation</span><span>No forced sales call</span><span>No inflated scope</span></div>
          </div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span>Northline</span><small>Digital studio</small></a>
        <p>Signal. Structure. Depth. Movement.</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}
