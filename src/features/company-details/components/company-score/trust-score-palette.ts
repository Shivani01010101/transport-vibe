/** Trust spectrum / pillar bars — exact hex values from product spec. */
export const TRUST_SCORE_PALETTE = {
  red: "#FF6B6B",
  orange: "#F39C12",
  blue: "#4A90E2",
  greenLight: "#58D68D",
  green: "#2ECC71",
  track: "#E0E0E0",
  labelMuted: "#757575",
} as const;

export type TrustScoreBarToneKey = "green" | "blue" | "orange";

export function pillarBarColor(tone: TrustScoreBarToneKey): string {
  if (tone === "blue") {
    return TRUST_SCORE_PALETTE.blue;
  }
  if (tone === "orange") {
    return TRUST_SCORE_PALETTE.orange;
  }
  return TRUST_SCORE_PALETTE.green;
}
