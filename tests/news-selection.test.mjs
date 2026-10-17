import assert from "node:assert/strict"
import { test } from "node:test"
import {
  resolveNewsSelection,
  selectCategory,
  selectChannel,
} from "../src/news/selection.ts"

test("uses the same valid selection for absent or invalid URL values", () => {
  for (const query of ["", "channel=unknown&category=unknown"]) {
    const { channel, category } = resolveNewsSelection(
      new URLSearchParams(query)
    )
    assert.equal(channel.value, "vnexpress")
    assert.equal(category.value, "thoisu")
  }

  const { channel, category } = resolveNewsSelection(
    new URLSearchParams("channel=DanTri&category=thegioi")
  )
  assert.equal(channel.value, "dantri")
  assert.equal(category.value, "thoisu")

  const fallback = resolveNewsSelection(
    new URLSearchParams("channel=unknown&category=thegioi")
  )
  assert.equal(fallback.channel.value, "vnexpress")
  assert.equal(fallback.category.value, "thegioi")
})

test("switching Channel resets category and preserves unrelated URL values", () => {
  const previous = new URLSearchParams(
    "channel=vnexpress&category=giaitri&view=compact"
  )
  const next = selectChannel(previous, "tuoitre")

  assert.equal(previous.get("channel"), "vnexpress")
  assert.equal(next.get("channel"), "tuoitre")
  assert.equal(next.get("category"), "thoisu")
  assert.equal(next.get("view"), "compact")
})

test("changing category uses the resolved Channel", () => {
  const next = selectCategory(
    new URLSearchParams("channel=TuoiTre&category=unknown"),
    "thethao"
  )

  assert.equal(next.get("channel"), "tuoitre")
  assert.equal(next.get("category"), "thethao")
  assert.equal(selectCategory(next, "giaitri").get("category"), "thethao")
})
