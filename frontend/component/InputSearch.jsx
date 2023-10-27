import React, { useContext, useState } from "react";
import { useSearch } from "../context/SearchContext";

function InputSearch() {
  const [prompt, setPrompt] = useState("");
  const { handleSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(prompt);
  };
  return (
    <form onSubmit={handleSubmit} className=" relative ">
      <label htmlFor="name-with-label" className="text-gray-700">
        Your learning search
      </label>
      <input
        type="text"
        id="name-with-label"
        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        name="email"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Your learning search"
      />
    </form>
  );
}

export default InputSearch;
