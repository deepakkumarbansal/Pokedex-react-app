import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './pokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
const PokemonList = () => {
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');

  async function downloadPokemons(){
    setisLoading(true);
    const response = await axios.get(pokedexUrl); // this dowloads list of 20 pokemons
    // array of pokemon name and there urls
    const pokemonResults = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    // iterating over the array of pokemons, and using thier url, to create an array of promises
    // that will download those 20 pokemons.
    const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));
    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
    // now iterating on the data of 20 pokemon, and extract id, name, image, types
    const result = pokemonData.map((pokedata)=>{
      const pokemon = pokedata.data;
      // parsing details of perticular pokemon
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, // because it is possible that other is present
        types: pokemon.types,
      }
    })
    setPokemonList(result);
    setisLoading(false);
  }

  useEffect(()=>{
    downloadPokemons();
  }, [pokedexUrl]);

  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'>
      {(isLoading) ? 'Loading...': 
        pokemonList.map((p)=>
          <Pokemon image={p.image} name={p.name} key={p.id} id={p.id}/>)
      }
      </div>
      <div className="controls">
        <button disabled = {prevUrl == null} onClick={()=>{setPokedexUrl(prevUrl)}}>Prev</button>
        <button disabled = {nextUrl == null} onClick={()=>{setPokedexUrl(nextUrl)}}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
