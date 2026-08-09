"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 961px) and (hover: hover) and (pointer: fine)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    const updatePointerVars = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-x", String(event.clientX / window.innerWidth - 0.5));
      root.style.setProperty("--pointer-y", String(event.clientY / window.innerHeight - 0.5));
    };
    window.addEventListener("pointermove", updatePointerVars, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", updatePointerVars));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const activateScene = (section: HTMLElement) => {
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".45");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));

      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activateScene(visible.target as HTMLElement);
      },
      { rootMargin: "-26% 0px -52% 0px", threshold: [0, .18, .42] },
    );
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());

    if (reduced) {
      document.querySelectorAll<HTMLElement>("[data-story-step]").forEach((step, index) => step.classList.toggle("is-active", index === 0));
      return () => cleanups.forEach((cleanup) => cleanup());
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: .9,
      smoothWheel: true,
      wheelMultiplier: .9,
      touchMultiplier: 1.05,
    });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.set("[data-hero-line]", { transformOrigin: "0% 100%" });
      gsap.set("[data-story-step]", { opacity: .2 });
      gsap.set("[data-story-step]:first-child", { opacity: 1 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", { y: -24, opacity: 0, duration: .75 })
        .from("[data-hero-line]", { yPercent: 118, rotateX: -18, filter: "blur(16px)", duration: 1.08, stagger: .11 }, "-=.38")
        .from("[data-hero-support]", { y: 22, opacity: 0, filter: "blur(8px)", duration: .62, stagger: .07 }, "-=.58")
        .from(".hero-screen", { y: 110, z: -260, rotateX: 18, opacity: 0, duration: 1.05, stagger: .12 }, "-=.9")
        .from(".hero-fragment", { x: (index) => index % 2 ? 90 : -90, y: (index) => index < 2 ? -35 : 35, scale: .7, opacity: 0, duration: .78, stagger: .06 }, "-=.7")
        .from(".hero-orbit", { scale: .65, opacity: 0, duration: 1.2, stagger: .08 }, "-=1");

      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 } })
        .to(".hero-copy", { yPercent: 15, scale: .94, opacity: .18, ease: "none" }, 0)
        .to(".screen-back", { z: -420, y: 40, rotateX: 74, opacity: .08, ease: "none" }, 0)
        .to(".screen-mid", { z: -160, y: 10, rotateX: 58, opacity: .4, ease: "none" }, 0)
        .to(".screen-front", { z: 120, y: -65, scale: 1.08, rotateX: 32, ease: "none" }, 0)
        .to(".hero-fragment", { x: 0, y: 0, rotate: 0, scale: .65, opacity: .08, ease: "none" }, 0)
        .to(".hero-grid", { scale: 1.7, yPercent: 20, opacity: .08, ease: "none" }, 0)
        .to(".hero-orbit-one", { rotate: 54, scale: 1.22, ease: "none" }, 0)
        .to(".hero-orbit-two", { rotate: -38, scale: .82, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          filter: "blur(10px)",
          duration: .85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      const storySteps = gsap.utils.toArray<HTMLElement>("[data-story-step]");
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story",
          start: "top top",
          end: desktop ? "+=3600" : "bottom bottom",
          scrub: desktop ? 1 : .55,
          pin: desktop ? ".story-sticky" : false,
          anticipatePin: desktop ? 1 : 0,
          invalidateOnRefresh: true,
        },
      });

      storySteps.forEach((step, index) => {
        const label = `step-${index}`;
        storyTimeline.addLabel(label, index);
        storyTimeline.to(storySteps, { opacity: .16, y: 0, duration: .18, ease: "none" }, label);
        storyTimeline.to(step, { opacity: 1, y: -6, duration: .2, ease: "none", onStart: () => {
          storySteps.forEach((item) => item.classList.remove("is-active"));
          step.classList.add("is-active");
        }, onReverseComplete: () => {
          storySteps.forEach((item) => item.classList.remove("is-active"));
          storySteps[Math.max(index - 1, 0)]?.classList.add("is-active");
        } }, label);
        storyTimeline.to(".story-core strong", { textShadow: `0 0 ${22 + index * 14}px rgba(114,217,242,.45)`, scale: 1 + index * .055, duration: .65, ease: "none" }, label);
        storyTimeline.to(".story-stage", { rotateY: -8 + index * 5.5, rotateX: 5 - index * 2, z: 30 + index * 55, duration: .7, ease: "none" }, label);
        storyTimeline.to(".story-plane-a", { x: -55 + index * 20, y: -20 + index * 6, z: -180 + index * 42, rotateY: -18 + index * 6, duration: .7, ease: "none" }, label);
        storyTimeline.to(".story-plane-b", { x: 40 - index * 12, y: 25 - index * 8, z: -100 + index * 52, rotateY: 14 - index * 5, duration: .7, ease: "none" }, label);
        storyTimeline.to(".story-plane-c", { y: -15 - index * 10, z: -35 + index * 60, scale: .9 + index * .06, duration: .7, ease: "none" }, label);
        storyTimeline.to(".story-path i", { scale: 1, opacity: .95, stagger: .05, duration: .3 }, label);
      });

      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, index) => {
        const visual = card.querySelector<HTMLElement>(".service-visual");
        const browser = card.querySelector<HTMLElement>(".service-browser");
        if (!visual || !browser) return;
        gsap.fromTo(card,
          { scale: .93, opacity: .6 },
          { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 92%", end: "center 55%", scrub: .8 } },
        );
        gsap.fromTo(visual,
          { xPercent: index % 2 ? -16 : 16, z: -260, rotateY: index % 2 ? 14 : -14, rotateX: 6, opacity: .35 },
          { xPercent: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 88%", end: "center 50%", scrub: 1 } },
        );
        gsap.to(browser, { y: -18, scale: 1.025, ease: "none", scrollTrigger: { trigger: card, start: "center 70%", end: "bottom 30%", scrub: .9 } });
      });

      gsap.utils.toArray<HTMLElement>("[data-proof-system]").forEach((card, index) => {
        const before = card.querySelector<HTMLElement>(".proof-before");
        const after = card.querySelector<HTMLElement>(".proof-after");
        const arrow = card.querySelector<HTMLElement>(".proof-arrow");
        if (!before || !after || !arrow) return;
        const timeline = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", end: "center 46%", scrub: .85 } });
        timeline
          .fromTo(before, { xPercent: 0, z: 0, rotateY: 0, opacity: 1 }, { xPercent: -22, z: -140, rotateY: 9, opacity: .22, ease: "none" }, 0)
          .fromTo(arrow, { scale: .6, opacity: .2 }, { scale: 1.2, opacity: 1, ease: "none" }, .05)
          .fromTo(after, { xPercent: 20, z: -180, rotateY: -12, opacity: .25 }, { xPercent: 0, z: 45, rotateY: 0, opacity: 1, ease: "none" }, .08);
        gsap.from(card.querySelectorAll(".proof-system-copy p"), { y: 24, opacity: 0, duration: .65, stagger: .08, scrollTrigger: { trigger: card, start: "top 62%", once: true } });
        if (index === 1) gsap.to(card, { rotateZ: .001, scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });

      gsap.fromTo(".process-line span", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".process-track", start: "top 75%", end: "bottom 42%", scrub: .5 } });
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step, index) => {
        gsap.from(step, {
          x: index % 2 ? 34 : -34,
          opacity: 0,
          duration: .72,
          ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
        });
      });

      gsap.timeline({ scrollTrigger: { trigger: ".contact-section", start: "top 85%", end: "center 48%", scrub: .9 } })
        .fromTo(".contact-orbit i:nth-child(1)", { scale: .45, opacity: 0 }, { scale: 1, opacity: .35, ease: "none" }, 0)
        .fromTo(".contact-orbit i:nth-child(2)", { scale: .35, opacity: 0 }, { scale: 1, opacity: .22, ease: "none" }, .08)
        .fromTo(".contact-orbit i:nth-child(3)", { scale: .25, opacity: 0 }, { scale: 1, opacity: .14, ease: "none" }, .14)
        .fromTo(".contact-grid", { y: 50, scale: .96 }, { y: 0, scale: 1, ease: "none" }, 0);

      gsap.to(".scroll-rail-progress", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .15 },
      });

      if (desktop) {
        gsap.utils.toArray<HTMLElement>(".scene-section:not(.story)").forEach((section) => {
          gsap.fromTo(section,
            { "--section-depth": "0px" },
            { "--section-depth": "-28px", ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } },
          );
        });
      }
    });

    if (finePointer) {
      const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
      magnetic.forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);
          gsap.to(element, { x: x * .13, y: y * .16, duration: .35, ease: "power2.out" });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .6, ease: "elastic.out(1, .45)" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
        });
      });

      const heroObject = document.querySelector<HTMLElement>(".hero-object");
      const depthTargets = Array.from(document.querySelectorAll<HTMLElement>(".service-visual, .proof-transition"));
      const onDepthPointer = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;
        if (heroObject) gsap.to(heroObject, { rotateY: x * 5.5, rotateX: -y * 4.2, x: x * 14, y: y * 8, duration: .8, ease: "power2.out" });
        depthTargets.forEach((target) => {
          const rect = target.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            gsap.to(target, { rotateY: x * 2.5, rotateX: -y * 1.8, duration: .9, ease: "power2.out" });
          }
        });
      };
      window.addEventListener("pointermove", onDepthPointer, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onDepthPointer));
    }

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      gsap.ticker.remove(tick);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}
