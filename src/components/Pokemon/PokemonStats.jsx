// src/components/PokemonStats.jsx
import React from 'react';

const PokemonStats = ({ height, weight }) => (
  <div className="details-box">
    {/* Display Pokemon height */}
    <div className="detail-item">
      <p>{height / 10} </p> {/* Convert height to meters */}
      <span>Height</span>
    </div>
    {/* Display Pokemon weight */}
    <div className="detail-item">
      <p>{weight / 10} </p> {/* Convert weight to kilograms */}
      <span>Weight</span>
    </div>
  </div>
);

export default PokemonStats;
