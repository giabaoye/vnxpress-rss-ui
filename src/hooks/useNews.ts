import type { Article } from "@/common/types"
import { useEffect, useState } from "react"
import { useQueryParams } from "./useQueryParams"

export default function useNews() {
  const [data, setData] = useState<Article[]>([])
  const { search, page } = useQueryParams()

  useEffect(() => {
    console.log(search)
    const fetchNews = async () => {
      const res = await fetch(import.meta.env.VITE_API_URL + "news")
      const resJSON: Article[] = await res.json()
      setData(resJSON)
    }
    fetchNews()
  }, [search])

  return {
    data,
  }
}
