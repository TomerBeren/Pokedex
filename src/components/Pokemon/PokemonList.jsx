// src/components/PokemonList/PokemonList.jsx

import React, { useEffect, useContext } from 'react';
import PokemonCard from './PokemonCard';
import PokemonContext from '../../contexts/PokemonContext';
import './PokemonList.css';
import { animateCards } from '../../utils/animateCards';

function PokemonList({ currentPage, pokemonsPerPage, handleCatchPokemon }) {
  const { currentPokemons, fetchPokemonsForPage } = useContext(PokemonContext);
  
  // Fetch Pokémon data whenever the current page or the number of Pokémon per page changes
  useEffect(() => {
    fetchPokemonsForPage(currentPage, pokemonsPerPage);
    // Scroll to the top of the page on page change
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Smooth scrolling
    });
  }, [currentPage, pokemonsPerPage]);

  
  // Apply the card animation effect whenever the currentPokemons array changes
  useEffect(() => {
    animateCards('.card');
  }, [currentPokemons]);

  return (
    <div className="container-fluid mt-3">
      <div className="row list-row gx-5 gy-1">
        {/* Render each Pokémon as a card */}
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard 
              key={pokemon.id}  // Ensure a unique key for each PokemonCard
              pokemon={pokemon} 
              className="card list-card" // Apply card and list-card classes for styling
              handleCatchPokemon={handleCatchPokemon} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
