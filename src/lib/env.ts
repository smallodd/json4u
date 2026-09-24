import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import packageJSON from "../../package.json";

export const version = packageJSON.version;
export const majorVersion = packageJSON.version.split(".").slice(0, 2).join(".");

// https://env.t3.gg/docs/nextjs
const configured = (value: string | undefined) => value?.trim() || undefined;
const vercelEnvironment = configured(process.env.NEXT_PUBLIC_VERCEL_ENV) ?? configured(process.env.VERCEL_ENV);
const vercelHost =
  vercelEnvironment === "preview"
    ? configured(process.env.NEXT_PUBLIC_VERCEL_URL) ?? configured(process.env.VERCEL_URL)
    : configured(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
      configured(process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("JSON Editor"),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(["en", "zh"]).default("en"),
    NEXT_PUBLIC_REPOSITORY_URL: z.string().url().optional(),
    NEXT_PUBLIC_FEEDBACK_URL: z.string().url().optional(),
    NEXT_PUBLIC_SOCIAL_X_URL: z.string().url().optional(),
    NEXT_PUBLIC_SOCIAL_WEIBO_URL: z.string().url().optional(),
    NEXT_PUBLIC_REVIEW_URL: z.string().url().optional(),
    NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_ADSENSE_CLIENT: z.string().regex(/^ca-pub-\d+$/).optional(),
    NEXT_PUBLIC_MONACO_VS_URL: z.string().min(1).default("/monaco/vs"),
    NEXT_PUBLIC_FILE_NAME_PREFIX: z.string().min(1).default("json-editor"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: configured(process.env.NEXT_PUBLIC_SITE_URL) ?? (vercelHost ? `https://${vercelHost}` : undefined),
    NEXT_PUBLIC_SITE_NAME: configured(process.env.NEXT_PUBLIC_SITE_NAME),
    NEXT_PUBLIC_DEFAULT_LOCALE: configured(process.env.NEXT_PUBLIC_DEFAULT_LOCALE),
    NEXT_PUBLIC_REPOSITORY_URL: configured(process.env.NEXT_PUBLIC_REPOSITORY_URL),
    NEXT_PUBLIC_FEEDBACK_URL: configured(process.env.NEXT_PUBLIC_FEEDBACK_URL),
    NEXT_PUBLIC_SOCIAL_X_URL: configured(process.env.NEXT_PUBLIC_SOCIAL_X_URL),
    NEXT_PUBLIC_SOCIAL_WEIBO_URL: configured(process.env.NEXT_PUBLIC_SOCIAL_WEIBO_URL),
    NEXT_PUBLIC_REVIEW_URL: configured(process.env.NEXT_PUBLIC_REVIEW_URL),
    NEXT_PUBLIC_GA_ID: configured(process.env.NEXT_PUBLIC_GA_ID),
    NEXT_PUBLIC_ADSENSE_CLIENT: configured(process.env.NEXT_PUBLIC_ADSENSE_CLIENT),
    NEXT_PUBLIC_MONACO_VS_URL: configured(process.env.NEXT_PUBLIC_MONACO_VS_URL),
    NEXT_PUBLIC_FILE_NAME_PREFIX: configured(process.env.NEXT_PUBLIC_FILE_NAME_PREFIX),
  },
});

export const isDev = process.env.NODE_ENV === "development";
export const isPreview = process.env.VERCEL_ENV === "preview";
