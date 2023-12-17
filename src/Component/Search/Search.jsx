import React, { useState } from "react";
import "./search.css";
import useDebounce from "../../hooks/useDebounce";
const Search = ({updateSearchTerm}) => {
  const debounceCallback = useDebounce((e)=>updateSearchTerm(e.target.value));
  return (
    <div className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="pokemon name..."
        // onChange={(e)=>updateSearchTerm(e.target.value)}
        // debouncing, to avoid excecive network calls. Delay of 2 seconds is introduced so that making network request after 2 seconds if the user stop typing. 
        // If user start again typing in that 2 seconds, it will clear network request by clearTimeout().
        // This helps to minimize network requsts on the server
        onChange={debounceCallback}
        
      />
    </div>
  );
};

export default Search;
