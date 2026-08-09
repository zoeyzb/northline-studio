"use client";

import dynamic from "next/dynamic";
import { RailController } from "./RailController";
import { StoryMotion } from "./StoryMotion";

const AtmosphericScene = dynamic(
  () =>
    import("./AtmosphericScene").then(
      (module) => module.AtmosphericScene,
    ),
  { ssr: false },
);

export function AtmosphericSceneClient() {
  return (
    <>
      <AtmosphericScene />
      <StoryMotion />
      <RailController />
    </>
  );
}
