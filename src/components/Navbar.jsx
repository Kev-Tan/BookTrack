import React from 'react'
import { IconMenu2 } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [toggleNav, setToggleNav] = useState(false)

  return (
    <div className='px-8 py-4'>
        <div className='flex justify-between content-center'>
            <p className="text-3xl font-bold underline text-emerald-400">
            BookTrack
            </p>
            <div>
            <ul className='flex gap-10 hidden md:flex'>
            <li key="ai_recommendation" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/">AI Recommendation</Link></li>
            <li key="manual_add" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/BookForm">BookForm</Link></li>
            <li key="stack" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/BookList">BookList</Link></li>
        </ul>
            </div>
            <p className='block md:hidden'>
                <IconMenu2 onClick={()=>{
                    setToggleNav(!toggleNav)
                    console.log("toggleNav")
                }} stroke={2} />
            </p>
        </div>
        {toggleNav &&
        <ul className='flex flex-col mt-10 gap-2 block md:hidden'>
            <li key="ai_recommendation" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/">AI Recommendation</Link></li>
            <li key="manual_add" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/BookForm">BookForm</Link></li>
            <li key="stack" className='hover:text-emerald-400 font-semibold transition-all duration-100'><Link to="/BookList">BookList</Link></li>
        </ul>
        }
    </div>
  )
}

export default Navbar