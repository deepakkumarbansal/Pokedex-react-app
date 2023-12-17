import axios from 'axios';
import React, { useEffect, useState } from 'react'

const usePokemonDetails = (id, pokemonName) => {
    // let pokemonListHookResponse = [];
    const [pokemon, setPokemon] = useState("");
    { /* use "" instead of {}*/ }

    async function downloadPokemon() {
        try {
            let response;
            if (pokemonName) {
                pokemonName = pokemonName.toLowerCase();
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            }
            else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 5),
            });
        }
        catch (error) {
            console.log("Something went wrong", error.message); // Avoiding axios error when PokemonName is incorrect
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, []);
    return [pokemon]
}

export default usePokemonDetails
