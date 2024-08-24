import React, { useEffect, useContext } from 'react';
import PokemonCard from './PokemonCard';
import PokemonContext from '../../contexts/PokemonContext';
import './PokemonList.css';

function PokemonList({ currentPage, pokemonsPerPage, handleCatchPokemon }) {
  const { currentPokemons, fetchPokemonsForPage } = useContext(PokemonContext);

  useEffect(() => {
    fetchPokemonsForPage(currentPage, pokemonsPerPage);
  }, [currentPage, pokemonsPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.classList.add('show');
      });
    }, 50); // Small delay to ensure cards are rendered before animation

    return () => {
      clearTimeout(timer);
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('show');
      });
    };
  }, [currentPokemons]);

  return (
    <div className="container-fluid mt-3">
      <div className="row list-row gx-5 gy-1">
        {currentPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard 
              key={pokemon.id}  
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
