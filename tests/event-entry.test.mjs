import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function entryHarness(fetcher) {
  const state = [];
  let hookIndex = 0;
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: {
      useState(initial) {
        const index = hookIndex++;
        if (!(index in state)) state[index] = initial;
        return [
          state[index],
          (value) => {
            state[index] = value;
          },
        ];
      },
      useRef(initial) {
        const index = hookIndex++;
        if (!(index in state)) state[index] = { current: initial };
        return state[index];
      },
    },
    "./brand-mark": { BrandMark: "BrandMark" },
    "lucide-react": { ArrowRight: "ArrowRight" },
  };
  const javascript = ts.transpileModule(
    fs.readFileSync(
      new URL("../components/product-experience.tsx", import.meta.url),
      "utf8",
    ),
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
    AbortSignal,
    fetch: fetcher,
  })((name) => dependencies[name], loaded, loaded.exports);
  function nodes(value) {
    if (Array.isArray(value)) return value.flatMap(nodes);
    if (!value || typeof value !== "object") return [];
    return [value, ...nodes(value.props?.children)];
  }
  function find(type) {
    hookIndex = 0;
    return nodes(
      loaded.exports.EventEntry({ eventOrigin: "https://app.trybe.example" }),
    )
      .filter((node) => node.type === type)
      .map((node) => node.props);
  }
  return {
    find,
    enter: (value) => find("input")[0].onChange({ target: { value } }),
    submit: () => find("form")[0].onSubmit({ preventDefault() {} }),
  };
}

test("event entry shows the verified event link and clears it when the code changes", async () => {
  const harness = entryHarness(async (url) => {
    assert.equal(url, "/api/events/lookup?code=8p5lxp");
    return Response.json({
      name: "Learn2Earn",
      url: "https://app.trybe.example/8p5lxp",
    });
  });
  harness.enter("8P5LXP");
  await harness.submit();
  assert.equal(harness.find("strong")[0].children, "Learn2Earn");
  assert.equal(harness.find("a")[0].href, "https://app.trybe.example/8p5lxp");
  harness.enter("zzzzzz");
  assert.equal(harness.find("a").length, 0);
});

test("duplicate submissions are blocked while lookup runs", async () => {
  let finish;
  let requestCount = 0;
  const pending = new Promise((resolve) => {
    finish = resolve;
  });
  const harness = entryHarness(() => {
    requestCount++;
    return pending;
  });
  harness.enter("8P5LXP");
  const first = harness.submit();
  assert.equal(harness.find("button")[0].disabled, true);
  await harness.submit();
  assert.equal(requestCount, 1);
  finish(Response.json({ message: "No event found" }, { status: 404 }));
  await first;
  assert.equal(harness.find("button")[0].disabled, false);
  assert.equal(harness.find("a").length, 0);
  assert.equal(harness.find("p").at(-1).children, "No event found");
});

test("an unexpected external destination never becomes a link", async () => {
  const harness = entryHarness(async () =>
    Response.json({ name: "Injected", url: "https://evil.example" }),
  );
  harness.enter("8P5LXP");
  await harness.submit();
  assert.equal(harness.find("a").length, 0);
  assert.match(harness.find("p").at(-1).children, /try again/);
});
