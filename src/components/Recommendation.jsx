import React from 'react'
import { useState } from 'react'
import { recommendBook, findSimilar } from './Model'
import BookList from './BookList'
import BookItem from './BookItem'
import { CardImage } from './Card'
import { motion, AnimatePresence } from "framer-motion"



const Recommendation = ({ books, setBooks }) => {

const [prompt, setPrompt] = useState("")
const [recommendedBooks, setRecommendedBooks] = useState(null)

const submitPrompt = async(e, prompt) =>{
  e.preventDefault()
  console.log(prompt)
  const result = await recommendBook(prompt)
  const parsedBooks = JSON.parse(result)
  setRecommendedBooks(parsedBooks)
}



  return (
    <div className='my-30 m-5'>
        

        <form className="flex flex-col items-center" onSubmit={(e)=>submitPrompt(e, prompt)}>
          <label>
              <h1>Write down what kind of book what you want to read!</h1>
          </label>
              <textarea className="mt-5 mb-3 border-1 black p-2" name="sendPrompt" placeholder="Describe a book you want to read!" onChange={(e)=>setPrompt(e.target.value)} rows={4} cols={40}/>
              <button className="bg-white text-black hover:bg-emerald-400 hover:text-white border duration-100 ease-in transition-colors px-4 py-2 mt-5" type="submit">Submit</button>
        
        
         
        </form>

        <AnimatePresence mode="wait">
  {recommendedBooks && (
    <motion.div
      key="recs"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="min-w-xs p-5 mt-10 grid gap-2 xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1"
    >
      {recommendedBooks.map((book, idx) => (
        <motion.div
          key={book.title ?? book.name ?? idx}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.06 }}
        >
          <CardImage
            info={book}
            books={books}
            setBooks={setBooks}
            recommend
          />
        </motion.div>
      ))}
    </motion.div>
  )}
</AnimatePresence>    
    </div>
  )
}

export default Recommendation