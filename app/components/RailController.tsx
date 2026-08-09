"use client";

import { useEffect } from "react";

const chapterForScene: Record<string, string> = {
  overview: "overview",
  proof: "story",
  story: "story",
  work: "evidence",
  problems: "evidence",
  services: "services",
  method: "method",
  engagements: "method",
  about: "method",
  contact: "contact",
};

export function RailController() {
  useEffect(() => {
    let frame = 0;

    const update = (scene: string) => {
      const chapter = chapterForScene[scene] ?? scene;
      document.querySelectorAll<HTMLElement>("[data-rail-link]").forEach((link) => {
        const active = link.dataset.railLink === chapter;
        link.classList.toggle("is-current", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const onScene = (event: Event) => {
      const scene = (event as CustomEvent<{ scene: string }>).detail.scene;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => update(scene));
    };

    window.addEventListener("northline:scene", onScene);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("northline:scene", onScene);
    };
  }, []);

  return null;
}
