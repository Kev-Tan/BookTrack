import React, { useState } from "react";
import { supabase } from "../utils/GetData";
import { createSupabase } from "../utils/Utils";
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { CardImage } from "./CardImage";
import { motion, AnimatePresence } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each item
    },
  },
};

const BookForm = ({books, setBooks}) => {
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log("Current value:", event.target.value)
  }

  const grabInfo = async(term) =>{
    try{
      const res = await axios.get(`http://127.0.0.1:8000/books/${term}`)
      console.log("done!")
      return res.data
    }
    catch(e){
      console.log(e)
    }
  }

  const formAnim = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <div className="flex justify-center flex-col items-center p-8">
      <motion.div
        variants={formAnim}
        initial="hidden"
        animate="show"
        className="w-full flex justify-center"
      >
        <Card className="w-full max-w-2xl py-10 mt-10 p-5">
          <CardHeader>
            <CardTitle className="text-3xl">Search</CardTitle>
            <CardDescription className="text-xl">Search for books and add them to your list</CardDescription>
          </CardHeader>
          <Input value={value} onChange={handleChange} type="search" placeholder="Search..." />
          <div className="flex w-full 2xs:w-fit gap-2 mt-3">
            <Button variant="destructive" className="flex-1" onClick={()=>{
              setValue("")
            }}>Reset</Button>
            <Button className="flex-1" onClick={async(e)=>{
              let res = await grabInfo(value)
              res = res.items
              console.log(res)
              setResults([])
              
              res.forEach((info)=>{
                const bookInfo = info.volumeInfo
                const allAuthors = bookInfo.authors ? bookInfo.authors.join(", ") : ""
                const book = {
                  title : bookInfo.title,
                  author : allAuthors,
                  genre : "N/A",
                  // country : "N/A",
                  synopsis : bookInfo.description,
                  image_link: bookInfo.imageLinks.thumbnail,
                  google_id: info.id,
                }

                setResults(results => [...results, book])
              })

              setValue("")
            }}>Search</Button>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className='grid gap-6 xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 mt-10'
          >
            {results.map((book, idx) => (
              <motion.div
                key={book.google_id ?? idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.06 }}
              >
                <CardImage
                  info={book} 
                  author = {book.author}
                  books={books} 
                  setBooks={setBooks}
                  recommend = {true}
                  image_link = {book.image_link}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

};

export default BookForm;