import { Button } from "@/components/ui/button"
import useNews from "./hooks/useNews"
import Nav from "./Nav"
import { useQueryParams } from "./hooks/useQueryParams"

export function App() {
  const { data } = useNews()
  const [params] = useQueryParams()

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Nav />
      <div className="flex flex-1 overflow-y-auto p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <section className="flex flex-col gap-5 divide-y-2 divide-gray-400">
              {data.map((d, index) => (
                <div key={d.id} className="flex flex-col pb-5">
                  <h3 className="mb-2 text-xl font-bold">{d.title}</h3>
                  <p className="text-lg">{d.description}</p>
                  <img
                    src={d.image.href}
                    alt={d.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                </div>
              ))}
            </section>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
