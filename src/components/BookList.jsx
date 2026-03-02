import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { CardImage } from './CardImage';


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