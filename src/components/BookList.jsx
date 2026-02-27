import { motion } from 'framer-motion';
import BookItem from './BookItem';
import { Button } from '@mantine/core';


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
      {books.length > 0 && (
        <motion.div 
          className='min-w-xs bg-slate-200 p-5'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map(book => (
            <BookItem 
              key={book.id} 
              info={book} 
              books={books} 
              setBooks={setBooks}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookList;