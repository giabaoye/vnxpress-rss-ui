# Đọc Báo
 
App đọc báo lấy nguồn từ các trang báo lớn của VN (vnexpress, tuoitre,...)

# Chạy ứng dụng

Ứng dụng dùng React Router framework mode với `ssr: false` để build thành SPA. Nội dung tin tức vẫn được tải từ API trong trình duyệt.

```sh
npm install
cp .env.example .env
npm run dev
```

Đặt `VITE_API_URL` trong `.env` thành URL gốc của API (có dấu `/` cuối URL). Chạy `npm run build` để tạo bản tĩnh trong `build/client`; host cần trả về `index.html` cho các URL của ứng dụng. Dùng `npm run typecheck` để kiểm tra kiểu và `npm run lint` để kiểm tra mã.

Kênh báo và danh mục được giữ trong query string (`channel`, `category`) và được quản lý bằng React Router.

# Learning Path

2. Việc trích xuất link, ảnh từ response
VNExpress là một ví dụ, file trả về có `summary_detail` và trong đó có description ngắn mô tả bài viết. Việc của mình là lấy ra đoạn mô tả ngắn đó với `extractDescription` trong `shared/utils`

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
