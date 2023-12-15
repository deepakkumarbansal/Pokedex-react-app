import React from 'react'
import './pokemon.css'
import { Link } from 'react-router-dom'
const Pokemon = ({name, image, id}) => {
  return (
    <div className='pokemon'>
        <Link to={`/pokemon/${id}`}> {/* using 'Link' and 'to' attribute instead of 'a' tag and 'href' attribute so that page will not reload*/}
        <div className='pokemon-name'>{name}</div>
        <div className='pokemon-image'><img src={image} alt={`${name}'s image`} /></div>
        </Link>
    </div>
  )
}

export default Pokemon
