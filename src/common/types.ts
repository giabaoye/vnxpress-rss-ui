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
