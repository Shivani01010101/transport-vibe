import Image from "next/image";
import type { AiVerdict } from "../../types/company-details-page";

const AI_VERDICT_MOBILE = "/company-details/ai-verdict-mobile.png";
const AI_VERDICT_DESKTOP = "/company-details/ai-verdict-desktop.png";

type AiVerdictCardProps = {
  data: AiVerdict;
};

function verdictPlainText(data: AiVerdict): string {
  const body = data.segments.map((s) => s.text).join("");
  return `${data.title}. ${data.analysisLabel}. ${data.updatedLabel}. ${data.reviewCountLabel}. ${body}`;
}

export function AiVerdictCard({ data }: AiVerdictCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <p className="sr-only">{verdictPlainText(data)}</p>
      <Image
        src={AI_VERDICT_MOBILE}
        alt=""
        width={420}
        height={215}
        className="w-full max-w-full lg:hidden"
        sizes="100vw"
        priority
      />
      <Image
        src={AI_VERDICT_DESKTOP}
        alt=""
        width={712}
        height={189}
        className="hidden w-full max-w-full lg:block"
        sizes="(min-width: 1024px) 896px, 100vw"
        priority
      />
    </div>
  );
}
