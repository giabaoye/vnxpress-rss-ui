import type { Channel } from "./types"

export function extractDescription(htmlString: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, "text/html")

  // Remove the anchor container (which holds the img)
  doc.querySelector("a")?.remove()

  // Return the remaining plain text
  return doc.body.textContent?.trim() ?? ""
}

export function getChannelLabel(id: Channel) {
  switch (id) {
    case "VnExpress":
      return "VnExpress"
    default:
      return "Unknown"
  }
}
