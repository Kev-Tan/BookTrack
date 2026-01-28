import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import { books } from './assets/booksInfo'



function App() {
  

  return (
    <>
     <h1 className="text-3xl font-bold underline text-red-400 mb-5">
      BookTrack
    </h1>
    <BookList books={books}/>
    </>
  )
}

export default App
