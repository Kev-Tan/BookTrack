// Rafce for shortcut
import { useState } from 'react'
import React from 'react'
import BookItem from './BookItem'
import BookForm from './BookForm'




const BookList = ({books, setBooks}) => {

  return (
    <div className='p-8'>        

        {/* <BookForm books={books} setBooks={setBooks}/> */}
        {/* {
          books.forEach((book) =>{
            console.log(book.id)
          })
        } */}
        {console.log(books)}
        {books.length>0 && <div className='min-w-xs bg-slate-200 p-5'>
            {/* {createBookItem(books[0])}
            {createBookItem(books[1])}
              */}
            {/* {books.map((book)=>BookItem(book))} */}
            {books.map(book => <BookItem key={book.id} info={book} books={books} setBooks={setBooks}/>)}
        </div>
      } 
    </div>
  )
}

export default BookList