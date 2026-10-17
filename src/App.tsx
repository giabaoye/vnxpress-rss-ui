import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import useNews from "./hooks/useNews"
import Navigation from "./layouts/Navigation/Navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"

export function App() {
  const news = useNews()

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navigation />
      <div className="flex flex-1 overflow-y-auto p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <section className="flex flex-col gap-3">
              {news.status === "loading" ? (
                <div className="flex w-90 flex-col pb-5">
                  <Skeleton className="mb-2 h-10" />
                  <Skeleton className="mb-3 h-5" />
                  <Skeleton className="aspect-video w-full" />
                </div>
              ) : news.status === "error" ? (
                <div>Không thể tải tin. Vui lòng thử lại sau.</div>
              ) : news.status === "empty" ? (
                <div>Chưa có bài viết nào trong danh mục này.</div>
              ) : (
                news.articles.map((d) => (
                  <div key={d.id} className="flex flex-col pb-3">
                    <Card className="relative mx-auto w-full max-w-sm pt-0">
                      <img
                        src={d.image}
                        alt={d.title}
                        className="aspect-video w-full rounded-t-xl object-cover"
                      />
                      <CardHeader>
                        <CardTitle>{d.title}</CardTitle>
                        <CardDescription>
                          <a href={d.link} target="_blank" rel="noreferrer">
                            {d.description}{" "}
                            <ExternalLink
                              className="relative -top-0.5 inline"
                              size={12}
                            />
                          </a>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
