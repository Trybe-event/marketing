import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Lockup, Mark, palette, rule } from "./brand";
export function EmailLoop() {
  const frame = useCurrentFrame();
  const brand = frame < 70 || frame >= 270;
  const build = frame >= 270 ? rule(frame, 270, 305, 0, 1) : 1;
  return (
    <AbsoluteFill
      style={{
        background: palette.forest,
        fontFamily: "Manrope",
        overflow: "hidden",
      }}
    >
      {brand && (
        <>
          <div
            style={{
              position: "absolute",
              left: 155,
              top: 117,
              opacity: frame < 70 ? 1 : rule(frame, 270, 290, 0, 1),
              transform: `translateX(${(1 - build) * 220}px)`,
            }}
          >
            <Lockup
              size={94}
              rotation={frame >= 270 ? rule(frame, 270, 320, -170, 0) : 0}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 580,
              top: 106,
              width: 1,
              height: 148,
              background: "#dce3d444",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 630,
              top: 115,
              fontFamily: "DM Sans",
              fontSize: 31,
              lineHeight: 1.35,
              color: palette.paper,
              opacity: frame < 70 ? 1 : rule(frame, 300, 325, 0, 1),
            }}
          >
            Your people.
            <br />
            <span style={{ color: palette.lime }}>Your next chapter.</span>
            <div style={{ marginTop: 18, fontSize: 16, color: palette.muted }}>
              Fostering connection with convenience.
            </div>
          </div>
        </>
      )}
      {frame >= 70 && frame < 120 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 179,
              width: 920,
              height: 2,
              background: "#c3ef6630",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: rule(frame, 70, 120, 155, 875),
              top: 105,
            }}
          >
            <Mark size={150} rotation={rule(frame, 70, 120, 0, 300)} />
          </div>
        </>
      )}
      {frame >= 120 && frame < 270 && (
        <>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: -190 - index * 50,
                top: -200 - index * 50,
                width: 700 + index * 100,
                height: 700 + index * 100,
                border: "1px solid #c3ef6640",
                borderRadius: "50%",
                transform: `translateX(${Math.sin(frame / 45 + index) * 18}px)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 520,
              top: 95,
              width: 630,
              color: palette.paper,
              opacity:
                frame < 210
                  ? Math.min(
                      rule(frame, 120, 133, 0, 1),
                      rule(frame, 196, 210, 1, 0),
                    )
                  : Math.min(
                      rule(frame, 210, 222, 0, 1),
                      rule(frame, 256, 270, 1, 0),
                    ),
              transform: `translateX(${frame < 210 ? rule(frame, 120, 145, 65, 0) : rule(frame, 210, 235, 65, 0)}px)`,
            }}
          >
            {frame < 210 ? (
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 650,
                  letterSpacing: -2,
                  lineHeight: 1.2,
                }}
              >
                Find your people.
                <br />
                <span style={{ color: palette.lime }}>
                  Keep the connection.
                </span>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 17,
                    letterSpacing: 2,
                    color: palette.muted,
                    marginBottom: 20,
                  }}
                >
                  YOUR NEXT CHAPTER STARTS HERE
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 650,
                    letterSpacing: -1,
                    color: palette.lime,
                  }}
                >
                  trybe-zeta.vercel.app
                </div>
              </>
            )}
          </div>
          <div style={{ position: "absolute", left: 125, top: 95 }}>
            <Mark size={170} rotation={rule(frame, 120, 270, -30, 180)} />
          </div>
        </>
      )}
    </AbsoluteFill>
  );
}
