import { TRUST_SCORE_PALETTE } from "./trust-score-palette";

type ZoneSpec = {
  flex: number;
  bar: string;
  label: { text: string; color: string; bold?: boolean } | null;
  ticks: number;
};

/** Flex weights ~15% / 15% / 15% / 30% / 25% — `gap-2` shows gutters between bands. */
const SPECTRUM_ZONES: ZoneSpec[] = [
  { flex: 3, bar: TRUST_SCORE_PALETTE.red, label: null, ticks: 12 },
  {
    flex: 3,
    bar: TRUST_SCORE_PALETTE.orange,
    label: { text: "Avoid", color: TRUST_SCORE_PALETTE.orange },
    ticks: 14,
  },
  {
    flex: 3,
    bar: TRUST_SCORE_PALETTE.blue,
    label: { text: "Caution", color: TRUST_SCORE_PALETTE.blue },
    ticks: 14,
  },
  {
    flex: 6,
    bar: TRUST_SCORE_PALETTE.greenLight,
    label: { text: "Trusted", color: TRUST_SCORE_PALETTE.green },
    ticks: 22,
  },
  {
    flex: 5,
    bar: TRUST_SCORE_PALETTE.green,
    label: { text: "Highly Trusted", color: TRUST_SCORE_PALETTE.green, bold: true },
    ticks: 20,
  },
];

const END_CAP_CLASS = "flex w-7 shrink-0 flex-col justify-end sm:w-8";

function ZoneTicks({ color, count }: { color: string; count: number }) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 gap-[2px] sm:gap-[3px]">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="block min-h-0 min-w-px flex-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

type TrustScoreSpectrumProps = {
  score: number;
  maximum: number;
  bandLabel: string;
};

export function TrustScoreSpectrum({ score, maximum, bandLabel }: TrustScoreSpectrumProps) {
  const pct = Math.min(100, Math.max(0, (score / maximum) * 100));

  return (
    <div className="w-full">
      <div className="mb-1.5 flex w-full gap-2 sm:mb-2">
        <div className="flex min-w-0 flex-1 gap-2">
          {SPECTRUM_ZONES.map((zone, i) => (
            <div
              key={i}
              className="flex min-w-0 flex-col justify-end"
              style={{ flex: `${zone.flex} 1 0%` }}
            >
              {zone.label ? (
                <span
                  className={`block text-center text-[0.6875rem] font-semibold leading-tight sm:text-body-xs ${zone.label.bold ? "font-bold" : ""}`}
                  style={{ color: zone.label.color }}
                >
                  {zone.label.text}
                </span>
              ) : (
                <span className="block min-h-4.5 sm:min-h-5.25" aria-hidden />
              )}
            </div>
          ))}
        </div>
        <div className={END_CAP_CLASS}>
          <span
            className="text-right text-[0.6875rem] font-medium sm:text-body-xs"
            style={{ color: TRUST_SCORE_PALETTE.labelMuted }}
          >
            {maximum}
          </span>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <div className="relative min-h-9 min-w-0 flex-1 overflow-hidden rounded-[2px]  bg-neutral-0 sm:min-h-10">
          <div
            className="flex h-9 gap-1 p-1 sm:h-10 sm:p-1.5"
            role="img"
            aria-label={`Trust score ${score} out of ${maximum}, ${bandLabel}`}
          >
            {SPECTRUM_ZONES.map((zone, i) => (
              <div
                key={i}
                className="flex min-h-0 min-w-0 overflow-hidden"
                style={{ flex: `${zone.flex} 1 0%` }}
              >
                <ZoneTicks color={zone.bar} count={zone.ticks} />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-1 sm:inset-1.5">
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-2 w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.9)]"
              style={{
                left: `${pct}%`,
                backgroundColor: TRUST_SCORE_PALETTE.green,
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full gap-2">
        <div className="relative h-6 min-w-0 flex-1 px-1 sm:h-7 sm:px-1.5">
          <span
            className="absolute max-w-[min(100%,16rem)] -translate-x-1/2 truncate text-center font-display text-body-xs font-semibold text-text-black sm:max-w-none sm:text-body-sm sm:whitespace-nowrap"
            style={{ left: `${pct}%` }}
            title={`${score} – ${bandLabel}`}
          >
            {score} – {bandLabel}
          </span>
        </div>
        <div className="w-7 shrink-0 sm:w-8" aria-hidden />
      </div>
    </div>
  );
}
