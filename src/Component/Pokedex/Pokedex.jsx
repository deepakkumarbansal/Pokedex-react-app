import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import './Pokedex.css'
import PokemonList from '../PokemonList/PokemonList'
import PokemonDetails from '../Pokemon Details/PokemonDetails'
const Pokedex = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='pokedex-wrapper'>
      <Search updateSearchTerm = {setSearchTerm}/>
     {/* { (!searchTerm)? <PokemonList/> : <PokemonDetails pokemonName={searchTerm}/>} */}
     {/* The above line of code will make api request for first letter only (so only one time render of PokemonDetails component) because of Reconciliation to avoid this provide it key attribute with setTerm value so that change in key will make component re-render */}
     { (!searchTerm)? <PokemonList/> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
    </div>
  )
}

export default Pokedex
