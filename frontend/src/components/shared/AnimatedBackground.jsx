import { useTheme } from "../../context/ThemeContext";
import { useMemo } from "react";

// ─── Icons (24 unique banking/finance icons) ──────────────────
const icons = [
  { paths: ["M4 10 L12 4 L20 10","M6 10 L6 18","M10 10 L10 18","M14 10 L14 18","M18 10 L18 18","M3 18 L21 18"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M12 3 L5 6 L5 12 C5 16.5 8.5 20.5 12 21 C15.5 20.5 19 16.5 19 12 L19 6 L12 3Z","M9 12 L11 14 L15 10"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M12 2 L12 22","M17 6 C17 4 14.5 3 12 3 C9.5 3 7 4.2 7 6.5 C7 9.5 17 8.5 17 11.5 C17 14 14.5 15 12 15 C9.5 15 7 13.8 7 11.5"], viewBox:"0 0 24 24", strokeWidth:2.5 },
  { paths: ["M6 9 C6 6 10 4 15 4 C20 4 24 6 24 9 C24 12 20 14 15 14 C10 14 6 12 6 9Z","M6 9 L6 15 C6 18 10 20 15 20 C20 20 24 18 24 15 L24 9","M6 12 C6 15 10 17 15 17 C20 17 24 15 24 12"], viewBox:"0 0 24 24", strokeWidth:1.8 },
  { paths: ["M5 11 L5 20 C5 21.1046 5.89543 22 7 22 L17 22 C18.1046 22 19 21.1046 19 20 L19 11","M12 15 L12 17","M8 11 L8 7 C8 4.79086 9.79086 3 12 3 C14.2091 3 16 4.79086 16 7 L16 11 L8 11"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M23 6 L13.5 15.5 L8.5 10.5 L1 18","M17 6 L23 6 L23 12","M1 21 L23 21"], viewBox:"0 0 24 24", strokeWidth:2.5 },
  { paths: ["M17 2 L7 2 C5.89543 2 5 2.89543 5 4 L5 20 C5 21.1046 5.89543 22 7 22 L17 22 C18.1046 22 19 21.1046 19 20 L19 4 C19 2.89543 18.1046 2 17 2Z","M9 7 L15 7","M9 11 L15 11","M12 18 L12.01 18"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M3 6 L21 6 C21 4.89543 20.1046 4 19 4 L5 4 C3.89543 4 3 4.89543 3 6 L3 18 C3 19.1046 3.89543 20 5 20 L19 20 C20.1046 20 21 19.1046 21 18 L21 6","M3 10 L21 10","M7 15 L11 15"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M3 8 L21 8 C21 6.89543 20.1046 6 19 6 L5 6 C3.89543 6 3 6.89543 3 8 L3 18 C3 19.1046 3.89543 20 5 20 L19 20 C20.1046 20 21 19.1046 21 18 L21 8","M3 11 L21 11","M15 14 C15 13.4477 15.4477 13 16 13 C16.5523 13 17 13.4477 17 14 C17 14.5523 16.5523 15 16 15 C15.4477 15 15 14.5523 15 14Z"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M21 12 C21 16.9706 16.9706 21 12 21 C7.02944 21 3 16.9706 3 12 C3 7.02944 7.02944 3 12 3","M12 3 L12 12 L21 12"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M17 7 L7 7","M7 7 L10 4","M7 7 L10 10","M7 17 L17 17","M17 17 L14 14","M17 17 L14 20"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M3 20 L21 20","M5 20 L5 14","M9 20 L9 8","M13 20 L13 12","M17 20 L17 4"], viewBox:"0 0 24 24", strokeWidth:2.2 },
  { paths: ["M19 5 L5 19","M6.5 7 C6.5 7.82843 5.82843 8.5 5 8.5 C4.17157 8.5 3.5 7.82843 3.5 7 C3.5 6.17157 4.17157 5.5 5 5.5 C5.82843 5.5 6.5 6.17157 6.5 7Z","M20.5 17 C20.5 17.8284 19.8284 18.5 19 18.5 C18.1716 18.5 17.5 17.8284 17.5 17 C17.5 16.1716 18.1716 15.5 19 15.5 C19.8284 15.5 20.5 16.1716 20.5 17Z"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M20 7 L4 7 C2.89543 7 2 7.89543 2 9 L2 19 C2 20.1046 2.89543 21 4 21 L20 21 C21.1046 21 22 20.1046 22 19 L22 9 C22 7.89543 21.1046 7 20 7Z","M16 7 L16 5 C16 3.89543 15.1046 3 14 3 L10 3 C8.89543 3 8 3.89543 8 5 L8 7","M12 12 L12 16","M2 13 L22 13"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M12 2 C6.47715 2 2 6.47715 2 12 C2 17.5228 6.47715 22 12 22 C17.5228 22 22 17.5228 22 12 C22 6.47715 17.5228 2 12 2Z","M2 12 L22 12","M12 2 C9.5 6 8 9 8 12 C8 15 9.5 18 12 22","M12 2 C14.5 6 16 9 16 12 C16 15 14.5 18 12 22"], viewBox:"0 0 24 24", strokeWidth:1.8 },
  { paths: ["M21 2 L19 4","M18 5 C19.1046 6.10457 19.1046 7.89543 18 9 C16.8954 10.1046 15.1046 10.1046 14 9 C12.8954 7.89543 12.8954 6.10457 14 5 C15.1046 3.89543 16.8954 3.89543 18 5Z","M14 9 L3 20","M3 17 L6 17","M3 20 L6 20"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M6 2 L18 2 L18 10 C18 13.3137 15.3137 16 12 16 C8.68629 16 6 13.3137 6 10 L6 2Z","M6 4 L2 4 C2 8 4 10 6 10","M18 4 L22 4 C22 8 20 10 18 10","M12 16 L12 20","M8 20 L16 20"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M14 2 L6 2 C4.89543 2 4 2.89543 4 4 L4 20 L7 18 L10 20 L12 18 L14 20 L17 18 L20 20 L20 4 C20 2.89543 19.1046 2 18 2 L14 2Z","M8 7 L16 7","M8 11 L16 11","M8 15 L12 15"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M3 6 L21 6 C21 4.89543 20.1046 4 19 4 L5 4 C3.89543 4 3 4.89543 3 6 L3 20 C3 19.1046 3.89543 22 5 22 L19 22 C20.1046 22 21 21.1046 21 20 L21 6","M3 10 L21 10","M8 2 L8 6","M16 2 L16 6","M7 14 L9 14","M11 14 L13 14","M15 14 L17 14","M7 18 L9 18","M11 18 L13 18"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M13 2 L4.5 13.5 L11 13.5 L11 22 L19.5 10.5 L13 10.5 L13 2Z"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M3 12 L12 4 L21 12","M5 10 L5 20 C5 20.5523 5.44772 21 6 21 L10 21 L10 16 C10 15.4477 10.4477 15 11 15 L13 15 C13.5523 15 14 15.4477 14 16 L14 21 L18 21 C18.5523 21 19 20.5523 19 20 L19 10"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M2 12 L8 12","M16 12 L22 12","M8 12 C8 12 9 8 12 8 C14 8 14.5 9 16 9 L16 12","M8 12 L8 15 C8 15 9 16 12 16 C15 16 16 15 16 15 L16 12","M5 9 L2 12 L5 15","M19 9 L22 12 L19 15"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M22 12 C22 17.5228 17.5228 22 12 22 C6.47715 22 2 17.5228 2 12 C2 6.47715 6.47715 2 12 2 C17.5228 2 22 6.47715 22 12Z","M8 12 L11 15 L16 9"], viewBox:"0 0 24 24", strokeWidth:2 },
  { paths: ["M11 18 C14.866 18 18 14.866 18 11 C18 7.13401 14.866 4 11 4 C7.13401 4 4 7.13401 4 11 C4 14.866 7.13401 18 11 18Z","M20 20 L16 16","M8 11 L14 11","M11 8 L11 14"], viewBox:"0 0 24 24", strokeWidth:2 },
];

// ─── Palettes ──────────────────────────────────────────────
// Dark mode: bright, saturated neon tones — kept within a blue/teal/violet
// family with a single muted gold accent for contrast (instead of scattered
// warm hues clashing against each other).
const darkPalette = [
  { a: "#60A5FA", b: "#818CF8" }, // blue → indigo
  { a: "#2DD4BF", b: "#22D3EE" }, // teal → cyan
  { a: "#A78BFA", b: "#818CF8" }, // violet → indigo
  { a: "#38BDF8", b: "#60A5FA" }, // sky → blue
  { a: "#34D399", b: "#2DD4BF" }, // emerald → teal
  { a: "#C4B5FD", b: "#A78BFA" }, // light violet → violet
  { a: "#22D3EE", b: "#38BDF8" }, // cyan → sky
  { a: "#FBBF24", b: "#F59E0B" }, // gold accent, used sparingly (1 in 8)
];

// Light mode: same family, deepened for contrast against a light background.
const lightPalette = [
  { a: "#2563EB", b: "#4338CA" }, // blue → indigo
  { a: "#0D9488", b: "#0891B2" }, // teal → cyan
  { a: "#7C3AED", b: "#6D28D9" }, // violet
  { a: "#0891B2", b: "#2563EB" }, // cyan → blue
  { a: "#059669", b: "#0D9488" }, // emerald → teal
  { a: "#6366F1", b: "#7C3AED" }, // indigo → violet
  { a: "#0EA5E9", b: "#0891B2" }, // sky → cyan
  { a: "#D97706", b: "#B45309" }, // amber accent, used sparingly (1 in 8)
];

// ─── Bokeh orbs ──────────────────────────────────────────────
const orbsDark = [
  { cx: "15%", cy: "20%", r: 340, color: "rgba(79,70,229,0.10)",   dur: 22 },
  { cx: "75%", cy: "15%", r: 280, color: "rgba(34,211,238,0.08)",  dur: 28 },
  { cx: "85%", cy: "65%", r: 320, color: "rgba(167,139,250,0.09)", dur: 18 },
  { cx: "25%", cy: "75%", r: 260, color: "rgba(251,191,36,0.06)",  dur: 24 },
  { cx: "50%", cy: "45%", r: 200, color: "rgba(96,165,250,0.06)",  dur: 32 },
];

const orbsLight = [
  { cx: "15%", cy: "20%", r: 340, color: "rgba(199,210,254,0.35)", dur: 22 },
  { cx: "75%", cy: "15%", r: 280, color: "rgba(167,243,208,0.30)", dur: 28 },
  { cx: "85%", cy: "65%", r: 320, color: "rgba(233,213,255,0.28)", dur: 18 },
  { cx: "25%", cy: "75%", r: 260, color: "rgba(254,240,138,0.25)", dur: 24 },
  { cx: "50%", cy: "45%", r: 200, color: "rgba(186,230,253,0.25)", dur: 32 },
];

// ─── Animations ────────────────────────────────────────────
const animations = [
  { duration: 18, x: 16,  y: 12,  sd: 0.06 },
  { duration: 24, x: -20, y: 10,  sd: 0.08 },
  { duration: 20, x: 14,  y: -16, sd: 0.05 },
  { duration: 27, x: -22, y: 14,  sd: 0.07 },
  { duration: 22, x: 18,  y: -12, sd: 0.09 },
  { duration: 16, x: -14, y: 18,  sd: 0.05 },
  { duration: 26, x: 12,  y: -16, sd: 0.07 },
  { duration: 21, x: -16, y: 18,  sd: 0.06 },
  { duration: 23, x: 20,  y: -10, sd: 0.08 },
  { duration: 19, x: -18, y: 14,  sd: 0.05 },
  { duration: 25, x: 14,  y: -20, sd: 0.07 },
  { duration: 22, x: -12, y: 16,  sd: 0.06 },
  { duration: 17, x: -15, y: -12, sd: 0.07 },
  { duration: 29, x: 18,  y: 10,  sd: 0.05 },
  { duration: 21, x: -12, y: -18, sd: 0.08 },
  { duration: 24, x: 22,  y: 14,  sd: 0.06 },
  { duration: 18, x: -20, y: -10, sd: 0.07 },
  { duration: 26, x: 12,  y: 20,  sd: 0.05 },
  { duration: 20, x: -16, y: 12,  sd: 0.09 },
  { duration: 23, x: 14,  y: -14, sd: 0.06 },
  { duration: 28, x: -22, y: -8,  sd: 0.07 },
  { duration: 15, x: 20,  y: 16,  sd: 0.08 },
  { duration: 25, x: -10, y: -20, sd: 0.06 },
  { duration: 19, x: 24,  y: -12, sd: 0.07 },
];

// ─── Depth configs (3 layers: far/small, mid, near/large) ────
const depthConfigs = [
  ...Array(8).fill(null).map(() => ({ sMin: 42, sMax: 62,  oMin: 0.12, oMax: 0.22 })),
  ...Array(10).fill(null).map(() => ({ sMin: 70, sMax: 98,  oMin: 0.20, oMax: 0.35 })),
  ...Array(6).fill(null).map(() => ({ sMin: 112, sMax: 156, oMin: 0.28, oMax: 0.45 })),
];

export default function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Positions computed once per mount (stable across theme toggles)
  const positions = useMemo(() => {
    const placed = [];
    const result = [];
    for (let i = 0; i < icons.length; i++) {
      let x = 0, y = 0, att = 0;
      do {
        x = 4 + Math.random() * 90;
        y = 4 + Math.random() * 90;
        att++;
      } while (att < 50 && placed.some(p => Math.hypot(p.x - x, p.y - y) < 13));
      placed.push({ x, y });
      const depth = depthConfigs[i] ?? depthConfigs[depthConfigs.length - 1];
      result.push({
        x,
        y,
        size: depth.sMin + Math.random() * (depth.sMax - depth.sMin),
        rotation: (Math.random() - 0.5) * 50,
        opacity: depth.oMin + Math.random() * (depth.oMax - depth.oMin),
        anim: animations[i % animations.length],
        entranceDur: 0.6 + Math.random() * 0.6,
      });
    }
    return result;
  }, []);

  const palette = isDark ? darkPalette : lightPalette;
  const orbs = isDark ? orbsDark : orbsLight;

  // All @keyframes rendered directly in JSX — declarative, no manual
  // document.createElement/appendChild, so there's no timing/ordering
  // dependency between "define the CSS" and "use the CSS".
  const keyframesCSS = useMemo(() => {
    let css = "";

    for (let i = 0; i < 5; i++) {
      css += `
        @keyframes orbDrift${i} {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(${30 + i * 8}px,${-20 - i * 6}px) scale(1.06); }
          66%  { transform: translate(${-20 - i * 5}px,${25 + i * 7}px) scale(0.94); }
          100% { transform: translate(0,0) scale(1); }
        }
        @keyframes orbPulse${i} {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.72; }
        }`;
    }

    css += `
      @keyframes linePulse {
        0%,100% { opacity: 0.22; }
        50%     { opacity: 0.05; }
      }
      @keyframes bgShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes gridFade {
        0%,100% { opacity: ${isDark ? 0.04 : 0.06}; }
        50%     { opacity: ${isDark ? 0.07 : 0.09}; }
      }`;

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const { x, y, sd } = pos.anim;
      const r = pos.rotation;
      const op = pos.opacity;
      const peak = Math.min(op * 1.7, isDark ? 0.75 : 0.65);

      css += `
        @keyframes fadeInIcon${i} {
          from { opacity: 0; transform: scale(0.5); filter: blur(4px); }
          to   { opacity: 1; transform: scale(1);   filter: blur(0px); }
        }
        @keyframes floatBreatheIcon${i} {
          0%   { transform: translate(0px,0px) rotate(${r}deg) scale(1); opacity: ${op}; }
          20%  { transform: translate(${x}px,${-y*0.8}px) rotate(${r+8}deg) scale(${1+sd}); opacity: ${peak}; }
          40%  { transform: translate(${-x*0.7}px,${y}px) rotate(${r-5}deg) scale(${1-sd*0.4}); opacity: ${op * 0.9}; }
          60%  { transform: translate(${x*0.5}px,${-y*0.5}px) rotate(${r+4}deg) scale(${1+sd*0.6}); opacity: ${peak}; }
          80%  { transform: translate(${-x*0.3}px,${y*0.4}px) rotate(${r-3}deg) scale(${1-sd*0.2}); opacity: ${op * 0.95}; }
          100% { transform: translate(0px,0px) rotate(${r}deg) scale(1); opacity: ${op}; }
        }`;
    }

    return css;
  }, [isDark, positions]);

  // Constellation line segments
  const lines = useMemo(() => {
    const maxDist = 28;
    const result = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.hypot(positions[i].x - positions[j].x, positions[i].y - positions[j].y);
        if (dist < maxDist) {
          result.push({
            x1: positions[i].x, y1: positions[i].y,
            x2: positions[j].x, y2: positions[j].y,
            alpha: (1 - dist / maxDist) * (isDark ? 0.24 : 0.16),
            dur: 14 + (i % 4) * 3,
            delay: (i + j) * 0.18,
          });
        }
      }
    }
    return result;
  }, [positions, isDark]);

  const bg = isDark
    ? "linear-gradient(135deg,#0A0F1E 0%,#0D1B3E 30%,#0F172A 50%,#1A0B2E 75%,#0A0F1E 100%)"
    : "linear-gradient(135deg,#F0F4FF 0%,#F5FAF7 30%,#F8F4FF 55%,#FFFAED 80%,#F0F4FF 100%)";

  const gridColor = isDark ? "rgba(148,163,184,0.04)" : "rgba(99,102,241,0.04)";

  return (
    // amb-motion: exempts this purely decorative background from the
    // site-wide prefers-reduced-motion reset in index.css (see the
    // .amb-motion exception there).
    <div className="amb-motion" style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

      {/* Animated gradient base */}
      <div style={{
        position: "absolute", inset: 0,
        background: bg,
        backgroundSize: "300% 300%",
        animation: "bgShift 20s ease infinite",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle,${gridColor} 1px,transparent 1px)`,
        backgroundSize: "36px 36px",
        animation: "gridFade 8s ease-in-out infinite",
      }} />

      {/* Bokeh orbs */}
      {orbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          left: orb.cx, top: orb.cy,
          width: orb.r * 2, height: orb.r * 2,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%,${orb.color},transparent 70%)`,
          filter: `blur(${isDark ? 70 : 60}px)`,
          animation: `orbDrift${i} ${orb.dur}s ease-in-out infinite, orbPulse${i} ${orb.dur * 0.6}s ease-in-out infinite`,
        }} />
      ))}

      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "radial-gradient(ellipse 85% 80% at 50% 50%,transparent 40%,rgba(0,0,0,0.55) 100%)"
          : "radial-gradient(ellipse 85% 80% at 50% 50%,transparent 40%,rgba(255,255,255,0.6) 100%)",
      }} />

      {/* Constellation lines */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "visible" }}>
        {lines.map((l, idx) => (
          <line
            key={idx}
            x1={`${l.x1}%`} y1={`${l.y1}%`}
            x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke={isDark ? "#93C5FD" : "#6366F1"}
            strokeWidth={0.6}
            strokeOpacity={l.alpha}
            style={{ animation: `linePulse ${l.dur}s ease-in-out ${l.delay}s infinite` }}
          />
        ))}
      </svg>

      {/* Floating icons */}
      {positions.map((pos, index) => {
        const icon = icons[index % icons.length];
        const color = palette[index % palette.length];
        const color2 = palette[(index + 2) % palette.length];
        const color3 = palette[(index + 5) % palette.length];
        const { duration } = pos.anim;
        const entranceDelay = index * 0.06;
        const gradId = `grad-${index}`;
        const filterId = `glow-${index}`;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${pos.x}%`, top: `${pos.y}%`,
              width: pos.size, height: pos.size,
              marginLeft: -pos.size / 2, marginTop: -pos.size / 2,
              pointerEvents: "none",
              zIndex: 2,
              animation: `fadeInIcon${index} ${pos.entranceDur}s cubic-bezier(.22,1,.36,1) ${entranceDelay}s both`,
            }}
          >
            <div style={{
              width: "100%", height: "100%",
              willChange: "transform, opacity",
              animation: `floatBreatheIcon${index} ${duration}s ease-in-out infinite`,
            }}>
              <svg viewBox={icon.viewBox} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color.a} />
                    <stop offset="50%" stopColor={color3.a} />
                    <stop offset="100%" stopColor={color2.a} />
                  </linearGradient>
                  <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%" filterUnits="userSpaceOnUse">
                    {isDark ? (
                      <>
                        <feGaussianBlur stdDeviation="1.5" in="SourceGraphic" result="b1" />
                        <feGaussianBlur stdDeviation="4" in="SourceGraphic" result="b2" />
                        <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="bloom" />
                        <feMerge>
                          <feMergeNode in="bloom" />
                          <feMergeNode in="b2" />
                          <feMergeNode in="b1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </>
                    ) : (
                      <>
                        <feGaussianBlur stdDeviation="1" in="SourceGraphic" result="b1" />
                        <feGaussianBlur stdDeviation="2.5" in="SourceGraphic" result="b2" />
                        <feMerge>
                          <feMergeNode in="b2" />
                          <feMergeNode in="b1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </>
                    )}
                  </filter>
                </defs>
                <g filter={`url(#${filterId})`}>
                  {icon.paths.map((d, pi) => (
                    <path
                      key={pi}
                      d={d}
                      stroke={`url(#${gradId})`}
                      strokeWidth={icon.strokeWidth * (isDark ? 1.6 : 1.5)}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}