import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from '../utils/GetData'
import { deleteSupabase } from '../utils/Utils'
import { createSupabase } from '../utils/Utils'
import { toast } from "sonner"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardImage({info, books, setBooks, recommend}) {
  return (
      
    <Card className="relative mx-auto w-full max-w-xs pt-0 flex flex-col min-h-[300px]">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />

      <CardHeader>
        <CardTitle>{info.title}</CardTitle>
        <CardDescription>
          {info.synopsis}
        </CardDescription>
      </CardHeader>

<CardFooter className="flex gap-2 mt-auto">
    {recommend && (
        <Button className="flex-1" variant="" onClick={ () => {
          console.log("ADDING TO BOOK LIST")
           createSupabase(info, books, setBooks)
            toast("Book has been added", {
      description: `You have added ${info.title} into your book list`,
    })
        }}>Add Book</Button>
    )}

    {!recommend && (
        <>
        <Button
            className="flex-1"
            variant="destructive"
            onClick={() => deleteSupabase(info.id, books, setBooks)}
        >
            Delete
        </Button>

        <Button
            className="flex-[2]"
            onClick={() => console.log("view more")}
        >
            View More
        </Button>
        </>
    )}
    </CardFooter>
    </Card>
  )
}