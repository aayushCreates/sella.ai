export function extractCategory(url: string, markdown = "") {
  const urlMatch =
    url.match(/\/zgbs\/([^/?]+)/i) || url.match(/best-sellers\/([^/?]+)/i);
  if (urlMatch) {
    return urlMatch[1]
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  }

  const titleMatch = markdown.match(/Best Sellers[:\s]+([^\n]+)/i);
  if (titleMatch) return titleMatch[1]?.trim();

  return "Amazon Best Sellers";
}
