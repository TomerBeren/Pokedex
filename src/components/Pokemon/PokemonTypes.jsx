// src/components/PokemonTypes.jsx
import React from 'react';

const PokemonTypes = ({ types, typeColors }) => (
  <div className="types">
    {/* Map through each type and create a span element */}
    {types.map(type => (
      <span
        key={type}
        style={{ backgroundColor: typeColors[type] }} // Set background color based on type
        className="type-bubble"
      >
        {type} {/* Display the type name */}
      </span>
    ))}
  </div>
);

export default PokemonTypes;
