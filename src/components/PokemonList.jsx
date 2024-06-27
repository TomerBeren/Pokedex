// src/components/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemons, getPokemonDetailsByURL } from '../services/pokemon.service';
import './PokemonList.css';

function PokemonList({ currentPage, pokemonsPerPage, handleCatchPokemon }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const offset = (currentPage - 1) * pokemonsPerPage;
        const pokemonList = await getPokemons(offset, pokemonsPerPage);
        const pokemonDetailsPromises = pokemonList.map(pokemon => getPokemonDetailsByURL(pokemon.url));
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      }
    };

    fetchPokemons();
  }, [currentPage, pokemonsPerPage]);

  return (
    <div className="container mt-3">
      <div className="row gx-5 gy-1">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard pokemon={pokemon} className="list-card" handleCatchPokemon={handleCatchPokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
