import type { Article } from "@/common/types"
import { useEffect, useState } from "react"
import { useQueryParams } from "./useQueryParams"

export default function useNews() {
  const [data, setData] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [params] = useQueryParams()
  const category = params?.category || "news"

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      const res = await fetch(
        import.meta.env.VITE_API_URL +
          "news?" +
          new URLSearchParams({
            category,
          }).toString()
      )
      const resJSON: Article[] = await res.json()
      setData(resJSON)
      setLoading(false)
    }
    fetchNews()
  }, [category])

  return {
    data,
    loading,
  }
}
