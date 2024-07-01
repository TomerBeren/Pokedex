// src/contexts/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchAllPokemons, getPokemonDetailsByURL, getPokemons } from '../services/pokemon.service';

// Create a context for sharing Pokémon data across the React component tree.
const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    // State for managing caught Pokémon.
    const [caughtPokemons, setCaughtPokemons] = useState([]);

    // State for storing the first batch of Pokémon (first 24).
    const [firstBatch, setFirstBatch] = useState(() => {
        const stored = sessionStorage.getItem('firstBatch');
        return stored ? JSON.parse(stored) : [];
    });

    // State for storing all Pokémon. Initial state is loaded from session storage to avoid unnecessary API calls.
    const [allPokemons, setAllPokemons] = useState(() => {
        const stored = sessionStorage.getItem('allPokemons');
        return stored ? JSON.parse(stored) : [];
    });

    // State for storing the total count of Pokémon, also initialized from session storage.
    const [totalPokemons, setTotalPokemons] = useState(() => {
        return sessionStorage.getItem('totalPokemons') ? Number(sessionStorage.getItem('totalPokemons')) : 0;
    });
    
    // Effect that fetches all Pokémon data only if it's not already stored in session storage.
    useEffect(() => {
        const fetchInitialPokemons = async () => {
            // Check if the first batch of Pokémon is stored in session storage
            const firstBatchStored = sessionStorage.getItem('firstBatch');
            if (!firstBatchStored || JSON.parse(firstBatchStored).length === 0) {
                // If not, fetch the initial batch of Pokémon
                try {
                    const [initialPokemons] = await getPokemons(0, 24);
                     // Fetch detailed information for each Pokémon in the initial batch
                    const detailedInitialPokemons = await Promise.all(
                        initialPokemons.map(pokemon => getPokemonDetailsByURL(pokemon.url))
                    );
                    // Update state with the fetched data
                    setFirstBatch(detailedInitialPokemons);
                    setAllPokemons(detailedInitialPokemons);
                    // Store the fetched data in session storage for future use
                    sessionStorage.setItem('firstBatch', JSON.stringify(detailedInitialPokemons));
                } catch (error) {
                    console.error('Failed to fetch initial Pokemons', error);
                }
            } 
        };

        const fetchPokemons = async () => {
            const allPokemonsStored = sessionStorage.getItem('allPokemons');
            if (!allPokemonsStored || JSON.parse(allPokemonsStored).length === 0) { // Check if the data is already cached.
                try {
                    const [fetchedPokemons, pokemonCount] = await fetchAllPokemons();
                    setAllPokemons(fetchedPokemons); // Update state with fetched data.
                    setTotalPokemons(pokemonCount); // Update state with the total count.
                    // Store fetched data in session storage for subsequent sessions.
                    sessionStorage.setItem('allPokemons', JSON.stringify(fetchedPokemons));
                    sessionStorage.setItem('totalPokemons', pokemonCount.toString());
                } catch (error) {
                    console.error('Failed to fetch total Pokemons', error); // Log error if fetch fails.
                }
            }
        };

        // Execute the fetch operations.
        fetchInitialPokemons();
        fetchPokemons(); 

    }, []);

    // Context provider that supplies caught and all Pokémon data to child components.
    return (
        <PokemonContext.Provider value={{ caughtPokemons, firstBatch, allPokemons, totalPokemons, setCaughtPokemons }}>
            {children} {/* Render child components that now have access to Pokémon context. */}
        </PokemonContext.Provider>
    );
};

export default PokemonContext;
