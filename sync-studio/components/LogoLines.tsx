/**
 * The Sync Studio mark as animated lines, for backgrounds.
 * Outlines traced exactly from the official "Favicon bright" file (brand/originals), not redrawn.
 * The lines draw themselves in, then a light keeps running along the edges.
 */
const PANELS = [
  "M46.7 359.0 L746.3 212.0 L985.4 1.3 L439.7 0.0 Z", // top panel
  "M938.8 456.9 L531.7 344.2 L46.7 372.0 L411.2 530.1 Z", // middle panel
  "M938.8 469.4 L239.1 616.3 L0.0 827.0 L545.7 828.3 Z", // bottom panel
];
const STAR = "M914.0 118.4 L925.2 173.7 L877.8 204.4 L933.2 193.2 L963.8 240.4 L952.7 185.3 L1000.0 154.5 L944.9 165.8 Z";

export function LogoLines({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`logo-lines pointer-events-none ${className}`}>
      <svg viewBox="-20 -20 1040 870" className="h-full w-full overflow-visible" fill="none">
        <g className="ll-base">
          {PANELS.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ ["--d" as string]: `${i * 0.35}s` }} />
          ))}
          <path d={STAR} pathLength={1} style={{ ["--d" as string]: "1.1s" }} />
        </g>
        <g className="ll-comet">
          {PANELS.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ ["--d" as string]: `${-i * 2.3}s` }} />
          ))}
        </g>
        <path className="ll-star" d={STAR} />
      </svg>
    </div>
  );
}
