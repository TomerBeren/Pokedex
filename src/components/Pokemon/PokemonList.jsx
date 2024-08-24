// src/components/PokemonList/PokemonList.jsx

import React, { useEffect, useContext } from 'react';
import PokemonCard from './PokemonCard';
import PokemonContext from '../../contexts/PokemonContext';
import './PokemonList.css';

function PokemonList({ currentPage, pokemonsPerPage, handleCatchPokemon }) {
  const { currentPokemons, fetchPokemonsForPage } = useContext(PokemonContext);
  
   // Fetch Pokémon data whenever the page or items per page change
  useEffect(() => {
    fetchPokemonsForPage(currentPage, pokemonsPerPage);
  }, [currentPage, pokemonsPerPage]);

  return (
    <div className="container-fluid mt-3">
      <div className="row list-row gx-5 gy-1">
         {/* Render each Pokémon as a card */}
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard 
              key={pokemon.id}  // Ensure a unique key for each PokemonCard
              pokemon={pokemon} 
              className="list-card" 
              handleCatchPokemon={handleCatchPokemon} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;