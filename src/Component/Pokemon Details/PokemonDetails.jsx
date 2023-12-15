import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './pokemonDetails.css'
const PokemonDetails = () => {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState(""); {/* use "" instead of {}*/}
  async function downloadPokemon(){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t)=>t.type.name)
    })
  }
  useEffect(()=>{
    downloadPokemon();
  },[])
  return (
    <div className='pokemon-details-wrapper'>
      <img className="pokemon-details-image" src={pokemon.image} alt="pokemon-image" />
      <div className="pokemon-details"><span>{pokemon.name}</span></div>
      <div className="pokemon-details">Weight: {pokemon.weight}</div>
      <div className="pokemon-details">Height: {pokemon.height}</div>
      <div className="pokemon-details-types">
        {pokemon && pokemon.types.map((t)=><div key={t}>{t}</div>)} {/* 'pokemon &&' is used due to if pokemon exist only then print the pokemon types so that avoid map undefined error */}
      </div>
    </div>
  )
}

export default PokemonDetails
