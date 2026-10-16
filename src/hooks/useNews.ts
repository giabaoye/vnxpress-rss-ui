import type { Article } from "@/shared/types"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

export default function useNews() {
  const [data, setData] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams()
  const category = params.get("category") || "thoisu"
  const channel = params.get("channel") || "vnexpress"

  useEffect(() => {
    const controller = new AbortController()
    const fetchNews = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL +
            "news?" +
            new URLSearchParams({ category, channel }).toString(),
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error(`Failed to load news: ${res.status}`)
        const resJSON: Article[] = await res.json()
        setData(resJSON)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
          setData([])
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    fetchNews()
    return () => controller.abort()
  }, [category, channel])

  return {
    data,
    loading,
  }
}
