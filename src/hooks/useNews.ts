import type { Article } from "@/shared/types"
import { resolveNewsSelection } from "@/news/selection"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

type NewsState =
  | { status: "loading" }
  | { status: "ready"; articles: Article[] }
  | { status: "empty" }
  | { status: "error" }

export default function useNews() {
  const [params] = useSearchParams()
  const selection = resolveNewsSelection(params)
  const category = selection.category.value
  const channel = selection.channel.value
  const selectionKey = `${channel}:${category}`
  const [snapshot, setSnapshot] = useState<{
    key: string
    result: NewsState
  }>({ key: selectionKey, result: { status: "loading" } })

  useEffect(() => {
    const controller = new AbortController()
    const fetchNews = async () => {
      setSnapshot({ key: selectionKey, result: { status: "loading" } })
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL +
            "news?" +
            new URLSearchParams({ category, channel }).toString(),
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error(`Failed to load news: ${res.status}`)
        const resJSON: Article[] = await res.json()
        if (!Array.isArray(resJSON)) throw new Error("Invalid news response")
        if (!controller.signal.aborted) {
          setSnapshot({
            key: selectionKey,
            result: resJSON.length
              ? { status: "ready", articles: resJSON }
              : { status: "empty" },
          })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
          setSnapshot({ key: selectionKey, result: { status: "error" } })
        }
      }
    }
    fetchNews()
    return () => controller.abort()
  }, [category, channel, selectionKey])

  return snapshot.key === selectionKey
    ? snapshot.result
    : ({ status: "loading" } as const)
}
