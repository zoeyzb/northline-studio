"use client";

import dynamic from "next/dynamic";

const AtmosphericScene = dynamic(
  () => import("./AtmosphericScene").then((module) => module.AtmosphericScene),
  { ssr: false },
);

export function AtmosphericSceneClient() {
  return <AtmosphericScene />;
}
