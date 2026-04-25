import type { TrustScoreBarTone } from "../../types/company-details-page";
import { TRUST_SCORE_PALETTE, pillarBarColor } from "./trust-score-palette";

const TRACK_TICK = `${TRUST_SCORE_PALETTE.track} 0px, ${TRUST_SCORE_PALETTE.track} 1.5px, #f3f3f3 1.5px, #f3f3f3 3px`;

type PillarRowProps = {
  title: string;
  weightPercent: number;
  reviewSampleLabel: string;
  score: number;
  maximum: number;
  barTone: TrustScoreBarTone;
};

function SegmentedPillarBar({
  value,
  maximum,
  tone,
}: {
  value: number;
  maximum: number;
  tone: TrustScoreBarTone;
}) {
  const pct = Math.min(100, Math.max(0, (value / maximum) * 100));
  const fill = pillarBarColor(tone);

  return (
    <div
      className="relative h-7 w-full min-w-0 overflow-hidden rounded-[2px] sm:h-8"
      style={{
        background: `repeating-linear-gradient(90deg, ${TRACK_TICK})`,
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={maximum}
    >
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <div
          className="h-full w-full"
          style={{
            background: `repeating-linear-gradient(90deg, ${fill} 0px, ${fill} 1.5px, transparent 1.5px, transparent 3px)`,
          }}
        />
      </div>
    </div>
  );
}

export function TrustScorePillarRow({
  title,
  weightPercent,
  reviewSampleLabel,
  score,
  maximum,
  barTone,
}: PillarRowProps) {
  return (
    <div className="space-y-3 border-b border-neutral-200 py-5 last:border-b-0 sm:grid sm:grid-cols-[minmax(10rem,14rem)_1fr_auto] sm:items-center sm:gap-5 sm:space-y-0 sm:py-6">
      <div className="flex items-start justify-between gap-3 sm:block">
        <div className="min-w-0">
          <h3 className="font-display text-display-h7 font-semibold text-text-black">{title}</h3>
          <p className="mt-1 text-body-xs text-text-dark-gray sm:text-body-sm">
            Weight {weightPercent}% · {reviewSampleLabel}
          </p>
        </div>
        <p className="shrink-0 font-display text-body-sm font-semibold text-text-black tabular-nums sm:hidden">
          {score}%
        </p>
      </div>
      <div className="min-w-0 sm:px-0">
        <SegmentedPillarBar value={score} maximum={maximum} tone={barTone} />
      </div>
      <p className="hidden font-display text-body-md font-semibold text-text-black tabular-nums sm:block sm:text-right">
        {score}%
      </p>
    </div>
  );
}
