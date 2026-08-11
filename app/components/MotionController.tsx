"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const desktop = window.matchMedia("(min-width:961px)").matches;
    const cleanups: Array<() => void> = [];

    root.classList.add("motion-ready");

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealElements.forEach((el) => el.classList.add("motion-pending"));

    const sceneSections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const sceneObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const section = visible.target as HTMLElement;
      const scene = section.dataset.scene ?? "hero";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? "1");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
    }, { rootMargin: "-28% 0px -36% 0px", threshold: [0, .15, .35, .6] });
    sceneSections.forEach((section) => sceneObserver.observe(section));
    cleanups.push(() => sceneObserver.disconnect());

    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-x", String(event.clientX / window.innerWidth - .5));
      root.style.setProperty("--pointer-y", String(event.clientY / window.innerHeight - .5));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointer));

    if (reduced) {
      root.classList.add("motion-reduced");
      revealElements.forEach((el) => {
        el.classList.remove("motion-pending");
        el.style.opacity = "1";
      });
      return () => {
        root.classList.remove("motion-ready", "motion-reduced");
        cleanups.forEach((cleanup) => cleanup());
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1 });
    const onLenis = () => ScrollTrigger.update();
    lenis.on("scroll", onLenis);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* HERO — typography foreground, object in depth, slow push through scene */
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".nlx-nav", { y: -24, opacity: 0, duration: .7 })
        .from("[data-hero-line]", { yPercent: 120, rotateX: -18, z: -80, opacity: 0, filter: "blur(10px)", duration: 1.05, stagger: .13 }, "-=.3")
        .from("[data-hero-support]", { y: 24, opacity: 0, filter: "blur(5px)", duration: .58, stagger: .08 }, "-=.56")
        .from("[data-hero-object]", { y: 100, z: -300, rotateX: 14, rotateY: -10, scale: .86, opacity: 0, duration: 1.15 }, "-=.62")
        .from(".nlx-float-chip", { scale: .65, z: -100, opacity: 0, stagger: .09, duration: .52 }, "-=.44");

      gsap.timeline({ scrollTrigger: { trigger: ".nlx-hero", start: "top top", end: "bottom top", scrub: .72 } })
        .to(".nlx-hero-copy", { yPercent: 15, z: -80, opacity: .24, scale: .95, ease: "none" }, 0)
        .to("[data-hero-object]", { yPercent: -10, z: 220, rotateY: 7, scale: 1.08, ease: "none" }, 0)
        .to(".plane-front", { z: 160, rotateX: 24, ease: "none" }, 0)
        .to(".plane-mid", { z: 20, y: -22, ease: "none" }, 0)
        .to(".plane-back", { z: -90, y: -55, ease: "none" }, 0)
        .to(".orbit-a", { rotateZ: 72, scale: 1.16, ease: "none" }, 0)
        .to(".orbit-b", { rotateZ: -58, scale: .9, ease: "none" }, 0);

      /* generic section copy — mask/blur, never a random generic card transform */
      revealElements.forEach((element) => {
        gsap.fromTo(element,
          { y: 46, opacity: .06, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: .9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 87%", once: true } },
        );
      });

      /* SERVICES — three cards physically occupy different Z depths and camera appears to pass them */
      const serviceCards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
      const serviceStarts = [
        { x: -230, y: 120, z: -420, rotateY: 18, rotateX: 10 },
        { x: 20, y: -20, z: -620, rotateY: -5, rotateX: -4 },
        { x: 240, y: 160, z: -340, rotateY: -18, rotateX: 9 },
      ];
      serviceCards.forEach((card, index) => {
        const start = serviceStarts[index];
        gsap.fromTo(card,
          { ...start, opacity: .03, scale: .82 },
          {
            x: desktop ? (index - 1) * 12 : 0,
            y: desktop ? [28, -22, 42][index] : 0,
            z: desktop ? [80, 20, 120][index] : 0,
            rotateY: desktop ? [4, -2, -5][index] : 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: ".nlx-service-space", start: "top 92%", end: "center 45%", scrub: .7, invalidateOnRefresh: true },
          },
        );
      });
      gsap.timeline({ scrollTrigger: { trigger: ".nlx-services", start: "center 70%", end: "bottom top", scrub: .78 } })
        .to(serviceCards[0], { x: -210, z: 260, rotateY: 13, opacity: .35, ease: "none" }, 0)
        .to(serviceCards[1], { y: -90, z: 390, scale: 1.08, ease: "none" }, 0)
        .to(serviceCards[2], { x: 220, z: 230, rotateY: -13, opacity: .42, ease: "none" }, 0);

      /* CASE — each step drives the one persistent WebGL object */
      const caseSteps = gsap.utils.toArray<HTMLElement>("[data-case-step]");
      caseSteps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => window.dispatchEvent(new CustomEvent("northline:case-step", { detail: { step: index } })),
          onEnterBack: () => window.dispatchEvent(new CustomEvent("northline:case-step", { detail: { step: index } })),
        });
        gsap.fromTo(step,
          { x: index % 2 ? 65 : -38, z: -90, opacity: .12, filter: "blur(6px)" },
          { x: 0, z: 0, opacity: 1, filter: "blur(0px)", duration: .78, ease: "power3.out", scrollTrigger: { trigger: step, start: "top 82%", once: true } },
        );
      });

      /* TRANSITION — slabs accelerate past the camera and reveal the project behind */
      const shards = gsap.utils.toArray<HTMLElement>(".nlx-transition-shards i");
      const transition = gsap.timeline({ scrollTrigger: { trigger: ".nlx-transition", start: "top bottom", end: "bottom top", scrub: .58 } });
      shards.forEach((shard, index) => {
        const side = index % 2 ? 1 : -1;
        transition.fromTo(shard,
          { z: -900 - index * 150, xPercent: side * (45 + index * 8), yPercent: (index - 2) * 18, rotateY: side * 18, rotateX: 8, opacity: .06, scale: .55 },
          { z: 650 + index * 130, xPercent: side * (10 + index * 6), yPercent: (index - 2) * -9, rotateY: side * -8, rotateX: -3, opacity: index > 2 ? .2 : .45, scale: 1.35, ease: "none" },
          0,
        );
      });
      transition
        .fromTo(".nlx-transition-copy", { scale: .72, z: -260, opacity: .08, filter: "blur(12px)" }, { scale: 1.08, z: 120, opacity: 1, filter: "blur(0px)", ease: "none" }, .05)
        .to(".nlx-transition-copy", { scale: 1.32, opacity: .06, filter: "blur(12px)", ease: "none" }, .62);

      /* PROJECT — browser approaches camera, rotates, reflections move, internal UI unfolds */
      const projectTl = gsap.timeline({ scrollTrigger: { trigger: ".nlx-project", start: "top 78%", end: "bottom 20%", scrub: .7 } });
      projectTl
        .fromTo("[data-device-stage]", { y: 110, z: -280, rotateX: 12, opacity: .08 }, { y: 0, z: 80, rotateX: 0, opacity: 1, ease: "none" }, 0)
        .fromTo("[data-device]", { rotateY: -14, rotateX: 10, scale: .82 }, { rotateY: 5, rotateX: -2, scale: 1.06, ease: "none" }, 0)
        .fromTo(".nlx-device-content h3", { y: 34, z: -60, opacity: .05 }, { y: 0, z: 30, opacity: 1, ease: "none" }, .15)
        .fromTo(".nlx-device-cards span", { y: 50, z: -80, opacity: .05 }, { y: 0, z: 28, opacity: 1, stagger: .05, ease: "none" }, .22)
        .to(".nlx-device-reflection", { xPercent: 18, yPercent: -12, scale: 1.28, opacity: .8, ease: "none" }, 0)
        .to(".label-a", { x: -42, y: -24, z: 80, ease: "none" }, 0)
        .to(".label-b", { x: 36, y: 28, z: 110, ease: "none" }, 0);

      /* CTA — DOM converges while WebGL particles form the mark */
      gsap.timeline({ scrollTrigger: { trigger: ".nlx-cta", start: "top 82%", end: "center 42%", scrub: .66 } })
        .fromTo(".nlx-cta-copy", { x: -70, z: -100, opacity: .08 }, { x: 0, z: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(".review-form", { x: 90, y: 55, z: -180, rotateY: -8, opacity: .08 }, { x: 0, y: 0, z: 0, rotateY: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(".nlx-cta-mark", { scale: 1.8, rotateZ: -18, opacity: 0 }, { scale: 1, rotateZ: 0, opacity: .58, ease: "none" }, 0)
        .fromTo(".nlx-cta-mark span", { scale: .3, rotateY: -90, opacity: 0 }, { scale: 1, rotateY: 0, opacity: 1, ease: "none" }, .18);
    });

    if (fine) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          gsap.to(element, {
            x: (event.clientX - rect.left - rect.width / 2) * .13,
            y: (event.clientY - rect.top - rect.height / 2) * .15,
            duration: .22,
            ease: "power2.out",
          });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .52, ease: "power3.out" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
      });

      document.querySelectorAll<HTMLElement>("[data-service-card]").forEach((card) => {
        const move = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = (event.clientY - rect.top) / rect.height;
          card.style.setProperty("--card-x", `${nx * 100}%`);
          card.style.setProperty("--card-y", `${ny * 100}%`);
          card.style.setProperty("--card-angle", `${nx * 160 + ny * 80}deg`);
          gsap.to(card.querySelectorAll("h3,p,.nlx-tags,a"), { x: (nx - .5) * 9, y: (ny - .5) * 8, z: 24, duration: .28, ease: "power2.out" });
        };
        const leave = () => {
          card.style.setProperty("--card-x", "50%");
          card.style.setProperty("--card-y", "50%");
          gsap.to(card.querySelectorAll("h3,p,.nlx-tags,a"), { x: 0, y: 0, z: 0, duration: .5, ease: "power3.out" });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });

      const device = document.querySelector<HTMLElement>("[data-device]");
      if (device) {
        const move = (event: PointerEvent) => {
          const rect = device.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          gsap.to(device, { rotateY: x * 8, rotateX: -y * 6, duration: .35, ease: "power2.out", overwrite: "auto" });
          gsap.to(".nlx-device-reflection", { xPercent: x * 18, yPercent: y * 14, duration: .4, ease: "power2.out" });
        };
        const leave = () => gsap.to(device, { rotateY: 3, rotateX: -1, duration: .65, ease: "power3.out" });
        device.addEventListener("pointermove", move);
        device.addEventListener("pointerleave", leave);
        cleanups.push(() => { device.removeEventListener("pointermove", move); device.removeEventListener("pointerleave", leave); });
      }
    }

    const refresh = () => ScrollTrigger.refresh(true);
    const timers = [180, 700, 1400].map((delay) => window.setTimeout(refresh, delay));
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh, { passive: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);
    cleanups.push(() => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    });

    return () => {
      ctx.revert();
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
