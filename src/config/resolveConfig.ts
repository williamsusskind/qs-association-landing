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

  const isSchool = school.type === "school";

  return {
    association: {
      name: school.name,
      logoSrc: school.logoSrc,
      logoAlt: `${school.name} logo`,
    },
    home: {
      badge: school.badge ?? (isSchool ? "From Our Community" : "Exclusive Partner Access"),
      heading: isSchool
        ? `A Free Panic Button for\n${school.name}.`
        : `A Free Panic Button for\nEvery Member School.`,
      description:
        school.description ??
        (isSchool
          ? `QuickSecure was started by graduates of Paul Duke STEM High School right here in Georgia. We're giving ${school.name} a free panic button to help keep our community safe. Alerts go straight to dispatch and guide staff through exactly what to do.`
          : `${school.name} has partnered with QuickSecure to bring every member school a free panic button. Alerts go straight to dispatch and guide staff through exactly what to do.`),
      socialProof: school.socialProof ?? defaultConfig.home.socialProof,
    },
    form: {
      badge: defaultConfig.form.badge,
      heading: defaultConfig.form.heading,
      subtext:
        school.formSubtext ??
        (isSchool
          ? "Fill out your information to get your school's free panic button."
          : `Fill out your information to request access through the ${school.name} partnership.`),
      submitButton: defaultConfig.form.submitButton,
      submittingButton: defaultConfig.form.submittingButton,
    },
    moreInfo: {
      ctaSubtext:
        school.ctaSubtext ??
        (isSchool
          ? `Help us keep ${school.name} and our community safe.`
          : `Join 500+ member schools with access through ${school.name}.`),
      ctaButton: defaultConfig.moreInfo.ctaButton,
    },
  };
}
