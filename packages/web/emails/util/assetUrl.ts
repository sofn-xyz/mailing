/*
 * If you want to use local assets while developing new templates,
 * run `yarn dev:local-assets` instead of `yarn dev`
 *
 * NOTE: This will cause the email linter to throw errors
 */

const ASSET_URL = (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${NEXT_PUBLIC_VERCEL_URL}`) || process.env.MAILING_API_URL || "https://emails.mailing.run";

export default function assetUrl(url: string) {
  if (url.startsWith("/") && !process.env.LOCAL_ASSETS) {
    return `${ASSET_URL}${url}`;
  }

  return url;
}
