import Link from "next/link";
import type { CompanyDetailsPageData } from "../../types/company-details-page";
import { SectionShell } from "../section-shell";
import { AiVerdictCard } from "./ai-verdict-card";
import { TrustScorePillarRow } from "./trust-score-pillar-rows";
import { TrustScoreSpectrum } from "./trust-score-spectrum";

type CompanyScoreSectionProps = {
  data: CompanyDetailsPageData["score"];
};

export function CompanyScoreSection({ data }: CompanyScoreSectionProps) {
  const methodology = (
    <Link
      href={data.methodologyHref}
      className="inline-flex items-center gap-1 text-body-sm font-semibold text-primary-600 underline decoration-primary-600 underline-offset-2 hover:text-primary-700"
    >
      How scores are calculated
      <span aria-hidden className="select-none">
        →
      </span>
    </Link>
  );

  return (
    <SectionShell
      id="trust-score"
      title={data.title}
      description={data.summary?.trim() ? data.summary : undefined}
      headerAside={methodology}
      leadOutsideCard={<AiVerdictCard data={data.aiVerdict} />}
    >
      <div className="space-y-8">
        <TrustScoreSpectrum
          score={data.overall}
          maximum={data.maximum}
          bandLabel={data.overallBandLabel}
        />

        <div>
          {data.pillars.map((pillar) => (
            <TrustScorePillarRow
              key={pillar.id}
              title={pillar.title}
              weightPercent={pillar.weightPercent}
              reviewSampleLabel={pillar.reviewSampleLabel}
              score={pillar.score}
              maximum={data.maximum}
              barTone={pillar.barTone}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
