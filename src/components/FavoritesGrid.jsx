// src/components/FavoritesGrid.jsx
import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import './FavoritesGrid.css';
import Pagination from './Pagination';

function FavoritesGrid({ favorites, showRemoveButton, handleRemoveFavorite }) {
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 6; // 3 per row, 2 rows per page

  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the favorites to show on the current page
  const startIndex = (currentPage - 1) * favoritesPerPage;
  const endIndex = startIndex + favoritesPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1">
        <div className="row">
          {currentFavorites.map((pokemon) => (
            <div key={pokemon.id} className="col-4 mb-3 d-flex justify-content-center">
              <PokemonCard 
                pokemon={pokemon} 
                showRemoveButton={showRemoveButton} 
                className="favorite-card" 
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          handlePageChange={handlePageChange}
          main={false}
        />
      </div>
    </div>
  );
}

export default FavoritesGrid;