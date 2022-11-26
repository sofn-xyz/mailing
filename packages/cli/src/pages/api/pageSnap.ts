import type { NextApiRequest, NextApiResponse } from "next";
import { launchChromium } from "playwright-aws-lambda";

type Data = {
  error?: string;
};

export default async function PageSnap(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") return res.status(404).end();

  const url =
    process.env.VERCEL_URL ||
    process.env.MAILING_API_URL ||
    "https://www.mailing.run";

  let browser = null;

  try {
    browser = await launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);
    const buffer = await page.screenshot();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    res.status(200).end(buffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
