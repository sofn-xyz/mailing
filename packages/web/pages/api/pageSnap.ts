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

  const url = req.query.url;
  if (typeof url !== "string") {
    return res.status(403).json({ error: "url not provided" });
  }

  let browser = null;

  try {
    browser = await launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);
    const buffer = await page.screenshot();

    res.setHeader("Content-Type", "image/png");
    res.status(201).end(buffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
