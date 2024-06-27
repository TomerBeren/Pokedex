import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';
import { getPokemons, getPokemonDetailsByURL } from '../services/pokemon.service';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Fetch the list of pokemons
        const pokemonList = await getPokemons();
        // Fetch details for each pokemon
        const pokemonDetailsPromises = pokemonList.map(pokemon =>
          getPokemonDetailsByURL(pokemon.url)
        );
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row gx-5 gy-1">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3">
            <PokemonCard pokemon={pokemon} className="list-card" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
