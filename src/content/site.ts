const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Absolute origin used for canonical URLs, Open Graph and the sitemap. Override with NEXT_PUBLIC_SITE_URL once a custom domain is set. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (productionHost ? `https://${productionHost}` : "http://localhost:4317");
