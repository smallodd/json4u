import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { isPreview } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    alternates: isPreview ? undefined : { canonical: "/" },
    robots: isPreview ? { index: false, follow: false } : undefined,
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    keywords: t("keywords"),
    description: t("description"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("title"),
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: t("description"),
      images: [{ url: `${siteConfig.url}/apple-icon.png`, width: 512, height: 512, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary",
      title: siteConfig.name,
      description: t("description"),
      images: [`${siteConfig.url}/apple-icon.png`],
    },
  };
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {siteConfig.adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body>
        {/* TODO: support dark theme */}
        <ThemeProvider defaultTheme="light" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
        <Toaster richColors position="bottom-right" />
      </body>
      {siteConfig.googleAnalyticsId && <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />}
    </html>
  );
}
