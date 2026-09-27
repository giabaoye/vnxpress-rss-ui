type ImageLink = {
  type: string
  length: string
  href: string
  rel: string
}

export type Article = {
  id: string
  title: string
  image: ImageLink
  link: string
  published: string
  description: string
}
export const Channel = {
  VnExpress: "VnExpress",
} as const

export type Channel = (typeof Channel)[keyof typeof Channel]

export type ChannelItem = {
  id?: Channel
  label: string
  value?: Channel
  categories?: Array<{ label: string; value: string }>
}

export type Category = {
  label: string
  value: string
}
