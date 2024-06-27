// src/components/FavoritesSideBar.jsx
import React from 'react';
import FilterBar from './FilterBar';
import FavoritesGrid from './FavoritesGrid';

function FavoritesSideBar() {

  return (
    <div className="p-3">
      <FilterBar />
      {/*<FavoritesGrid favorites={placeholderFavorites} showRemoveButton={true} />*/}
    </div>
  );
}

export default FavoritesSideBar;
