import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /service-visual visual-website/);
  assert.match(html, /service-visual visual-portfolio/);
  assert.match(html, /service-visual visual-platform/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Selected systems/);
  assert.match(html, /Recover Revenue/);
  assert.match(html, /NextRole/);
  assert.match(html, /Continuous improvement cycle/);
  assert.match(html, /Digital presence review/);
  assert.match(html, /Choose a credibility gap/);
  assert.match(html, /Website review example/);
  assert.match(html, /What we examine/);
  assert.match(html, /What changes after launch/);
  assert.match(html, /For organizations/);
  assert.match(html, /For individual professionals/);
});
