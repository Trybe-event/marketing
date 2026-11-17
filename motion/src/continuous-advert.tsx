import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Lockup, Mark, palette } from "./brand";
import { MotionStudy } from "./motion-study";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = (frame: number, start: number, end: number) => {
  const value = interpolate(frame, [start, end], [0, 1], clamp);
  return value * value * (3 - 2 * value);
};
const between = (frame: number, start: number, end: number) =>
  ease(frame, start, start + 20) * (1 - ease(frame, end - 20, end));
const move = (
  frame: number,
  start: number,
  end: number,
  from: number,
  to: number,
) => from + (to - from) * ease(frame, start, end);
const paper: React.CSSProperties = {
  background: palette.paper,
  color: palette.ink,
  borderRadius: 30,
  boxShadow: "0 40px 90px #0008",
};

function FloatingLabel({
  children,
  left,
  top,
  depth = 0,
}: {
  children: React.ReactNode;
  left: number;
  top: number;
  depth?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        fontSize: 20,
        padding: "13px 22px",
        border: "1px solid #c3ef6655",
        borderRadius: 50,
        color: palette.paper,
        background: "#14261cdd",
        transform: `translateZ(${depth}px)`,
      }}
    >
      {children}
    </div>
  );
}

function ProfileSequence({ frame }: { frame: number }) {
  const select = ease(frame, 350, 370);
  const accept = ease(frame, 405, 425);
  const tilt = move(frame, 272, 452, -15, 11);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 150,
          fontSize: 100,
          fontWeight: 800,
          letterSpacing: -6,
          lineHeight: 1.05,
          transform: `translateZ(70px) rotateY(-9deg)`,
        }}
      >
        Shared interests.
        <br />
        <span style={{ color: palette.lime }}>Real introductions.</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1090,
          top: 230,
          width: 510,
          ...paper,
          padding: 28,
          transformStyle: "preserve-3d",
          transform: `rotateY(${tilt}deg) rotateZ(-4deg) translateZ(110px)`,
        }}
      >
        <div
          style={{
            height: 170,
            overflow: "hidden",
            borderRadius: 19,
            position: "relative",
          }}
        >
          <Img
            src={staticFile("attendees.webp")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "60% 40%",
            }}
          />
        </div>
        <div style={{ marginTop: 23, fontSize: 34, fontWeight: 750 }}>
          The next collaborator
        </div>
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: 18,
            marginTop: 9,
            color: "#5c6756",
          }}
        >
          Designer. Builder. Curious by nature.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {["Design", "Technology", "Ideas"].map((text) => (
            <span
              key={text}
              style={{
                padding: "9px 13px",
                fontSize: 15,
                borderRadius: 30,
                background: "#e7ecdf",
              }}
            >
              {text}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 26,
            padding: 18,
            borderRadius: 18,
            fontSize: 20,
            fontWeight: 700,
            background: accept > 0.5 ? palette.forest : palette.lime,
            color: accept > 0.5 ? palette.paper : palette.ink,
            textAlign: "center",
            transform: `translateZ(12px) scale(${1 - Math.sin(select * Math.PI) * 0.06})`,
          }}
        >
          {accept > 0.5 ? "Connection accepted" : "Request to connect"}
        </div>
      </div>
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <path
          d="M 410 650 C 550 1030 1460 1080 1390 815"
          fill="none"
          stroke={palette.lime}
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - select}
        />
        <circle
          cx={move(frame, 365, 405, 410, 1390)}
          cy={850 - Math.sin(ease(frame, 365, 405) * Math.PI) * -60}
          r="7"
          fill={palette.lime}
          opacity={between(frame, 365, 405)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 600,
          transform: `translateZ(160px) rotateZ(5deg)`,
          ...paper,
          padding: "22px 28px",
          fontSize: 23,
          opacity: select,
        }}
      >
        <span style={{ color: "#658536" }}>↗</span> An introduction starts with
        a request.
      </div>
      <FloatingLabel left={650} top={460} depth={-100}>
        Mutual consent. Always.
      </FloatingLabel>
    </div>
  );
}

function PrivacySequence({ frame }: { frame: number }) {
  const open = ease(frame, 480, 550);
  const choose = ease(frame, 555, 572);
  return (
    <div
      style={{
        position: "absolute",
        left: 2500,
        top: -140,
        width: 1920,
        height: 1080,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 190,
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: -6,
          lineHeight: 1.02,
          transform: "translateZ(70px) rotateY(8deg)",
        }}
      >
        Your details.
        <br />
        <span style={{ color: palette.lime }}>Your decision.</span>
      </div>
      {[
        {
          name: "Portfolio",
          value: "People at my events",
          color: palette.paper,
        },
        { name: "LinkedIn", value: "My connections", color: palette.lime },
        { name: "WhatsApp", value: "Only me", color: palette.paper },
      ].map((link, index) => {
        const offset = (index - 1) * 130 * open;
        return (
          <div
            key={link.name}
            style={{
              position: "absolute",
              left: 1080 + index * 20,
              top: 400 + offset,
              width: 520,
              height: 145,
              ...paper,
              background: link.color,
              padding: "28px 32px",
              transform: `translateZ(${(2 - index) * 65}px) rotateY(-18deg) rotateZ(${(index - 1) * open * 6}deg)`,
              opacity: ease(frame, 450 + index * 8, 480 + index * 8),
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 750 }}>{link.name}</div>
            <div style={{ fontSize: 16, marginTop: 10 }}>{link.value}</div>
            <div
              style={{
                position: "absolute",
                right: 30,
                top: 48,
                width: 74,
                height: 41,
                borderRadius: 30,
                background: index === 2 ? "#ccd2c6" : palette.forest,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: index === 2 ? 6 : 6 + choose * 31,
                  top: 6,
                  width: 29,
                  height: 29,
                  borderRadius: 20,
                  background: index === 2 ? palette.paper : palette.lime,
                }}
              />
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 190,
          top: 655,
          fontSize: 22,
          color: palette.muted,
          transform: "translateZ(90px)",
        }}
      >
        Private by default.
        <br />
        Shared on your terms.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1600,
          top: 685,
          transform: `translateZ(240px) rotate(${frame * 0.55}deg)`,
        }}
      >
        <Mark size={110} />
      </div>
    </div>
  );
}

function ConversationSequence({ frame }: { frame: number }) {
  const talk = ease(frame, 710, 750);
  const messages = [
    {
      text: "Good to meet you. What are you building?",
      start: 685,
      own: false,
    },
    { text: "Something we should talk about.", start: 735, own: true },
    { text: "Let's keep this going after the event.", start: 790, own: false },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 5000,
        top: 120,
        width: 1920,
        height: 1080,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 180,
          fontSize: 110,
          fontWeight: 800,
          letterSpacing: -7,
          lineHeight: 1.02,
          transform: "translateZ(130px) rotateY(-8deg)",
        }}
      >
        Before the event.
        <br />
        <span style={{ color: palette.lime }}>Beyond the room.</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1120,
          top: 260,
          width: 475,
          minHeight: 490,
          ...paper,
          padding: 28,
          transform: `translateZ(${100 + talk * 70}px) rotateY(${16 - talk * 28}deg) rotateZ(4deg)`,
        }}
      >
        <div
          style={{
            fontWeight: 750,
            fontSize: 23,
            paddingBottom: 22,
            borderBottom: "1px solid #d5ddcf",
          }}
        >
          A new conversation
        </div>
        {messages.map((message, index) => {
          const appear = ease(frame, message.start, message.start + 18);
          return (
            <div
              key={message.text}
              style={{
                marginTop: 25,
                marginLeft: message.own ? 45 : 0,
                marginRight: message.own ? 0 : 35,
                padding: "17px 20px",
                borderRadius: 20,
                fontSize: 18,
                lineHeight: 1.5,
                background: message.own ? palette.lime : "#e8ede2",
                opacity: appear,
                transform: `translateZ(${index * 15}px) translateY(${(1 - appear) * 80}px) scale(${0.85 + appear * 0.15})`,
              }}
            >
              {message.text}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 320,
          top: 690,
          display: "flex",
          gap: 35,
          transform: `translateZ(60px) rotateY(8deg)`,
        }}
      >
        {["Before", "During", "After"].map((word, index) => (
          <div
            key={word}
            style={{
              fontSize: 20,
              padding: "15px 27px",
              borderRadius: 40,
              border: "1px solid #c3ef6666",
              background:
                index === Math.min(2, Math.floor(Math.max(0, frame - 670) / 60))
                  ? palette.lime
                  : palette.forest,
              color:
                index === Math.min(2, Math.floor(Math.max(0, frame - 670) / 60))
                  ? palette.ink
                  : palette.paper,
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}

function InvitationResolve({ frame }: { frame: number }) {
  const rotation = move(frame, 840, 970, -28, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: 7500,
        top: -60,
        width: 1920,
        height: 1080,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 170,
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: -6,
          lineHeight: 1.04,
          transform: "translateZ(80px)",
        }}
      >
        Bring people together.
        <br />
        <span style={{ color: palette.lime }}>Let possibility follow.</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1200,
          top: 440,
          width: 330,
          ...paper,
          padding: 28,
          transform: `translateZ(160px) rotateY(${rotation}deg) rotateZ(-9deg)`,
        }}
      >
        <Img src={staticFile("qr.svg")} style={{ width: 274, height: 274 }} />
        <div style={{ fontWeight: 750, fontSize: 26, marginTop: 16 }}>
          One invitation.
        </div>
        <div style={{ fontSize: 17, marginTop: 10 }}>A whole community.</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 260,
          top: 620,
          transform: `translateZ(140px) rotateZ(6deg)`,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Mark size={100} rotation={frame * 1.2} />
        <div style={{ fontSize: 28, fontWeight: 700 }}>
          Create. Join. Connect.
        </div>
      </div>
    </div>
  );
}

export function ContinuousAdvert() {
  const frame = useCurrentFrame();
  const leaveStudy = ease(frame, 245, 285);
  const firstStage = ease(frame, 270, 325);
  const secondStage = ease(frame, 435, 490);
  const thirdStage = ease(frame, 630, 690);
  const fourthStage = ease(frame, 825, 880);
  const close = ease(frame, 975, 1010);
  const logo = ease(frame, 1100, 1140);
  const cameraX = 2500 * secondStage + 2500 * thirdStage + 2500 * fourthStage;
  const cameraY = -140 * secondStage + 260 * thirdStage - 180 * fourthStage;
  const travel =
    Math.sin(secondStage * Math.PI) +
    Math.sin(thirdStage * Math.PI) +
    Math.sin(fourthStage * Math.PI);
  return (
    <AbsoluteFill
      style={{
        background: palette.forest,
        color: palette.paper,
        fontFamily: "Manrope",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${55 + Math.sin(frame * 0.012) * 12}% ${48 + Math.cos(frame * 0.01) * 12}%,#395832,${palette.forest} 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - leaveStudy,
          transform: `scale(${1 + leaveStudy * 1.8}) rotate(${leaveStudy * -18}deg)`,
        }}
      >
        <MotionStudy timelineFrame={Math.min(frame, 240)} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: 1600,
          opacity: firstStage * (1 - close),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `scale(${1 - travel * 0.18}) rotateY(${travel * 8}deg) rotateZ(${Math.sin(frame * 0.012) * 1.4}deg) translate3d(${-cameraX}px,${-cameraY}px,${-travel * 160}px)`,
          }}
        >
          <svg
            width="9800"
            height="1500"
            viewBox="0 0 9800 1500"
            style={{
              position: "absolute",
              left: 0,
              top: -180,
              overflow: "visible",
              transform: "translateZ(-160px)",
              opacity: 0.65,
            }}
          >
            <path
              d="M 1300 950 C 2300 1450 2550 100 3300 550 S 4500 1100 5500 950 S 7000 0 8200 650 S 9100 1300 9700 800"
              fill="none"
              stroke={palette.lime}
              strokeWidth="2"
              strokeDasharray="4 14"
              strokeDashoffset={-frame * 3}
            />
          </svg>
          <ProfileSequence frame={frame} />
          <PrivacySequence frame={frame} />
          <ConversationSequence frame={frame} />
          <InvitationResolve frame={frame} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 78,
          opacity: firstStage * (1 - close),
        }}
      >
        <Lockup size={34} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: close * (1 - logo),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transform: `scale(${0.86 + close * 0.14})`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 5,
            color: palette.lime,
            marginBottom: 30,
          }}
        >
          MAKE THE ROOM MEAN MORE
        </div>
        <div style={{ fontWeight: 750, fontSize: 86, letterSpacing: -4 }}>
          trybe-zeta.vercel.app
        </div>
        <div
          style={{
            width: 820,
            height: 3,
            background: palette.lime,
            marginTop: 32,
            transformOrigin: "left",
            transform: `scaleX(${ease(frame, 1010, 1060)})`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: logo,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transform: `scale(${0.72 + logo * 0.28})`,
        }}
      >
        <Lockup size={145} rotation={(1 - logo) * -200} />
        <div
          style={{
            fontSize: 23,
            fontFamily: "DM Sans",
            color: palette.muted,
            marginTop: 42,
          }}
        >
          Fostering connection with convenience.
        </div>
      </div>
    </AbsoluteFill>
  );
}
