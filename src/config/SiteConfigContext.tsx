import { createContext, useContext, useEffect, useMemo } from "react";
import {
  resolveSchoolFromPath,
  buildSiteConfig,
  type SiteConfig,
} from "./resolveConfig";
import type { SchoolEntry } from "./schools";
import { hexToRgb, lightenHex, ensureMinimumContrast, textColorForBrand } from "./colorUtils";

interface SiteConfigContextValue {
  config: SiteConfig;
  school: SchoolEntry | null;
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useMemo(() => {
    const school = resolveSchoolFromPath(window.location.pathname);
    return {
      config: buildSiteConfig(school),
      school,
    };
  }, []);

  useEffect(() => {
    if (value.school) {
      document.title = `${value.school.name} + QuickSecure`;
    }

    const raw = value.school?.brandColor ?? "#070b16";
    const hex = ensureMinimumContrast(raw, "#ffffff");
    const hoverHex = lightenHex(hex, 15);
    const { r, g, b } = hexToRgb(hex);

    const root = document.documentElement;
    root.style.setProperty("--brand", hex);
    root.style.setProperty("--brand-hover", hoverHex);
    root.style.setProperty("--brand-r", String(r));
    root.style.setProperty("--brand-g", String(g));
    root.style.setProperty("--brand-b", String(b));
    root.style.setProperty("--brand-text", textColorForBrand(hex));
  }, [value.school]);

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  const ctx = useContext(SiteConfigContext);
  if (!ctx)
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return ctx.config;
}

export function useSchool(): SchoolEntry | null {
  const ctx = useContext(SiteConfigContext);
  if (!ctx)
    throw new Error("useSchool must be used within SiteConfigProvider");
  return ctx.school;
}
