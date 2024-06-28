// src/components/FavoritesGrid/FavoritesGrid.jsx
import React, { useState, useEffect } from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import './FavoritesGrid.css';
import Pagination from '../Pagination/Pagination';

function FavoritesGrid({ favorites, showRemoveButton, handleRemoveFavorite }) {
  // State to track the current page number
  const [currentPage, setCurrentPage] = useState(1);
  
  // State to track the number of favorites to display per page
  const [favoritesPerPage, setFavoritesPerPage] = useState(6);

  useEffect(() => {
    // Function to handle window resize events and adjust the number of items per page
    function handleResize() {
      const currentWidth = window.innerWidth;
      if (currentWidth <= 640) {
        setFavoritesPerPage(6); // 6 items per page if width is 640px or less
      } else if (currentWidth > 640 && currentWidth <= 960) {
        setFavoritesPerPage(3); // 3 items per page for widths between 640px and 960px
      } else {
        setFavoritesPerPage(6); // 6 items per page if width is more than 960px
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to set initial state

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of pages based on the number of favorites
  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the range of favorites to display on the current page
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
