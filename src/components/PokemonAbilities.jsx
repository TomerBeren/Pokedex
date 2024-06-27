// src/components/PokemonAbilities.jsx
import React from 'react';

const PokemonAbilities = ({ abilities }) => (
  <div className="abilities-box">
    <h3>Abilities:</h3>
    {abilities.map(ability => (
      <p key={ability} className="ability-item">{ability}</p>
    ))}
  </div>
);

export default PokemonAbilities;
