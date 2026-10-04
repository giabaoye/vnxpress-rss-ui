import Channels from "./Channels"

export default function Nav() {
  return (
    <nav className="flex h-30 w-full shrink-0 flex-col flex-wrap items-baseline justify-between border-b-2 bg-[#0041c2]">
      <div className="flex flex-wrap items-baseline justify-between bg-[#0041c2] px-6 py-2.5">
        <div className="mr-6 flex shrink-0 items-center text-white">
          <span className="text-space font- text-3xl font-semibold tracking-tight">
            Đọc Báo
          </span>
        </div>
      </div>
      <div className="mt-2 w-full bg-white px-6 py-2.5">
        <Channels />
      </div>
    </nav>
  )
}
