// Rafce for shortcut
import { useState } from 'react'
import React from 'react'
import BookItem from './BookItem'
import BookForm from './BookForm'




const BookList = ({books, setBooks}) => {

  return (
    <div className='p-8'>        

        <BookForm books={books} setBooks={setBooks}/>

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