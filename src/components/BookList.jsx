// Rafce for shortcut
import { useState } from 'react'
import React from 'react'

function createBookItem(info){
    return <div className='bg-white p-5 mb-5'>
        <div className='flex justify-between'>
            <div>
            <p className='text-left font-bold text-xl'>{info.title}</p>
            <p className="text-md text-left underline">{info.author}</p>
            </div>
            <p className='self-center'>❤</p>
        </div>

        <p className='text-left mt-3 mb-3'>{info.synopsis}</p>
        <div>
            <p className='text-left font-semibold'>{info.genre} <span className='text-emerald-400'>| </span>{info.country}</p>
        </div>

    </div>
}

const BookList = ({books}) => {
  return (
    <>        
        <div className='min-w-md bg-slate-200 p-5'>
            {createBookItem(books[0])}
            {createBookItem(books[1])}
             
        </div>
       
    </>
  )
}

export default BookList