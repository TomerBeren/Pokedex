// src/components/PokemonList.jsx
import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css'; // Ensure this CSS file is imported

function PokemonList() {
  const placeholderPokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Blastoise' },
    { id: 10, name: 'Caterpie' },
  ];

  return (
    <div className="container mt-3">
      <div className="row gx-5 gy-1"> {/* Adjusted spacing */}
        {placeholderPokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-custom d-flex mb-3"> {/* Bootstrap grid classes for responsive design */}
            <PokemonCard pokemon={pokemon} className="list-card"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
