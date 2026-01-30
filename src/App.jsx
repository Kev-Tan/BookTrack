import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import { bookDB } from './assets/booksInfo'
import Navbar from './components/Navbar'
import booksData from './assets/booksInfo.json'
import { useEffect } from 'react'

const getInitialData = () =>{
  const data = JSON.parse(localStorage.getItem('books'))
  if(!data) return [];
  else return data
}

function App() {
  let [books, setBooks] = useState(getInitialData) 

  useEffect(()=>{
    localStorage.setItem(
      'books',
      // .stringify convert to string since the web needs it in the form of a string
      JSON.stringify(books) 
    )
  }, [books])

  return (
    <>
    <Navbar />
    <BookList books={books} setBooks={setBooks}/>
    </>
  )
}

export default App
