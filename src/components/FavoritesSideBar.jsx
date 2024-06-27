import React from 'react';
import FilterBar from './FilterBar';
import FavoritesGrid from './FavoritesGrid';

function FavoritesSideBar({ caughtPokemons, handleRemoveFavorite }) {
  return (
    <div className="h-100 d-flex flex-column mt-3">
      <FilterBar />
      <FavoritesGrid favorites={caughtPokemons} showRemoveButton={true} handleRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
}

export default FavoritesSideBar;
