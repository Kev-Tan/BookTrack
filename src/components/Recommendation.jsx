import React from 'react'
import { useState } from 'react'
import { recommendBook, findSimilar } from './Model'
import BookList from './BookList'
import RecommendedBook from './RecommendedBook'
import BookItem from './BookItem'



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

        {/* <button className="bg-blue-200 px-4 py-1" type="submit" onClick={()=>{
          recommendBook("Give me a slow burn romance novel that takes place in Seoul")
        }}>Test</button> */}
        <div>
        {recommendedBooks && 
        <div className='min-w-xs bg-slate-200 p-5 mt-10'>
          {
        recommendedBooks.map((book)=>{
          // return <li key={book.title}>{book.title}</li>
          return <BookItem id={book.name} info={book} books={books} setBooks={setBooks} recommend/>
        })
      }
        </div>
        }
        </div>
    </div>
  )
}

export default Recommendation