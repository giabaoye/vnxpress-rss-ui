# Đọc Báo
 
App đọc báo lấy nguồn từ các trang báo lớn của VN (vnexpress, tuoitre,...)

# Learning Path

Vì app hiện tại vẫn còn đơn giản, nên chúng ta sẽ không dùng `react-router-dom` hay `tanstack-router` cho router
Thay vào đó, chúng ta dùng custom hook `useQueryParams` với hàm `navigateTo` để quản lí `location.state`

2. Việc trích xuất link, ảnh từ response
VNExpress là một ví dụ, file trả về có `summary_detail` và trong đó có description ngắn mô tả bài viết. Việc của mình là lấy ra đoạn mô tả ngắn đó với `extractDescription` trong `common/util`

```typescript
export function extractDescription(htmlString: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, "text/html")

  doc.querySelector("a")?.remove()

  return doc.body.textContent?.trim() ?? ""
}
```
-> Nhận `htmlString` và dùng `DOMParser` để lấy `Document` ra

Hiện tại, logic đã được chuyển xuống BE quản lí