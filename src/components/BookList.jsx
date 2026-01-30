// Rafce for shortcut
import { useState } from 'react'
import React from 'react'
import BookItem from './BookItem'





const BookList = ({books, setBooks}) => {

    
    let randObj = {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    country: "United Kingdom",
    genre: "Classic Romance",
    synopsis: "A witty and insightful novel that explores love, social class, and personal growth through the evolving relationship between Elizabeth Bennet and the reserved Mr. Darcy."
    }


  return (
    <div className='p-8'>        
        {/* TODO: Modify button so it can take in user input instead */}
        <button className='mb-3' onClick={()=>{
            console.log("adding books")
            setBooks([...books, randObj])

        }}>Add</button>
        <div className='min-w-md bg-slate-200 p-5'>
            {/* {createBookItem(books[0])}
            {createBookItem(books[1])}
              */}
            {/* {books.map((book)=>BookItem(book))} */}
            {books.map(book => <BookItem key={book.id} info={book}/>)}
        </div>
       
    </div>
  )
}

export default BookList