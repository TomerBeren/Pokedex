// src/components/PokemonDetails.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function PokemonDetails({ show, handleClose, pokemon }) {
  if (!pokemon) return null;

  const handleCatch = () => {
    // Implement the catch functionality here
    console.log(`Caught ${pokemon.name}!`);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mb-4"
            style={{ width: '150px', height: '150px' }}
          />
          <p>ID: {pokemon.id}</p>
          <p>Details about {pokemon.name}</p>
          {/* Add more details as needed */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back to List
        </Button>
        <Button variant="primary" onClick={handleCatch}> {/* Blue button */}
          Catch
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PokemonDetails;
