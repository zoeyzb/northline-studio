import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const systemSteps = [
  ["01", "Find the signal", "Make the one thing that matters obvious in the first few seconds."],
  ["02", "Build the structure", "Turn scattered pages, services, proof, and ideas into one clear path."],
  ["03", "Add depth", "Use motion, interaction, and visual proof to make the experience feel alive—not noisy."],
  ["04", "Create action", "Guide the right visitor toward the next move without making them think about the interface."],
];

const services = [
  {
    number: "01",
    label: "Flagship websites",
    title: "A digital presence that finally feels as strong as the work behind it.",
    copy: "Positioning, art direction, UX, motion, development, CMS, and launch—built as one system.",
    tags: ["Strategy", "Design", "Development", "Launch"],
  },
  {
    number: "02",
    label: "Digital products",
    title: "Platforms and tools that are useful, clear, and actually enjoyable to use.",
    copy: "For portals, resources, applications, directories, workflows, dashboards, and interactive experiences.",
    tags: ["Product UX", "Architecture", "Interfaces", "Integrations"],
  },
  {
    number: "03",
    label: "Transformations",
    title: "Keep what works. Fix what makes the current site feel weak, flat, or confusing.",
    copy: "A focused redesign for stronger hierarchy, motion, conversion, accessibility, and performance.",
    tags: ["UX audit", "Redesign", "Motion", "Performance"],
  },
];

const proof = [
  ["Clarity", "Before: too much information at once.", "After: one message leads, supporting detail arrives when it is useful."],
  ["Structure", "Before: pages feel disconnected.", "After: every section has a role and every path has a reason."],
  ["Experience", "Before: static screens and decorative animation.", "After: motion guides attention, confirms action, and creates depth."],
];

const standards = [
  ["Real production", "The final experience is built and shipped, not handed off as a pretty mockup."],
  ["Motion with purpose", "Parallax, 3D, reveals, and micro-interactions support the story instead of becoming the story."],
  ["Responsive by design", "Desktop, tablet, and mobile are composed intentionally rather than simply squeezed smaller."],
  ["Accessible + fast", "Keyboard use, reduced motion, readable contrast, and performance are part of the design system."],
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
        <a href="#system" data-rail-link="system"><i>02</i><span>System</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Services</span></a>
        <a href="#proof" data-rail-link="proof"><i>04</i><span>Proof</span></a>
        <a href="#contact" data-rail-link="contact"><i>05</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Digital studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#system">Approach</a>
            <a href="#services">Services</a>
            <a href="#proof">Proof</a>
            <a className="nav-cta magnetic" href="#contact">Start a project <span>↗</span></a>
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
              Northline turns complicated businesses, organizations, products, and ideas into digital experiences that feel clear, premium, and easy to understand.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary magnetic" href="#system">See how it works <span>↓</span></a>
              <a className="button button-secondary magnetic" href="#contact">Start a project <span>↗</span></a>
            </div>
            <div className="hero-proof" data-hero-support>
              <span>Custom direction</span><i /><span>Real production</span><i /><span>Motion that guides</span>
            </div>
          </div>

          <div className="hero-object" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-fragment fragment-a"><span>Message</span><b /><b /></div>
            <div className="hero-fragment fragment-b"><span>Structure</span><b /><b /></div>
            <div className="hero-fragment fragment-c"><span>Proof</span><b /><b /></div>
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
        <div className="hero-scroll shell" data-hero-support><span>Scroll to move from complexity to clarity</span><i>↓</i></div>
      </section>

      <section className="trust-strip scene-section" data-scene="trust" data-scene-strength=".7" aria-label="Northline standards">
        <div className="shell trust-strip-grid">
          <p><strong>Clear first</strong><span>People should understand the value before they admire the design.</span></p>
          <p><strong>Depth second</strong><span>3D, parallax, and motion add meaning—not clutter.</span></p>
          <p><strong>Built for real use</strong><span>Responsive, accessible, performant, and production-ready.</span></p>
          <p><strong>Direct ownership</strong><span>One line of thinking from strategy through launch.</span></p>
        </div>
      </section>

      <section className="system-section scene-section" id="system" data-scene="system" data-scene-strength=".82" aria-labelledby="system-title">
        <div className="shell system-grid">
          <header className="system-copy" data-reveal>
            <p className="eyebrow">From complexity → clarity</p>
            <h2 id="system-title">A premium site should feel simple while a lot is happening underneath.</h2>
            <p>Instead of hiding content inside a giant pinned animation, the story stays visible while the layers move around it.</p>
            <a className="text-link magnetic" href="#services">See what we build <span>↘</span></a>
          </header>

          <div className="system-visual" data-parallax aria-hidden="true">
            <div className="system-halo" />
            <div className="system-layer system-layer-back"><span>Noise</span><i /><i /><i /></div>
            <div className="system-layer system-layer-mid"><span>Structure</span><i /><i /><i /></div>
            <div className="system-layer system-layer-front"><small>Northline</small><strong>Signal → Structure → Depth → Action</strong><div><i /><i /><i /></div></div>
          </div>

          <div className="system-steps">
            {systemSteps.map(([number, title, copy]) => (
              <article key={number} data-story-step data-reveal>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section scene-section" id="services" data-scene="services" data-scene-strength=".66" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">What we build</p><h2 id="services-title">Three ways Northline can make the digital experience stronger.</h2></div>
            <p>Different scopes, same standard: clear message, strong visual direction, purposeful motion, and production-quality execution.</p>
          </header>
          <div className="service-stack">
            {services.map((service, index) => (
              <article className="service-card interactive-card" data-service-card key={service.number}>
                <div className="service-copy">
                  <div className="service-meta"><span>{service.number}</span><small>{service.label}</small></div>
                  <h3>{service.title}</h3><p>{service.copy}</p>
                  <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
                <div className={`service-visual visual-${index + 1}`} data-parallax aria-hidden="true">
                  <div className="service-browser">
                    <div className="browser-top"><i /><i /><i /><span /></div>
                    <div className="browser-body"><aside><b /><i /><i /><i /></aside><section><small>{service.label}</small><strong /><span /><div><i /><i /><i /></div></section></div>
                  </div>
                  <div className="service-depth depth-one" /><div className="service-depth depth-two" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-section scene-section" id="proof" data-scene="proof" data-scene-strength=".72" aria-labelledby="proof-title">
        <div className="shell">
          <header className="section-heading split-heading" data-reveal>
            <div><p className="eyebrow">What changes</p><h2 id="proof-title">You should be able to feel the difference without needing a design explanation.</h2></div>
            <p>The goal is not “more animation.” The goal is a clearer, more confident experience where every interaction makes the next thing easier to understand.</p>
          </header>
          <div className="proof-cards">
            {proof.map(([title, before, after], index) => (
              <article className="proof-card interactive-card" data-proof-card data-reveal key={title}>
                <span>0{index + 1}</span><h3>{title}</h3>
                <div className="proof-compare"><p><small>Before</small>{before.replace("Before: ", "")}</p><i>→</i><p><small>After</small>{after.replace("After: ", "")}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="standards-section scene-section" data-scene="standards" data-scene-strength=".46" aria-labelledby="standards-title">
        <div className="shell standards-layout">
          <header className="section-heading" data-reveal>
            <p className="eyebrow">What you actually get</p><h2 id="standards-title">The expensive feeling should survive real use.</h2><p>Premium means the experience still feels good when someone scrolls fast, uses a phone, tabs with a keyboard, or comes back on a slower connection.</p>
          </header>
          <div className="standards-grid">
            {standards.map(([title, copy], index) => <article className="interactive-card" data-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="contact-section scene-section" id="contact" data-scene="contact" data-scene-strength=".9" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Start simple</p>
            <h2 id="contact-title">Tell us what you want to make better.</h2>
            <p>You do not need a perfect brief, budget deck, or agency vocabulary. Send the site or idea, tell us what feels wrong, and Northline can tell you the most useful next step.</p>
            <div className="contact-points"><span>No sales script</span><span>No inflated scope</span><span>Clear next step</span></div>
          </div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span>Northline</span><small>Digital studio</small></a>
        <p>Signal. Structure. Depth. Action.</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}
