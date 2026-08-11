import { AtmosphericSceneClient } from "./components/AtmosphericSceneClient";
import { MotionController } from "./components/MotionController";
import { NorthlineExperiencePreview } from "./components/NorthlineExperiencePreview";
import { ProjectReviewForm } from "./components/ProjectReviewForm";

const capabilities = [
  ["01", "Flagship websites", "A memorable digital front door", "Positioning, art direction, UX, motion, development, CMS, and launch as one system."],
  ["02", "Digital products", "Tools people actually enjoy using", "Portals, dashboards, applications, directories, workflows, and product interfaces with real product thinking behind them."],
  ["03", "Transformations", "Make the current site feel expensive again", "Keep what works. Replace weak hierarchy, generic visuals, confusing journeys, slow pages, and flat interaction."],
  ["04", "Motion systems", "Movement that helps the story land", "Scroll choreography, parallax, micro-interactions, depth, reveals, and 3D moments built around attention—not decoration."],
  ["05", "Conversion design", "Make the next step obvious", "Every page should help the right visitor understand, trust, and act without forcing them to decode the interface."],
  ["06", "Production", "The final thing is the real thing", "Responsive, accessible, performant, tested, and shipped—not a glossy concept that falls apart after handoff."],
];

const steps = [
  ["01", "Show us what exists", "Send the current site, product, or idea. We look for the gap between how strong the work is and how weak the digital experience feels."],
  ["02", "Find the biggest visible problem", "Message, hierarchy, visual confidence, trust, motion, conversion, or product usability—we identify what is costing the experience the most."],
  ["03", "Design the system", "We shape the story, structure the page, define the visual language, and build the interaction model before adding complexity."],
  ["04", "Build, test, launch", "The experience is developed, tuned across devices, tested for motion and performance, and shipped as a working production site."],
];

const services: [string, string, string[]][] = [
  ["Flagship website", "For a company, institution, product, or ambitious project that needs a new digital presence from the ground up.", ["Strategy", "Art direction", "UX", "Motion", "Development"]],
  ["Product experience", "For platforms and tools that need cleaner workflows, stronger interfaces, and a more premium feel.", ["Product UX", "Systems", "Interface design", "Development"]],
  ["Website transformation", "For a site that already has useful content or infrastructure but feels dated, weak, flat, or confusing.", ["Audit", "Redesign", "Motion", "Performance", "Conversion"]],
];

const promises = [
  ["No fake proof", "No invented logos, testimonials, metrics, or case-study results just to make the site look established."],
  ["No handoff gap", "The visual idea and the production build are treated as one job, so the finished site does not lose the design."],
  ["Motion with a reason", "Every reveal, parallax shift, hover response, and 3D moment should guide attention or create memory."],
  ["Built for real use", "Responsive behavior, keyboard access, reduced motion, readable contrast, and performance stay inside the design system."],
];

export default function Home() {
  return (
    <main id="main-content" className="northline-home premium-v2 recover-inspired motion-rebuild">
      <MotionController />
      <AtmosphericSceneClient />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="rr-nav shell">
        <a className="rr-brand" href="#overview" aria-label="Northline home"><span>N</span><strong>Northline</strong></a>
        <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#process">Process</a><a href="#standard">Standard</a></nav>
        <a className="rr-nav-cta magnetic" href="#contact">Start a project <span>↗</span></a>
      </header>

      <section className="rr-hero scene-section" id="overview" data-scene="overview" data-scene-strength="1" aria-labelledby="hero-title">
        <div className="rr-hero-grid shell">
          <div className="rr-hero-copy">
            <p className="rr-eyebrow" data-hero-support><i /> Digital strategy · design · motion · development</p>
            <h1 id="hero-title">
              <span className="hero-line-mask"><span data-hero-line>Make your digital presence</span></span>
              <span className="hero-line-mask rr-accent-line"><span data-hero-line>feel as strong as the work behind it.</span></span>
            </h1>
            <p className="rr-hero-text" data-hero-support>Northline builds websites and digital products that are clear enough to understand immediately, polished enough to trust, and alive enough to remember.</p>
            <div className="rr-actions" data-hero-support><a className="rr-button rr-button-primary magnetic" href="#services">See what we build <span>↓</span></a><a className="rr-button rr-button-secondary magnetic" href="#contact">Start a project</a></div>
            <div className="rr-facts" data-hero-support><span>✓ Strategy through launch</span><span>✓ 3D + motion when useful</span><span>✓ Responsive production build</span></div>
          </div>
          <NorthlineExperiencePreview />
        </div>
      </section>

      <section className="rr-outcome-bar scene-section" data-scene="trust" data-scene-strength=".72" aria-label="Northline outcomes">
        <div className="shell"><span>Understand it faster</span><span>Trust it sooner</span><span>Remember it longer</span><span>Know where to go next</span><span>Feel the craft</span></div>
      </section>

      <section className="rr-stack-strip" data-reveal><span>BUILT AS ONE SYSTEM</span><div><b>Positioning</b><b>UX</b><b>Art direction</b><b>Motion</b><b>3D</b><b>Development</b><b>Performance</b></div></section>

      <section className="rr-walkthrough scene-section" id="experience" data-scene="system" data-scene-strength=".9">
        <div className="shell rr-walk-grid">
          <div className="rr-walk-copy" data-reveal>
            <p className="rr-eyebrow"><i /> WHAT THE EXPERIENCE SHOULD DO</p>
            <h2>A premium site should feel simple even while a lot is happening underneath.</h2>
            <p>The visitor should never have to understand the animation system. They should only feel that the page is clearer, smoother, more responsive, and more intentional.</p>
          </div>
          <div className="rr-story-stage interactive-card" data-showcase data-parallax>
            <div className="rr-story-orbit" />
            <article><span>01</span><small>Signal</small><strong>One message leads.</strong><p>The first screen makes the value obvious.</p></article>
            <article><span>02</span><small>Structure</small><strong>The story unfolds naturally.</strong><p>Each section answers the next question.</p></article>
            <article><span>03</span><small>Depth</small><strong>Motion creates memory.</strong><p>Parallax, reveals, and 3D support attention.</p></article>
            <article><span>04</span><small>Action</small><strong>The next step is clear.</strong><p>Explore, inquire, apply, buy, or contact without friction.</p></article>
          </div>
        </div>
      </section>

      <section className="rr-section scene-section" id="services" data-scene="services" data-scene-strength=".78">
        <div className="shell">
          <div className="rr-section-heading" data-reveal><span>ONE DIGITAL STUDIO</span><h2>The work between “we need a better site” and “this finally feels right.”</h2><p>Northline handles the parts that usually get split across strategy, design, motion, and development.</p></div>
          <div className="rr-capability-grid">
            {capabilities.map(([number, title, heading, copy], index) => <article className={`interactive-card ${index === 0 || index === 3 || index === 5 ? "rr-wide" : ""}`} data-reveal key={title}><div><span>{number}</span><i>↗</i></div><small>{title}</small><h3>{heading}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="rr-process scene-section" id="process" data-scene="proof" data-scene-strength=".82">
        <div className="shell rr-process-grid">
          <div className="rr-process-copy" data-reveal><span>HOW NORTHLINE WORKS</span><h2>Find the gap. Build the stronger version.</h2><p>No long agency ritual. Start with what exists, identify the most visible weakness, then build around the outcome that matters.</p><a className="rr-button rr-button-secondary magnetic" href="#contact">Start with your site <b>↗</b></a></div>
          <ol>{steps.map(([number, title, copy]) => <li data-transform-item key={number}><b>{number}</b><span><strong>{title}</strong><small>{copy}</small></span></li>)}</ol>
        </div>
      </section>

      <section className="rr-services scene-section" data-scene="services" data-scene-strength=".68">
        <div className="shell"><div className="rr-section-heading" data-reveal><span>WAYS TO WORK TOGETHER</span><h2>Choose the kind of problem—not a confusing package.</h2></div><div className="rr-service-cards">{services.map(([title, copy, tags], index) => <article className="interactive-card" data-showcase key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><div>{tags.map(tag => <small key={tag}>{tag}</small>)}</div><a href="#contact">Talk about this <b>↗</b></a></article>)}</div></div>
      </section>

      <section className="rr-proof scene-section" id="standard" data-scene="standards" data-scene-strength=".58">
        <div className="shell rr-proof-grid"><div className="rr-proof-copy" data-reveal><span>WHAT YOU CAN HOLD NORTHLINE TO</span><h2>Trust should come from the work, not made-up reviews.</h2><p>Until there are real client testimonials worth showing, the site should earn trust through specific promises, visible craft, and a process that can be checked.</p></div><div className="rr-proof-cards">{promises.map(([title, copy], index) => <article className="interactive-card" data-reveal key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}</div></div>
      </section>

      <section className="rr-closing scene-section" id="contact" data-scene="contact" data-scene-strength="1">
        <div className="rr-closing-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell rr-closing-grid">
          <div className="rr-closing-copy" data-reveal><span>YOUR CURRENT SITE IS ENOUGH TO START</span><h2>Show us what should feel better.</h2><p>Send the site, product, or idea and tell us what feels weak. A few sentences are enough to start.</p><div><small>No deck needed</small><small>No fake sales ritual</small><small>Clear next step</small></div></div>
          <ProjectReviewForm />
        </div>
      </section>

      <footer className="rr-footer shell"><a className="rr-brand" href="#overview"><span>N</span><strong>Northline</strong></a><p>Digital strategy, design, motion, and development.</p><div><a href="#services">Services</a><a href="#process">Process</a><a href="mailto:hello@northline.studio">Contact</a></div></footer>
    </main>
  );
}
