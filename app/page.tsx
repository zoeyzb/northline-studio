import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const services = [
  {
    number: "01",
    title: "Flagship websites",
    copy: "A digital presence built from strategy through launch.",
    tags: ["Strategy", "Design", "Motion", "Code"],
    tone: "violet",
  },
  {
    number: "02",
    title: "Digital products",
    copy: "Clearer interfaces for tools people actually use.",
    tags: ["Product UX", "Systems", "Interaction"],
    tone: "cyan",
  },
  {
    number: "03",
    title: "Transformations",
    copy: "Keep what works. Rebuild what feels weak.",
    tags: ["Audit", "Redesign", "Performance"],
    tone: "coral",
  },
] as const;

const story = [
  ["01", "Signal", "Find the one idea that should lead."],
  ["02", "Structure", "Turn scattered information into a path."],
  ["03", "Depth", "Use motion to guide attention and memory."],
  ["04", "Action", "Make the next move obvious."],
] as const;

export default function Home() {
  return (
    <main id="main-content" className="cinematic-site">
      <MotionController />
      <AtmosphericSceneClient />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="nlx-nav nlx-shell">
        <a className="nlx-brand" href="#hero" aria-label="Northline home">
          <span>N</span><strong>Northline</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#project">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nlx-nav-cta magnetic" href="#contact">Start a project <i>↗</i></a>
      </header>

      <section className="nlx-hero nlx-scene" id="hero" data-scene="hero" data-scene-strength="1">
        <div className="nlx-hero-aura" aria-hidden="true" />
        <div className="nlx-shell nlx-hero-grid">
          <div className="nlx-hero-copy">
            <p className="nlx-kicker" data-hero-support><i /> Digital studio · strategy · design · motion · code</p>
            <h1>
              <span className="nlx-line-mask"><span data-hero-line>Make the website</span></span>
              <span className="nlx-line-mask nlx-hero-accent"><span data-hero-line>match the work.</span></span>
            </h1>
            <p className="nlx-hero-lede" data-hero-support>Clear. Premium. Alive.</p>
            <div className="nlx-actions" data-hero-support>
              <a className="nlx-button nlx-button-primary magnetic" href="#services">See what we build <span>↓</span></a>
              <a className="nlx-button nlx-button-ghost magnetic" href="#contact">Start a project</a>
            </div>
          </div>

          <div className="nlx-hero-object nlx-prism" data-hero-object aria-hidden="true">
            <div className="nlx-hero-orbit orbit-a" />
            <div className="nlx-hero-orbit orbit-b" />
            <div className="nlx-hero-plane plane-back"><div className="nlx-prism-halo" /></div>
            <div className="nlx-hero-plane plane-mid"><div className="nlx-prism-axis" /><div className="nlx-prism-dot dot-a" /><div className="nlx-prism-dot dot-b" /></div>
            <div className="nlx-hero-plane plane-front">
              <div className="nlx-prism-core"><span>N</span></div>
              <div className="nlx-prism-caption"><small>NORTHLINE</small><strong>Clarity<br />in motion.</strong></div>
            </div>
            <div className="nlx-float-chip chip-a">STRATEGY</div>
            <div className="nlx-float-chip chip-b">MOTION</div>
          </div>
        </div>
        <div className="nlx-hero-scroll nlx-shell"><span>Scroll to enter</span><i>↓</i></div>
      </section>

      <section className="nlx-services nlx-scene" id="services" data-scene="services" data-scene-strength=".94">
        <div className="nlx-shell">
          <div className="nlx-section-head" data-reveal>
            <p className="nlx-kicker"><i /> What we build</p>
            <h2>Three ways to make the digital experience stronger.</h2>
          </div>
          <div className="nlx-service-space" data-service-space>
            {services.map((service, index) => (
              <article className={`nlx-service-card tone-${service.tone}`} data-service-card data-index={index} key={service.title}>
                <div className="nlx-card-light" aria-hidden="true" />
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <div className="nlx-tags">{service.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                <a href="#contact">Talk about this <b>↗</b></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nlx-case nlx-scene" id="approach" data-scene="case" data-scene-strength="1">
        <div className="nlx-shell nlx-case-grid">
          <div className="nlx-case-copy" data-reveal>
            <p className="nlx-kicker"><i /> Complexity → clarity</p>
            <h2>One object. Four transformations.</h2>
            <p>The interface changes as the story gets clearer.</p>
          </div>
          <div className="nlx-case-steps">
            {story.map(([number, title, copy], index) => (
              <article className="nlx-case-step" data-case-step data-step={index} key={title}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nlx-transition nlx-scene" data-scene="transition" data-scene-strength="1" aria-label="Transition">
        <div className="nlx-transition-shards" aria-hidden="true">
          <i className="shard-1" /><i className="shard-2" /><i className="shard-3" /><i className="shard-4" /><i className="shard-5" />
        </div>
        <div className="nlx-transition-copy">
          <span>MOVE THROUGH IT</span>
          <strong>Depth should move the story forward.</strong>
        </div>
      </section>

      <section className="nlx-project nlx-scene" id="project" data-scene="project" data-scene-strength=".95">
        <div className="nlx-shell nlx-project-grid">
          <div className="nlx-project-copy" data-reveal>
            <p className="nlx-kicker"><i /> Project study</p>
            <h2>Show the work at full scale.</h2>
            <p>A real interface should feel tangible before anyone clicks it.</p>
            <div className="nlx-project-facts"><span>Responsive</span><span>Interactive</span><span>Production-ready</span></div>
          </div>
          <div className="nlx-device-stage" data-device-stage>
            <div className="nlx-device-reflection" aria-hidden="true" />
            <div className="nlx-device" data-device>
              <div className="nlx-device-top"><i /><i /><i /><span>northline.studio</span></div>
              <div className="nlx-device-screen">
                <aside><b>N</b><i /><i /><i /></aside>
                <div className="nlx-device-content">
                  <small>PROJECT SYSTEM</small>
                  <h3>Clear enough to understand.<br />Alive enough to remember.</h3>
                  <div className="nlx-device-bars"><i /><i /></div>
                  <div className="nlx-device-cards"><span /><span /><span /></div>
                </div>
              </div>
            </div>
            <div className="nlx-device-label label-a">01 / STRUCTURE</div>
            <div className="nlx-device-label label-b">02 / MOTION</div>
          </div>
        </div>
      </section>

      <section className="nlx-cta nlx-scene" id="contact" data-scene="cta" data-scene-strength="1">
        <div className="nlx-cta-mark" aria-hidden="true"><span>N</span></div>
        <div className="nlx-shell nlx-cta-grid">
          <div className="nlx-cta-copy" data-reveal>
            <p className="nlx-kicker"><i /> Start simple</p>
            <h2>Build something people remember.</h2>
            <p>Send the site or the idea. A few sentences are enough.</p>
          </div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="nlx-footer nlx-shell">
        <a className="nlx-brand" href="#hero"><span>N</span><strong>Northline</strong></a>
        <p>Strategy · design · motion · development</p>
        <a href="mailto:hello@northline.studio">hello@northline.studio</a>
      </footer>
    </main>
  );
}
