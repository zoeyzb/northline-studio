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
    const cleanups: Array<() => void> = [];

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-x", `${event.clientX / window.innerWidth - 0.5}`);
      root.style.setProperty("--pointer-y", `${event.clientY / window.innerHeight - 0.5}`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));

    const updateProgress = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--page-progress", `${Math.min(Math.max(window.scrollY / max, 0), 1)}`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", updateProgress));

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const activate = (section: HTMLElement) => {
      const scene = section.dataset.scene ?? "overview";
      root.dataset.activeScene = scene;
      root.style.setProperty("--scene-opacity", section.dataset.sceneStrength ?? ".35");
      window.dispatchEvent(new CustomEvent("northline:scene", { detail: { scene } }));
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === section.id;
        link.classList.toggle("is-current", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activate(visible.target as HTMLElement);
      },
      { rootMargin: "-28% 0px -50% 0px", threshold: [0, .2, .45] },
    );
    sections.forEach((section) => observer.observe(section));
    cleanups.push(() => observer.disconnect());

    if (reduced) {
      root.dataset.motion = "reduced";
      return () => cleanups.forEach((cleanup) => cleanup());
    }

    root.dataset.motion = "full";
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: .9, smoothWheel: true, wheelMultiplier: .92 });
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    cleanups.push(() => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    });

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-header", { y: -24, opacity: 0, duration: .72 })
        .from("[data-hero-line]", { yPercent: 115, filter: "blur(16px)", duration: 1.08, stagger: .11 }, "-=.38")
        .from("[data-hero-support]", { y: 22, opacity: 0, duration: .68, stagger: .075 }, "-=.5")
        .from(".interface-stack", { y: 86, z: -220, opacity: 0, duration: 1, stagger: .12 }, "-=.82")
        .from(".interface-fragment", {
          x: (index) => index % 2 ? 70 : -70,
          y: 28,
          rotate: (index) => index % 2 ? 8 : -8,
          opacity: 0,
          duration: .78,
          stagger: .09,
        }, "-=.68")
        .from(".hero-caption span, .hero-caption i", { y: 12, opacity: 0, stagger: .055, duration: .45 }, "-=.25");

      gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      })
        .to(".interface-fragment", { x: 0, y: 0, rotate: 0, opacity: .08, scale: .62, ease: "none" }, 0)
        .to(".interface-stack-back", { y: 32, z: -250, opacity: .12, scale: .82, ease: "none" }, 0)
        .to(".interface-stack-mid", { y: 14, z: -110, opacity: .34, scale: .9, ease: "none" }, 0)
        .to(".interface-stack-front", { y: -34, z: 90, scale: 1.11, rotateX: 42, ease: "none" }, 0)
        .to(".hero-object", { scale: 1.08, yPercent: -4, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: 13, opacity: .28, filter: "blur(2px)", ease: "none" }, 0)
        .to(".grid-plane", { scale: 2.05, yPercent: 18, opacity: .055, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>(".scene-section:not(.hero)").forEach((section) => {
        gsap.fromTo(section,
          { opacity: .72 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top 96%", end: "top 66%", scrub: .65 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          filter: "blur(7px)",
          duration: .82,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 89%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".split-heading").forEach((heading) => {
        const primary = heading.children[0];
        const support = heading.children[1];
        if (primary) {
          gsap.from(primary, {
            x: -46,
            opacity: 0,
            duration: .82,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 86%", once: true },
          });
        }
        if (support) {
          gsap.from(support, {
            x: 46,
            opacity: 0,
            duration: .82,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 86%", once: true },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card, index) => {
        const visual = card.querySelector(".work-visual");
        const copy = card.querySelector(".work-copy");
        if (copy) {
          gsap.fromTo(copy,
            { xPercent: index % 2 === 0 ? -7 : 7, opacity: .42 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 90%", end: "center 58%", scrub: .8 },
            },
          );
        }
        if (!visual) return;
        gsap.fromTo(visual,
          { xPercent: index % 2 === 0 ? 16 : -16, z: -260, rotateY: index % 2 === 0 ? -12 : 12, rotateX: 4, scale: .84, opacity: .35 },
          {
            xPercent: 0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 91%", end: "center 55%", scrub: .9 },
          },
        );
        gsap.from(card.querySelectorAll(".screen-grid i"), {
          y: 38,
          scale: .9,
          opacity: 0,
          stagger: .085,
          duration: .62,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: card, start: "top 64%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".problem-grid article").forEach((card, index) => {
        gsap.from(card, {
          y: 64,
          x: index % 2 === 0 ? -18 : 18,
          rotateX: 7,
          opacity: 0,
          duration: .72,
          delay: index * .045,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-service]").forEach((element, index) => {
        const object = element.querySelector(".service-object");
        const copy = element.querySelector(".service-copy");
        if (copy) {
          gsap.from(copy, {
            x: index % 2 === 0 ? -52 : 52,
            opacity: 0,
            duration: .84,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        }
        if (!object) return;
        gsap.fromTo(object,
          { xPercent: index % 2 === 0 ? 19 : -19, z: -260, rotateY: index % 2 === 0 ? -14 : 14, rotateX: 5, scale: .84, opacity: .3 },
          {
            xPercent: 0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 91%", end: "center 56%", scrub: .9 },
          },
        );
      });

      gsap.timeline({
        scrollTrigger: { trigger: ".method-section", start: "top 78%", end: "center 40%", scrub: 1 },
      })
        .fromTo(".method-message", { z: -360, y: 150, rotateX: 8, opacity: .08 }, { z: -145, y: 0, rotateX: 0, opacity: .74, ease: "none" }, 0)
        .fromTo(".method-evidence", { z: -280, y: 165, rotateX: 8, opacity: .08 }, { z: -58, y: 0, rotateX: 0, opacity: .9, ease: "none" }, .08)
        .fromTo(".method-action", { z: -210, y: 180, rotateX: 8, opacity: .08 }, { z: 18, y: -4, rotateX: 0, opacity: 1, ease: "none" }, .16);

      gsap.utils.toArray<HTMLElement>("[data-method-card]").forEach((card, index) => {
        gsap.from(card, {
          x: 44,
          y: 16,
          opacity: 0,
          duration: .72,
          delay: index * .045,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".engagement-grid article").forEach((card, index) => {
        gsap.from(card, {
          y: 70,
          z: -120,
          rotateX: 10,
          opacity: 0,
          duration: .8,
          delay: index * .06,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });

      gsap.from(".standards-grid article", {
        y: 38,
        scale: .96,
        opacity: 0,
        stagger: .08,
        duration: .68,
        ease: "back.out(1.25)",
        scrollTrigger: { trigger: ".standards-grid", start: "top 86%", once: true },
      });

      gsap.from(".review-form", {
        x: 60,
        rotateY: -5,
        opacity: 0,
        duration: .9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-section", start: "top 72%", once: true },
      });

      gsap.to(".scroll-rail-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .2 },
      });

      if (desktop) {
        const heroObject = document.querySelector<HTMLElement>(".hero-object");
        const depthObjects = Array.from(document.querySelectorAll<HTMLElement>(".work-visual, .service-object, .method-preview"));
        const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".button, .nav-cta"));

        const onDepthPointer = (event: PointerEvent) => {
          const x = event.clientX / window.innerWidth - .5;
          const y = event.clientY / window.innerHeight - .5;
          if (heroObject) {
            gsap.to(heroObject, {
              rotateY: x * 6,
              rotateX: -y * 4.5,
              x: x * 14,
              y: y * 9,
              duration: .85,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          depthObjects.forEach((visual) => {
            const rect = visual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              gsap.to(visual, {
                rotateY: x * 2.8,
                rotateX: -y * 2,
                duration: .9,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        };

        const magneticHandlers = magnetic.map((element) => {
          const move = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            gsap.to(element, { x: x * .1, y: y * .12, duration: .28, ease: "power2.out" });
          };
          const leave = () => gsap.to(element, { x: 0, y: 0, duration: .5, ease: "elastic.out(1, .45)" });
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", leave);
          return () => {
            element.removeEventListener("pointermove", move);
            element.removeEventListener("pointerleave", leave);
          };
        });

        window.addEventListener("pointermove", onDepthPointer, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onDepthPointer));
        cleanups.push(...magneticHandlers);
      }
    });

    return () => {
      context.revert();
      cleanups.reverse().forEach((cleanup) => cleanup());
      delete root.dataset.motion;
    };
  }, []);

  return <div className="cursor-light" aria-hidden="true" />;
}
