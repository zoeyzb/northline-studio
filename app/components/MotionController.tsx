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

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealElements.forEach((element) => element.classList.add("motion-pending"));
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.add("is-inview");
        element.classList.remove("motion-pending");
        revealObserver.unobserve(element);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
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
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const section = visible.target as HTMLElement;
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".7");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
    }, { rootMargin: "-32% 0px -38% 0px", threshold: [0, .15, .35, .6] });
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

    const lenis = new Lenis({ duration: 1.02, smoothWheel: true, wheelMultiplier: .88, touchMultiplier: 1 });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".rr-nav", { y: -20, opacity: 0, duration: .65 })
        .from("[data-hero-line]", { yPercent: 115, rotateX: -14, opacity: 0, filter: "blur(8px)", duration: .95, stagger: .12 }, "-=.28")
        .from("[data-hero-support]", { y: 24, opacity: 0, duration: .55, stagger: .08 }, "-=.5")
        .from("[data-hero-preview]", { y: 80, z: -180, rotateX: 11, rotateY: -8, opacity: 0, scale: .94, duration: 1 }, "-=.62")
        .from(".nl-preview-float", { y: 22, scale: .78, opacity: 0, stagger: .08, duration: .5 }, "-=.4");

      gsap.timeline({ scrollTrigger: { trigger: ".rr-hero", start: "top top", end: "bottom top", scrub: .7 } })
        .to(".rr-hero-copy", { yPercent: 10, scale: .965, opacity: .42, ease: "none" }, 0)
        .to("[data-hero-preview]", { yPercent: -8, z: 120, rotateY: 5, scale: 1.035, ease: "none" }, 0)
        .to(".nl-preview-shell", { rotateX: 2.5, rotateY: -3.5, ease: "none" }, 0)
        .to(".nl-preview-float.float-one", { x: -36, y: -24, ease: "none" }, 0)
        .to(".nl-preview-float.float-two", { x: 32, y: -10, ease: "none" }, 0)
        .to(".nl-preview-float.float-three", { x: -18, y: 32, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        const variant = index % 3;
        const fromVars = variant === 0
          ? { y: 38, opacity: .14, filter: "blur(9px)" }
          : variant === 1
            ? { x: -28, opacity: .14, filter: "blur(5px)" }
            : { y: 24, z: -55, opacity: .14, filter: "blur(7px)" };
        gsap.fromTo(element, fromVars, {
          x: 0, y: 0, z: 0, opacity: 1, filter: "blur(0px)", duration: .78, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
        gsap.fromTo(element,
          { yPercent: index % 2 ? 5 : -3 },
          { yPercent: index % 2 ? -6 : 6, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: .62 } },
        );
      });

      const storyStage = document.querySelector<HTMLElement>(".rr-story-stage");
      if (storyStage) {
        const cards = gsap.utils.toArray<HTMLElement>(".rr-story-stage [data-box-motion]");
        const ladderY = [-18, 26, -6, 34];
        const ladderZ = [28, 64, 46, 86];
        const storyTimeline = gsap.timeline({
          scrollTrigger: { trigger: storyStage, start: "top 88%", end: "bottom 38%", scrub: .72, invalidateOnRefresh: true },
        });
        cards.forEach((card, index) => {
          const side = index % 2 ? 1 : -1;
          storyTimeline.fromTo(card,
            { x: side * 84, y: 96 + index * 12, z: -210 - index * 36, rotateY: side * 12, rotateX: 10, opacity: .05, scale: .88 },
            { x: 0, y: desktop ? ladderY[index] : 0, z: desktop ? ladderZ[index] : 0, rotateY: desktop ? side * 2 : 0, rotateX: 0, opacity: 1, scale: 1, ease: "power2.out" },
            index * .1,
          );
          storyTimeline.to(card, { opacity: 1, onStart: () => card.classList.add("box-entered") }, index * .1 + .2);
        });
        gsap.to(".rr-story-orbit", { rotateZ: 260, scale: 1.2, ease: "none", scrollTrigger: { trigger: storyStage, start: "top bottom", end: "bottom top", scrub: .8 } });
      }

      const capabilityGrid = document.querySelector<HTMLElement>(".rr-capability-grid");
      if (capabilityGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(".rr-capability-grid [data-box-motion]");
        gsap.fromTo(cards,
          { y: 72, z: -145, rotateX: 11, opacity: .05, scale: .94, transformOrigin: "50% 100%" },
          {
            y: 0, z: 0, rotateX: 0, opacity: 1, scale: 1, duration: .95, stagger: .09, ease: "power3.out",
            scrollTrigger: { trigger: capabilityGrid, start: "top 84%", once: true },
            onComplete: () => cards.forEach((card) => card.classList.add("box-entered")),
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".rr-process li").forEach((item, index) => {
        gsap.fromTo(item,
          { x: index % 2 ? 42 : -42, opacity: .14, rotateX: -7, transformOrigin: "top center" },
          { x: 0, opacity: 1, rotateX: 0, duration: .72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 90%", once: true } },
        );
      });
      gsap.to(".rr-process-copy", { y: desktop ? 60 : 0, ease: "none", scrollTrigger: { trigger: ".rr-process", start: "top bottom", end: "bottom top", scrub: .8 } });

      const serviceGrid = document.querySelector<HTMLElement>(".rr-service-cards");
      if (serviceGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(".rr-service-cards [data-box-motion]");
        cards.forEach((card, index) => {
          const side = index === 0 ? -1 : index === 2 ? 1 : 0;
          gsap.fromTo(card,
            { x: side * 94, y: 86, z: -175 - index * 24, rotateY: side * 12, rotateX: 7, opacity: .04, scale: .9 },
            {
              x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0, opacity: 1, scale: 1, ease: "power2.out",
              scrollTrigger: { trigger: serviceGrid, start: "top 86%", end: "center 56%", scrub: .66 },
              onComplete: () => card.classList.add("box-entered"),
            },
          );
        });
      }

      const proofGrid = document.querySelector<HTMLElement>(".rr-proof-cards");
      if (proofGrid) {
        const cards = gsap.utils.toArray<HTMLElement>(".rr-proof-cards [data-box-motion]");
        gsap.fromTo(cards,
          { x: (index) => index % 2 ? 44 : -44, y: 54, z: -105, rotateX: 9, opacity: .05 },
          {
            x: 0, y: 0, z: 0, rotateX: 0, opacity: 1, duration: .82, stagger: .1, ease: "power3.out",
            scrollTrigger: { trigger: proofGrid, start: "top 86%", once: true },
            onComplete: () => cards.forEach((card) => card.classList.add("box-entered")),
          },
        );
      }

      gsap.timeline({ scrollTrigger: { trigger: ".rr-closing", start: "top 90%", end: "center 52%", scrub: .65 } })
        .fromTo(".rr-closing-copy", { x: -58, opacity: .16 }, { x: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(".review-form", { x: 72, y: 42, z: -100, rotateY: -7, opacity: .16 }, { x: 0, y: 0, z: 0, rotateY: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(".rr-closing-orbit i", { scale: .5, opacity: 0 }, { scale: 1, opacity: .22, stagger: .06, ease: "none" }, .08);
    });

    if (finePointer) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .14, duration: .22, ease: "power2.out" });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .5, ease: "power3.out" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-box-motion]").forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = (event.clientY - rect.top) / rect.height;
          card.style.setProperty("--box-x", `${nx * 100}%`);
          card.style.setProperty("--box-y", `${ny * 100}%`);
          card.style.setProperty("--content-x", `${(nx - .5) * 8}px`);
          card.style.setProperty("--content-y", `${(ny - .5) * 7}px`);
        };
        const leave = () => {
          card.style.setProperty("--box-x", "50%");
          card.style.setProperty("--box-y", "50%");
          card.style.setProperty("--content-x", "0px");
          card.style.setProperty("--content-y", "0px");
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>(".interactive-card:not([data-box-motion])").forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          card.style.setProperty("--card-x", `${(x + .5) * 100}%`);
          card.style.setProperty("--card-y", `${(y + .5) * 100}%`);
          gsap.to(card, { rotateY: x * 4.5, rotateX: -y * 3.6, y: -5, scale: 1.006, duration: .24, ease: "power2.out", transformPerspective: 1300 });
        };
        const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, scale: 1, duration: .5, ease: "power3.out" });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
    }

    const refresh = () => ScrollTrigger.refresh(true);
    const timers = [window.setTimeout(refresh, 180), window.setTimeout(refresh, 700), window.setTimeout(refresh, 1500)];
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh, { passive: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);
    cleanups.push(() => {
      timers.forEach((timer) => window.clearTimeout(timer));
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
