"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

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
        .from(".credibility-panel", { x: 50, rotateY: -8, opacity: 0, duration: 1 }, "-=0.85");

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
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    });

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}
