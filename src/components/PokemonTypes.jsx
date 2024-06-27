// src/components/PokemonTypes.jsx
import React from 'react';

const typeColors = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#98D8D8",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#b8a038",
  water: "#0190FF",
};

const PokemonTypes = ({ types }) => (
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
