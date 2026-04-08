export interface SchoolEntry {
  slug: string;
  name: string;
  logoSrc: string;
  brandColor?: string; // hex like "#c41230" — primary accent color, defaults to #d7d128
  // Optional copy overrides (falls back to templates with school name)
  description?: string;
  socialProof?: string;
  formSubtext?: string;
  ctaSubtext?: string;
  badge?: string;
}

export const schools: SchoolEntry[] = [
  // Example entry:
  // {
  //   slug: "lincoln-high",
  //   name: "Lincoln High School",
  //   logoSrc: "/logos/lincoln-high.png",
  // },
  {
    slug: "wesleyan-school",
    name: "Wesleyan School",
    logoSrc: "/logos/wesleyan-school.png",
    brandColor: "#00483A",
  },
];
