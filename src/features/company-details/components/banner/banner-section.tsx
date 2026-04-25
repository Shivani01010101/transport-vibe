import { Check, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import bannerBg from "@/assets/images/company-details/banner-bg.jpg";
import verifiedIcon from "@/assets/images/company-details/leading-icon.svg";
import rimberioLogo from "@/assets/images/company-details/rimberio.svg";
import type { CompanyDetailsPageData, HeroFeatureBadge } from "../../types/company-details-page";
import { cn } from "@/lib/cn";

/**
 * Figma 142:4031 — Hero Section (1366×385 reference).
 * Gradient: linear-gradient(82.84deg, #135128 19.12%, rgba(19, 81, 40, 0.7) 67.87%).
 */
const HERO_GRADIENT =
  "linear-gradient(82.84deg, #135128 19.12%, rgba(19, 81, 40, 0.7) 67.87%)";

/** Same frosted band for top disclaimer and bottom stats (matches design). */
const BANNER_GLASS_BAND = "bg-[#12522885] backdrop-blur-[4px]";

const HERO_FRAME_MIN_H = 385;
const HERO_STATS_H = 88;
const HERO_MAIN_MIN_H = HERO_FRAME_MIN_H - HERO_STATS_H;

type BannerSectionProps = {
  banner: CompanyDetailsPageData["banner"];
};

const featureBadgeClass: Record<HeroFeatureBadge["id"], string> = {
  highly_trusted: "bg-[#1e3a8a]",
  /** Charcoal / glass — not green */
  fmcsa_verified: "border border-white/20 bg-black/35 backdrop-blur-sm",
  customer_favorite: "border border-white/15 bg-[#9a3412]/55 backdrop-blur-sm text-[#fecaca]",
};

function FeatureBadgeIcon({ id }: { id: HeroFeatureBadge["id"] }) {
  const common = "size-3.5 shrink-0 text-white";
  if (id === "highly_trusted") {
    return <Star className={common} fill="currentColor" strokeWidth={1.5} aria-hidden />;
  }
  if (id === "fmcsa_verified") {
    return <Check className={common} strokeWidth={2.5} aria-hidden />;
  }
  return <Heart className="size-3.5 shrink-0 text-[#fca5a5]" fill="none" strokeWidth={2} aria-hidden />;
}

function StarRow({ value }: { value: number }) {
  const full = Math.floor(value);
  const partial = value - full;

  return (
    <div className="flex shrink-0 items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) {
          return (
            <Star
              key={i}
              className="size-[18px] text-[#fbbf24] lg:size-5"
              fill="#fbbf24"
              strokeWidth={0}
              aria-hidden
            />
          );
        }
        if (i === full && partial > 0) {
          return (
            <span key={i} className="relative size-[18px] overflow-hidden lg:size-5">
              <Star
                className="absolute size-[18px] text-white/25 lg:size-5"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${partial * 100}%` }}
              >
                <Star
                  className="size-[18px] text-[#fbbf24] lg:size-5"
                  fill="#fbbf24"
                  strokeWidth={0}
                  aria-hidden
                />
              </span>
            </span>
          );
        }
        return (
          <Star
            key={i}
            className="size-[18px] text-white/25 lg:size-5"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

function ReviewSummaryRich({ summary }: { summary: string }) {
  const m = summary.match(/^(\d+(?:\.\d+)?)(\s*\(.+\))?$/);
  if (!m) {
    return <span className="text-body-sm font-medium text-white lg:text-body-md">{summary}</span>;
  }
  const [, score, rest] = m;
  return (
    <span className="inline text-body-sm lg:text-body-md">
      <span className="font-semibold tabular-nums text-white">{score}</span>
      {rest ? <span className="text-white/75">{rest}</span> : null}
    </span>
  );
}

function TrustScoreRing({
  value,
  percent,
  ringLabel,
}: {
  value: number;
  percent: number;
  ringLabel: string;
}) {
  const r = 86;
  const c = 2 * Math.PI * r;
  const dash = (Math.min(100, Math.max(0, percent)) / 100) * c;

  return (
    <div className="relative size-[148px] shrink-0 lg:size-[168px]">
      <svg className="size-full -rotate-90" viewBox="0 0 200 200" fill="none" aria-hidden>
        {/* Thin white track (target design) */}
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="8"
        />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="var(--cd-primary-500)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - dash}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
        <span className="font-display text-[2.125rem] font-semibold leading-none text-white lg:text-[2.5rem]">
          {value}
        </span>
        <span className="mt-1.5 max-w-[6.5rem] text-[11px] font-semibold leading-snug text-primary-500 lg:text-display-caption">
          {ringLabel}
        </span>
      </div>
    </div>
  );
}

export function BannerSection({ banner }: BannerSectionProps) {
  return (
    <section aria-labelledby="company-banner-title" className="w-full bg-neutral-100">
      {/* Disclosure — full-width band; copy aligned to site content width */}
      <div className={cn("w-full text-white", BANNER_GLASS_BAND)}>
        <p className="mx-auto max-w-[1366px] px-4 py-2.5 text-center text-body-xs leading-snug lg:text-body-sm">
          <span className="opacity-95">{banner.disclaimer.text} </span>
          <Link
            href={banner.disclaimer.linkHref}
            className="font-medium text-white underline decoration-white/70 underline-offset-[3px] hover:decoration-white"
          >
            {banner.disclaimer.linkLabel}
          </Link>
        </p>
      </div>

      {/* Hero: full-bleed background; inner row uses max-width container */}
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-b-xl border border-[#FFFFFF0D] shadow-sm",
          "min-h-0 lg:min-h-[var(--hero-frame-min)]",
        )}
        style={{ ["--hero-frame-min" as string]: `${HERO_FRAME_MIN_H}px` }}
      >
        <div
          className="relative isolate min-h-[240px] w-full flex-1 overflow-hidden lg:min-h-[var(--hero-main-min)]"
          style={{ ["--hero-main-min" as string]: `${HERO_MAIN_MIN_H}px` }}
        >
          <Image
            src={bannerBg}
            alt={banner.backgroundImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: HERO_GRADIENT }} aria-hidden />

          <div
            className={cn(
              "relative z-10 mx-auto flex w-full flex-col justify-center",
              "px-5 py-6 sm:px-8 sm:py-7 lg:min-h-[var(--hero-main-min)] lg:px-[100px] lg:py-8",
            )}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              {/* Logo + single text column (title, stars, badges) — vertically centered as one group */}
              <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5 lg:max-w-[46rem]">
                <div className="shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/[0.06]">
                  <div className="relative size-14 lg:size-28">
                    <Image
                      src={rimberioLogo}
                      alt={banner.logo.alt}
                      fill
                      className="object-contain"
                      sizes="64px"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-3 lg:space-y-3.5">
                  <div className="flex min-w-0 items-center gap-2 lg:gap-2.5">
                    <h1
                      id="company-banner-title"
                      className={cn(
                        "min-w-0 font-display font-semibold tracking-[-0.03125em] text-white",
                        "text-[1.25rem] leading-snug sm:text-[1.5rem]",
                        "lg:text-display-h4 lg:leading-[var(--text-display-h4--line-height)]",
                      )}
                    >
                      {banner.companyName}
                    </h1>
                    <span className="inline-flex shrink-0 self-center" title="Verified">
                      <Image
                        src={verifiedIcon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 lg:size-7"
                        unoptimized
                      />
                      <span className="sr-only">Verified</span>
                    </span>
                  </div>
                  <div className="flex flex-nowrap items-center gap-2.5 lg:gap-3">
                    <StarRow value={banner.ratingStars} />
                    <ReviewSummaryRich summary={banner.reviewSummary} />
                  </div>
                  <ul className="flex list-none flex-row max-sm:flex-wrap gap-2 p-0 sm:gap-2.5">
                    {banner.featureBadges.map((b) => (
                      <li key={b.id} className="shrink-0">
                        <span
                          className={cn(
                            "inline-flex h-[29px] items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold lg:text-body-xs",
                            b.id === "customer_favorite" ? "" : "text-white",
                            featureBadgeClass[b.id],
                          )}
                        >
                          <FeatureBadgeIcon id={b.id} />
                          {b.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex w-full sm:w-[500px] shrink-0 items-center justify-between gap-5 sm:max-w-md sm:justify-end lg:max-w-none lg:flex-initial lg:justify-end lg:gap-8">
                <div className="min-w-0 space-y-1 text-white">
                  <p className="font-display text-display-h6 font-semibold leading-[var(--text-display-h6--line-height)] lg:text-display-h5 lg:leading-[var(--text-display-h5--line-height)]">
                    {banner.trustScore.title}
                  </p>
                  <p className="text-body-xs leading-snug text-white/75 lg:text-body-sm">
                    {banner.trustScore.subtitle}
                  </p>
                </div>
                <TrustScoreRing
                  value={banner.trustScore.value}
                  percent={banner.trustScore.gaugePercent}
                  ringLabel={banner.trustScore.ringLabel}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats — same glass band as disclaimer; grid aligned to content max width */}
        <div
          className={cn(
            "w-full shrink-0 border-t border-[#FAFAFA3D] text-white bg-[#135128] min-h-[76px] lg:h-[var(--hero-stats-h)] lg:min-h-[var(--hero-stats-h)]",
          )}
          style={{ ["--hero-stats-h" as string]: `${HERO_STATS_H}px` }}
        >
          <div className="mx-auto grid h-full w-full max-w-[1366px] grid-cols-5">
            {banner.bottomStats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col items-center justify-center px-1.5 py-3 lg:px-2 lg:py-0",
                  i > 0 && "border-l border-[#FAFAFA3D]",
                )}
              >
                <p className="font-display text-[0.9375rem] font-semibold leading-none tabular-nums text-white lg:text-display-h5 lg:leading-[var(--text-display-h5--line-height)]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-center text-[10px] leading-tight text-white/80 lg:mt-2 lg:text-body-xs lg:leading-[var(--text-body-xs--line-height)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
