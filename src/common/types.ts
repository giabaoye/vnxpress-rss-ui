export type Article = {
  id: string
  title: string
  image: string
  link: string
  published: string
  description: string
}
export const Channel = {
  VnExpress: "VnExpress",
  TuoiTre: "TuoiTre",
  DanTri: "DanTri",
} as const

export type Channel = (typeof Channel)[keyof typeof Channel]

export type ChannelItem = {
  id?: Channel
  label: string
  value?: Channel
  categories: Array<{ label: string; value: string }>
}

export type Category = {
  label: string
  value: string
}
