// src/components/PokemonCard.jsx
import React from 'react';
import './FavoritesGrid.css';

function PokemonCard({ pokemon, showRemoveButton, className }) {
  return (
    <div className={`card d-flex flex-column justify-content-between ${className}`}> {/* Added className prop */}
      <div className="card-body text-center p-2">
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
          className="card-img-top mb-4" 
          alt={pokemon.name} 
          style={{ width: '110px', height: '110px' }}
        />
        <h6 className="card-title mb-1">{pokemon.name}</h6>
        <p className="card-text small text-muted mb-3">{pokemon.id}</p>
        {showRemoveButton && (
          <>
           <hr className="m-0 mt-1" />
           <button className="btn btn-outline-danger btn-sm mt-2">Remove</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
