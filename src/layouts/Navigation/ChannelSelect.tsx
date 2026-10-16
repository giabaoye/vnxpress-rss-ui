import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useSearchParams } from "react-router"
import VNExpress from "/vnexpress.svg"
import TuoiTre from "/tuoi-tre.ico"
import DanTri from "/dantri.ico"
import { Channel, type ChannelItem } from "@/shared/types"
import { getChannelLabel } from "@/shared/utils"

const channels: ChannelItem[] = [
  {
    id: Channel.VnExpress,
    label: getChannelLabel(Channel.VnExpress),
    value: Channel.VnExpress,
    categories: [
      {
        label: "Thời sự",
        value: "thoisu",
      },
      {
        label: "Thế giới",
        value: "thegioi",
      },
      {
        label: "Tin xem nhiều",
        value: "tinxemnhieu",
      },
      {
        label: "Giải trí",
        value: "giaitri",
      },
      {
        label: "Giáo dục",
        value: "giaoduc",
      },
    ],
  },
  {
    id: Channel.TuoiTre,
    label: getChannelLabel(Channel.TuoiTre),
    value: Channel.TuoiTre,
    categories: [
      {
        label: "Thời sự",
        value: "thoisu",
      },
      {
        label: "Thế giới",
        value: "thegioi",
      },
      {
        label: "Văn hoá",
        value: "vanhoa",
      },
      {
        label: "Thể thao",
        value: "thethao",
      },
    ],
  },
  {
    id: Channel.DanTri,
    label: getChannelLabel(Channel.DanTri),
    value: Channel.DanTri,
    categories: [
      {
        label: "Thời sự",
        value: "thoisu",
      },
    ],
  },
]

function getImgSource(channel: ChannelItem) {
  switch (channel.id) {
    case Channel.VnExpress:
      return VNExpress
    case Channel.TuoiTre:
      return TuoiTre
    case Channel.DanTri:
      return DanTri
  }
}

export default function ChannelSelect() {
  const [params, setParams] = useSearchParams()

  const channel =
    channels.find(
      (item) => item.id.toLowerCase() === params.get("channel")?.toLowerCase()
    ) ?? channels[0]
  const category =
    channel.categories.find((item) => item.value === params.get("category")) ??
    channel.categories[0]

  const updateParams = (updates: Record<string, string>) => {
    setParams((current) => {
      const next = new URLSearchParams(current)
      Object.entries(updates).forEach(([key, value]) => next.set(key, value))
      return next
    })
  }

  const handleChannelChange = (value: Channel | null) => {
    if (!value) return
    const nextChannel = channels.find((item) => item.value === value)
    if (!nextChannel) return
    updateParams({
      channel: nextChannel.id.toLowerCase(),
      category: nextChannel.categories[0].value,
    })
  }

  const handleCategoryChange = (value: string | null) => {
    if (!value) return
    updateParams({ category: value })
  }

  return (
    <div className="mt-2 flex w-full gap-5 bg-white px-6 py-2.5">
      <Select
        items={channels.map((c) => ({ label: c.label, value: c.value }))}
        value={channel.value}
        onValueChange={handleChannelChange}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl outline-none">
          <div className="flex items-center gap-3 text-left">
            <img
              src={getImgSource(channel)}
              alt="VnExpress Logo"
              className="h-6 w-auto"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="text-xl">{channel.label}</span>
            </div>
          </div>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {channels.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="px-4 py-2 text-xl"
            >
              <img
                src={getImgSource(item)}
                alt="VnExpress Logo"
                className="h-6 w-auto"
                loading="eager"
              />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Category */}
      <Select
        items={channel.categories}
        value={category.value}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl">
          <span className="text-xl">{category.label}</span>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {channel.categories.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="px-3 py-2 text-xl"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
