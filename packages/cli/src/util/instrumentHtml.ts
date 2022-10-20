import { parse } from "node-html-parser";

export default function instrumentHtml({
  html,
  sendId,
  apiUrl,
}: {
  html: string;
  sendId: string;
  apiUrl: string;
}) {
  // find the a, get href, calculate new url, replace base 64 encoded href
  const root = parse(html);
  const links = root.querySelectorAll("a");
  for (const link of links) {
    const href = link.getAttribute("href");
    if (!href) continue;
    const url = new URL("/api/click", apiUrl);
    url.searchParams.set("sendId", sendId);
    url.searchParams.set("url", href);
    link.setAttribute("href", url.toString());
  }

  // add <img alt="" src="apiUrl?t=BASE_64" /> to end of body
  const body = root.querySelector("body");
  if (body) {
    const img = parse(
      `<img alt="" src="${apiUrl}/api/open?sendId=${sendId}" />`
    );
    body.appendChild(img);
  } else {
    console.warn("Could not find body in html");
  }

  return root.toString();
}
