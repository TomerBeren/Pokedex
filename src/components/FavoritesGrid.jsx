// src/components/FavoritesGrid.jsx
import React from 'react';
import PokemonCard from './PokemonCard';
import './FavoritesGrid.css'; 

function FavoritesGrid({ favorites, showRemoveButton }) {
  // Function to group the favorites into rows of two
  const groupFavoritesInRows = (favorites) => {
    const rows = [];
    for (let i = 0; i < favorites.length; i += 2) {
      rows.push(favorites.slice(i, i + 2));
    }
    return rows;
  };

  const favoriteRows = groupFavoritesInRows(favorites);

  return (
    <>
      {favoriteRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((pokemon) => (
            <div key={pokemon.id} className="col-6 mb-3 d-flex">
              <PokemonCard 
                pokemon={pokemon} 
                showRemoveButton={showRemoveButton} 
                className="favorite-card" /* Added custom class */
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default FavoritesGrid;
