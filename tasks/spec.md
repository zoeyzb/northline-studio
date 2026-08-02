# Spec: Northline Spatial Credibility Experience

## Objective
Continue the existing Northline site into a cohesive, premium digital-credibility experience for institutions, public-interest organizations, professional firms, and selected B2B ventures. The first viewport must explain the offer immediately; the rest of the page must demonstrate Message → Evidence → Action through real interaction, honest project evidence, and clear engagement choices.

## Assumptions
- The existing content model, warm institutional identity, public single-page route, and mail-based project-review conversion remain valid.
- Existing dependencies are sufficient. Three.js, React Three Fiber, Drei, GSAP, and Lenis are already installed; no duplicate animation or particle library will be added.
- Recover Revenue and NextRole may be identified as Northline product/system studies, with links to their public GitHub repositories and no fabricated results.
- The experience must degrade to a stable CSS composition on reduced-motion, touch-first, and lower-powered devices.

## Tech Stack
- Vinext / Next.js 16, React 19, TypeScript 5.9
- CSS design system in `app/globals.css`
- React Three Fiber + Drei + Three.js for one shared GPU scene
- GSAP + ScrollTrigger for coordinated section choreography
- Lenis for capable-device smooth scrolling
- Node test runner for rendered-output regression tests

## Commands
- Install: `npm ci`
- Develop: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Test: `npm test`

## Project Structure
- `app/page.tsx` — page narrative, semantic landmarks, and real project data
- `app/components/` — interactive credibility tools, motion controller, shared atmosphere
- `app/globals.css` — visual tokens, responsive system, state styling, fallbacks
- `tests/` — rendered HTML and interaction-safe structural checks
- `tasks/` — specification, implementation plan, and completion checklist

## Code Style
Prefer focused semantic components and data-driven repeated content. Interactive behavior belongs in client components; the page remains server-rendered.

```tsx
<a className="case-link" href={project.repository}>
  Inspect the repository <span aria-hidden="true">↗</span>
</a>
```

## Page Architecture
1. Persistent orientation: skip link, accessible header, and clickable chapter rail.
2. Hero: precise promise, review CTA, interactive audit console, and shared spatial object.
3. Audience split: organizations primary; professionals a distinct secondary path.
4. Stakeholder evidence: show why one generic pitch fails different decision-makers.
5. Offer system: organization sites, portfolios, and platforms as three outputs of one method.
6. Method: interactive Message → Evidence → Action diagnosis.
7. Work: honest system studies with challenge, intervention, contribution, workflow, status, and repository access.
8. Continuity: observe → decide → improve cycle.
9. Engagements: one-time build versus managed digital presence.
10. Standards and conversion: evidence policy followed by a focused review CTA.

## Motion and Visual System
- One shared atmospheric canvas; no second WebGL runtime.
- Background depth planes continue through dark chapters with section-aware light, color, and density.
- Scroll choreography uses restrained scale, translation, and lighting transitions; body text stays stable.
- Functional animations explain review findings, service outputs, method changes, project workflows, and the improvement loop.
- Cursor lighting and card perspective apply only on precise-pointer devices.
- Mobile uses vertical depth, lower particle density, no cursor light, no pinning, and smaller transform ranges.

## Testing Strategy
- Render tests assert core narrative, chapter anchors, real project links, honest status labels, and conversion paths.
- Lint and production build must pass.
- Browser verification covers 320, 768, 1024, and 1440 px; keyboard navigation; reduced motion; console errors; horizontal overflow; and interactive controls.

## Performance Budget
- Keep a single canvas and cap DPR at 1.5 desktop / 1.15 compact devices.
- Reduce particle count on compact or coarse-pointer devices.
- Pause scene rendering when the document is hidden.
- Animate transforms, opacity, and CSS custom properties rather than layout.
- No new runtime dependency without a demonstrated need.

## Boundaries
- Always: preserve existing working routes and semantics; label conceptual views; support keyboard and reduced motion; test before publishing.
- Ask first: changing the contact destination, adding forms/backend storage, adding client claims, or introducing another rendering library.
- Never: fabricate outcomes, testimonials, clients, integrations, or metrics; hide essential content behind hover; ship animation that traps scrolling.

## Success Criteria
- Visitors can identify the studio, primary audience, three outputs, method, evidence, engagement choices, and CTA without decoding agency jargon.
- The atmosphere and chapter transitions read as one continuous spatial system, not isolated effects.
- The chapter rail is navigable and communicates the active section.
- Each major animation explains content or progression.
- Project evidence links to real public repositories and remains explicitly labeled.
- Reduced-motion and mobile versions remain polished and complete.
- Lint, build, and tests pass with no hydration or console errors in browser verification.

## Open Questions
- A production intake form can replace `mailto:` when a destination, fields, privacy copy, and backend are approved. It is intentionally outside this pass.
