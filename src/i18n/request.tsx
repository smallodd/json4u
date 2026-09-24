import { selectLocale } from "@/i18n/locale";
import { siteConfig } from "@/lib/site-config";
import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "zh"];

export default getRequestConfig(async () => {
  const locale = selectLocale(headers().get("accept-language"), siteConfig.defaultLocale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    defaultTranslationValues: {
      b: (children) => <b>{children}</b>,
      i: (children) => <i>{children}</i>,
      u: (children) => <u>{children}</u>,
      br: () => <br />,
    },
  };
});
