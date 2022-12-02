export function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/[^a-z0-9- ]/g, "")
    .replace(/[ ]/g, "-")
    .replace(/^[-]+/, "")
    .replace(/[-]+$/, "");
}
