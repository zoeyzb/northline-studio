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
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".55");
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -50% 0px", threshold: [0, .2, .45] });
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());

    if (reduced) return () => cleanups.forEach((cleanup) => cleanup());

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: .92, smoothWheel: true, wheelMultiplier: .88, touchMultiplier: 1.05 });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", { y: -18, opacity: 0, duration: .65 })
        .from("[data-hero-line]", { yPercent: 112, rotateX: -14, filter: "blur(12px)", duration: .95, stagger: .1 }, "-=.3")
        .from("[data-hero-support]", { y: 20, opacity: 0, filter: "blur(6px)", duration: .58, stagger: .07 }, "-=.5")
        .from(".hero-screen", { y: 85, z: -180, rotateX: 14, opacity: 0, duration: .9, stagger: .1 }, "-=.7")
        .from(".hero-fragment", { scale: .72, opacity: 0, duration: .6, stagger: .05 }, "-=.55");

      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .9 } })
        .to(".hero-copy", { yPercent: 12, scale: .96, opacity: .28, ease: "none" }, 0)
        .to(".hero-object", { yPercent: -8, z: 90, rotateY: -5, ease: "none" }, 0)
        .to(".screen-front", { y: -52, z: 105, rotateX: 34, ease: "none" }, 0)
        .to(".screen-mid", { y: 12, z: -130, opacity: .5, ease: "none" }, 0)
        .to(".screen-back", { y: 36, z: -300, opacity: .16, ease: "none" }, 0)
        .to(".hero-grid", { yPercent: 18, scale: 1.25, opacity: .08, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { y: 34, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: .78, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.fromTo(element,
          { yPercent: index % 2 ? 5 : -3 },
          { yPercent: index % 2 ? -5 : 5, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: .9 } },
        );
      });

      const systemVisual = document.querySelector<HTMLElement>(".system-visual");
      if (systemVisual) {
        gsap.timeline({ scrollTrigger: { trigger: ".system-section", start: "top 74%", end: "bottom 30%", scrub: .8 } })
          .fromTo(".system-layer-back", { x: -70, y: 45, z: -180, rotateY: 12, opacity: .2 }, { x: -22, y: 0, z: -100, rotateY: 7, opacity: .55, ease: "none" }, 0)
          .fromTo(".system-layer-mid", { x: 72, y: -28, z: -110, rotateY: -12, opacity: .3 }, { x: 18, y: 0, z: -35, rotateY: -5, opacity: .8, ease: "none" }, 0)
          .fromTo(".system-layer-front", { y: 65, z: -40, scale: .9, opacity: .45 }, { y: 0, z: 45, scale: 1, opacity: 1, ease: "none" }, .05)
          .to(".system-halo", { scale: 1.12, opacity: .9, ease: "none" }, .08);
      }

      gsap.utils.toArray<HTMLElement>("[data-story-step]").forEach((step, index) => {
        gsap.fromTo(step,
          { x: index % 2 ? 30 : -30, opacity: .2, scale: .98 },
          { x: 0, opacity: 1, scale: 1, duration: .65, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 86%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, index) => {
        const visual = card.querySelector<HTMLElement>(".service-visual");
        gsap.fromTo(card,
          { y: 45, opacity: .35, scale: .97 },
          { y: 0, opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 94%", end: "center 60%", scrub: .75 } },
        );
        if (visual) {
          gsap.fromTo(visual,
            { xPercent: index % 2 ? -8 : 8, z: -120, rotateY: index % 2 ? 6 : -6 },
            { xPercent: 0, z: 0, rotateY: 0, ease: "none", scrollTrigger: { trigger: card, start: "top 92%", end: "bottom 32%", scrub: .85 } },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-proof-card]").forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, rotateX: 4, opacity: .3 },
          { y: 0, rotateX: 0, opacity: 1, duration: .7, ease: "power3.out", delay: index * .03, scrollTrigger: { trigger: card, start: "top 88%", once: true } },
        );
      });

      gsap.timeline({ scrollTrigger: { trigger: ".contact-section", start: "top 85%", end: "center 54%", scrub: .7 } })
        .fromTo(".contact-orbit i:nth-child(1)", { scale: .55, opacity: 0 }, { scale: 1, opacity: .28, ease: "none" }, 0)
        .fromTo(".contact-orbit i:nth-child(2)", { scale: .4, opacity: 0 }, { scale: 1, opacity: .18, ease: "none" }, .05)
        .fromTo(".contact-orbit i:nth-child(3)", { scale: .3, opacity: 0 }, { scale: 1, opacity: .1, ease: "none" }, .1);

      gsap.to(".scroll-rail-progress", { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .15 } });
    });

    if (finePointer) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * .12, y: y * .14, duration: .28, ease: "power2.out" });
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
          gsap.to(card, { rotateY: x * 3.5, rotateX: -y * 3, y: -4, duration: .35, ease: "power2.out", transformPerspective: 1000 });
        };
        const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: .6, ease: "power3.out" });
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
          gsap.to(heroObject, { rotateY: x * 4.5, rotateX: -y * 3.5, x: x * 12, y: y * 8, duration: .7, ease: "power3.out" });
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
