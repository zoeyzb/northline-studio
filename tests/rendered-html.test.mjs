import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline premium studio homepage", async () => {
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
  assert.match(html, /Not more information\./);
  assert.match(html, /Better sequencing/);
  assert.match(html, /Make the value legible in seconds/);
  assert.match(html, /Turn complexity into a system people can navigate/);
  assert.match(html, /Let evidence appear exactly when trust needs it/);
  assert.match(html, /Turn understanding into a next move/);
  assert.match(html, /Digital flagship/);
  assert.match(html, /Digital product/);
  assert.match(html, /Transformation/);
  assert.match(html, /Evidence in the work/);
  assert.match(html, /The proof should look like the thing being sold/);
  assert.match(html, /Narrative system/);
  assert.match(html, /Information system/);
  assert.match(html, /Delivery system/);
  assert.match(html, /Trust, without theater/);
  assert.match(html, /No invented proof/);
  assert.match(html, /Accessible by default/);
  assert.match(html, /Performance discipline/);
  assert.match(html, /One line of thinking from strategy through launch/);
  assert.match(html, /Where is the current digital experience losing trust, clarity, or momentum/);
  assert.match(html, /Open project review email/);
  assert.match(html, /nothing is sent until you choose to send/i);
  assert.match(html, /Required fields are marked with an asterisk/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Page chapters/);
  assert.match(html, /data-scene="story"/);
  assert.match(html, /data-story-step/);
  assert.match(html, /data-service-card/);
  assert.match(html, /data-proof-system/);
  assert.match(html, /data-process-step/);
  assert.match(html, /data-scene="contact"/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /Recover Revenue/);
  assert.doesNotMatch(html, /NextRole/);
  assert.doesNotMatch(html, /vinext-starter/);
});
