import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookList from './components/BookList'
import { bookDB } from './assets/booksInfo'
import Navbar from './components/Navbar'
import booksData from './assets/booksInfo.json'
import { useEffect } from 'react'
import Recommendation from './components/Recommendation'
import { Routes, Route } from 'react-router-dom';
import BookForm from './components/BookForm'

const getInitialData = () =>{
  const data = JSON.parse(localStorage.getItem('books'))
  if(!data) return [];
  else return data
}

function App() {
  let [books, setBooks] = useState(getInitialData) 

  // useEffect(()=>{
  //   localStorage.setItem(
  //     'books',
  //      .stringify convert to string since the web needs it in the form of a string
  //     JSON.stringify(books) 
  //   )
  // }, [books])

  return (
    <div className="flex justify-center">
      <div className='w-5xl'>
    <Navbar />
    <Routes>
        <Route path="/Recommendation" element={<Recommendation books={books} setBooks={setBooks}/>} />
        <Route path="/BookForm" element={<BookForm books={books} setBooks={setBooks}/>} />
        <Route path="/BookList" element={<BookList books={books} />} />
    </Routes>
      </div>
    </div>
  )
}

export default App
