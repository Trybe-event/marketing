import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function links(origin = "https://app.trybe.example") {
  const compiled = ts.transpileModule(
    fs.readFileSync(
      new URL("../lib/account-links.ts", import.meta.url),
      "utf8",
    ),
    {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    },
  ).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(module,exports){${compiled}\n})`, {
    URL,
    process: {
      env: { NODE_ENV: "production", NEXT_PUBLIC_WEB_APP_URL: origin },
    },
  })(loaded, loaded.exports);
  return loaded.exports;
}

test("event codes open the real app without claiming a registration", () => {
  const routes = links();
  assert.equal(routes.eventHref("JYKA2K"), "https://app.trybe.example/jyka2k");
  assert.equal(
    routes.accountHref("organizer"),
    "https://app.trybe.example/organizer/sign-up",
  );
  for (const code of ["TRYBE2026", "../api", "a-b-cd", "https://other.example"])
    assert.equal(routes.eventHref(code), null);
});

test("missing or unsafe app origins cannot redirect event invitations", () => {
  for (const origin of [
    "",
    "javascript:alert(1)",
    "https://user:password@app.trybe.example",
    "http://external.example",
  ]) {
    const routes = links(origin);
    assert.equal(routes.eventHref("jyka2k"), null);
    assert.equal(routes.accountHref("attendee"), "/attendee/sign-up");
  }
});
