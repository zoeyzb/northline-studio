# Northline Studio

Northline is a digital credibility studio website for complex organizations: universities, research programs, nonprofits, initiatives, and expert-led teams.

The site is designed as a scrolling narrative rather than a stack of static sections. It combines messaging, evidence, service positioning, conversion paths, 3D atmosphere, and motion while preserving accessibility and reduced-motion fallbacks.

## Experience architecture

The homepage follows a deliberate sequence:

1. **Signal** — establish the core value proposition immediately.
2. **Depth** — reveal evidence and structure as trust needs to increase.
3. **Movement** — turn understanding into a clear next action.

The public story then expands into evidence standards, common credibility failures, service types, the Northline method, engagement models, operating principles, and the project-review conversion path.

## Core stack

- Next.js 16 / React 19
- TypeScript
- GSAP + ScrollTrigger for scroll choreography
- Lenis for smooth scrolling
- Three.js + React Three Fiber + Drei for the atmospheric 3D scene
- CSS-first responsive and reduced-motion fallbacks
- Vinext / Vite build tooling retained by the project runtime

## Important files

- `app/page.tsx` — homepage content, hierarchy, sections, and conversion narrative
- `app/components/MotionController.tsx` — page-wide GSAP, Lenis, pointer depth, reveals, scroll progress, and cleanup
- `app/components/AtmosphericScene.tsx` — particle depth fields, pathways, spatial core, pointer/scroll response, and scene transitions
- `app/components/StoryMotion.tsx` — dedicated Signal → Depth → Movement storytelling choreography
- `app/components/RailController.tsx` — logical chapter state for the fixed scroll rail
- `app/components/ProjectReviewForm.tsx` — validated project-review email preparation flow
- `app/globals.css` — core visual system and responsive layout
- `app/motion-polish.css` — depth, light, interaction, hover, and progress polish
- `app/story.css` — storytelling chapter layout and 3D visual treatment
- `app/visual-variants.css` — evidence-scene differentiation and form-state polish
- `tests/rendered-html.test.mjs` — rendered homepage regression checks

## Motion and performance rules

The motion system is progressive enhancement, not a hard dependency for understanding the site.

- `prefers-reduced-motion: reduce` disables the Three.js atmosphere and collapses animation timing.
- Coarse-pointer/mobile and lower-core devices use a smaller particle field and lower canvas DPR.
- The Three.js canvas is client-only and does not block server rendering of the page content.
- Pointer listeners, IntersectionObservers, GSAP contexts, and Lenis ticker hooks are cleaned up on unmount.
- Decorative 3D/story visuals are hidden from assistive technology while the content remains semantic HTML.

## Project review form

The current contact flow validates the organization, project gap, desired outcome, name, email, and optional website URL. It then prepares a `mailto:` draft addressed to `hello@northline.studio` and attempts to copy the project details to the clipboard as a fallback.

Nothing is submitted to a server or third-party form service by this repository today. A direct-send form would require a verified mail/form backend and deployment credentials rather than silently pretending a message was delivered.

## Local commands

Prerequisite: Node.js `>=22.13.0`.

```bash
npm run dev
npm run lint
npm run build
npm test
```

The existing build helpers under `scripts/` target the project runtime and may depend on Linux utilities such as GNU `timeout`.

## Verification

`npm test` builds the deployable artifact and runs the rendered homepage assertions in `tests/rendered-html.test.mjs`. The test protects the current Northline positioning and major page chapters from accidental regressions or unrelated project content leaking into the site.

Production deployment should always be checked against the Git commit SHA rather than assuming a successful push has already reached the live Vercel URL.
