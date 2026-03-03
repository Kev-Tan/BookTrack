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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [synopsis, setSynopsis] = useState("");
  // const [id, setID] = useState(0);

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

  // const handleSubmit = async(e) =>{
  //   e.preventDefault();
  //   const book = {title, author, genre, country, synopsis}


  //   createSupabase(book, books, setBooks)

  //   console.log(data)
  //   console.log(data[0])

  //   if(error) throw error
  //   setBooks([...books, data[0]])
  //   setTitle('')
  //   setAuthor('')
  //   setGenre('')
  //   setCountry('')
  //   setSynopsis('')
  //   }
  
// 

  // return (
  //   <div className="flex justify-center">
  //     <form className="border flex flex-col m-4 p-8 gap-3" onSubmit={handleSubmit}>
  //       {/* Row */}
  //       <div className="flex items-center">
  //         <label className="w-24 font-semibold">Book:</label>
  //         <input
  //           className="flex-1 border px-2 py-1"
  //           type="text"
  //           value={title}
  //           required
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //       </div>
  //       <div className="flex items-center">
  //         <label className="w-24 font-semibold">Author:</label>
  //         <input
  //           className="flex-1 border px-2 py-1"
  //           type="text"
  //           value={author}
  //           required
  //           onChange={(e) => setAuthor(e.target.value)}
  //         />
  //       </div>
  //       <div className="flex items-center">
  //         <label className="w-24 font-semibold">Genre:</label>
  //         <input
  //           className="flex-1 border px-2 py-1"
  //           type="text"
  //           value={genre}
  //           required
  //           onChange={(e) => setGenre(e.target.value)}
  //         />
  //       </div>
  //       <div className="flex items-center">
  //         <label className="w-24 font-semibold">Country:</label>
  //         <input
  //           className="flex-1 border px-2 py-1"
  //           type="text"
  //           value={country}
  //           required
  //           onChange={(e) => setCountry(e.target.value)}
  //         />
  //       </div>
  //           {/* <div className="flex items-center">
  //         <label className="w-24 font-semibold">ID:</label>
  //         <input
  //           className="flex-1 border px-2 py-1"
  //           type="text"
  //           value={id}
  //           onChange={(e) => setID(e.target.value)}
  //         />
  //       </div> */}
  //       <div className="flex items-start">
  //         <label className="w-24 font-semibold pt-1">Synopsis:</label>
  //         <textarea
  //           className="flex-1 border px-2 py-1"
  //           rows="3"
  //           value={synopsis}
  //           required
  //           onChange={(e) => setSynopsis(e.target.value)}
  //         />
  //       </div>
  //       <button className="bg-white text-black hover:bg-emerald-400 hover:text-white border duration-100 ease-in transition-colors">
  //         Add book
  //       </button>{" "}
  //     </form>
  //   </div>
  // );



    return (
      <div className="flex justify-center flex-col items-center">
      <Field className="max-w-2xl mt-20 mx-20" orientation="horizontal">
        <Input value={value} onChange={handleChange} type="search" placeholder="Search..." />
        <Button variant="destructive" onClick={()=>{
          setValue("")
        }}>Reset</Button>
        <Button onClick={async(e)=>{
          let res = await grabInfo(value)
          res = res.items
          console.log(res)
          setResults([])
          
          res.forEach((info)=>{
            const bookInfo = info.volumeInfo
            const book = {
              title : bookInfo.title,
              author : bookInfo.author,
              genre : "N/A",
              country : "N/A",
              synopsis : bookInfo.description,
              image_link: bookInfo.imageLinks.thumbnail,
              google_id: info.id,
            }

            setResults(results => [...results, book])
          })

          setValue("")
        }}>Search</Button>
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