import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline premium motion homepage", async () => {
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
  assert.match(html, /Make the digital presence/);
  assert.match(html, /impossible to ignore/);
  assert.match(html, /The page should keep revealing itself/);
  assert.match(html, /Make the value obvious/);
  assert.match(html, /Give every section a job/);
  assert.match(html, /Make the story feel alive/);
  assert.match(html, /Make the next move obvious/);
  assert.match(html, /Flagship websites/);
  assert.match(html, /Digital products/);
  assert.match(html, /Transformations/);
  assert.match(html, /Not three boxes/);
  assert.match(html, /The difference should be visible/);
  assert.match(html, /Production, not mockups/);
  assert.match(html, /Motion with a reason/);
  assert.match(html, /Responsive art direction/);
  assert.match(html, /Fast \+ accessible/);
  assert.match(html, /Show us the thing that should feel better/);
  assert.match(html, /Keep it simple/);
  assert.match(html, /Send project details/);
  assert.match(html, /Nothing is submitted automatically/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Page chapters/);
  assert.match(html, /data-scene="system"/);
  assert.match(html, /data-flow-card/);
  assert.match(html, /data-showcase/);
  assert.match(html, /data-transform-stage/);
  assert.match(html, /data-transform-item/);
  assert.match(html, /data-scene="contact"/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /460vh/);
  assert.doesNotMatch(html, /3600/);
  assert.doesNotMatch(html, /Recover Revenue/);
  assert.doesNotMatch(html, /NextRole/);
  assert.doesNotMatch(html, /vinext-starter/);
});
