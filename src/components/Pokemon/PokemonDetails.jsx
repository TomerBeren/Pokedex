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
import { getCatchAttempts, setCatchAttempts, attemptCatch } from '../../services/pokemonCatch.service';

function PokemonDetails({ show, handleClose, pokemon, onCatch }) {
  // State to track if the Pokémon is caught
  const [isCaught, setIsCaught] = useState(false);

  // State to disable the catch button if catching is in progress or if max attempts reached
  const [catchDisabled, setCatchDisabled] = useState(false);

  // State to manage local catch attempts, initialized from the service
  const [catchAttempts, setLocalCatchAttempts] = useState(() => getCatchAttempts(pokemon?.id));

  // Effect to update component state when the `pokemon` or `show` prop changes
  useEffect(() => {
    if (pokemon) {
      const attempts = getCatchAttempts(pokemon.id);  // Get the number of attempts from session storage
      setIsCaught(isFavorite(pokemon));  // Check if the Pokémon is already caught (favorite)
      setCatchDisabled(isFavorite(pokemon) || attempts >= 2);  // Disable catching if Pokémon is caught or max attempts reached
      setLocalCatchAttempts(attempts);  // Update the local attempts state
    }
  }, [pokemon, show]);

  // Function to handle the catch attempt
  const handleCatch = async () => {
    const attempts = getCatchAttempts(pokemon.id);  // Get current attempts

    // If max attempts reached, disable the button and exit
    if (attempts >= 2) {
      setCatchDisabled(true);
      return;
    }

    setCatchDisabled(true);  // Disable the button during the catch attempt
    const success = await attemptCatch();  // Simulate the catch attempt

    if (success) {
      await onCatch(pokemon);  // Trigger the onCatch function if successful
      toast.success(`Caught ${pokemon.name}!`);  // Show success message
      setIsCaught(true);  // Mark Pokémon as caught
    } else {
      const newAttempts = attempts + 1;
      // Notify the user about the failed attempt
      if (newAttempts === 2) {
        toast.error(`Failed to catch ${pokemon.name}. No more attempts`);
      } else {
        toast.error(`Failed to catch ${pokemon.name}. Try again!`);
      }
      setCatchAttempts(pokemon.id, newAttempts);  // Update the number of attempts in session storage
      setLocalCatchAttempts(newAttempts);  // Update the local state with the new attempts
      setCatchDisabled(newAttempts >= 2);  // Disable the button if max attempts are reached
    }
  };

  // If no Pokémon is selected, don't render the modal
  if (!pokemon) return null;

  // Get the primary type of the Pokémon to determine the background color
  const primaryType = pokemon.types[0];
  const backgroundColor = typeColors[primaryType] || "#FFF";

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="modal-centered">
      <Modal.Body>
        {/* Pokemon card with dynamic background color based on type */}
        <div className="pokemon-card" style={{ '--theme-color': backgroundColor }}>
          {/* Display Pokémon ID */}
          <div className="id"><span>ID: {pokemon.id}</span></div>
          {/* Display Pokémon image */}
          <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-image" />
          {/* Display Pokémon name */}
          <h2 className="poke-name">{pokemon.name}</h2>
          {/* Display Pokémon types */}
          <PokemonTypes types={pokemon.types} typeColors={typeColors} />
          {/* Display Pokémon stats and abilities */}
          <div className="details">
            <PokemonStats height={pokemon.height} weight={pokemon.weight} />
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Button to close the modal and return to the list */}
        <Button variant="secondary" onClick={handleClose}>Back to List</Button>
        {/* Button to catch the Pokémon, disabled if caught or no attempts left */}
        <Button variant="primary" onClick={handleCatch} disabled={catchDisabled || isCaught}>
          {isCaught ? "Caught" : (catchAttempts >= 2 ? "No More Attempts" : "Catch")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
