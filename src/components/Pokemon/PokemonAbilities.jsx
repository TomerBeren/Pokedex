// src/components/PokemonAbilities/PokemonAbilities.jsx
import React from 'react';

const PokemonAbilities = ({ abilities }) => (
  <div className="abilities-box">
    {/* Header for the abilities section */}
    <h3>Abilities:</h3>
    {/* Loop through the abilities array and render each ability */}
    {abilities.map(ability => (
      <p key={ability} className="ability-item">{ability}</p>
    ))}
  </div>
);

export default PokemonAbilities;
