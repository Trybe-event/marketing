import fs from "node:fs";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderFrames,
} from "@remotion/renderer";

const output = path.resolve("out");
fs.mkdirSync(output, { recursive: true });
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
const browser = await openBrowser("chrome", { browserExecutable });
try {
  const serveUrl = await bundle({
    entryPoint: path.resolve("src/index.tsx"),
    publicDir: path.resolve("public"),
    outDir: path.join(output, "bundle"),
    onProgress: (progress) => {
      if (progress === 100) console.log("Remotion bundle ready");
    },
  });
  const inputProps = { mute: true };
  const common = {
    serveUrl,
    puppeteerInstance: browser,
    inputProps,
    timeoutInMilliseconds: 90_000,
  };
  const advert = await selectComposition({
    ...common,
    id: "TrybeContinuousAdvert",
  });
  const banner = await selectComposition({ ...common, id: "TrybeEmailLoop" });
  const study = process.argv.includes("--continuous")
    ? await selectComposition({ ...common, id: "TrybeContinuousAdvert" })
    : process.argv.includes("--study")
      ? await selectComposition({ ...common, id: "TrybeMotionStudy" })
      : null;
  if (process.argv.includes("--frames")) {
    for (const [composition, directory] of study
      ? [
          [
            study,
            process.argv.includes("--continuous")
              ? "continuous-frames"
              : "study-frames",
          ],
        ]
      : [
          [advert, "continuous-frames"],
          [banner, "email-frames"],
        ]) {
      if (
        process.argv.includes("--email-only") &&
        composition.id !== "TrybeEmailLoop"
      )
        continue;
      fs.mkdirSync(path.join(output, directory), { recursive: true });
      await renderFrames({
        ...common,
        composition,
        outputDir: path.join(output, directory),
        imageFormat: composition.id === "TrybeEmailLoop" ? "png" : "jpeg",
        ...(composition.id === "TrybeEmailLoop" ? {} : { jpegQuality: 94 }),
        concurrency: 4,
        onFrameUpdate: (frame) => {
          if (frame % 120 === 0)
            console.log(
              composition.id + " " + frame + "/" + composition.durationInFrames,
            );
        },
      });
    }
  } else {
    const frames = process.argv.includes("--continuous")
      ? [60, 200, 340, 410, 560, 750, 920, 1040, 1160]
      : study
        ? [30, 75, 110, 160, 220, 285, 340]
        : process.argv.includes("--email-only")
          ? [0, 95, 165, 235, 320]
          : [60, 190, 335, 555, 740, 930, 1060, 1170];
    const composition =
      study ?? (process.argv.includes("--email-only") ? banner : advert);
    for (const frame of frames) {
      const destination = path.join(output, `${composition.id}-${frame}.png`);
      await renderStill({
        ...common,
        composition,
        frame,
        output: destination,
        imageFormat: "png",
      });
      console.log(destination);
    }
  }
} finally {
  await browser.close({ silent: true });
}
