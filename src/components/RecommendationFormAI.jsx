"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RecommendationFormAI({ setRecommendedBooks }) {
  const [loading, setLoading] = useState(false)
  const [submitMode, setSubmitMode] = useState("basic") // "basic" | "rag"

  const form = useForm({
    defaultValues: { recommendation: "" },
    mode: "onSubmit",
  })

  async function fetchAndEnrich(prompt, endpoint) {
    const res = await axios.get(endpoint, { params: { prompt } })

    // adjust this depending on your backend response shape
    // basic might be res.data.books
    // rag might be res.data.result.books or res.data.result (schema)
    const recs =
      res.data?.books ??
      // res.data?.result?.books ??
      // res.data?.result ??
      []

    const enriched = await Promise.all(
      recs.map(async (book) => {
        const gb = await axios.get(
          `http://127.0.0.1:8000/books/${encodeURIComponent(book.title)}`
        )

        const first = gb.data.items?.[0]
        const v = first?.volumeInfo ?? {}

        return {
          ...book,
          google_id: first?.id ?? null,
          image_link: v.imageLinks?.thumbnail ?? null,
          genre: book.genre ?? "N/A",
        }
      })
    )

    return enriched
  }

  async function onSubmit(values) {
    try {
      setLoading(true)
      const prompt = values.recommendation

      const endpoint =
        submitMode === "rag"
          ? "http://127.0.0.1:8000/recommend_rag" 
          : "http://127.0.0.1:8000/recommend_books" 

      const enriched = await fetchAndEnrich(prompt, endpoint)
      setRecommendedBooks(enriched)
    } finally {
      form.reset()
      setLoading(false)
      setSubmitMode("basic")
    }
  }

  return (
    <Card className="w-full max-w-2xl py-10 mt-10">
      <CardHeader>
        <CardTitle className="text-3xl">Recommendation</CardTitle>
        <CardDescription className="text-xl">
          Get tailor made recommendations from AI!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="recommendation"
              rules={{
                required: "Please describe a book you want to read",
                minLength: { value: 3, message: "At least 3 characters" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Describe a book you want to read!
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-md"
                      {...field}
                      placeholder="Describe a book you want to read..."
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0 flex gap-2">
              <Button
                className="basis-1/3"
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={loading}
              >
                Reset
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="basis-1/3"
                onClick={() => setSubmitMode("basic")}
              >
                {loading && submitMode === "basic" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading && submitMode === "basic"
                  ? "Generating..."
                  : "Get Recommendations"}
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="basis-1/3"
                onClick={() => setSubmitMode("rag")}
              >
                {loading && submitMode === "rag" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading && submitMode === "rag"
                  ? "Generating..."
                  : "RAG-assisted Recommendations"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}