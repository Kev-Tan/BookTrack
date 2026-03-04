import React, { useState } from "react";
import { supabase } from "../utils/GetData";
import { createSupabase } from "../utils/Utils";
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { CardImage } from "./CardImage";
import { motion } from 'framer-motion';



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



    return (
      <div className="flex justify-center flex-col items-center p-8">
 
      <Field className="max-w-2xl mt-20 mx-20 flex flex-col lg:flex-row" orientation="horizontal">
        <Input value={value} onChange={handleChange} type="search" placeholder="Search..." />
        <div className="flex w-full 2xs:w-fit gap-2">
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
    </Field>


          <motion.div 
          className='grid gap-6 xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 mt-10'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
  
          {results.map(book => (
            <CardImage
              key={book.google_id} 
              info={book} 
              author = {book.author}
              books={books} 
              setBooks={setBooks}
              recommend = {true}
              image_link = {book.image_link}
            />
          ))}
        </motion.div>

      </div>
    )

};

export default BookForm;