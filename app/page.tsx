import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const ladder = [
  ["01", "Signal", "Make the value obvious", "One clear promise. No hunting."],
  ["02", "Structure", "Give every section a job", "Content falls into a path people can follow."],
  ["03", "Depth", "Make the story feel alive", "Motion, proof, and interaction arrive when they help."],
  ["04", "Action", "Make the next move obvious", "Explore, inquire, apply, buy, book, or contact without friction."],
];

const services = [
  {
    number: "01",
    kicker: "Flagship websites",
    title: "A website people remember after they close the tab.",
    copy: "Positioning, art direction, UX, motion, development, CMS, and launch—designed as one experience.",
    tags: ["Strategy", "Art direction", "Motion", "Development"],
    metric: "MESSAGE",
    accent: "Clarity first",
  },
  {
    number: "02",
    kicker: "Digital products",
    title: "Useful tools that feel as polished as the brand around them.",
    copy: "Portals, directories, dashboards, applications, resources, and interactive products with real product thinking behind them.",
    tags: ["Product UX", "Systems", "Interfaces", "Integrations"],
    metric: "UTILITY",
    accent: "Built to work",
  },
  {
    number: "03",
    kicker: "Transformations",
    title: "Keep the good parts. Replace the weak experience around them.",
    copy: "A focused redesign for sites that need stronger hierarchy, visual confidence, conversion, accessibility, and performance.",
    tags: ["UX audit", "Redesign", "Conversion", "Performance"],
    metric: "MOMENTUM",
    accent: "Less friction",
  },
];

const transformations = [
  ["Clarity", "Everything speaks at once", "One idea leads. The rest supports it."],
  ["Flow", "Pages feel disconnected", "Each section pulls naturally into the next."],
  ["Experience", "Motion is decorative", "Motion guides attention and creates memory."],
];

const standards = [
  ["Production, not mockups", "The final experience is built, tested, and shipped."],
  ["Motion with a reason", "Parallax, depth, and reveals direct attention instead of stealing it."],
  ["Responsive art direction", "Desktop and mobile are composed intentionally, not squeezed."],
  ["Fast + accessible", "Keyboard use, reduced motion, readable contrast, and performance stay part of the design."],
];

export default function Home() {
  return (
    <main id="main-content" className="northline-home premium-v2">
      <MotionController />
      <AtmosphericSceneClient />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="scroll-rail" aria-label="Page chapters">
        <span className="scroll-rail-track"><span className="scroll-rail-progress" /></span>
        <a href="#overview" data-rail-link="overview"><i>01</i><span>Overview</span></a>
        <a href="#system" data-rail-link="system"><i>02</i><span>Flow</span></a>
        <a href="#services" data-rail-link="services"><i>03</i><span>Build</span></a>
        <a href="#proof" data-rail-link="proof"><i>04</i><span>Difference</span></a>
        <a href="#contact" data-rail-link="contact"><i>05</i><span>Contact</span></a>
      </nav>

      <section className="hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <header className="site-header shell">
          <a className="wordmark" href="#overview" aria-label="Northline home"><span>Northline</span><small>Digital studio</small></a>
          <nav aria-label="Primary navigation">
            <a href="#system">Approach</a>
            <a href="#services">Services</a>
            <a href="#proof">Difference</a>
            <a className="nav-cta magnetic" href="#contact">Start a project <span>↗</span></a>
          </nav>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <p className="eyebrow" data-hero-support>Strategy · design · motion · development</p>
            <h1 id="hero-title" aria-label="Make the digital presence impossible to ignore.">
              <span className="hero-line-mask"><span data-hero-line>Make the digital presence</span></span>
              <span className="hero-line-mask hero-line-accent"><span data-hero-line>impossible to ignore.</span></span>
            </h1>
            <p className="hero-description" data-hero-support>
              Northline turns complicated businesses, organizations, and products into digital experiences that feel obvious, dimensional, and premium from the first scroll.
            </p>
            <div className="hero-actions" data-hero-support>
              <a className="button button-primary magnetic" href="#system">See the experience <span>↓</span></a>
              <a className="button button-secondary magnetic" href="#contact">Start a project <span>↗</span></a>
            </div>
            <div className="hero-proof" data-hero-support><span>Clear story</span><i /><span>Spatial motion</span><i /><span>Real production</span></div>
          </div>

          <div className="hero-object hero-object-v2" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-fragment fragment-a"><span>Message</span><b /><b /></div>
            <div className="hero-fragment fragment-b"><span>Structure</span><b /><b /></div>
            <div className="hero-fragment fragment-c"><span>Proof</span><b /><b /></div>
            <div className="hero-fragment fragment-d"><span>Action</span><b /><b /></div>
            <div className="hero-screen screen-back"><span>03 / depth</span><i /><i /><i /></div>
            <div className="hero-screen screen-mid"><span>02 / structure</span><strong /><i /><i /></div>
            <div className="hero-screen screen-front">
              <div className="screen-nav"><i /><span /><span /><b /></div>
              <div className="screen-copy"><small>Northline / live system</small><strong>One idea leads. Everything else falls into place.</strong><span /></div>
              <div className="screen-cards"><i /><i /><i /></div>
              <div className="screen-action">Move with intention <span>→</span></div>
            </div>
          </div>
        </div>
        <div className="hero-scroll shell" data-hero-support><span>Scroll to move through the system</span><i>↓</i></div>
      </section>

      <section className="trust-strip scene-section" data-scene="trust" data-scene-strength=".76" aria-label="Northline standards">
        <div className="shell trust-strip-grid">
          <p><strong>Understand it fast</strong><span>Clarity before cleverness.</span></p>
          <p><strong>Feel the depth</strong><span>3D and parallax with purpose.</span></p>
          <p><strong>Know where to go</strong><span>Every screen creates a next step.</span></p>
          <p><strong>Works in real life</strong><span>Fast, responsive, accessible.</span></p>
        </div>
      </section>

      <section className="flow-section scene-section" id="system" data-scene="system" data-scene-strength=".92" aria-labelledby="flow-title">
        <div className="flow-backdrop" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell flow-intro" data-reveal>
          <p className="eyebrow">The experience</p>
          <h2 id="flow-title">The page should keep revealing itself—not stop to explain itself.</h2>
          <p>Four layers. One continuous movement. The content stays readable while the visual system changes around it.</p>
        </div>

        <div className="flow-ladder-shell shell">
          <div className="flow-ladder" aria-label="Northline experience flow">
            {ladder.map(([number, label, title, copy], index) => (
              <article className={`flow-card flow-card-${index + 1}`} data-flow-card key={number}>
                <div className="flow-card-top"><span>{number}</span><small>{label}</small><i /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="flow-ui" aria-hidden="true">
                  <span /><span /><span />
                  <div><i /><i /><i /></div>
                </div>
              </article>
            ))}
          </div>
          <div className="flow-caption" data-reveal>
            <span>SCROLL</span><i />
            <p>Signal becomes structure. Structure gains depth. Depth creates action.</p>
          </div>
        </div>
      </section>

      <section className="services-v2 scene-section" id="services" data-scene="services" data-scene-strength=".74" aria-labelledby="services-title">
        <div className="shell">
          <header className="section-heading services-heading" data-reveal>
            <p className="eyebrow">What Northline builds</p>
            <h2 id="services-title">Not three boxes. Three different digital experiences.</h2>
          </header>

          <div className="showcase-stack">
            {services.map((service, index) => (
              <article className={`showcase showcase-${index + 1}`} data-showcase key={service.number}>
                <div className="showcase-copy">
                  <div className="service-meta"><span>{service.number}</span><small>{service.kicker}</small></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="showcase-accent"><span>{service.metric}</span><strong>{service.accent}</strong></div>
                </div>
                <div className="showcase-scene interactive-card" data-parallax aria-hidden="true">
                  <div className="scene-glow" />
                  <div className="scene-window scene-window-back"><span /><i /><i /></div>
                  <div className="scene-window scene-window-mid"><span /><i /><i /></div>
                  <div className="scene-window scene-window-front">
                    <div className="scene-nav"><i /><i /><i /><span /></div>
                    <small>{service.kicker}</small>
                    <strong>{service.accent}</strong>
                    <div className="scene-bars"><i /><i /><i /></div>
                    <div className="scene-grid"><i /><i /><i /></div>
                    <div className="scene-cta"><span>Explore</span><b>↗</b></div>
                  </div>
                  <div className="scene-orbit" />
                  <div className="scene-chip chip-a">01</div>
                  <div className="scene-chip chip-b">LIVE</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="transform-section scene-section" id="proof" data-scene="proof" data-scene-strength=".86" aria-labelledby="proof-title">
        <div className="shell transform-layout">
          <div className="transform-copy" data-reveal>
            <p className="eyebrow">What changes</p>
            <h2 id="proof-title">The difference should be visible before anyone reads the explanation.</h2>
            <p>Move the slider in your head: less noise, stronger hierarchy, more confidence, clearer action.</p>
          </div>

          <div className="transform-stage" data-transform-stage>
            <div className="transform-before" aria-hidden="true">
              <small>BEFORE</small><span /><span /><span /><span /><div><i /><i /><i /></div>
            </div>
            <div className="transform-beam" aria-hidden="true"><i /></div>
            <div className="transform-after" aria-hidden="true">
              <small>AFTER</small><strong>One clear direction.</strong><span /><div><i /><i /><i /></div><b>Next step →</b>
            </div>
          </div>

          <div className="transform-list">
            {transformations.map(([title, before, after], index) => (
              <article data-transform-item key={title}>
                <span>0{index + 1}</span><h3>{title}</h3>
                <p><small>Before</small>{before}</p>
                <i>→</i>
                <p><small>After</small>{after}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="standards-v2 scene-section" data-scene="standards" data-scene-strength=".5" aria-labelledby="standards-title">
        <div className="standards-marquee" aria-hidden="true"><span>FAST · CLEAR · SPATIAL · RESPONSIVE · ACCESSIBLE · BUILT · FAST · CLEAR · SPATIAL · RESPONSIVE · ACCESSIBLE · BUILT ·</span></div>
        <div className="shell standards-v2-layout">
          <header data-reveal>
            <p className="eyebrow">The standard</p>
            <h2 id="standards-title">Premium is not a screenshot. It is how the site behaves.</h2>
          </header>
          <div className="standards-v2-grid">
            {standards.map(([title, copy], index) => (
              <article className="interactive-card" data-reveal key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i>↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section contact-v2 scene-section" id="contact" data-scene="contact" data-scene-strength="1" aria-labelledby="contact-title">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="contact-beam" aria-hidden="true" />
        <div className="shell contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Start simple</p>
            <h2 id="contact-title">Show us the thing that should feel better.</h2>
            <p>Send the current site or the idea. A few sentences are enough. Northline can tell you what would create the biggest visible difference first.</p>
            <div className="contact-points"><span>No deck needed</span><span>No agency language</span><span>Clear next step</span></div>
          </div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#overview"><span>Northline</span><small>Digital studio</small></a>
        <p>Clarity with depth.</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}