import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteSupabase, createSupabase } from "../utils/Utils";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";


export function CardImage({ info, books, setBooks, recommend, image_link }) {
  const fallbackImg = "https://avatar.vercel.sh/shadcn1";
  const initialImg = image_link || info?.image_link || fallbackImg;
  const [imgSrc, setImgSrc] = useState(initialImg);

  return (
    <Card className="relative mx-auto w-full max-w-xs pt-0 flex flex-col min-h-[300px] overflow-hidden">
      {/* TOP COVER (aspect-video only) */}
      <div className="relative z-10 aspect-video w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={info?.title ? `${info.title} cover` : "Book cover"}
          className="h-full w-full object-cover brightness-60 "
          onError={() => setImgSrc(getHDThumbnail(fallbackImg))}
          loading="lazy"
        />
        {/* overlay only on top cover */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <CardHeader>
        <CardTitle>{info.title}</CardTitle>
        <CardDescription className="line-clamp-5">
          {info.synopsis}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2 mt-auto">
        {recommend ? (
          <Button
            className="flex-1"
            onClick={() => {
              console.log("ADDING TO BOOK LIST");
              createSupabase(info, books, setBooks);
              toast("Book has been added", {
                description: `You have added ${info.title} into your book list`,
              });
            }}
          >
            Add Book
          </Button>
        ) : (
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
  );
}