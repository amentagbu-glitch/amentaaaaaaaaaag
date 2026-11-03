import { ReelPlayer } from "./ReelPlayer";
import { IconArrow } from "./icons";

type Slide = { src: string; poster: string; title: string; meta: string };

/**
 * Slideshow of vertical videos in one phone frame. Swipe on phones, arrows and dots elsewhere.
 * /fx.js plays the visible video muted and moves to the next one when it ends.
 */
export function ReelCarousel({ slides, labels }: { slides: Slide[]; labels: { prev: string; next: string; soundOn: string; soundOff: string; play: string; slide: string } }) {
  return (
    <div data-carousel className="relative w-full max-w-[290px]">
      <div className="rounded-[30px] border border-line bg-elevated p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
        <div data-track dir="ltr" className="reel-track flex snap-x snap-mandatory overflow-x-auto rounded-[22px]">
          {slides.map((s, i) => (
            <div key={s.src} data-slide={i} className="w-full shrink-0 snap-center">
              <ReelPlayer src={s.src} poster={s.poster} label={s.title} soundOn={labels.soundOn} soundOff={labels.soundOff} play={labels.play} loop={slides.length < 2} />
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3" dir="ltr">
          <button type="button" data-carousel-prev aria-label={labels.prev} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-line-strong hover:text-text">
            <IconArrow className="h-4 w-4 -scale-x-100" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            {slides.map((s, i) => (
              <p key={s.src} data-caption={i} data-active={i === 0 ? "" : undefined} className="reel-caption truncate text-sm">
                <span className="font-medium text-text" dir="auto">{s.title}</span> <span className="font-mono text-xs text-muted">· {s.meta}</span>
              </p>
            ))}
            <div className="mt-2 flex justify-center gap-1.5">
              {slides.map((s, i) => (
                <button key={s.src} type="button" data-carousel-dot={i} aria-label={`${labels.slide} ${i + 1}`} aria-current={i === 0 ? "true" : undefined} className="reel-dot h-1.5 w-4 rounded-full bg-line transition-all" />
              ))}
            </div>
          </div>
          <button type="button" data-carousel-next aria-label={labels.next} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-line-strong hover:text-text">
            <IconArrow className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
