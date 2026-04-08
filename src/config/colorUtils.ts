export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace("#", "");
  return {
    r: parseInt(cleaned.substring(0, 2), 16),
    g: parseInt(cleaned.substring(2, 4), 16),
    b: parseInt(cleaned.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
  );
}

export function lightenHex(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const lighten = (c: number) =>
    Math.min(255, Math.round(c + (255 - c) * (percent / 100)));
  return rgbToHex(lighten(r), lighten(g), lighten(b));
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Ensures a color has at least 3:1 contrast against the page background.
 * Auto-darkens or lightens as needed.
 */
export function ensureMinimumContrast(
  hex: string,
  bgHex: string = "#ffffff",
): string {
  const bgL = relativeLuminance(hexToRgb(bgHex));

  const contrastRatio = (fgHex: string) => {
    const fgL = relativeLuminance(hexToRgb(fgHex));
    return (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05);
  };

  if (contrastRatio(hex) >= 3) return hex;

  for (let i = 5; i <= 80; i += 5) {
    const adjusted = lightenHex(hex, i);
    if (contrastRatio(adjusted) >= 3) return adjusted;
  }

  return lightenHex(hex, 80);
}

/**
 * Returns white or dark text color based on which has better contrast against the brand color.
 */
export function textColorForBrand(hex: string): string {
  const lum = relativeLuminance(hexToRgb(hex));
  return lum > 0.179 ? "#111111" : "#ffffff";
}
