/** Dotted globe centred on Agadir, drawn by /globe.js. */
export function HeroGlobe() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] sm:h-[380px] lg:h-[430px]" aria-hidden>
      <div className="glow bottom-[18%] start-1/2 h-[260px] w-[min(900px,90vw)] -translate-x-1/2 rtl:translate-x-1/2" />
      <canvas data-globe className="relative h-full w-full" />
    </div>
  );
}
