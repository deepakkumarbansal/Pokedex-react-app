import './pokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';
const PokemonList = () => {

   // using custom hooks so that UI component will not have all logic and in future unit testing will be easy. Also you can also use it anywhere also
 const {pokemonListState, setPokemonListState} = usePokemonList('https://pokeapi.co/api/v2/pokemon/', false); // if type argument ==> 'true' ==> we are query for perticular type. Else 'false' ==> all pokemon list
 //OR-->  const [pokemonListState, setPokemonListState] = usePokemonList();

  return (
    <div className='pokemon-list-wrapper'>
      <div className='pokemon-wrapper'>
      {(pokemonListState.isLoading) ? 'Loading...': 

        pokemonListState.pokemonList.map((p)=>
          <Pokemon image={p.image} name={p.name} key={p.id} id={p.id}/>)
      }
      </div>
      <div className="controls">
        <button disabled = {(pokemonListState.prevUrl) == null} onClick={()=>{setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}}>Prev</button>
        <button disabled = {pokemonListState.nextUrl == null} onClick={()=>{setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList