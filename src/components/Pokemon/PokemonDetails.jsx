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
  // State to disable the catch button while catching or after two attempts
  const [catchDisabled, setCatchDisabled] = useState(false);
 // Initialize catchAttempts from local storage or empty object
  const [catchAttempts, setCatchAttempts] = useState(() => {
    return JSON.parse(localStorage.getItem('catchAttempts')) || {};
  });

  useEffect(() => {
    if (pokemon) {
      const attempts = catchAttempts[pokemon.id] || 0;
      // Check if the Pokemon is already caught or if it has reached the max attempts
      setIsCaught(isFavorite(pokemon));
      setCatchDisabled(isFavorite(pokemon) || attempts >= 2);
    }
  }, [pokemon, show, catchAttempts]);

  useEffect(() => {
    // Update local storage whenever catchAttempts changes
    localStorage.setItem('catchAttempts', JSON.stringify(catchAttempts));
  }, [catchAttempts]);

  // Function to handle catching the Pokemon
  const handleCatch = async () => {
    const attempts = catchAttempts[pokemon.id] || 0;

    // Disable the button if max attempts are reached
    if (attempts >= 2) {
      setCatchDisabled(true);
      return;
    }

    setCatchDisabled(true); // Disable the button during the catch attempt
    const success = await attemptCatch(); // Simulate the catch attempt

    if (success) {
      await onCatch(pokemon);
      toast.success(`Caught ${pokemon.name}!`);
      setIsCaught(true);
    } else {
      const newAttempts = attempts + 1;
      // Notify the user about the failed attempt
      if (newAttempts === 2) {
        toast.error(`Failed to catch ${pokemon.name}. No more attempts`);
      } else {
        toast.error(`Failed to catch ${pokemon.name}. Try again!`);
      }
      // Update the catch attempts state
      setCatchAttempts({
        ...catchAttempts,
        [pokemon.id]: newAttempts,
      });
      // Disable the button if max attempts are reached
      setCatchDisabled(newAttempts >= 2);
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

  // Return null if no Pokemon is provided
  if (!pokemon) return null;

  // Get the primary type and corresponding background color
  const primaryType = pokemon.types[0];
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
        {/* Catch button, disabled if already caught or after max attempts */}
        <Button variant="primary" onClick={handleCatch} disabled={catchDisabled || isCaught}>
          {isCaught ? "Caught" : (catchAttempts[pokemon.id] >= 2 ? "No More Attempts" : "Catch")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
