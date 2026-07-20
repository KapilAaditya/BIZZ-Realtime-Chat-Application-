import React from 'react';

const gridStyle = (color) => ({
  backgroundImage: [
    `linear-gradient(${color} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  ].join(","),
  backgroundSize: "24px 24px",
});

const darkGridMask =
  "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, #000 45%, transparent 100%)";

export function AuthHeroPattern() {
  return (
    <>
      {/* Soft ambient ambient background radial blue core glow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]"
      />
      {/* Subtle geometric digital background matrix lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{
          ...gridStyle("rgba(255,255,255,0.05)"),
          WebkitMaskImage: darkGridMask,
          maskImage: darkGridMask,
        }}
      />
    </>
  );
}