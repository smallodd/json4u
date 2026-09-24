import { env } from "@/lib/env";

function withoutTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  url: withoutTrailingSlash(env.NEXT_PUBLIC_SITE_URL),
  name: env.NEXT_PUBLIC_SITE_NAME,
  defaultLocale: env.NEXT_PUBLIC_DEFAULT_LOCALE,
  repositoryUrl: env.NEXT_PUBLIC_REPOSITORY_URL,
  feedbackUrl: env.NEXT_PUBLIC_FEEDBACK_URL,
  socialXUrl: env.NEXT_PUBLIC_SOCIAL_X_URL,
  socialWeiboUrl: env.NEXT_PUBLIC_SOCIAL_WEIBO_URL,
  reviewUrl: env.NEXT_PUBLIC_REVIEW_URL,
  googleAnalyticsId: env.NEXT_PUBLIC_GA_ID,
  adsenseClient: env.NEXT_PUBLIC_ADSENSE_CLIENT,
  monacoVsUrl: env.NEXT_PUBLIC_MONACO_VS_URL,
  fileNamePrefix: env.NEXT_PUBLIC_FILE_NAME_PREFIX,
} as const;
