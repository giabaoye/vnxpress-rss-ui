import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useQueryParams } from "./hooks/useQueryParams"
import VNExpress from "/vnexpress.svg"
import TuoiTre from "/tuoi-tre.ico"
import DanTri from "/dantri.ico"
import { useCallback, useState } from "react"
import { Channel, type Category, type ChannelItem } from "./common/types"
import { getChannelLabel } from "./common/utils"

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

export default function Channels() {
  const [, setParams] = useQueryParams()

  const [channel, setChannel] = useState<ChannelItem>(channels[0])
  const [category, setCategory] = useState<{ label: string; value: string }>(
    channels[0]?.categories?.[0] ?? {
      label: "Thời sự",
      value: "news",
    }
  )

  const handleChannelChange = (value: Channel | null) => {
    if (!value) return
    const currentChannel =
      channels.find((c) => c.value === value) ?? channels[0]
    const currentCategory = currentChannel.categories[0]
    setParams({
      channel: currentChannel.id?.toLowerCase(),
      category: currentCategory.value,
    })
    setChannel(currentChannel)
    setCategory(currentCategory)
  }

  const handleCategoryChange = (value: Category | null) => {
    if (!value) return
    setParams("category", value.value)
    setCategory(value)
  }

  const getImgSource = useCallback((channel: ChannelItem) => {
    switch (channel.id) {
      case Channel.VnExpress:
        return VNExpress
      case Channel.TuoiTre:
        return TuoiTre
      case Channel.DanTri:
        return DanTri
    }
  }, [])

  return (
    <div className="flex gap-5">
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
        items={channel?.categories}
        value={category}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl">
          <span className="text-xl">{category.label}</span>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {channel?.categories?.map((item) => (
            <SelectItem
              key={item.value}
              value={item}
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
