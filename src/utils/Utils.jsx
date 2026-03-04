import { supabase } from './GetData'

export const createSupabase = async (book, books, setBooks) => {
    const {data, error} = await supabase
        .from("books")
        .insert(book)
        .select()


        setBooks([...books, data[0]])
        
        await fetch(`http://127.0.0.1:8000/embeddings/one/${book.google_id}`, {
            method: "POST",
        });
        console.log("Book added!")
}

export const deleteSupabase = async (id, books, setBooks) => {
    const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

    if (!error) {
        setBooks(books.filter(book => book.id !== id))
    } else {
        console.error("Error deleting book:", error)
    }
}