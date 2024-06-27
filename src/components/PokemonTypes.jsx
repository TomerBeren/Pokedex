// src/components/PokemonTypes.jsx
import React from 'react';

const PokemonTypes = ({ types ,typeColors }) => (
  <div className="types">
    {types.map(type => (
      <span
        key={type}
        style={{ backgroundColor: typeColors[type] }}
        className="type-bubble"
      >
        {type}
      </span>
    ))}
  </div>
);

export default PokemonTypes;
