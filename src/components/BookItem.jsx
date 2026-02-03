import React from 'react'

const BookItem = ({info}) => {
    return <div className='bg-white p-5 mb-5'>
        <div className='flex justify-between'>
            <div>
            <p className='text-left font-bold text-xl'>{info.title}</p>
            <p className="text-md text-left underline">{info.author}</p>
            </div>
            <div className="flex items-center gap-3">
            <p>🗑️</p>
            <p className='self-center'>❤</p>
            </div>
        </div>

        <p className='text-left mt-3 mb-3'>{info.synopsis}</p>
        <div>
            <p className='text-left font-semibold'>{info.genre} <span className='text-emerald-400'>| </span>{info.country}</p>
        </div>

    </div>
}

export default BookItem