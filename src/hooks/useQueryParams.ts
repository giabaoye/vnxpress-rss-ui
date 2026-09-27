import { useState, useEffect } from "react"

type ParamValue = string | number | boolean | null | undefined
type ParamUpdates = Record<string, ParamValue>

export function useQueryParams() {
  // Hàm lấy toàn bộ params hiện tại chuyển thành Object
  const getParams = () =>
    Object.fromEntries(new URLSearchParams(window.location.search))

  const [params, setParams] = useState(getParams)

  const setParam = (
    keyOrUpdates: string | Record<string, string | number | null | undefined>,
    value?: string | number | null | undefined
  ) => {
    // 1. Lấy toàn bộ query params hiện có trên URL (?search=1&page=2)
    const currentParams = new URLSearchParams(window.location.search)

    // 2. Gom về dạng object để duyệt chung
    const updates =
      typeof keyOrUpdates === "string"
        ? { [keyOrUpdates]: value }
        : keyOrUpdates

    // 3. Cập nhật các key truyền vào
    Object.entries(updates).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        // .set() tự động GHI ĐÈ key này nếu đã tồn tại, và KHÔNG đụng đến các key khác
        currentParams.set(key, String(val))
      } else {
        currentParams.delete(key) // Xóa param nếu truyền rỗng/null
      }
    })

    const searchString = currentParams.toString()
    const newUrl = searchString
      ? `${window.location.pathname}?${searchString}`
      : window.location.pathname

    window.history.pushState({}, "", newUrl)
    window.dispatchEvent(new Event("pushstate"))
  }

  useEffect(() => {
    const handleUrlChange = () => {
      setParams(getParams())
    }

    // Lắng nghe sự kiện Back/Forward của trình duyệt
    window.addEventListener("popstate", handleUrlChange)

    // Lắng nghe sự kiện tùy biến khi chuyển trang bằng code
    window.addEventListener("pushstate", handleUrlChange)
    window.addEventListener("replacestate", handleUrlChange)

    return () => {
      window.removeEventListener("popstate", handleUrlChange)
      window.removeEventListener("pushstate", handleUrlChange)
      window.removeEventListener("replacestate", handleUrlChange)
    }
  }, [])

  return [params, setParam] as const
}

export const navigateTo = (url: string) => {
  window.history.pushState({}, "", url)
  window.dispatchEvent(new Event("pushstate"))
}
