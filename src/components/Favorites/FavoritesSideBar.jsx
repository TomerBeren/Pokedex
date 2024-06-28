// src/components/FavoritesSideBar/FavoritesSideBar.jsx
import React, { useState, useEffect } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import FavoritesGrid from './FavoritesGrid';

function FavoritesSideBar({ caughtPokemons, handleRemoveFavorite }) {
  // State to hold the filtered list of Pokemons based on filters
  const [filteredPokemons, setFilteredPokemons] = useState(caughtPokemons);
  // State to hold the current name filter value
  const [nameFilter, setNameFilter] = useState('');
  // State to hold the current type filter value
  const [typeFilter, setTypeFilter] = useState('');

  // useEffect to update filtered Pokemons whenever caughtPokemons, nameFilter, or typeFilter changes
  useEffect(() => {
    filterPokemons();
  }, [caughtPokemons, nameFilter, typeFilter]);

  // Function to filter Pokemons based on name and type filters
  const filterPokemons = () => {
    let filtered = caughtPokemons;

    // Filter by name
    if (nameFilter) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.includes(typeFilter)
      );
    }

    // Update the filtered Pokemons state
    setFilteredPokemons(filtered);
  };

  // Get all unique types from caughtPokemons
  const allTypes = Array.from(new Set(caughtPokemons.flatMap(pokemon => pokemon.types)));

  return (
    <div className="h-100 d-flex flex-column mt-3">
      {/* FilterBar component to handle name and type filters */}
      <FilterBar 
        types={allTypes} 
        onNameChange={setNameFilter} 
        onTypeChange={setTypeFilter} 
      />
      {/* FavoritesGrid component to display the filtered Pokemons */}
      <FavoritesGrid 
        favorites={filteredPokemons} 
        showRemoveButton={true} 
        handleRemoveFavorite={handleRemoveFavorite} 
      />
    </div>
  );
}

export default FavoritesSideBar;
