import React, { useState, useContext } from "react";
import axios from "axios";

const SearchContext = React.createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);

  const handleSearch = async (prompt) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/youtube/search",
        {
          params: {
            prompt: `Proposez-moi une liste de chapitres contenant ${prompt}, sans sous chapitres pour apprendre ${prompt} de manière progressive. Et ainsi pouvoir faire une recherche youtube de ces chapitres."`,
          },
        }
      );
      setResults(response.data.youtubeResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
