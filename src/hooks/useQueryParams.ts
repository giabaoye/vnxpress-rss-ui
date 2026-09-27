import { useState, useEffect } from "react"

export function useQueryParams() {
  // Hàm lấy toàn bộ params hiện tại chuyển thành Object
  const getParams = () =>
    Object.fromEntries(new URLSearchParams(window.location.search))

  const [params, setParams] = useState(getParams)

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

  return params
}

export const navigateTo = (url: string) => {
  window.history.pushState({}, "", url)
  window.dispatchEvent(new Event("pushstate"))
}
