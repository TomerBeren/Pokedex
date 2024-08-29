// src/components/PokemonCard/PokemonCard.jsx
import React, { useState, memo } from 'react';
import PokemonDetails from './PokemonDetails';
import './PokemonList.css';
import './PokemonCard.css';

const PokemonCard = memo(({ pokemon, showRemoveButton, className, handleCatchPokemon, handleRemoveFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to handle the removal of a favorite Pokémon
  // Prevents the click event from propagating to parent elements
  const handleRemoveClick = (e) => {
    e.stopPropagation(); 
    handleRemoveFavorite(pokemon.id);
  };

  return (
    <>
      <div
        className={`card d-flex shadow-sm flex-column ${className} clickable-card`}
        onClick={handleShowModal}
      >
        <div className="card-body text-center p-2">
           {/* Conditionally render the Pokémon sprite image */}
          {pokemon.sprite ? (
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              width="100"
              height="100"
              className="animated-pokemon-image"
              loading="lazy"
            />
          ) : (
            // Placeholder div if no sprite image is available
            <div style={{ width: 100, height: 100, backgroundColor: '#ccc' }}>No Image</div>
          )}
          <h6 className="card-title mb-1">{pokemon.name}</h6>
          <p className="card-text small text-muted mb-3">{pokemon.id}</p>
          {/* Conditionally render the Remove button */}
          {showRemoveButton && (
            <div onClick={handleRemoveClick}>
              <hr className="m-0 mt-1" />
              <button className="btn btn-outline-danger btn-sm mt-2">Remove</button>
            </div>
          )}
        </div>
      </div>
      {/* Render the PokemonDetails modal */}
      <PokemonDetails 
        show={showModal} 
        onCatch={handleCatchPokemon} 
        handleClose={handleCloseModal} 
        pokemon={pokemon} 
      />
    </>
  );
});

export default PokemonCard;
