import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)

// 2. Export a clean fetch function
export async function fetchBooks(setBooks) {
  const { data, error } = await supabase
    .from("books")
    .select("*"); // Best practice to use "*" for clarity

    setBooks(data)

  if (error) {
    console.error("Error fetching books:", error);
    return [];
  }
  return data;
}