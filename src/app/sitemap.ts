import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// https://next-intl-docs.vercel.app/docs/environments/metadata-route-handlers
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry("/"),
    getEntry("/editor"),
    getEntry("/changelog"),
    getEntry("/terms"),
    getEntry("/privacy"),
    getEntry("/tutorial"),
  ];
}

function getEntry(pathname: string) {
  return {
    url: getUrl(pathname),
    lastModified: new Date(),
  };
}

function getUrl(pathname: string) {
  return `${siteConfig.url}/${pathname.startsWith("/") ? pathname.slice(1) : pathname}`;
}
