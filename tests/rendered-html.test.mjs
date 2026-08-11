import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the Northline cinematic 3D homepage", async () => {
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
  assert.match(html, /Make the website/);
  assert.match(html, /match the work/);
  assert.match(html, /Clear\. Premium\. Alive\./);
  assert.match(html, /Flagship websites/);
  assert.match(html, /Digital products/);
  assert.match(html, /Transformations/);
  assert.match(html, /One object\. Four transformations\./);
  assert.match(html, /Signal/);
  assert.match(html, /Structure/);
  assert.match(html, /Depth/);
  assert.match(html, /Action/);
  assert.match(html, /MOVE THROUGH IT/);
  assert.match(html, /Show the work at full scale/);
  assert.match(html, /PROJECT SYSTEM/);
  assert.match(html, /Build something people remember/);
  assert.match(html, /Tell us the gap/);
  assert.match(html, /Send project details/);
  assert.match(html, /cinematic-site/);
  assert.match(html, /data-scene="hero"/);
  assert.match(html, /data-scene="services"/);
  assert.match(html, /data-scene="case"/);
  assert.match(html, /data-scene="transition"/);
  assert.match(html, /data-scene="project"/);
  assert.match(html, /data-scene="cta"/);
  assert.match(html, /data-service-card/);
  assert.match(html, /data-case-step/);
  assert.match(html, /data-device/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /460vh/);
  assert.doesNotMatch(html, /3600/);
  assert.doesNotMatch(html, /Managed AI revenue operations/);
  assert.doesNotMatch(html, /NextRole/);
  assert.doesNotMatch(html, /vinext-starter/);
});
