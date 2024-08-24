import React, { useState, useEffect } from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import './FavoritesGrid.css';
import Pagination from '../Pagination/Pagination';
import { animateCards } from '../../utils/animateCards';

function FavoritesGrid({ favorites, showRemoveButton, handleRemoveFavorite }) {
  // State to track the current page number
  const [currentPage, setCurrentPage] = useState(1);
  
  // State to track the number of favorites displayed per page
  const [favoritesPerPage, setFavoritesPerPage] = useState(6);

  // Adjust the number of items per page based on window size
  useEffect(() => {
    function handleResize() {
      const currentWidth = window.innerWidth;
      if (currentWidth <= 640) {
        setFavoritesPerPage(6);  // Display 6 items per page on small screens
      } else if (currentWidth > 640 && currentWidth <= 960) {
        setFavoritesPerPage(3);  // Display 3 items per page on medium screens
      } else {
        setFavoritesPerPage(6);  // Display 6 items per page on large screens
      }
    }

    window.addEventListener('resize', handleResize);  // Add event listener for window resize
    handleResize();  // Call once to set initial state based on the current window size

    return () => window.removeEventListener('resize', handleResize);  // Cleanup on unmount
  }, []);

  // Calculate the range of favorites to display on the current page
  const startIndex = (currentPage - 1) * favoritesPerPage;
  const endIndex = startIndex + favoritesPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  // Apply animation to the cards whenever the current favorites or the number of favorites per page changes
  useEffect(() => {
    animateCards('.favorite-card');
  }, [currentFavorites, favoritesPerPage]);

  // Calculate the total number of pages based on the number of favorites
  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

  // Handle page changes by updating the current page state
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1">
        <div className="row">
          {currentFavorites.map((pokemon) => (
            <div key={pokemon.id} className="col-4 mb-3 d-flex justify-content-center">
              <PokemonCard 
                pokemon={pokemon} 
                showRemoveButton={showRemoveButton} 
                className="favorite-card"  // Apply the favorite-card class for styling and animation
                handleRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        {/* Pagination component for navigating through pages */}
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
