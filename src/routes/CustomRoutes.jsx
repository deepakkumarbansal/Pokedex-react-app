import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pokedex from '../Component/Pokedex/Pokedex'
import PokemonDetails from '../Component/Pokemon Details/PokemonDetails'
const CustomRoutes = () => {
  return (
    <div>
      <Routes> {/* containes set of routes */}
        <Route path='/' element={<Pokedex/>}/> {/* on which path which component will render*/}
        <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
      </Routes>
    </div>
  )
}

export default CustomRoutes
