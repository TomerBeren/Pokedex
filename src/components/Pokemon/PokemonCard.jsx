// src/components/PokemonCard/PokemonCard.jsx
import React, { useState } from 'react';
import PokemonDetails from './PokemonDetails';
import AnimatedPokemonImage from '../AnimatedPokemonImage/AnimatedPokemonImage';
import './PokemonList.css';
import './PokemonCard.css';

function PokemonCard({ pokemon, showRemoveButton, className, handleCatchPokemon, handleRemoveFavorite }) {
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to show the modal
  const handleShowModal = () => setShowModal(true);
  // Function to close the modal
  const handleCloseModal = () => setShowModal(false);

  // Function to handle the click event for removing a favorite
  const handleRemoveClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to parent elements
    handleRemoveFavorite(pokemon.id);
  };

  // Create an array of sprite URLs to cycle through
  const spriteUrls = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny,
  ].filter(Boolean); // Remove any null or undefined URLs

  return (
    <>
      <div
        className={`card d-flex shadow-sm flex-column ${className} clickable-card`}
        onClick={handleShowModal} // Show the modal when the card is clicked
      >
        <div className="card-body text-center p-2">
          {/* Animated Pokemon image */}
          <AnimatedPokemonImage sprites={spriteUrls} />
          {/* Pokemon name */}
          <h6 className="card-title mb-1">{pokemon.name}</h6>
          {/* Pokemon ID */}
          <p className="card-text small text-muted mb-3">{pokemon.id}</p>
          {/* Remove button, shown only if showRemoveButton is true */}
          {showRemoveButton && (
            <div onClick={handleRemoveClick}>
              <hr className="m-0 mt-1" />
              <button className="btn btn-outline-danger btn-sm mt-2">Remove</button>
            </div>
          )}
        </div>
      </div>
      {/* Pokemon details modal */}
      <PokemonDetails 
        show={showModal} 
        onCatch={handleCatchPokemon} 
        handleClose={handleCloseModal} 
        pokemon={pokemon} 
      />
    </>
  );
}

export default PokemonCard;
