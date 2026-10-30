/** Soft light that follows the cursor inside a card (driven by /fx.js). Add data-spot to the card. */
export function Spot() {
  return (
    <span className="spot-wrap" aria-hidden>
      <span className="spot" />
    </span>
  );
}
