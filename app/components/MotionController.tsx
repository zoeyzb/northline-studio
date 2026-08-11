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

    root.classList.add("motion-ready");

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-flow-card], [data-showcase], [data-transform-item]"));
    revealElements.forEach((element) => element.classList.add("motion-pending"));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add("is-inview");
        element.classList.remove("motion-pending");
        revealObserver.unobserve(element);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: .08 });
    revealElements.forEach((element) => revealObserver.observe(element));
    cleanups.push(() => revealObserver.disconnect());

    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-x", String(event.clientX / window.innerWidth - .5));
      root.style.setProperty("--pointer-y", String(event.clientY / window.innerHeight - .5));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const sceneObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const section = visible.target as HTMLElement;
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".62");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-26% 0px -48% 0px", threshold: [0, .15, .35] });
    sections.forEach((section) => sceneObserver.observe(section));
    cleanups.push(() => sceneObserver.disconnect());

    if (reduced) {
      root.classList.add("motion-reduced");
      revealElements.forEach((element) => {
        element.classList.remove("motion-pending");
        element.classList.add("is-inview");
      });
      return () => {
        root.classList.remove("motion-ready", "motion-reduced");
        cleanups.forEach((cleanup) => cleanup());
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    const lenis = new Lenis({ duration: .92, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1 });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", { y: -18, opacity: 0, duration: .6 })
        .from("[data-hero-line]", { yPercent: 105, rotateX: -12, opacity: 0, duration: .9, stagger: .1 }, "-=.25")
        .from("[data-hero-support]", { y: 22, opacity: 0, duration: .5, stagger: .06 }, "-=.45")
        .from(".hero-screen", { y: 80, z: -160, rotateX: 12, opacity: 0, duration: .8, stagger: .09 }, "-=.55")
        .from(".hero-fragment", { x: (index) => index % 2 ? 48 : -48, scale: .8, opacity: 0, duration: .55, stagger: .04 }, "-=.5");

      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .65 } })
        .to(".hero-copy", { yPercent: 9, scale: .97, opacity: .38, ease: "none" }, 0)
        .to(".hero-object", { yPercent: -8, z: 105, rotateY: -5, ease: "none" }, 0)
        .to(".screen-front", { y: -48, z: 105, rotateX: 31, ease: "none" }, 0)
        .to(".screen-mid", { y: 16, z: -105, opacity: .5, ease: "none" }, 0)
        .to(".screen-back", { y: 34, z: -230, opacity: .15, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { y: 32, opacity: .25 },
          { y: 0, opacity: 1, duration: .72, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.fromTo(element,
          { yPercent: index % 2 ? 4 : -3 },
          { yPercent: index % 2 ? -5 : 6, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: .55 } },
        );
      });

      const flowCards = gsap.utils.toArray<HTMLElement>("[data-flow-card]");
      flowCards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(card,
          { x: direction * 54, y: 72 + index * 10, z: -130 - index * 28, rotateY: direction * 8, rotateX: 5, scale: .92, opacity: .18 },
          { x: 0, y: desktop ? index * 18 : 0, z: desktop ? index * 18 : 0, rotateY: desktop ? direction * 1.5 : 0, rotateX: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 96%", end: "center 64%", scrub: .55, invalidateOnRefresh: true } },
        );
      });

      gsap.to(".flow-backdrop i:nth-child(1)", { xPercent: 13, yPercent: -12, rotate: 28, ease: "none", scrollTrigger: { trigger: ".flow-section", start: "top bottom", end: "bottom top", scrub: .7 } });
      gsap.to(".flow-backdrop i:nth-child(2)", { xPercent: -16, yPercent: 12, rotate: -32, ease: "none", scrollTrigger: { trigger: ".flow-section", start: "top bottom", end: "bottom top", scrub: .7 } });

      gsap.utils.toArray<HTMLElement>("[data-showcase]").forEach((showcase, index) => {
        const copy = showcase.querySelector<HTMLElement>(".showcase-copy");
        const scene = showcase.querySelector<HTMLElement>(".showcase-scene");
        const back = showcase.querySelector<HTMLElement>(".scene-window-back");
        const mid = showcase.querySelector<HTMLElement>(".scene-window-mid");
        const front = showcase.querySelector<HTMLElement>(".scene-window-front");
        const direction = index % 2 === 0 ? 1 : -1;
        const timeline = gsap.timeline({ scrollTrigger: { trigger: showcase, start: "top 94%", end: "center 56%", scrub: .65, invalidateOnRefresh: true } });
        if (copy) timeline.fromTo(copy, { x: direction * -48, opacity: .2 }, { x: 0, opacity: 1, ease: "none" }, 0);
        if (scene) timeline.fromTo(scene, { x: direction * 72, z: -130, rotateY: direction * -9, scale: .94, opacity: .24 }, { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none" }, 0);
        if (back) timeline.fromTo(back, { y: 52, z: -210 }, { y: 28, z: -125, ease: "none" }, .05);
        if (mid) timeline.fromTo(mid, { y: 32, z: -125 }, { y: 12, z: -55, ease: "none" }, .08);
        if (front) timeline.fromTo(front, { y: 24, z: -50, scale: .97 }, { y: -3, z: 26, scale: 1, ease: "none" }, .1);
        timeline.fromTo(showcase.querySelectorAll(".scene-chip"), { scale: .55, opacity: 0 }, { scale: 1, opacity: 1, stagger: .06, ease: "back.out(1.5)" }, .34);
      });

      const transformStage = document.querySelector<HTMLElement>("[data-transform-stage]");
      if (transformStage) {
        gsap.timeline({ scrollTrigger: { trigger: transformStage, start: "top 86%", end: "bottom 42%", scrub: .65 } })
          .fromTo(".transform-before", { xPercent: 0, z: 10, opacity: 1 }, { xPercent: -12, z: -110, rotateY: 6, opacity: .25, ease: "none" }, 0)
          .fromTo(".transform-beam", { scaleX: .08, opacity: .1 }, { scaleX: 1, opacity: .9, ease: "none" }, .06)
          .fromTo(".transform-after", { xPercent: 13, z: -110, rotateY: -7, opacity: .2 }, { xPercent: 0, z: 32, rotateY: 0, opacity: 1, ease: "none" }, .1);
      }

      gsap.utils.toArray<HTMLElement>("[data-transform-item]").forEach((item, index) => {
        gsap.fromTo(item,
          { x: index % 2 ? 34 : -34, opacity: .15 },
          { x: 0, opacity: 1, duration: .65, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 92%", once: true } },
        );
      });

      gsap.to(".standards-marquee span", { xPercent: -22, ease: "none", scrollTrigger: { trigger: ".standards-v2", start: "top bottom", end: "bottom top", scrub: .45 } });

      gsap.timeline({ scrollTrigger: { trigger: ".contact-v2", start: "top 92%", end: "center 56%", scrub: .6 } })
        .fromTo(".contact-beam", { scaleY: .2, opacity: 0 }, { scaleY: 1, opacity: .55, ease: "none" }, 0)
        .fromTo(".contact-orbit i", { scale: .55, opacity: 0 }, { scale: 1, opacity: .2, stagger: .05, ease: "none" }, .04)
        .fromTo(".review-form", { y: 44, z: -60, opacity: .35 }, { y: 0, z: 0, opacity: 1, ease: "none" }, .05);

      gsap.to(".scroll-rail-progress", { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .1 } });
    });

    if (finePointer) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .1, y: (event.clientY - rect.top - rect.height / 2) * .12, duration: .22, ease: "power2.out" });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .45, ease: "power3.out" });
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
          gsap.to(card, { rotateY: x * 4.5, rotateX: -y * 3.8, y: -5, scale: 1.006, duration: .26, ease: "power2.out", transformPerspective: 1200 });
        };
        const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, scale: 1, duration: .48, ease: "power3.out" });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });
    }

    const refresh = () => ScrollTrigger.refresh(true);
    const refreshTimer = window.setTimeout(refresh, 250);
    const secondRefreshTimer = window.setTimeout(refresh, 900);
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh, { passive: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);
    cleanups.push(() => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(secondRefreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    });

    return () => {
      context.revert();
      lenis.off("scroll", onLenis);
      lenis.destroy();
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      root.classList.remove("motion-ready", "motion-reduced");
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}
