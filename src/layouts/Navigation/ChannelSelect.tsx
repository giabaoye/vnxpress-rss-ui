import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  channels,
  resolveNewsSelection,
  selectCategory,
  selectChannel,
} from "@/news/selection"
import { useSearchParams } from "react-router"

export default function ChannelSelect() {
  const [params, setParams] = useSearchParams()
  const { channel, category } = resolveNewsSelection(params)

  return (
    <div className="mt-2 flex w-full gap-5 bg-white px-6 py-2.5">
      <Select
        items={channels.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
        value={channel.value}
        onValueChange={(value) => {
          if (value) setParams((current) => selectChannel(current, value))
        }}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl outline-none">
          <div className="flex items-center gap-3 text-left">
            <img
              src={channel.icon}
              alt={`${channel.label} logo`}
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
                src={item.icon}
                alt={`${item.label} logo`}
                className="h-6 w-auto"
                loading="eager"
              />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        items={channel.categories}
        value={category.value}
        onValueChange={(value) => {
          if (value) setParams((current) => selectCategory(current, value))
        }}
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
