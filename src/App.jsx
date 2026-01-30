import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import { bookDB } from './assets/booksInfo'
import Navbar from './components/Navbar'
import booksData from './assets/booksInfo.json'



function App() {


  let [books, setBooks] = useState(booksData) 
  return (
    <>
    <Navbar />
    <BookList books={books} setBooks={setBooks}/>
    </>
  )
}

export default App
