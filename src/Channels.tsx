import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useQueryParams } from "./hooks/useQueryParams"
import VNExpress from "/vnexpress.svg"
import { useState } from "react"
import { Channel, type Category, type ChannelItem } from "./common/types"
import { getChannelLabel } from "./common/utils"

const channels: ChannelItem[] = [
  {
    id: Channel.VnExpress,
    label: getChannelLabel("VnExpress"),
    value: Channel.VnExpress,
    categories: [
      {
        label: "Thế giới",
        value: "global",
      },
      {
        label: "Thời sự",
        value: "news",
      },
    ],
  },
]

const categories = [
  {
    label: "Thời sự",
    value: "news",
  },
  {
    label: "Thế giới",
    value: "global",
  },
]

export default function Channels() {
  const [, setParams] = useQueryParams()

  const [channel, setChannel] = useState<ChannelItem>({
    label: "VnExpress",
    value: "VnExpress",
    categories: [
      {
        label: "Thế giới",
        value: "global",
      },
      {
        label: "Thời sự",
        value: "news",
      },
    ],
  })
  const [category, setCategory] = useState<{ label: string; value: string }>({
    label: "Thời sự",
    value: "news",
  })

  const handleChannelChange = (value: Channel | null) => {
    if (!value) return
    const currentChannel = channels.find((c) => c.value === value) ?? {
      label: "VnExpress",
      value: "VnExpress",
    }
    const currentCategory = currentChannel.categories?.[0] ?? {
      label: "Thời sự",
      value: "news",
    }
    setParams({ channel: currentChannel.id, category: currentCategory.value })
    setChannel(currentChannel)
    setCategory(currentCategory)
  }

  const handleCategoryChange = (value: Category | null) => {
    if (!value) return
    setParams("category", value.value)
    setCategory(value)
  }

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
              src={VNExpress}
              alt="VnExpress Logo"
              className="h-6 w-auto"
              loading="eager"
            />
            <div className="flex flex-col">
              <span className="text-xl">{channel.label}</span>
              {/* <span className="text-xs text-muted-foreground mt-0.5">Active Session</span> */}
            </div>
          </div>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {channels.map((item) => (
            <SelectItem key={item.value} value={item.value} className="text-xl">
              <img
                src={VNExpress}
                alt="VnExpress Logo"
                className="h-6 w-auto"
                loading="eager"
              />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={channel?.categories}
        // defaultValue="news"
        value={category}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl">
          <span className="text-xl">{category.label}</span>
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {categories.map((item) => (
            <SelectItem key={item.value} value={item} className="text-xl">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
