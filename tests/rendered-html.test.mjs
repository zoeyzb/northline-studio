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
  assert.match(html, /Make complex work/);
  assert.match(html, /Evidence in the work/);
  assert.match(html, /Proof should match the service being sold/);
  assert.match(html, /From internal language to a clear public story/);
  assert.match(html, /Turning scattered evidence into a usable system/);
  assert.match(html, /A working website, not a static concept/);
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
  assert.match(html, /A focused studio, not a layered agency handoff/);
  assert.match(html, /What is the current digital presence failing to communicate/);
  assert.match(html, /Prepare project review/);
  assert.match(html, /scroll-rail-progress/);
  assert.match(html, /Page chapters/);
  assert.match(html, /data-scene="work"/);
  assert.match(html, /id="contact"/);
});
