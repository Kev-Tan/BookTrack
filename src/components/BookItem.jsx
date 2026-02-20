import React from 'react'
import { supabase } from './GetData'

const deleteBook = async(id, books, setBooks) =>{
    console.log(id)
    const response = await supabase
    .from('books')
    .delete()
    .eq('id', id)
    setBooks(books.filter(book=>book.id !== id))
}

const BookItem = ({info, books, setBooks}) => {
    return <div className='bg-white p-5 mb-5'>
        <div className='flex justify-between'>
            <div>
            <p className='text-left font-bold text-xl'>{info.title}</p>
            <p className="text-md text-left underline">{info.author}</p>
            </div>
            <div className="flex items-center gap-3">
            <p onClick={()=>{deleteBook(info.id, books, setBooks)}}>🗑️</p>
            {/* <p className='self-center'>❤</p> */}
            </div>
        </div>

        <p className='text-left mt-3 mb-3'>{info.synopsis}</p>
        <div>
            <p className='text-left font-semibold'>{info.genre} <span className='text-emerald-400'>| </span>{info.country}</p>
        </div>

    </div>
}

export default BookItem