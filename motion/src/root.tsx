import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Composition,
  continueRender,
  delayRender,
  cancelRender,
  staticFile,
} from "remotion";
import { EmailLoop } from "./email-loop";
import { MotionStudy } from "./motion-study";
import { ContinuousAdvert } from "./continuous-advert";

function Fonts({ children }: { children: React.ReactNode }) {
  const [handle] = useState(() => delayRender("Load local Trybe brand fonts"));
  useEffect(() => {
    Promise.all(
      ["700 100px Manrope", '400 40px "DM Sans"', "600 80px Fredoka"].map(
        (font) => document.fonts.load(font),
      ),
    )
      .then(() => continueRender(handle))
      .catch(cancelRender);
  }, [handle]);
  return (
    <AbsoluteFill>
      <style>{`@font-face{font-family:Manrope;src:url('${staticFile("fonts/Manrope.ttf")}');font-weight:200 800}@font-face{font-family:'DM Sans';src:url('${staticFile("fonts/DM-Sans.ttf")}');font-weight:100 1000}@font-face{font-family:Fredoka;src:url('${staticFile("fonts/Fredoka.ttf")}');font-weight:300 700}*{box-sizing:border-box}body{margin:0}`}</style>
      {children}
    </AbsoluteFill>
  );
}
const Movie = ({
  mute = false,
  musicSrc,
}: {
  mute?: boolean;
  musicSrc?: string;
}) => (
  <Fonts>
    <ContinuousAdvert />
    {!mute && (
      <>
        {musicSrc && <Audio src={staticFile(musicSrc)} volume={0.3} />}
        {[
          [18, "01"],
          [138, "02"],
          [300, "03"],
          [483, "04"],
          [693, "05"],
          [882, "06"],
          [1029, "07"],
        ].map(([frame, file]) => (
          <Voice key={file} frame={Number(frame)} file={String(file)} />
        ))}
      </>
    )}
  </Fonts>
);
const Voice = ({ frame, file }: { frame: number; file: string }) => (
  <Sequence from={frame}>
    <Audio src={staticFile(`audio-v2/voice-${file}.wav`)} volume={1} />
  </Sequence>
);
const Banner = () => (
  <Fonts>
    <EmailLoop />
  </Fonts>
);
export function CampaignRoot() {
  return (
    <>
      <Composition
        id="TrybeContinuousAdvert"
        component={Movie}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TrybeMotionStudy"
        component={() => (
          <Fonts>
            <MotionStudy />
          </Fonts>
        )}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TrybeEmailLoop"
        component={Banner}
        durationInFrames={360}
        fps={30}
        width={1200}
        height={360}
      />
    </>
  );
}
