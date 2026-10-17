type Category = {
  label: string
  value: string
}

type Channel = {
  label: string
  value: string
  icon: string
  categories: Category[]
}

export const channels: Channel[] = [
  {
    label: "VnExpress",
    value: "vnexpress",
    icon: "/vnexpress.svg",
    categories: [
      { label: "Thời sự", value: "thoisu" },
      { label: "Thế giới", value: "thegioi" },
      { label: "Tin xem nhiều", value: "tinxemnhieu" },
      { label: "Giải trí", value: "giaitri" },
      { label: "Giáo dục", value: "giaoduc" },
    ],
  },
  {
    label: "Tuổi Trẻ",
    value: "tuoitre",
    icon: "/tuoi-tre.ico",
    categories: [
      { label: "Thời sự", value: "thoisu" },
      { label: "Thế giới", value: "thegioi" },
      { label: "Văn hoá", value: "vanhoa" },
      { label: "Thể thao", value: "thethao" },
    ],
  },
  {
    label: "Dân Trí",
    value: "dantri",
    icon: "/dantri.ico",
    categories: [{ label: "Thời sự", value: "thoisu" }],
  },
]

export function resolveNewsSelection(params: URLSearchParams) {
  const requestedChannel = params.get("channel")?.toLowerCase()
  const channel =
    channels.find((item) => item.value === requestedChannel) ?? channels[0]
  const category =
    channel.categories.find((item) => item.value === params.get("category")) ??
    channel.categories[0]

  return { channel, category }
}

export function selectChannel(params: URLSearchParams, value: string) {
  const next = new URLSearchParams(params)
  const channel = channels.find((item) => item.value === value)
  if (!channel) return next

  next.set("channel", channel.value)
  next.set("category", channel.categories[0].value)
  return next
}

export function selectCategory(params: URLSearchParams, value: string) {
  const next = new URLSearchParams(params)
  const { channel } = resolveNewsSelection(params)
  const category = channel.categories.find((item) => item.value === value)
  if (!category) return next

  next.set("channel", channel.value)
  next.set("category", category.value)
  return next
}
