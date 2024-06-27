// src/components/FavoritesSideBar.jsx
import React from 'react';
import FilterBar from './FilterBar';
import FavoritesGrid from './FavoritesGrid';

function FavoritesSideBar() {
  const placeholderFavorites = [
    { id: 1, name: 'Bulbasaur', text: 'A seed Pokémon that grows with sunlight.' },
    { id: 4, name: 'Charmander', text: 'A fire Pokémon with a flame at its tail.' },
    { id: 7, name: 'Squirtle', text: 'A water Pokémon that can retract into its shell.' },
    { id: 10, name: 'Caterpie', text: 'A bug Pokémon that evolves into Butterfree.' },
    { id: 25, name: 'Pikachu', text: 'An electric Pokémon and the mascot of the franchise.' },
    // Add more placeholder favorites as needed
  ];

  return (
    <div className="p-3">
      <FilterBar />
      <FavoritesGrid favorites={placeholderFavorites} showRemoveButton={true} />
    </div>
  );
}

export default FavoritesSideBar;
