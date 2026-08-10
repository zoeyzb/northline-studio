"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const desktop = window.matchMedia("(min-width: 961px)").matches;
    const cleanups: Array<() => void> = [];

    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-x", String(event.clientX / window.innerWidth - .5));
      root.style.setProperty("--pointer-y", String(event.clientY / window.innerHeight - .5));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const section = visible.target as HTMLElement;
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".6");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-28% 0px -48% 0px", threshold: [0, .18, .4] });
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());

    if (reduced) return () => cleanups.forEach((cleanup) => cleanup());

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: .82, touchMultiplier: 1.02 });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", { y: -22, opacity: 0, duration: .72 })
        .from("[data-hero-line]", { yPercent: 116, rotateX: -18, filter: "blur(16px)", duration: 1.02, stagger: .11 }, "-=.38")
        .from("[data-hero-support]", { y: 22, opacity: 0, filter: "blur(8px)", duration: .62, stagger: .07 }, "-=.55")
        .from(".hero-screen", { y: 110, z: -240, rotateX: 20, opacity: 0, duration: 1, stagger: .1 }, "-=.78")
        .from(".hero-fragment", { x: (index) => index % 2 ? 70 : -70, y: (index) => index < 2 ? -25 : 25, scale: .72, opacity: 0, duration: .7, stagger: .05 }, "-=.72")
        .from(".hero-orbit", { scale: .72, opacity: 0, duration: 1.1, stagger: .08 }, "-=.9");

      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.05 } })
        .to(".hero-copy", { yPercent: 15, scale: .94, opacity: .18, ease: "none" }, 0)
        .to(".hero-object", { yPercent: -11, z: 150, rotateY: -7, rotateX: 2, ease: "none" }, 0)
        .to(".screen-front", { y: -78, z: 160, rotateX: 28, scale: 1.05, ease: "none" }, 0)
        .to(".screen-mid", { y: 18, z: -150, rotateX: 60, opacity: .42, ease: "none" }, 0)
        .to(".screen-back", { y: 44, z: -360, opacity: .08, ease: "none" }, 0)
        .to(".hero-fragment", { scale: .58, opacity: .08, ease: "none" }, 0)
        .to(".hero-grid", { yPercent: 22, scale: 1.45, opacity: .07, ease: "none" }, 0)
        .to(".hero-orbit-one", { rotate: 48, scale: 1.18, ease: "none" }, 0)
        .to(".hero-orbit-two", { rotate: -34, scale: .84, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { y: 48, opacity: 0, filter: "blur(12px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.fromTo(element,
          { yPercent: index % 2 ? 7 : -5 },
          { yPercent: index % 2 ? -7 : 8, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });

      const flowCards = gsap.utils.toArray<HTMLElement>("[data-flow-card]");
      if (flowCards.length) {
        const flow = gsap.timeline({
          scrollTrigger: {
            trigger: ".flow-ladder-shell",
            start: "top 82%",
            end: "bottom 22%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        flowCards.forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          flow.fromTo(card,
            { xPercent: direction * 9, y: 120 + index * 26, z: -260 - index * 70, rotateY: direction * 12, rotateX: 8, scale: .84, opacity: .32 },
            { xPercent: direction * (desktop ? 3.5 : 0), y: index * (desktop ? 22 : 0), z: index * 24, rotateY: direction * (desktop ? 2.6 : 0), rotateX: 0, scale: 1, opacity: 1, ease: "none", duration: 1 },
            index * .13,
          );
        });
        flow.to(".flow-backdrop i:nth-child(1)", { xPercent: 16, yPercent: -18, rotate: 24, ease: "none", duration: 1 }, 0)
          .to(".flow-backdrop i:nth-child(2)", { xPercent: -20, yPercent: 15, rotate: -38, ease: "none", duration: 1 }, 0)
          .to(".flow-backdrop i:nth-child(3)", { scale: 1.22, opacity: .8, ease: "none", duration: 1 }, 0);
      }

      gsap.utils.toArray<HTMLElement>("[data-showcase]").forEach((showcase, index) => {
        const copy = showcase.querySelector<HTMLElement>(".showcase-copy");
        const scene = showcase.querySelector<HTMLElement>(".showcase-scene");
        const back = showcase.querySelector<HTMLElement>(".scene-window-back");
        const mid = showcase.querySelector<HTMLElement>(".scene-window-mid");
        const front = showcase.querySelector<HTMLElement>(".scene-window-front");
        const direction = index % 2 === 0 ? 1 : -1;
        const timeline = gsap.timeline({ scrollTrigger: { trigger: showcase, start: "top 88%", end: "center 44%", scrub: .9 } });
        if (copy) timeline.fromTo(copy, { x: direction * -70, opacity: .16 }, { x: 0, opacity: 1, ease: "none" }, 0);
        if (scene) timeline.fromTo(scene, { x: direction * 90, z: -220, rotateY: direction * -14, scale: .9, opacity: .28 }, { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none" }, 0);
        if (back) timeline.fromTo(back, { x: 0, y: 70, z: -240, rotateX: 12 }, { x: direction * -42, y: 35, z: -145, rotateX: 4, ease: "none" }, .08);
        if (mid) timeline.fromTo(mid, { x: 0, y: 38, z: -150 }, { x: direction * -20, y: 15, z: -65, ease: "none" }, .1);
        if (front) timeline.fromTo(front, { y: 34, z: -70, scale: .96 }, { y: -4, z: 36, scale: 1, ease: "none" }, .12);
        timeline.fromTo(showcase.querySelectorAll(".scene-chip"), { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, stagger: .08, ease: "back.out(1.8)" }, .38);
      });

      const transformStage = document.querySelector<HTMLElement>("[data-transform-stage]");
      if (transformStage) {
        gsap.timeline({ scrollTrigger: { trigger: transformStage, start: "top 78%", end: "bottom 38%", scrub: .9 } })
          .fromTo(".transform-before", { xPercent: 0, z: 20, rotateY: 0, opacity: 1 }, { xPercent: -16, z: -160, rotateY: 9, opacity: .2, ease: "none" }, 0)
          .fromTo(".transform-beam", { scaleX: .1, opacity: .1 }, { scaleX: 1, opacity: 1, ease: "none" }, .08)
          .fromTo(".transform-after", { xPercent: 18, z: -180, rotateY: -10, opacity: .18 }, { xPercent: 0, z: 55, rotateY: 0, opacity: 1, ease: "none" }, .12);
      }

      gsap.utils.toArray<HTMLElement>("[data-transform-item]").forEach((item, index) => {
        gsap.fromTo(item,
          { x: index % 2 ? 42 : -42, opacity: 0 },
          { x: 0, opacity: 1, duration: .72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } },
        );
      });

      gsap.to(".standards-marquee span", { xPercent: -28, ease: "none", scrollTrigger: { trigger: ".standards-v2", start: "top bottom", end: "bottom top", scrub: .6 } });

      gsap.timeline({ scrollTrigger: { trigger: ".contact-v2", start: "top 88%", end: "center 50%", scrub: .85 } })
        .fromTo(".contact-beam", { scaleY: .15, opacity: 0 }, { scaleY: 1, opacity: .75, ease: "none" }, 0)
        .fromTo(".contact-orbit i:nth-child(1)", { scale: .45, opacity: 0 }, { scale: 1, opacity: .32, ease: "none" }, 0)
        .fromTo(".contact-orbit i:nth-child(2)", { scale: .34, opacity: 0 }, { scale: 1, opacity: .2, ease: "none" }, .06)
        .fromTo(".contact-orbit i:nth-child(3)", { scale: .25, opacity: 0 }, { scale: 1, opacity: .12, ease: "none" }, .11)
        .fromTo(".review-form", { y: 60, z: -100, rotateY: -4, opacity: .35 }, { y: 0, z: 0, rotateY: 0, opacity: 1, ease: "none" }, .04);

      gsap.to(".scroll-rail-progress", { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .12 } });
    });

    if (finePointer) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * .13, y: y * .16, duration: .28, ease: "power2.out" });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .55, ease: "elastic.out(1, .45)" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
      });

      document.querySelectorAll<HTMLElement>(".interactive-card").forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          card.style.setProperty("--card-x", `${(x + .5) * 100}%`);
          card.style.setProperty("--card-y", `${(y + .5) * 100}%`);
          gsap.to(card, { rotateY: x * 5.5, rotateX: -y * 4.6, y: -7, scale: 1.008, duration: .35, ease: "power2.out", transformPerspective: 1200 });
        };
        const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, scale: 1, duration: .62, ease: "power3.out" });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });

      if (desktop) {
        const heroObject = document.querySelector<HTMLElement>(".hero-object");
        const onHeroPointer = (event: PointerEvent) => {
          if (!heroObject) return;
          const x = event.clientX / window.innerWidth - .5;
          const y = event.clientY / window.innerHeight - .5;
          gsap.to(heroObject, { rotateY: x * 5.5, rotateX: -y * 4.2, x: x * 18, y: y * 12, duration: .75, ease: "power3.out" });
        };
        window.addEventListener("pointermove", onHeroPointer, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onHeroPointer));
      }
    }

    return () => {
      context.revert();
      lenis.off("scroll", onLenis);
      lenis.destroy();
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}