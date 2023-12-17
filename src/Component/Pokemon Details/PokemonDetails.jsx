import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./pokemonDetails.css";
import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";
const PokemonDetails = () => {
    const {id} = useParams();
    const [pokemon] = usePokemonDetails(id);
  return (
    <div className="pokemon-details-wrapper">
      <img
        className="pokemon-details-image"
        src={pokemon.image}
        alt="pokemon-image"
      />
      <div className="pokemon-details">
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-details">Weight: {pokemon.weight}</div>
      <div className="pokemon-details">Height: {pokemon.height}</div>
      <div className="pokemon-details-types">
        {pokemon && pokemon.types.map((t) => <div key={t}>{t}</div>)}{" "}
        {/* 'pokemon &&' is used due to if pokemon exist only then print the pokemon types so that avoid map undefined error */}
      </div>
      {pokemon.types && (
        <div>
          More upto five {pokemon.types[0]} type pokemons
          <ul>
            {
              pokemon.similarPokemons.map((p) => (
                <li key={p.pokemon.url}>{p.pokemon.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
