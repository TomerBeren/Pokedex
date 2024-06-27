// src/components/PokemonStats.jsx
import React from 'react';

const PokemonStats = ({ height, weight }) => (
  <div className="details-box">
    <div className="detail-item">
      <p>{height / 10} </p>
      <span>Height</span>
    </div>
    <div className="detail-item">
      <p>{weight / 10} </p>
      <span>Weight</span>
    </div>
  </div>
);

export default PokemonStats;
