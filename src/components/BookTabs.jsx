import React, { useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const BookTabs = ({info}) => {
const [summary, setSummary] = useState("")

  async function getSummary (){
    const res = await axios.get(`http://127.0.0.1:8000/summarize/${encodeURIComponent(info.title)}`)
    return res.data
  }

  return (
     <Tabs defaultValue="synopsis" className="w-3/4 mt-10 flex-1 min-h-0 w-full">
      <TabsList>
        <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
        <TabsTrigger value="AI_Summary" onClick={async()=>{
            const res = await getSummary()
            setSummary(res)
        }}>AI Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="synopsis">
        <Card>
          <CardHeader>
            <CardTitle>Synopsis</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {info.synopsis}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="AI_Summary">
        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>
              Get an AI summary of the book
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {summary? summary : "Generating summary~"}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default BookTabs

