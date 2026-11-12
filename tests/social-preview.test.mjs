import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function metadata(origin) {
  const javascript = ts.transpileModule(
    readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  ).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(require,module,exports){${javascript}\n})`, {
    URL,
    process: { env: { NEXT_PUBLIC_SITE_URL: origin } },
  })(() => ({}), loaded, loaded.exports);
  return loaded.exports.metadata;
}

test("social metadata uses the marketing origin rather than the product app or localhost", () => {
  for (const [configured, expected] of [
    [undefined, "https://trybe-zeta.vercel.app"],
    ["https://www.trybe.example", "https://www.trybe.example"],
  ]) {
    const result = metadata(configured);
    const image = result.openGraph.images[0];
    assert.equal(result.metadataBase.origin, expected);
    assert.equal(
      new URL(image.url, result.metadataBase).href,
      `${expected}/images/trybe-share-v1.png`,
    );
    assert.equal(result.openGraph.type, "website");
    assert.equal(result.twitter.card, "summary_large_image");
    assert.equal(result.twitter.images[0], image.url);
    assert.equal(image.width, 1200);
    assert.equal(image.height, 630);
  }
});

test("the linked brand image exists as a lightweight 1200 by 630 PNG", () => {
  const bytes = readFileSync(
    new URL("../public/images/trybe-share-v1.png", import.meta.url),
  );
  assert.equal(bytes.subarray(1, 4).toString(), "PNG");
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
  assert.ok(bytes.length < 300_000);
});
