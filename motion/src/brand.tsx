import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const palette = {
  ink: "#20261d",
  forest: "#14261c",
  lime: "#c3ef66",
  paper: "#faf9f5",
  muted: "#b6c6b4",
  line: "#dce3d4",
};
const paths = [
  "M 19.737 11.736 C 20.529 8.222 27.880 8.947 29.207 7.731",
  "M 23.657 14.799 C 26.702 12.874 31.387 18.584 33.186 18.663",
  "M 24.264 19.737 C 27.778 20.529 27.053 27.880 28.269 29.207",
  "M 21.201 23.657 C 23.126 26.702 17.416 31.387 17.337 33.186",
  "M 16.263 24.264 C 15.471 27.778 8.120 27.053 6.793 28.269",
  "M 12.343 21.201 C 9.298 23.126 4.613 17.416 2.814 17.337",
  "M 11.736 16.263 C 8.222 15.471 8.947 8.120 7.731 6.793",
  "M 14.799 12.343 C 12.874 9.298 18.584 4.613 18.663 2.814",
];

export const Mark = ({
  size = 90,
  color = palette.lime,
  rotation = 0,
}: {
  size?: number;
  color?: string;
  rotation?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="-1 -1 38 38"
    style={{ overflow: "visible", transform: `rotate(${rotation}deg)` }}
  >
    <g fill="none" stroke={color} strokeWidth="5.5" strokeLinecap="round">
      {paths.map((path, index) => (
        <path key={index} d={path} />
      ))}
    </g>
    <circle cx="18" cy="18" r="5" fill={color} />
  </svg>
);

export const Lockup = ({
  size = 66,
  color = palette.paper,
  markColor = palette.lime,
  rotation = 0,
}: {
  size?: number;
  color?: string;
  markColor?: string;
  rotation?: number;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: size * 0.2,
      whiteSpace: "nowrap",
    }}
  >
    <Mark size={size * 1.12} color={markColor} rotation={rotation} />
    <div
      style={{
        fontFamily: "Fredoka",
        fontSize: size,
        fontWeight: 600,
        letterSpacing: -size * 0.055,
        lineHeight: 1,
        color,
      }}
    >
      trybe<span style={{ color: markColor }}>.</span>
    </div>
  </div>
);

export const easeOut = (
  frame: number,
  start: number = 0,
  duration: number = 28,
) => Math.max(0, Math.min(1, (frame - start) / duration));
export const smooth = (value: number) =>
  1 - Math.pow(1 - Math.max(0, Math.min(1, value)), 3);
export function Reveal({
  children,
  delay = 0,
  size = 126,
  color = palette.ink,
  weight = 750,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 22, stiffness: 150, mass: 0.9 },
  });
  return (
    <div
      style={{
        overflow: "hidden",
        paddingBottom: size * 0.12,
        marginBottom: -size * 0.1,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "Manrope",
          fontSize: size,
          fontWeight: weight,
          lineHeight: 1.04,
          letterSpacing: -size * 0.065,
          color,
          transform: `translate3d(0,${(1 - progress) * 115}%,0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
export const Eyebrow = ({
  children,
  color = palette.muted,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <div
    style={{
      fontFamily: "DM Sans",
      fontSize: 19,
      fontWeight: 600,
      letterSpacing: 4,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);
export const FineGrid = ({ dark = false }: { dark?: boolean }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity: dark ? 0.11 : 0.07,
      backgroundImage: `linear-gradient(${dark ? "#c3ef66" : "#14261c"} 1px, transparent 1px),linear-gradient(90deg,${dark ? "#c3ef66" : "#14261c"} 1px, transparent 1px)`,
      backgroundSize: "120px 120px",
      maskImage: "radial-gradient(ellipse at center,black,transparent 74%)",
    }}
  />
);
export function Corner({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ position: "absolute", top: 56, left: 66, zIndex: 10 }}>
      <Lockup
        size={42}
        color={dark ? palette.paper : palette.ink}
        markColor={dark ? palette.lime : palette.ink}
      />
    </div>
  );
}
export const rule = (
  frame: number,
  start: number,
  end: number,
  from: number,
  to: number,
) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
