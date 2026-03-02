"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

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

// make sure these exist in your file or props/state:
import { recommendBook } from "./Model" // adjust path
// const [recommendedBooks, setRecommendedBooks] = useState(null)
import { Loader2 } from "lucide-react"

export default function BasicForm({ setRecommendedBooks }) {
    const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      recommendation: "",
    },
    mode: "onSubmit",
  })

  async function onSubmit(values) {
    try{
        setLoading(true)
        const prompt = values.recommendation
        console.log("prompt:", prompt)

        const result = await recommendBook(prompt)
        const parsedBooks = JSON.parse(result)
        setRecommendedBooks(parsedBooks)
    }
    finally{
        form.reset()
        setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl py-10 mt-10">
      <CardHeader>
        <CardTitle className="text-3xl">Recommendation</CardTitle>
        <CardDescription className="text-xl">Get tailor made recommendations from AI!</CardDescription>
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
                  <FormLabel className="text-lg">Describe a book you want to read!</FormLabel>
                  <FormControl>
                    <Textarea className="text-md" {...field} placeholder="Describe a book you want to read..." rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="p-0 flex gap-2">
              <Button  className="basis-1/3" type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" disabled={loading} className="basis-2/3">
                {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Generating..." : "Submit"}
                </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}