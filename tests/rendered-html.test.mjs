import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline credibility homepage", async () => {
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
  assert.match(html, /Signal/);
  assert.match(html, /Depth/);
  assert.match(html, /Movement/);
  assert.match(html, /Not more information\. Better sequencing/);
  assert.match(html, /Make the value legible in seconds/);
  assert.match(html, /Let evidence appear exactly when trust needs it/);
  assert.match(html, /Turn understanding into a next move/);
  assert.match(html, /Evidence in the work/);
  assert.match(html, /The proof should look like the thing being sold/);
  assert.match(html, /Turn institutional complexity into a public story/);
  assert.match(html, /Make scattered evidence feel like one system/);
  assert.match(html, /Ship the experience—not just the mockup/);
  assert.doesNotMatch(html, /Recover Revenue/);
  assert.doesNotMatch(html, /NextRole/);
  assert.match(html, /Institutional websites/);
  assert.match(html, /Program and initiative platforms/);
  assert.match(html, /Digital presence improvement/);
  assert.match(html, /Message/);
  assert.match(html, /Evidence/);
  assert.match(html, /Action/);
  assert.match(html, /Foundation/);
  assert.match(html, /Continuous improvement/);
  assert.match(html, /One line of thinking from strategy through launch/);
  assert.match(html, /Where is the current digital experience losing trust, clarity, or momentum/);
  assert.match(html, /Prepare project review/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Page chapters/);
  assert.match(html, /data-scene="story"/);
  assert.match(html, /data-story-step/);
  assert.match(html, /data-scene="work"/);
  assert.match(html, /id="contact"/);
});
