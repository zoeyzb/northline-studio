# Implementation Plan: Northline Credibility Studio

## Objective
Build a premium, accessible website for a digital credibility studio serving institutions and expertise-led organizations. The experience must make the offer clear, prove a distinct Message → Evidence → Action method, and present one-time and managed engagement models without pretending the business is self-service SaaS.

## Architecture decisions
- Use the existing Vinext starter with no new dependencies in the foundation milestone.
- Lead with institutional clients; portfolios remain a secondary service pathway.
- Establish clarity and accessibility before advanced motion or WebGL.
- Never fabricate client names, statistics, testimonials, or case-study outcomes.

## Phases
1. Foundation: identity, navigation, hero, method, and engagement models.
2. Offer: organization websites, portfolio systems, and digital platforms.
3. Evidence: case-study framework, process, proof standards, and conversion flow.
4. Motion and polish: coordinated section transitions, functional animations, responsive and reduced-motion fallbacks.

## Motion architecture
- One dynamically loaded React Three Fiber canvas creates the hero atmosphere; it is hidden for reduced motion and capped at 1.5 device-pixel ratio.
- GSAP + ScrollTrigger coordinate the hero exit, service entrance, reveal states, and progress rail.
- Lenis provides one global, native-feeling smooth-scroll controller on capable devices.
- Service animations remain DOM/CSS-based so WebGL is not duplicated across the page.
- Mobile removes the progress rail, reduces scene intensity, and avoids camera rotation or pinned sequences.

## Verification
- Production build and rendered HTML tests pass after every milestone.
- Primary navigation and email conversion path work with keyboard and touch.
- Layout remains usable at 320px, 768px, 1024px, and 1440px.
- No fabricated evidence is introduced.
- The hero contains a GPU spatial field with a static CSS fallback.
- The hero and services read as one continuous depth transition.
- Each service has a content-specific visual explanation rather than a decorative placeholder.
- Reduced-motion users receive stable content without the WebGL scene.

## Second-pass content and interaction revision
- Replace the abstract hero framework card with a concrete website-review scene that demonstrates what Northline actually inspects.
- Make organizations the unmistakable primary route and separate the professional portfolio route without presenting both as equal markets.
- Turn Message → Evidence → Action into an interactive diagnosis with visible before/after consequences.
- Expand selected work into honest case-study evidence with challenge, intervention, system view, and status labels.
- Preserve the existing architecture, warm institutional identity, WebGL atmosphere, navigation, and email conversion path.
