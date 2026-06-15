import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/dashboard/",
        "/dashboard/*",
        "/api",
        "/api/",
        "/api/*",
        "/login",
        "/loading",
        "/redirect",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
