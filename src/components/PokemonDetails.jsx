// src/components/PokemonDetails.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PokemonDetails.css';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';
import PokemonTypes from './PokemonTypes';

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
  water: "#0190FF",
};

function PokemonDetails({ show, handleClose, pokemon }) {
  if (!pokemon) return null;

  const handleCatch = () => {
    console.log(`Caught ${pokemon.name}!`);
  };

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
          <PokemonTypes types={pokemon.types} />
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
        <Button variant="primary" onClick={handleCatch}>
          Catch
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
