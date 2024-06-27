// src/components/PokemonDetails.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PokemonDetails.css';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';
import { isFavorite } from '../services/favorites.service';

const typeColors = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#98D8D8",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#b8a038",
  steel: "#5a8ea2", 
  dark: "#705746", 
  water: "#0190FF",
};

function PokemonDetails({ show, handleClose, pokemon, onCatch }) {
  const [isCaught, setIsCaught] = useState(false);
  const [catchDisabled, setCatchDisabled] = useState(false);

  useEffect(() => {
    if (pokemon) {
      setIsCaught(isFavorite(pokemon));
      setCatchDisabled(isFavorite(pokemon));
    }
  }, [pokemon, show]);

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

  const attemptCatch = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance of success
        resolve(success);
      }, 1000); // Simulate a 1 second delay
    });
  };

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]; // Assuming the first type is the primary type
  const backgroundColor = typeColors[primaryType] || "#FFF";

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="modal-centered">
      <Modal.Body>
        <div className="pokemon-card" style={{ '--theme-color': backgroundColor }}>
          <div className="id">
            <span>ID: {pokemon.id}</span>
          </div>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <h2 className="poke-name">{pokemon.name}</h2>
          <PokemonTypes types={pokemon.types} typeColors={typeColors} />
          <div className="details">
            <PokemonStats height={pokemon.height} weight={pokemon.weight} />
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back to List
        </Button>
        <Button variant="primary" onClick={handleCatch} disabled={catchDisabled || isCaught}>
          {isCaught ? "Caught" : "Catch"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
