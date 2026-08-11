import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline Recover and Sierra inspired premium homepage", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /Make your digital presence/);
  assert.match(html, /feel as strong as the work behind it/);
  assert.match(html, /INTERACTIVE PROJECT SYSTEM/);
  assert.match(html, /Strategy/);
  assert.match(html, /Structure/);
  assert.match(html, /Motion/);
  assert.match(html, /Build/);
  assert.match(html, /Make the first idea impossible to miss/);
  assert.match(html, /Understand it faster/);
  assert.match(html, /BUILT AS ONE SYSTEM/);
  assert.match(html, /A premium site should feel simple/);
  assert.match(html, /One message leads/);
  assert.match(html, /Motion creates memory/);
  assert.match(html, /Flagship websites/);
  assert.match(html, /Digital products/);
  assert.match(html, /Transformations/);
  assert.match(html, /Motion systems/);
  assert.match(html, /Conversion design/);
  assert.match(html, /Production/);
  assert.match(html, /Find the gap\. Build the stronger version/);
  assert.match(html, /Flagship website/);
  assert.match(html, /Product experience/);
  assert.match(html, /Website transformation/);
  assert.match(html, /Trust should come from the work, not made-up reviews/);
  assert.match(html, /No fake proof/);
  assert.match(html, /Motion with a reason/);
  assert.match(html, /Built for real use/);
  assert.match(html, /Show us what should feel better/);
  assert.match(html, /Keep it simple/);
  assert.match(html, /Send project details/);
  assert.match(html, /Nothing is submitted automatically/);
  assert.match(html, /recover-inspired motion-rebuild/);
  assert.match(html, /data-hero-preview/);
  assert.match(html, /data-scene="system"/);
  assert.match(html, /data-showcase/);
  assert.match(html, /data-transform-item/);
  assert.match(html, /data-scene="contact"/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /460vh/);
  assert.doesNotMatch(html, /3600/);
  assert.doesNotMatch(html, /Managed AI revenue operations/);
  assert.doesNotMatch(html, /NextRole/);
  assert.doesNotMatch(html, /vinext-starter/);
});
