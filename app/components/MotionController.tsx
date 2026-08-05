"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const activate = (section: HTMLElement) => {
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".35");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        active ? link.setAttribute("aria-current", "location") : link.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activate(visible.target as HTMLElement);
      },
      { rootMargin: "-28% 0px -50% 0px", threshold: [0, .2, .45] },
    );
    sections.forEach((section) => observer.observe(section));

    if (reduced) {
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: .82, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-line]", { yPercent: 110, filter: "blur(14px)", duration: 1.05, stagger: .1 })
        .from("[data-hero-support]", { y: 18, opacity: 0, duration: .65, stagger: .08 }, "-=.45")
        .from(".interface-stack", { y: 70, opacity: 0, duration: .9, stagger: .12 }, "-=.8")
        .from(".interface-fragment", { x: (index) => index % 2 ? 50 : -50, y: 20, opacity: 0, duration: .7, stagger: .08 }, "-=.65");

      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } })
        .to(".interface-fragment", { x: 0, y: 0, rotate: 0, opacity: .12, scale: .75, ease: "none" }, 0)
        .to(".interface-stack-back", { y: 18, opacity: .2, ease: "none" }, 0)
        .to(".interface-stack-mid", { y: 8, opacity: .45, ease: "none" }, 0)
        .to(".interface-stack-front", { y: -18, scale: 1.05, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: 8, opacity: .38, ease: "none" }, 0)
        .to(".grid-plane", { scale: 1.85, yPercent: 14, opacity: .08, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: .75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card, index) => {
        const visual = card.querySelector(".work-visual");
        if (!visual) return;
        gsap.fromTo(visual,
          { xPercent: index % 2 === 0 ? 12 : -12, z: -180, rotateY: index % 2 === 0 ? -8 : 8, scale: .9, opacity: .5 },
          { xPercent: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 88%", end: "center 55%", scrub: .8 } },
        );
        gsap.from(card.querySelectorAll(".screen-grid i"), {
          y: 30,
          opacity: 0,
          stagger: .08,
          duration: .55,
          scrollTrigger: { trigger: card, start: "top 62%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((element, index) => {
        const object = element.querySelector(".service-object");
        if (!object) return;
        gsap.fromTo(object,
          { xPercent: index % 2 === 0 ? 15 : -15, z: -180, rotateY: index % 2 === 0 ? -10 : 10, scale: .9, opacity: .45 },
          { xPercent: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: element, start: "top 88%", end: "center 58%", scrub: .85 } },
        );
      });

      gsap.timeline({ scrollTrigger: { trigger: ".method-section", start: "top 76%", end: "center 42%", scrub: 1 } })
        .fromTo(".method-message", { z: -260, y: 110, opacity: .2 }, { z: -130, y: 0, opacity: .75, ease: "none" }, 0)
        .fromTo(".method-evidence", { z: -200, y: 120, opacity: .2 }, { z: -55, y: 0, opacity: .88, ease: "none" }, .1)
        .fromTo(".method-action", { z: -140, y: 130, opacity: .2 }, { z: 0, y: 0, opacity: 1, ease: "none" }, .2);

      gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card, index) => {
        gsap.from(card, { x: 28, opacity: 0, duration: .7, delay: index * .05, scrollTrigger: { trigger: card, start: "top 84%", once: true } });
      });

      gsap.to(".scroll-rail-progress", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .2 } });

      if (desktop) {
        const heroObject = document.querySelector<HTMLElement>(".hero-object");
        const workVisuals = Array.from(document.querySelectorAll<HTMLElement>(".work-visual"));
        const onDepthPointer = (event: PointerEvent) => {
          const x = event.clientX / window.innerWidth - .5;
          const y = event.clientY / window.innerHeight - .5;
          if (heroObject) gsap.to(heroObject, { rotateY: x * 4.5, rotateX: -y * 3.5, x: x * 10, y: y * 6, duration: .8, ease: "power2.out" });
          workVisuals.forEach((visual) => {
            const rect = visual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              gsap.to(visual, { rotateY: x * 2.2, rotateX: -y * 1.6, duration: .9, ease: "power2.out" });
            }
          });
        };
        window.addEventListener("pointermove", onDepthPointer, { passive: true });
        return () => window.removeEventListener("pointermove", onDepthPointer);
      }
    });

    return () => {
      context.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}
