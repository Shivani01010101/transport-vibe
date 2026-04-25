import type { Metadata } from "next";
import { CompanyDetailsLayout } from "@/features/company-details/components/company-details-layout";
import { BannerSection } from "@/features/company-details/components/banner/banner-section";
import { CompanyInformationSection } from "@/features/company-details/components/company-information/company-information-section";
import { CompanyScoreSection } from "@/features/company-details/components/company-score/company-score-section";
import { CompanyDeepDiveSection } from "@/features/company-details/components/company-deep-dive/company-deep-dive-section";
import { ComparisonSection } from "@/features/company-details/components/comparison/comparison-section";
import { DisclaimerSection } from "@/features/company-details/components/disclaimer/disclaimer-section";
import { ImageGallery } from "@/features/company-details/components/image-gallery/image-gallery";
import { NewsletterSection } from "@/features/company-details/components/newsletter/newsletter-section";
import { PaymentStripSection } from "@/features/company-details/components/payment-strip/payment-strip-section";
import { CustomerReviewsAcrossPlatformsSection } from "@/features/company-details/components/customer-reviews-across-platforms/customer-reviews-across-platforms-section";
import { ReviewsSection } from "@/features/company-details/components/reviews/reviews-section";
import { SectionNav } from "@/features/company-details/components/section-nav/section-nav";
import { StickySidebar } from "@/features/company-details/components/sticky-sidebar/sticky-sidebar";
import { loadCompanyDetailsPageData } from "@/features/company-details/data/load-company-details-page";
import { scrollRegistry } from "@/features/company-details/lib/scroll-registry";

export const metadata: Metadata = {
  title: "Company Details Page",
  description: "Company details, trust score breakdown, verified reviews, and comparison insights.",
};

export default async function CompanyDetailsPage() {
  const data = await loadCompanyDetailsPageData();

  return (
    <>
      <BannerSection banner={data.banner} />

      <CompanyDetailsLayout
        sidebar={<StickySidebar data={data.sidebar} />}
        className="pt-6 sm:pt-8"
      >
        <SectionNav sections={scrollRegistry} />
        <div className="space-y-6">
          <CompanyScoreSection data={data.score} />
          <ComparisonSection data={data.comparison} />
          {/* <ImageGallery data={data.gallery} /> */}
          <CustomerReviewsAcrossPlatformsSection />
          <CompanyInformationSection data={data.companyInformation} />
          <CompanyDeepDiveSection data={data.companyDeepDive} />
          <ReviewsSection data={data.reviews} />
        </div>
      </CompanyDetailsLayout>

    </>
  );
}
