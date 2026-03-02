import React from 'react'
import { useState } from 'react'
import { recommendBook, findSimilar } from './Model'
import BookList from './BookList'
import { CardImage } from './CardImage'
import { motion, AnimatePresence } from "framer-motion"
import BasicForm from './RecommendationForm'



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

const formAnim = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
}

  return (
    <div className='my-30 m-5 flex flex-col items-center'>
        
      <motion.div
        variants={formAnim}
        initial="hidden"
        animate="show"
        className="w-full flex justify-center"
      >
      <BasicForm setRecommendedBooks={setRecommendedBooks} />
    </motion.div>

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