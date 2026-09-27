import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryParams } from "./hooks/useQueryParams"
import VNExpress from "../public/vnexpress.svg"
import { useState } from "react"

const categories = [
  {
    label: "Thế giới",
    value: "global",
  },
  {
    label: "Thời sự",
    value: "news",
  },
]
const channels = [
  {
    label: "VNExpress",
    value: "vnxpress",
  },
]
export default function Channels() {
  const [, setParams] = useQueryParams()

  const [selected, setSelected] = useState("vnexpress")
  const handleValueChange = (value: string | null) => {
    if (!value) return
    setParams("category", value)
    setSelected(value)
  }
  return (
    <div className="flex gap-5">
      <Select
        items={channels}
        value={selected}
        onValueChange={handleValueChange}
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
              <span className="text-xl">{selected}</span>
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
        items={categories}
        defaultValue="news"
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="h-fit w-fit max-w-48 rounded-lg p-4 text-xl">
          <SelectValue className="text-xl" />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {categories.map((item) => (
            <SelectItem key={item.value} value={item.value} className="text-xl">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
