import { siteConfig as defaultConfig } from "./siteConfig";
import { schools, type SchoolEntry } from "./schools";

export type SiteConfig = typeof defaultConfig;

const schoolMap = new Map(schools.map((s) => [s.slug, s]));

export function resolveSchoolFromPath(pathname: string): SchoolEntry | null {
  const match = pathname.match(/^\/s\/([^/]+)/);
  if (!match) return null;
  return schoolMap.get(match[1]) ?? null;
}

export function buildSiteConfig(school: SchoolEntry | null): SiteConfig {
  if (!school) return defaultConfig;

  return {
    association: {
      name: school.name,
      logoSrc: school.logoSrc,
      logoAlt: `${school.name} logo`,
    },
    home: {
      badge:
        school.badge ?? "From Our Community",
      heading: `A Free Panic Button for\n${school.name}.`,
      description:
        school.description ??
        `QuickSecure was started by graduates of Paul Duke STEM High School right here in Georgia. We're giving ${school.name} a free panic button to help keep our community safe. Alerts go straight to dispatch and guide staff through exactly what to do.`,
      socialProof:
        school.socialProof ?? defaultConfig.home.socialProof,
    },
    form: {
      badge: defaultConfig.form.badge,
      heading: defaultConfig.form.heading,
      subtext:
        school.formSubtext ??
        "Fill out your information to get your school's free panic button.",
      submitButton: defaultConfig.form.submitButton,
      submittingButton: defaultConfig.form.submittingButton,
    },
    moreInfo: {
      ctaSubtext:
        school.ctaSubtext ??
        `Help us keep ${school.name} and our community safe.`,
      ctaButton: defaultConfig.moreInfo.ctaButton,
    },
  };
}
