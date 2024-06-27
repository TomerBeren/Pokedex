// src/components/FavoritesGrid.jsx
import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import './FavoritesGrid.css';

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
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default FavoritesGrid;
