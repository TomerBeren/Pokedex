// src/contexts/PokemonContext.js

import React, { createContext, useState, useEffect } from 'react';
import { fetchInitialPokemons, fetchAllPokemonsData, getStoredPokemons, getStoredTotalPokemons } from '../services/pokemonStorage.service';

// Create a context for sharing Pokémon data across the React component tree.
const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => { 
    const [caughtPokemons, setCaughtPokemons] = useState([]); // State for managing caught Pokémon.
    const [firstBatch, setFirstBatch] = useState(() => getStoredPokemons('firstBatch')); // State for storing the first batch of Pokémon (first 24)
    const [allPokemons, setAllPokemons] = useState(() => getStoredPokemons('allPokemons')); // State for storing all Pokémon
    const [totalPokemons, setTotalPokemons] = useState(() => getStoredTotalPokemons()); // State for storing the total count of Pokémon

    // Effect that fetches Pokémon data when the component mounts.
    useEffect(() => {
        fetchInitialPokemons(setFirstBatch, setAllPokemons);
        fetchAllPokemonsData(setAllPokemons, setTotalPokemons);
    }, []);

    return (
        // Provide Pokémon data and state management functions to child components.
        <PokemonContext.Provider value={{ caughtPokemons, firstBatch, allPokemons, totalPokemons, setCaughtPokemons }}>
            {children} {/* Render child components that now have access to Pokémon context. */}
        </PokemonContext.Provider>
    );
};

export default PokemonContext;
