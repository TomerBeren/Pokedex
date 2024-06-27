// src/components/PokemonCard.jsx
import React, { useState } from 'react';
import PokemonDetails from './PokemonDetails';
import AnimatedPokemonImage from './AnimatedPokemonImage';
import './PokemonList.css';

function PokemonCard({ pokemon, showRemoveButton, className, handleCatchPokemon, handleRemoveFavorite }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleRemoveClick = (e) => {
    e.stopPropagation();
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
        className={`card d-flex shadow-sm flex-column justify-content-between ${className} clickable-card`}
        onClick={handleShowModal}
      >
        <div className="card-body text-center p-2">
          <AnimatedPokemonImage sprites={spriteUrls} />
          <h6 className="card-title mb-1">{pokemon.name}</h6>
          <p className="card-text small text-muted mb-3">{pokemon.id}</p>
          {showRemoveButton && (
            <div onClick={handleRemoveClick}>
              <hr className="m-0 mt-1" />
              <button className="btn btn-outline-danger btn-sm mt-2">Remove</button>
            </div>
          )}
        </div>
      </div>
      <PokemonDetails show={showModal} onCatch={handleCatchPokemon} handleClose={handleCloseModal} pokemon={pokemon} />
    </>
  );
}

export default PokemonCard;
