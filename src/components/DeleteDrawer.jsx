import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DeleteDrawer({ info, setBooks }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  async function dropBook(bookId, reason) {
    const res = await fetch("http://localhost:8000/dropBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_id: bookId, reason }),
    })
    if (!res.ok) throw new Error(await res.text())
        setBooks((prev) => prev.filter((b) => b.id !== bookId))
    return res.json()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await dropBook(info.id, reason)  // make sure info.id is correct
      setReason("")
      setOpen(false)                  // ✅ CLOSE drawer after success
    } catch (err) {
      console.error(err)
      // keep drawer open on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-1" variant="destructive">
          Delete
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[75vh] w-full flex flex-col items-center">
        <DrawerHeader>
          <DrawerTitle className="text-center">Delete this book?</DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center overflow-y-auto px-4 py-2"
        >
          <Textarea
            className="text-md sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[50vw]"
            placeholder="Why are you dropping this book?"
            rows={10}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <DrawerFooter className="w-full">
            <div className="flex gap-2 justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>

              <DrawerClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}