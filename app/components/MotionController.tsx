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
      { rootMargin: "-30% 0px -48% 0px", threshold: [0, .2, .45] },
    );
    sections.forEach((section) => observer.observe(section));

    if (reduced) {
      return () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
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
        .from("[data-hero-line]", { yPercent: 110, filter: "blur(16px)", duration: 1.2, stagger: .12 })
        .from("[data-hero-support]", { y: 22, opacity: 0, duration: .75, stagger: .1 }, "-=.55")
        .from(".hero-object", { z: -320, rotateX: 12, opacity: 0, duration: 1.35 }, "-=1");

      gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
      })
        .to(".hero-copy", { yPercent: 18, scale: .88, opacity: .12, ease: "none" }, 0)
        .to(".hero-object", { z: 430, yPercent: -5, rotateX: 8, scale: 1.22, opacity: .08, ease: "none" }, 0)
        .to(".grid-plane", { scale: 2.1, yPercent: 22, opacity: .08, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 44,
          opacity: 0,
          duration: .9,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((element, index) => {
        const object = element.querySelector(".service-object");
        if (!object) return;
        gsap.fromTo(object,
          { xPercent: index % 2 === 0 ? 22 : -22, z: -280, rotateY: index % 2 === 0 ? -16 : 16, scale: .82, opacity: .25 },
          {
            xPercent: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, ease: "none",
            scrollTrigger: { trigger: element, start: "top 85%", end: "center 55%", scrub: 1 },
          },
        );
        gsap.to(object, {
          z: 180, scale: 1.08, opacity: .32, ease: "none",
          scrollTrigger: { trigger: element, start: "center 35%", end: "bottom top", scrub: 1 },
        });
      });

      gsap.fromTo(".method-flow", { z: -260, rotateX: 12, scale: .84 }, {
        z: 0, rotateX: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: ".method-section", start: "top 86%", end: "center 52%", scrub: 1 },
      });
      gsap.to(".method-line span", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: ".method-flow", start: "top 72%", end: "center 48%", scrub: .8 },
      });
      gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 70,
          z: -120,
          rotateX: 8,
          opacity: 0,
          duration: .9,
          delay: index * .08,
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".ring i").forEach((ring, index) => {
        gsap.to(ring, {
          rotate: index % 2 === 0 ? 360 : -360,
          duration: 14 + index * 3,
          repeat: -1,
          ease: "none",
        });
      });
      gsap.fromTo(".continuity-rings", { scale: .78, z: -220, opacity: .2 }, {
        scale: 1, z: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".continuity-section", start: "top 85%", end: "center 52%", scrub: 1 },
      });

      gsap.fromTo(".engagement-grid", { scale: .86, z: -220, rotateX: 9 }, {
        scale: 1, z: 0, rotateX: 0, ease: "none",
        scrollTrigger: { trigger: ".engagements", start: "top 86%", end: "center 55%", scrub: 1 },
      });

      gsap.to(".scroll-rail-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .2 },
      });

      if (desktop) {
        const object = document.querySelector<HTMLElement>(".hero-object");
        const onHeroPointer = (event: PointerEvent) => {
          if (!object) return;
          const x = event.clientX / window.innerWidth - .5;
          const y = event.clientY / window.innerHeight - .5;
          gsap.to(object, { rotateY: x * 7, rotateX: -y * 5, x: x * 18, y: y * 10, duration: .8, ease: "power2.out" });
        };
        window.addEventListener("pointermove", onHeroPointer, { passive: true });
        return () => window.removeEventListener("pointermove", onHeroPointer);
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
