import React, { useState } from "react";

const BookForm = ({books, setBooks}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    const book = {title, author, genre, country, synopsis}
    console.log(book)
    setBooks([...books, book])
    }
  
// A thriller set in a submarine as they race to fix a combustion engine that will blow up in 2 hours

  return (
    <div className="flex justify-center">
      <form className="border flex flex-col w-[400px] m-4 p-8 gap-3" onSubmit={handleSubmit}>
        {/* Row */}
        <div className="flex items-center">
          <label className="w-24 font-semibold">Book:</label>
          <input
            className="flex-1 border px-2 py-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 font-semibold">Author:</label>
          <input
            className="flex-1 border px-2 py-1"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 font-semibold">Genre:</label>
          <input
            className="flex-1 border px-2 py-1"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 font-semibold">Country:</label>
          <input
            className="flex-1 border px-2 py-1"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <label className="w-24 font-semibold pt-1">Synopsis:</label>
          <textarea
            className="flex-1 border px-2 py-1"
            rows="3"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </div>
        <button className="bg-white text-black hover:bg-emerald-400 hover:text-white border duration-100 ease-in transition-colors">
          Add book
        </button>{" "}
      </form>
    </div>
  );
};

export default BookForm;