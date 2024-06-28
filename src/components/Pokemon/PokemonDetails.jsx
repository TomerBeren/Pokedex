// src/components/PokemonDetails/PokemonDetails.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PokemonDetails.css';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';
import { isFavorite } from '../../services/favorites.service';
import typeColors from '../../assets/typeColors';

function PokemonDetails({ show, handleClose, pokemon, onCatch }) {
  // State to track if the Pokemon is caught
  const [isCaught, setIsCaught] = useState(false);
  // State to disable the catch button while catching
  const [catchDisabled, setCatchDisabled] = useState(false);

  useEffect(() => {
    if (pokemon) {
      setIsCaught(isFavorite(pokemon)); // Check if the Pokemon is already caught
      setCatchDisabled(isFavorite(pokemon)); // Disable the catch button if caught
    }
  }, [pokemon, show]);

  // Function to handle the catch action
  const handleCatch = async () => {
    setCatchDisabled(true);
    const success = await attemptCatch();
    
    if (success) {
      await onCatch(pokemon);
      toast.success(`Caught ${pokemon.name}!`);
      setIsCaught(true);
    } else {
      toast.error(`Failed to catch ${pokemon.name}. Try again!`);
      setCatchDisabled(false);
    }
  };

  // Simulate a catch attempt with a 50% chance of success
  const attemptCatch = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance of success
        resolve(success);
      }, 1000); // Simulate a 1 second delay
    });
  };

  if (!pokemon) return null; // If no Pokemon is provided, return null

  // Get the primary type and corresponding background color
  const primaryType = pokemon.types[0]; // Assuming the first type is the primary type
  const backgroundColor = typeColors[primaryType] || "#FFF";

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="modal-centered">
      <Modal.Body>
        {/* Pokemon card with dynamic background color */}
        <div className="pokemon-card" style={{ '--theme-color': backgroundColor }}>
          {/* Pokemon ID */}
          <div className="id">
            <span>ID: {pokemon.id}</span>
          </div>
          {/* Pokemon image */}
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          {/* Pokemon name */}
          <h2 className="poke-name">{pokemon.name}</h2>
          {/* Pokemon types */}
          <PokemonTypes types={pokemon.types} typeColors={typeColors} />
          {/* Pokemon stats and abilities */}
          <div className="details">
            <PokemonStats height={pokemon.height} weight={pokemon.weight} />
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Back to list button */}
        <Button variant="secondary" onClick={handleClose}>
          Back to List
        </Button>
        {/* Catch button, disabled if already caught or catching */}
        <Button variant="primary" onClick={handleCatch} disabled={catchDisabled || isCaught}>
          {isCaught ? "Caught" : "Catch"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
