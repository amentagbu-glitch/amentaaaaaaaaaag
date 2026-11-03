import { IconPlay, IconVolume, IconVolumeOff } from "./icons";

/**
 * Vertical video in a phone-style frame. /fx.js plays it muted while it is on screen
 * (never with sound on its own); the button turns the sound on and off.
 */
export function ReelPlayer({ src, poster, label, soundOn, soundOff, play, className = "" }: { src: string; poster: string; label: string; soundOn: string; soundOff: string; play: string; className?: string }) {
  return (
    <div data-reel className={`relative aspect-[9/16] overflow-hidden rounded-[22px] bg-black ${className}`}>
      <video src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} className="h-full w-full object-cover" />
      <button type="button" data-reel-play aria-label={play} className="reel-play absolute inset-0 items-center justify-center bg-black/25">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#070B14] shadow-lg">
          <IconPlay className="h-6 w-6 translate-x-[2px]" />
        </span>
      </button>
      <button
        type="button"
        data-reel-sound
        data-label-on={soundOn}
        data-label-off={soundOff}
        aria-label={soundOn}
        className="absolute bottom-3 end-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
      >
        <IconVolumeOff className="reel-muted-icon h-5 w-5" />
        <IconVolume className="reel-sound-icon h-5 w-5" />
      </button>
    </div>
  );
}
