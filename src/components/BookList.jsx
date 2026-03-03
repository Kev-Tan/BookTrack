import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { CardImage } from './CardImage';
import axios from 'axios';
import { data } from 'react-router-dom';


const grabInfo = async(term) =>{
  try{
    const res = await axios.get(`http://127.0.0.1:8000/books/${term}`)
    console.log("done!")
    return res.data
  }
  catch(e){
    console.log(e)
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each item
    },
  },
};

const BookList = ({ books, setBooks }) => {
  return (
    <div className='p-8'>
      <button onClick={async()=>{
        let data = await grabInfo("Harry Potter")
        console.log(data.items)
        books = data.items
        books.forEach((book)=>{
          console.log(book.volumeInfo.title)
        })
      }}>Make request to fastAPI</button>
      {books.length > 0 && (
        <motion.div 
          className='grid gap-6 xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  '
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
  
          {books.map(book => (
            <CardImage
              key={book.id} 
              info={book} 
              books={books} 
              setBooks={setBooks}
              recommend = {false}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookList;