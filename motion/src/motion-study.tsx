import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Lockup, Mark, palette } from "./brand";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const progress = (frame: number, start: number, end: number) => {
  const value = interpolate(frame, [start, end], [0, 1], clamp);
  return value * value * (3 - 2 * value);
};
const labels = [
  "The builder",
  "The designer",
  "The founder",
  "The maker",
  "The thinker",
  "The creative",
];
const positions = [
  [-560, -160, 70],
  [-170, -340, -110],
  [440, -200, 70],
  [570, 180, -100],
  [60, 330, 130],
  [-470, 220, -30],
];

function Invitation({ frame }: { frame: number }) {
  const unfolding = progress(frame, 68, 111);
  return (
    <div
      style={{
        width: 390,
        height: 530,
        borderRadius: 28,
        background: palette.paper,
        color: palette.ink,
        padding: 18,
        boxShadow: "0 30px 65px #0009",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          height: 220,
          overflow: "hidden",
          borderRadius: 16,
          position: "relative",
        }}
      >
        <Img
          src={staticFile("hosts.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(0deg,#14261c,transparent 80%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 16,
            fontSize: 30,
            fontWeight: 750,
            color: palette.paper,
          }}
        >
          Builders & makers
        </div>
      </div>
      <div style={{ fontSize: 12, letterSpacing: 3, marginTop: 22 }}>
        YOUR NEXT INTRODUCTION
      </div>
      <div
        style={{
          fontSize: 29,
          fontWeight: 750,
          marginTop: 9,
          letterSpacing: -1,
        }}
      >
        One invitation. Open possibilities.
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          marginTop: 20,
          transformOrigin: "top",
          transform: `translateZ(3px) rotateX(${(1 - unfolding) * -85}deg)`,
          opacity: unfolding,
        }}
      >
        <Img src={staticFile("qr.svg")} style={{ width: 104, height: 104 }} />
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>
            Scan. Join. Connect.
          </div>
          <div
            style={{
              fontSize: 13,
              marginTop: 12,
              padding: "9px 13px",
              borderRadius: 20,
              background: palette.lime,
            }}
          >
            Your community starts here
          </div>
        </div>
      </div>
    </div>
  );
}

export function MotionStudy({
  timelineFrame,
}: { timelineFrame?: number } = {}) {
  const compositionFrame = useCurrentFrame();
  const frame = timelineFrame ?? compositionFrame;
  const launch = progress(frame, 0, 68);
  const enter = progress(frame, 40, 105);
  const network = progress(frame, 110, 180);
  const exit = progress(frame, 235, 288);
  const close = progress(frame, 305, 338);
  const cameraRotation = interpolate(
    frame,
    [0, 80, 155, 230, 290],
    [-22, 18, -9, 14, 0],
    clamp,
  );
  const cameraScale = interpolate(
    frame,
    [0, 50, 95, 160, 225, 270],
    [1.65, 0.87, 1.03, 0.91, 1.03, 0.56],
    clamp,
  );
  const driftX = Math.sin(frame * 0.026) * 35;
  const markX = interpolate(
    frame,
    [0, 55, 100, 160, 230, 285],
    [1370, 900, 1260, 960, 720, 960],
    clamp,
  );
  const markY = interpolate(
    frame,
    [0, 55, 100, 160, 230, 285],
    [380, 550, 710, 540, 330, 540],
    clamp,
  );
  const flash = Math.max(0, 1 - Math.abs(frame - 270) / 6);

  return (
    <AbsoluteFill
      style={{
        background: palette.forest,
        fontFamily: "Manrope",
        overflow: "hidden",
        color: palette.paper,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${52 + Math.sin(frame * 0.02) * 15}% 50%,#3e6135 0%,${palette.forest} 65%)`,
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -500,
          backgroundImage:
            "linear-gradient(#c3ef6610 1px,transparent 1px),linear-gradient(90deg,#c3ef6610 1px,transparent 1px)",
          backgroundSize: "110px 110px",
          transform: `perspective(1100px) rotateX(67deg) rotateZ(${-15 + frame * 0.035}deg) translateY(${frame * 1.4}px)`,
          opacity: (1 - exit) * 0.6,
        }}
      />

      {/* A single traveling world links the invitation to the people, rather than replacing slides. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: 1400,
          opacity: 1 - exit,
          transform: `scale(${cameraScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: `rotateX(${10 - Math.sin(frame * 0.018) * 8}deg) rotateY(${cameraRotation}deg) rotateZ(${-7 + network * 9}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -1000,
              top: -230,
              width: 2100,
              fontWeight: 800,
              fontSize: 290,
              letterSpacing: -24,
              lineHeight: 0.84,
              whiteSpace: "nowrap",
              transform: `translate3d(${-frame * 8}px,${-launch * 220}px,${-250 + launch * 120}px) rotateY(-13deg)`,
              opacity: 1 - enter,
            }}
          >
            MORE THAN
            <br />
            <span style={{ color: palette.lime, marginLeft: 500 }}>
              A ROOM.
            </span>
          </div>
          <svg
            width="1700"
            height="1100"
            viewBox="-850 -550 1700 1100"
            style={{
              position: "absolute",
              left: -850,
              top: -550,
              overflow: "visible",
              transform: "translateZ(-60px)",
              opacity: network,
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            {positions.map(([x, y], index) => {
              const reveal = progress(frame, 112 + index * 7, 145 + index * 7);
              const curve = `M 0 0 Q ${x * 0.12 - y * 0.5} ${y * 0.12 + x * 0.5} ${x} ${y}`;
              return (
                <g key={index}>
                  <path
                    d={curve}
                    fill="none"
                    stroke={palette.lime}
                    strokeWidth="9"
                    opacity=".17"
                    filter="url(#glow)"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={1 - reveal}
                  />
                  <path
                    d={curve}
                    fill="none"
                    stroke={palette.lime}
                    strokeWidth="2"
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={1 - reveal}
                  />
                  <circle
                    cx={x * reveal}
                    cy={y * reveal}
                    r="5"
                    fill={palette.lime}
                  />
                </g>
              );
            })}
          </svg>
          {positions.map(([x, y, z], index) => {
            const appear = progress(frame, 118 + index * 7, 147 + index * 7);
            const accepted = progress(frame, 196, 210);
            return (
              <div
                key={labels[index]}
                style={{
                  position: "absolute",
                  left: x - 155,
                  top: y - 85,
                  width: 310,
                  padding: 22,
                  borderRadius: 23,
                  background: index === 2 ? palette.lime : palette.paper,
                  color: palette.ink,
                  boxShadow: "0 22px 60px #0006",
                  opacity: appear,
                  transform: `translate3d(${(1 - appear) * -x}px,${(1 - appear) * -y + Math.sin(frame * 0.05 + index) * 9}px,${z}px) rotateY(${(index % 2 ? 1 : -1) * (16 - appear * 9)}deg) rotateZ(${(index - 2) * 2}deg) scale(${0.5 + appear * 0.5})`,
                }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      background: palette.forest,
                      color: palette.lime,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 18,
                    }}
                  >
                    {labels[index].split(" ")[1][0].toUpperCase()}
                  </div>
                  <div style={{ fontWeight: 750, fontSize: 21 }}>
                    {labels[index]}
                  </div>
                </div>
                <div
                  style={{ fontFamily: "DM Sans", fontSize: 14, marginTop: 15 }}
                >
                  Shared interests. A place to start.
                </div>
                <div
                  style={{
                    marginTop: 14,
                    padding: "8px 13px",
                    borderRadius: 16,
                    fontSize: 12,
                    background: index === 2 ? "#14261c" : "#e5ebdd",
                    color: index === 2 ? palette.paper : palette.ink,
                  }}
                >
                  {accepted > 0.5
                    ? "Connected. Keep the conversation going."
                    : "Send a connection request"}
                </div>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: -195,
              top: -265,
              opacity: enter * (1 - network),
              transformStyle: "preserve-3d",
              transform: `translate3d(${(1 - enter) * 600}px,${(1 - enter) * 350}px,${120 + (1 - enter) * 500}px) rotateY(${-26 + enter * 35}deg) rotateZ(${-18 + enter * 20}deg) scale(${1 - network * 0.7})`,
            }}
          >
            <Invitation frame={frame} />
          </div>
          <div
            style={{
              position: "absolute",
              left: -170,
              top: -170,
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px solid #c3ef6655",
              transform: `rotateX(70deg) rotateZ(${frame * 1.5}deg) scale(${network * 2.5})`,
              opacity: network,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: markX - 66,
          top: markY - 66,
          transform: `rotate(${frame * 5.2}deg) scale(${(1 - exit) * (0.8 + Math.sin(frame * 0.03) * 0.1)})`,
          opacity: 1 - exit,
          filter: "drop-shadow(0 15px 25px #0006)",
        }}
      >
        <Mark size={132} />
      </div>

      <div
        style={{ position: "absolute", left: 90, top: 78, opacity: 1 - exit }}
      >
        <Lockup size={34} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          bottom: 75,
          overflow: "hidden",
          opacity: network * (1 - exit),
        }}
      >
        <div
          style={{
            fontSize: 70,
            letterSpacing: -4,
            fontWeight: 750,
            transform: `translateY(${(1 - network) * 110}px)`,
          }}
        >
          Find your people.
        </div>
        <div
          style={{
            fontSize: 18,
            fontFamily: "DM Sans",
            color: palette.muted,
            marginTop: 9,
          }}
        >
          An introduction starts with you.
        </div>
      </div>
      <AbsoluteFill style={{ background: palette.lime, opacity: flash }} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) scale(${0.88 + exit * 0.12})`,
          opacity: exit * (1 - close),
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 5,
            color: palette.lime,
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          YOUR NEXT CHAPTER STARTS HERE
        </div>
        <div
          style={{
            fontWeight: 750,
            fontSize: 86,
            letterSpacing: -4,
            whiteSpace: "nowrap",
          }}
        >
          trybe-zeta.vercel.app
        </div>
        <div
          style={{
            height: 3,
            background: palette.lime,
            marginTop: 25,
            transformOrigin: "left",
            transform: `scaleX(${progress(frame, 280, 303)})`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) translateX(${driftX * (1 - close)}px) scale(${0.6 + close * 0.4})`,
          opacity: close,
        }}
      >
        <Lockup size={145} rotation={(1 - close) * -190} />
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: 23,
            textAlign: "center",
            marginTop: 42,
            color: palette.muted,
          }}
        >
          Fostering connection with convenience.
        </div>
      </div>
    </AbsoluteFill>
  );
}
