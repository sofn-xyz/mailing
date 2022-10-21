import { parse } from "node-html-parser";

export default function instrumentHtml({
  html,
  messageId,
  apiUrl,
}: {
  html: string;
  messageId: string;
  apiUrl: string;
}) {
  // find the a, get href, calculate new url, replace href
  const root = parse(html);
  const links = root.querySelectorAll("a");
  for (const link of links) {
    const href = link.getAttribute("href");
    if (!href) continue;
    const url = new URL("/api/hooks/click", apiUrl);
    url.searchParams.set("messageId", messageId);
    url.searchParams.set("url", href);
    link.setAttribute("href", url.toString());
  }

  // add open tracking pixel to end of body
  const body = root.querySelector("body");
  if (body) {
    const img = parse(
      `<img alt="" src="${apiUrl}/api/hooks/open?messageId=${messageId}" />`
    );
    body.appendChild(img);
  } else {
    throw new Error("no body found in html");
  }

  return root.toString();
}
