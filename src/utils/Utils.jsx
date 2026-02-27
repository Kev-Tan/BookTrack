import { supabase } from './GetData'

export const createSupabase = async (book, books, setBooks) => {
    const {data, error} = await supabase
        .from("books")
        .insert(book)
        .select()

        setBooks([...books, data[0]])
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