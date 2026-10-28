// Offline tests: ESM and CJS entry points, headers and URL building.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { createNextFarmClient, PROD_URL, SANDBOX_URL, VERSION } from "../dist/esm/index.js";

test("ESM and CJS export the same API", () => {
  const cjs = createRequire(import.meta.url)("../dist/cjs/index.js");
  assert.equal(typeof cjs.createNextFarmClient, "function");
  assert.equal(cjs.VERSION, VERSION);
  assert.equal(PROD_URL, "https://api-prod.nextfarm.vn");
});

test("throws without apiKey", () => {
  assert.throws(() => createNextFarmClient({ apiKey: "" }), /apiKey is required/);
});

test("sends key and language to the right URL", async () => {
  let seen;
  const nf = createNextFarmClient({
    apiKey: "nfk_test", baseUrl: SANDBOX_URL + "/", language: "en",
    fetch: async (req) => { seen = req; return new Response(JSON.stringify({ items: [], total: 0 }), { headers: { "content-type": "application/json" } }); },
  });
  const { data, error } = await nf.GET("/api/v1/iot/devices", { params: { query: { page: 2 } } });
  assert.equal(error, undefined);
  assert.deepEqual(data, { items: [], total: 0 });
  assert.equal(seen.url, `${SANDBOX_URL}/api/v1/iot/devices?page=2`);
  assert.equal(seen.headers.get("authorization"), "Bearer nfk_test");
  assert.equal(seen.headers.get("accept-language"), "en");
});

test("returns RFC 7807 errors in error", async () => {
  const nf = createNextFarmClient({
    apiKey: "nfk_test",
    fetch: async () => new Response(JSON.stringify({ title: "Forbidden", status: 403 }), { status: 403, headers: { "content-type": "application/problem+json" } }),
  });
  const { data, error, response } = await nf.GET("/api/v1/iot/devices");
  assert.equal(data, undefined);
  assert.equal(response.status, 403);
  assert.equal(error.status, 403);
});
