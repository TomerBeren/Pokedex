// src/components/FavoritesSideBar.jsx
import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import FavoritesGrid from './FavoritesGrid';

function FavoritesSideBar({ caughtPokemons, handleRemoveFavorite }) {
  const [filteredPokemons, setFilteredPokemons] = useState(caughtPokemons);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    filterPokemons();
  }, [caughtPokemons, nameFilter, typeFilter]);

  const filterPokemons = () => {
    let filtered = caughtPokemons;

    if (nameFilter) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(typeFilter)
      );
    }

    setFilteredPokemons(filtered);
  };

  const allTypes = Array.from(new Set(caughtPokemons.flatMap(pokemon => pokemon.types)));

  return (
    <div className="h-100 d-flex flex-column mt-3">
      <FilterBar 
        types={allTypes} 
        onNameChange={setNameFilter} 
        onTypeChange={setTypeFilter} 
      />
      <FavoritesGrid 
        favorites={filteredPokemons} 
        showRemoveButton={true} 
        handleRemoveFavorite={handleRemoveFavorite} 
      />
    </div>
  );
}

export default FavoritesSideBar;
