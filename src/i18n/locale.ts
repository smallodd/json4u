export type Locale = "en" | "zh";

export function selectLocale(acceptLanguage: string | null, fallback: Locale): Locale {
  if (!acceptLanguage) return fallback;

  const preferences = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [language, ...parameters] = entry.trim().split(";");
      const locale = language.toLowerCase().split("-")[0];
      if (locale !== "en" && locale !== "zh") return null;

      const qualityParameter = parameters.map((parameter) => parameter.trim()).find((parameter) => parameter.startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;
      if (!Number.isFinite(quality) || quality <= 0 || quality > 1) return null;

      return { locale, quality, index };
    })
    .filter((preference): preference is { locale: Locale; quality: number; index: number } => preference !== null);

  preferences.sort((a, b) => b.quality - a.quality || a.index - b.index);
  return preferences[0]?.locale ?? fallback;
}
