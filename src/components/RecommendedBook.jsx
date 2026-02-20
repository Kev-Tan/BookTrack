import React from 'react'
import { supabase } from './GetData'


const RecommendedBook = ({book, setBooks, books}) => {

    const addRecommendedBook = async () => {
        const {data, error} = await supabase
            .from("books")
            .insert(book)
            .select()

            setBooks([...books, data[0]])
            console.log("Book added!")
    }

  return (
        <div className='bg-white p-5 mb-5'>
        <div className='flex justify-between'>
            <div>
            <p className='text-left font-bold text-xl'>{book.title}</p>
            <p className="text-md text-left underline">{book.author}</p>
            </div>
            <div className="flex items-center gap-3">
            <p onClick={()=>{addRecommendedBook()}}>Add Book</p>
            {/* <p className='self-center'>❤</p> */}
            </div>
        </div>

        <p className='text-left mt-3 mb-3'>{book.synopsis}</p>
        <div>
            <p className='text-left font-semibold'>{book.genre} <span className='text-emerald-400'>| </span>{book.country}</p>
        </div>

    </div>
  )
}

export default RecommendedBook