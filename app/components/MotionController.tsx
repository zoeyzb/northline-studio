"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const compact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    const root = document.documentElement;
    const cursorLight = document.querySelector<HTMLElement>(".cursor-light");

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
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
    const lenis = new Lenis({ duration: compact ? 0.85 : 1.12, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-line]", { yPercent: 112, filter: "blur(18px)", duration: 1.25, stagger: 0.14 })
        .from("[data-hero-support]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.11 }, "-=0.55")
        .from(".review-console", { y: 100, z: -220, rotateX: 72, opacity: 0, duration: 1.25 }, "-=0.95");

      if (!compact) {
        gsap.to(".hero-copy", {
          yPercent: -8,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "55% top", scrub: 0.7 },
        });
        gsap.fromTo(".review-console",
          { transformOrigin: "50% 20%" },
          {
            yPercent: 34,
            scale: 1.32,
            rotateX: 22,
            rotateZ: 0,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "18% top", end: "bottom top", scrub: 0.8 },
          },
        );
        gsap.to(".grid-plane", {
          scale: 2.15,
          yPercent: 20,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 },
        });
      }

      gsap.to(".hero-content", {
        yPercent: compact ? 5 : 15,
        scale: compact ? 0.98 : 0.9,
        opacity: 0.15,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "62% 55%", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("section[data-scene]").forEach((section, index) => {
        if (section.classList.contains("hero")) return;
        gsap.fromTo(section,
          { y: compact ? 36 : 90, scale: compact ? 0.985 : 0.94, opacity: 0.72 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: compact ? "top 68%" : "top 34%",
              scrub: 0.65,
            },
          },
        );
        if (!compact && index % 2 === 0) {
          gsap.fromTo(section,
            { transformOrigin: "50% 30%" },
            {
              z: 0,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "top 15%", scrub: true },
            },
          );
        }
      });

      gsap.to(".scroll-rail-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 0.2 },
      });

      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((element, index) => {
        ScrollTrigger.create({ trigger: element, start: "top 68%", end: "bottom 32%", toggleClass: "is-active" });
        if (!compact) {
          gsap.fromTo(element.querySelector(".service-visual"),
            { xPercent: index % 2 ? -12 : 12, rotateY: index % 2 ? 8 : -8, scale: 0.9 },
            {
              xPercent: 0,
              rotateY: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: element, start: "top 90%", end: "center 52%", scrub: 0.65 },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLElement>(".work-list article").forEach((element, index) => {
        ScrollTrigger.create({ trigger: element, start: "top 72%", end: "bottom 28%", toggleClass: "is-active" });
        const windowElement = element.querySelector(".work-window");
        if (windowElement) {
          gsap.fromTo(windowElement,
            {
              rotateY: compact ? 0 : index % 2 ? 10 : -10,
              rotateX: compact ? 0 : 8,
              scale: compact ? 0.98 : 0.82,
              z: compact ? 0 : -180,
              opacity: 0.55,
            },
            {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              z: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: element, start: "top 92%", end: "center 48%", scrub: 0.75 },
            },
          );
          if (!compact) {
            gsap.to(windowElement, {
              scale: 1.12,
              yPercent: -5,
              ease: "none",
              scrollTrigger: { trigger: element, start: "center 54%", end: "bottom 18%", scrub: 0.6 },
            });
          }
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 46,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.95,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
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
