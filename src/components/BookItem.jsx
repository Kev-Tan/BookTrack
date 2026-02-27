import React from 'react'
import { supabase } from '../utils/GetData'
import { deleteSupabase } from '../utils/Utils'
import { createSupabase } from '../utils/Utils'


const BookItem = ({info, books, setBooks, recommend}) => {
    

    return <div className='bg-white p-5 mb-5'>
        <div className='flex justify-between'>
            <div>
            <p className='text-left font-bold text-xl'>{info.title}</p>
            <p className="text-md text-left underline">{info.author}</p>
            </div>
            <div className="flex items-center gap-3">
            {!recommend && <p onClick={()=>{deleteSupabase(info.id, books, setBooks)}}>🗑️</p>}
            {/* <p className='self-center'>❤</p> */}
            </div>
        </div>

        <p className='text-left mt-3 mb-3'>{info.synopsis}</p>
        <div className='flex justify-between items-center'>
            <div>
            <p className='text-left font-semibold'>{info.genre} <span className='text-emerald-400'>| </span>{info.country}</p>
            </div>
            <div>
                {recommend &&  <p className="bg-white text-black hover:bg-emerald-400 hover:text-white border duration-100 ease-in transition-colors px-2 py-1 mt-5" onClick={()=>{createSupabase(info, books, setBooks)}}>Add Book</p>}
            </div>
        </div>

    </div>
}

export default BookItem