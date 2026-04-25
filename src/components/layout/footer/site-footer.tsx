import { AtSign, Hash, Link2, Mail, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import amex from "@/assets/images/common/amex.svg";
import applePay from "@/assets/images/common/apple-pay.svg";
import discover from "@/assets/images/common/discover.svg";
import mastercard from "@/assets/images/common/mastercard.svg";
import paypal from "@/assets/images/common/paypal.svg";
import venmo from "@/assets/images/common/venmo.svg";
import visa from "@/assets/images/common/visa.svg";
import { figmaAssets } from "@/config/figma-assets";
import { layoutAssets } from "@/config/layout-assets";
import { cn } from "@/lib/cn";

const footerColumns = {
  main: {
    title: "Main",
    links: ["About Us", "Compare", "ShipAdvisor AI", "Full Service"],
  },
  customers: {
    title: "For Customers",
    links: ["Companies", "Resources", "Stories", "Locations"],
  },
  legal: {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Cookie Policy",
      "Terms of Use",
      "Website Disclaimer",
      "Content Moderation",
      "Neutral Language",
      "Use-submitted Reviews",
    ],
  },
} as const;

const social = [
  { label: "Facebook", icon: Share2 },
  { label: "Instagram", icon: Hash },
  { label: "LinkedIn", icon: Link2 },
  { label: "X", icon: AtSign },
  { label: "YouTube", icon: Send },
  { label: "Pinterest", icon: MessageCircle },
] as const;

function FooterLink({ children }: { children: string }) {
  return (
    <Link
      href="#"
      className="block text-body-sm leading-[1.4] text-text-dark-gray hover:text-text-black"
    >
      {children}
    </Link>
  );
}

/**
 * Newsletter + link grid + disclaimer (Figma Footer instance).
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-[#fafafa]">
      <div className="mx-auto flex w-full max-w-[1366px] flex-col gap-10 px-4 pb-5 pt-12 sm:px-8">
        {/* Newsletter — height follows content on small screens (fixed h was clipping on mobile) */}
        <div className="relative isolate w-full overflow-hidden rounded-lg bg-brand-deep">
          <Image
            src={figmaAssets.newsletterBg}
            alt=""
            fill
            className="object-cover opacity-60 mix-blend-hard-light"
            sizes="(max-width: 1366px) 100vw, 1302px"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(239deg, rgba(19,81,40,0.8) 8%, rgba(19,81,40,0) 20%), linear-gradient(109deg, rgb(19,81,40) 44%, rgba(19,81,40,0) 71%)",
            }}
          />
          <div className="relative z-1 flex flex-col gap-4 px-4 py-8 sm:gap-5 sm:px-8 sm:py-10 lg:min-h-[240px] lg:justify-center lg:py-12">
            <div className="max-w-[1126px] space-y-2 text-text-white sm:space-y-1.5">
              <h2 className="font-display text-[1.375rem] font-semibold leading-snug tracking-tight sm:text-2xl sm:leading-tight lg:text-display-h4 lg:leading-[1.2]">
                Get Exclusive Deals And Shipping Tips
              </h2>
              <p className="max-w-xl text-body-sm leading-[1.45] sm:text-body-md sm:leading-[1.4]">
                Subscribe to our newsletter to get exclusive deal and tips for your next shipping
              </p>
            </div>
            <div className="flex w-full max-w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:gap-4">
              <div className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {(["Your Name", "Your Phone", "Your Email"] as const).map((ph) => (
                  <div
                    key={ph}
                    className="flex h-12 min-h-12 w-full min-w-0 items-center rounded border border-neutral-200 bg-neutral-0 px-3 text-body-sm text-text-light-gray"
                  >
                    {ph}
                  </div>
                ))}
              </div>
              <Link
                href="#"
                className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-sm bg-primary-500 px-7 text-display-caption font-bold uppercase text-text-white sm:w-auto lg:w-auto"
              >
                Subscribe
              </Link>
            </div>
            <p className="text-body-sm italic leading-[1.4] text-text-white/80 sm:text-body-md">
              No spam, unsubscribe anytime
            </p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link href="/" className="relative block h-8 w-[146px] sm:h-[42.5px] sm:w-[194px]">
              <Image
                src={layoutAssets.headerLogo}
                alt="Transportvibe"
                fill
                className="object-contain object-left"
                sizes="194px"
                unoptimized
              />
            </Link>
            <p className="max-w-[320px] text-body-sm leading-[1.4] text-text-black">
              The trust-driven marketplace for auto transport. Compare verified brokers, read real
              reviews, and get AI-powered recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              {social.map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-[var(--cd-social-bg)] text-text-black hover:opacity-90"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-5">
            <h3 className="mb-6 font-display text-display-h7 font-semibold text-text-dark-gray">
              {footerColumns.main.title}
            </h3>
            <div className="flex flex-col gap-3">
              {footerColumns.main.links.map((t) =>
                t === "ShipAdvisor AI" ? (
                  <Link
                    key={t}
                    href="#"
                    className="flex items-center gap-2 text-body-sm text-text-dark-gray hover:text-text-black"
                  >
                    <Image
                      src={layoutAssets.whisperMenu}
                      alt=""
                      width={15}
                      height={16}
                      className="shrink-0"
                      unoptimized
                    />
                    {t}
                  </Link>
                ) : (
                  <FooterLink key={t}>{t}</FooterLink>
                ),
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-display-h7 font-semibold text-text-dark-gray">
              {footerColumns.customers.title}
            </h3>
            <div className="flex flex-col gap-3">
              {footerColumns.customers.links.map((t) => (
                <FooterLink key={t}>{t}</FooterLink>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-display-h7 font-semibold text-text-dark-gray">
              {footerColumns.legal.title}
            </h3>
            <div className="flex flex-col gap-3">
              {footerColumns.legal.links.map((t) => (
                <FooterLink key={t}>{t}</FooterLink>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-display-h7 font-semibold text-text-dark-gray">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <div className="flex items-center gap-2 text-body-sm text-text-dark-gray">
                  <Phone className="size-4 shrink-0" aria-hidden />
                  Phone
                </div>
                <Link
                  href="tel:+14433880311"
                  className="mt-1.5 block font-display text-body-md font-semibold text-primary-600 underline"
                >
                  +1 (443) 388-0311
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-body-sm text-text-dark-gray">
                  <MessageCircle className="size-4 shrink-0" aria-hidden />
                  Whatsapp
                </div>
                <Link
                  href="https://wa.me/14433880311"
                  className="mt-1.5 block font-display text-body-md font-semibold text-primary-600 underline"
                >
                  +1 (443) 388-0311
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-body-sm text-text-dark-gray">
                  <Mail className="size-4 shrink-0" aria-hidden />
                  Email
                </div>
                <Link
                  href="mailto:info@transportvibe.com"
                  className="mt-1.5 block font-display text-body-md font-semibold text-primary-600"
                >
                  info@transportvibe.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-caption leading-[1.4] text-[var(--cd-caption-muted)]">
            © 2026 Transportvibe. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {(
              [
                ["Visa", visa, 55, 22],
                ["American Express", amex, 60, 38],
                ["Apple Pay", applePay, 60, 25],
                ["PayPal", paypal, 73, 19],
                ["Venmo", venmo, 60, 14],
                ["Discover", discover, 60, 10],
                ["Mastercard", mastercard, 60, 46],
              ] as const satisfies ReadonlyArray<
                readonly [string, string | StaticImageData, number, number]
              >
            ).map(([name, src, w, h]) => (
              <div key={name} className="relative opacity-90" style={{ width: w, height: h }}>
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes={`${w}px`}
                  unoptimized={typeof src !== "string"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className={cn(
            "border border-white/5 bg-neutral-200 p-6",
            "font-sans text-body-caption font-light leading-[17.88px] text-[var(--cd-disclaimer-text)]",
          )}
        >
          <p>
            Disclaimer: Transportvibe is an independent review platform. We are not affiliated with
            any car shipping companies. Our ratings are based on publicly available data including
            FMCSA records, Trustpilot reviews, BBB ratings, and customer feedback. Always verify
            current pricing and availability directly with the shipping company before making a
            decision. Precision analytics are provided as guidance and do not constitute a legal
            guarantee of performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
