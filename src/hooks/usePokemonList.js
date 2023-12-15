import axios from 'axios';
import React, { useEffect, useState } from 'react'

const usePokemonList = () => {
    const [pokemonListState, setPokemonListState] = useState({
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
        pokemonList: [],
        isLoading: true,
        prevUrl: '',
        nextUrl: '',
    })

    async function downloadPokemons() {
        // setPokemonListState({...pokemonListState, isLoading: true}); // not using because if same state variable update many times in a functional component it will update according to last variable
        setPokemonListState((state) => ({ ...pokemonListState, isLoading: true })); // pass as a callback

        const response = await axios.get(pokemonListState.pokedexUrl); // this dowloads list of 20 pokemons

        // array of pokemon name and there urls
        const pokemonResults = response.data.results;

        setPokemonListState((state) => ({ ...state, nextUrl: response.data.next, prevUrl: response.data.previous })); // pass as a callback

        // iterating over the array of pokemons, and using thier url, to create an array of promises
        // that will download those 20 pokemons.
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data

        // now iterating on the data of 20 pokemon, and extract id, name, image, types
        const result = pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            // parsing details of perticular pokemon
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, // because it is possible that other is present
                types: pokemon.types,
            }
        })

        setPokemonListState((state) => ({ ...state, pokemonList: result, isLoading: false })); // pass as a callback

    }
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);
    return { pokemonListState, setPokemonListState }
    //OR-->   return [pokemonListState, setPokemonListState]
}

export default usePokemonList
