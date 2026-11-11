import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadLookup(fetcher, origin = "https://app.trybe.example") {
  const compiled = ts.transpileModule(
    fs.readFileSync(new URL("../lib/event-lookup.ts", import.meta.url), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(module,exports,require){${compiled}\n})`, {
    URL,
    AbortSignal,
    fetch: fetcher,
  })(loaded, loaded.exports, () => ({ webAppOrigin: () => origin }));
  return loaded.exports.lookupEvent;
}

test("normalizes a code, verifies it with the public API and returns only name and canonical link", async () => {
  const lookup = loadLookup(async (url, options) => {
    assert.equal(url.href, "https://app.trybe.example/api/e/8p5lxp");
    assert.equal(options.cache, "no-store");
    assert.equal(options.redirect, "error");
    assert.equal(options.headers.authorization, undefined);
    assert.equal(options.headers.cookie, undefined);
    return Response.json({
      slug: "8p5lxp",
      name: "Learn2Earn Hackathon",
      description: "Not returned by marketing lookup",
    });
  });
  const result = await lookup(" 8P5LXP ");
  assert.equal(result.status, 200);
  assert.equal(result.name, "Learn2Earn Hackathon");
  assert.equal(result.url, "https://app.trybe.example/8p5lxp");
  assert.deepEqual(Object.keys(result).sort(), ["name", "status", "url"]);
});

test("rejects malformed codes and redirect injection before making a request", async () => {
  const lookup = loadLookup(() => {
    assert.fail("Invalid codes must not reach the API");
  });
  for (const code of [
    "",
    "12345",
    "TRYBE2026",
    "../api",
    "a/bcde",
    "https://evil.example",
    "abc\n12",
  ])
    assert.equal((await lookup(code)).status, 400);
});

test("unknown or unpublished events have a clear not-found state without a destination", async () => {
  const lookup = loadLookup(async () => new Response(null, { status: 404 }));
  const result = await lookup("zzzzzz");
  assert.equal(result.status, 404);
  assert.match(result.message, /No event found/);
  assert.equal(result.url, undefined);
});

test("service failures and rate limits do not claim the code is invalid", async () => {
  for (const status of [401, 403, 429, 500, 503]) {
    const result = await loadLookup(async () => new Response(null, { status }))(
      "8p5lxp",
    );
    assert.equal(result.status, 503);
    assert.equal(result.url, undefined);
    assert.match(result.message, /try again/);
  }
});

test("timeouts, redirects and malformed or mismatched responses fail closed", async () => {
  for (const fetcher of [
    async () => {
      throw new Error("Network timeout or refused redirect");
    },
    async () => new Response("not json"),
    async () => Response.json(null),
    async () => Response.json({ slug: "other1", name: "Wrong event" }),
    async () => Response.json({ slug: "8p5lxp", name: " " }),
    async () => Response.json({ slug: "8p5lxp", name: 123 }),
  ]) {
    const result = await loadLookup(fetcher)("8p5lxp");
    assert.equal(result.status, 503);
    assert.equal(result.url, undefined);
  }
});

test("unconfigured application origin does not make a network request", async () => {
  const lookup = loadLookup(() => assert.fail("Missing origin"), null);
  assert.equal((await lookup("8p5lxp")).status, 503);
});
