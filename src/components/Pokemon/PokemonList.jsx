// src/components/PokemonList/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

function PokemonList({pokemons, currentPage, pokemonsPerPage, handleCatchPokemon }) {
  // State to hold the list of Pokemons
  const [currentPokemons, setCurrentPokemons] = useState([]);
  
  useEffect(() => {
    // Function to fetch Pokemons based on current page and items per page
    const fetchPokemons = async () => {
      try {
         // Calculate start and end indices for slicing the Pokémon list.
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
         // Set the current Pokémon slice to state.
        const pokemonList = pokemons.slice(startIndex, endIndex);
        setCurrentPokemons(pokemonList);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      }
    };

    fetchPokemons();
  }, [currentPage, pokemonsPerPage]);

  return (
    <div className="container-fluid mt-3">
      <div className="row list-row gx-5 gy-1">
        {/* Map through the Pokemons and render a PokemonCard for each */}
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard 
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
