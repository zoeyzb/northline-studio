"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StoryMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]");

      steps.forEach((step, index) => {
        gsap.fromTo(step,
          {
            xPercent: index % 2 === 0 ? 7 : -7,
            y: 52,
            z: -180,
            rotateY: index % 2 === 0 ? -6 : 6,
            opacity: .22,
            scale: .94,
          },
          {
            xPercent: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 88%",
              end: "center 58%",
              scrub: .85,
            },
          },
        );
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 78%",
          end: "bottom 24%",
          scrub: 1.1,
        },
      })
        .fromTo(".story-core", { rotateX: 16, rotateY: -17, scale: .82, z: -180 }, { rotateX: 5, rotateY: 8, scale: 1.08, z: 70, ease: "none" }, 0)
        .fromTo(".story-orbit-one", { rotateX: 74, rotateZ: -22, scale: .82 }, { rotateX: 58, rotateZ: 24, scale: 1.18, ease: "none" }, 0)
        .fromTo(".story-orbit-two", { rotateY: 76, rotateZ: 24, scale: 1.1 }, { rotateY: 58, rotateZ: -24, scale: .9, ease: "none" }, 0)
        .to(".story-visual", { yPercent: -5, ease: "none" }, 0);

      gsap.from(".story-core span, .story-core i", {
        y: 18,
        opacity: 0,
        stagger: .08,
        duration: .65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story-visual", start: "top 72%", once: true },
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
