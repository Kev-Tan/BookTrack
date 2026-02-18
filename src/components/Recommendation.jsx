import React from 'react'
import { useState } from 'react'
import { recommendBook, findSimilar } from './Model'
import BookList from './BookList'



const Recommendation = ({ books, setBooks }) => {

const [prompt, setPrompt] = useState("")

const submitPrompt = async(e, prompt) =>{
  e.preventDefault()
  console.log(prompt)
  let recommended_books = await recommendBook(prompt)
  recommended_books = JSON.parse(recommended_books)
  setBooks([...books, ...recommended_books])
}



  return (
    <div className='my-30'>
        

        <form className="flex flex-col items-center" onSubmit={(e)=>submitPrompt(e, prompt)}>
          <label>
              <h1>Write down what kind of book what you want to read!</h1>
          </label>
              <textarea className="mt-5 mb-3 border-1 black p-2" name="sendPrompt" placeholder="Describe a book you want to read!" onChange={(e)=>setPrompt(e.target.value)} rows={4} cols={40}/>
              <button className="bg-blue-200 px-4 py-1" type="submit">Submit</button>
        
         
        </form>

        {/* <button className="bg-blue-200 px-4 py-1" type="submit" onClick={()=>{
          recommendBook("Give me a slow burn romance novel that takes place in Seoul")
        }}>Test</button> */}
    </div>
  )
}

export default Recommendation