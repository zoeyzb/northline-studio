import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline clarity-first premium homepage", async () => {
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
  assert.match(html, /Make important work/);
  assert.match(html, /impossible to overlook/);
  assert.match(html, /From complexity/);
  assert.match(html, /premium site should feel simple/i);
  assert.match(html, /Find the signal/);
  assert.match(html, /Build the structure/);
  assert.match(html, /Add depth/);
  assert.match(html, /Create action/);
  assert.match(html, /Flagship websites/);
  assert.match(html, /Digital products/);
  assert.match(html, /Transformations/);
  assert.match(html, /You should be able to feel the difference/);
  assert.match(html, /Clear first/);
  assert.match(html, /Motion with purpose/);
  assert.match(html, /Responsive by design/);
  assert.match(html, /Accessible \+ fast/);
  assert.match(html, /Tell us what you want to make better/);
  assert.match(html, /Keep it simple/);
  assert.match(html, /Send project details/);
  assert.match(html, /Nothing is submitted automatically/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Page chapters/);
  assert.match(html, /data-scene="system"/);
  assert.match(html, /data-story-step/);
  assert.match(html, /data-service-card/);
  assert.match(html, /data-proof-card/);
  assert.match(html, /data-scene="contact"/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /460vh/);
  assert.doesNotMatch(html, /Recover Revenue/);
  assert.doesNotMatch(html, /NextRole/);
  assert.doesNotMatch(html, /vinext-starter/);
});
