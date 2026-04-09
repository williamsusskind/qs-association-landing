export type PartnerType = "school" | "association";

export interface SchoolEntry {
  slug: string;
  name: string;
  type: PartnerType;
  logoSrc: string;
  brandColor?: string; // hex like "#c41230" — primary accent color
  // Optional copy overrides (falls back to templates based on type)
  description?: string;
  socialProof?: string;
  formSubtext?: string;
  ctaSubtext?: string;
  badge?: string;
  // Partner note (associations only)
  partnerNote?: string;
  partnerName?: string;
  partnerTitle?: string;
  partnerPhotoSrc?: string;
}

export const schools: SchoolEntry[] = [
  {
    slug: "wesleyan-school",
    name: "Wesleyan School",
    type: "school",
    logoSrc: "/logos/wesleyan-school.png",
    brandColor: "#00483A",
  },
  {
    slug: "wisconsin-council-of-religious-independent-schools",
    name: "Wisconsin Council of Religious & Independent Schools",
    type: "association",
    logoSrc: "/logos/wisconsin-council-of-religious-independent-schools.png",
    brandColor: "#D11142",
    partnerNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    partnerName: "Partner Representative",
    partnerTitle: "Executive Director, WCRIS",
  },
];
