"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    const cursorLight = document.querySelector<HTMLElement>(".cursor-light");
    const onPointerMove = (event: PointerEvent) => {
      if (!cursorLight || !precisePointer) return;
      cursorLight.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorLight.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const sceneSections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const activateScene = (section: HTMLElement) => {
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".2");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activateScene(visible.target as HTMLElement);
      },
      { rootMargin: "-32% 0px -48% 0px", threshold: [0, 0.2, 0.5] },
    );
    sceneSections.forEach((section) => sceneObserver.observe(section));

    if (reduced) {
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        sceneObserver.disconnect();
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-line]", { yPercent: 105, filter: "blur(14px)", duration: 1.15, stagger: 0.12 })
        .from("[data-hero-support]", { y: 22, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.5")
        .from(".review-console", { x: 50, rotateY: -8, opacity: 0, duration: 1 }, "-=0.85");

      gsap.to(".hero-content", {
        yPercent: 12,
        scale: 0.94,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "65% 55%", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".services-section .shell",
        { y: 100, scale: 0.94, transformPerspective: 1100 },
        { y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".services-section", start: "top bottom", end: "top 24%", scrub: true } },
      );
      gsap.to(".scroll-rail-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 0.2 },
      });
      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 68%",
          end: "bottom 32%",
          toggleClass: "is-active",
        });
      });
      gsap.utils.toArray<HTMLElement>(".work-list article").forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 72%",
          end: "bottom 28%",
          toggleClass: "is-active",
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".work-window").forEach((element) => {
        gsap.fromTo(element, { rotateY: -7, scale: 0.94 }, {
          rotateY: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top 88%", end: "center 56%", scrub: true },
        });
      });
      gsap.fromTo(".scene-bridge span", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "45% top", end: "bottom top", scrub: true },
      });
    });

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
      window.removeEventListener("pointermove", onPointerMove);
      sceneObserver.disconnect();
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}
