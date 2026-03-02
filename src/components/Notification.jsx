
"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function Notification({info}) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Book has been added", {
          description: `You have added ${info.title} into your book list`,
        })
      }
    >
      Show Toast
    </Button>
  )
}
