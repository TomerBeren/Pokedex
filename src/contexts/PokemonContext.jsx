// src/contexts/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchAllPokemons } from '../services/pokemon.service';

// Create a context for sharing Pokémon data across the React component tree.
const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    // State for managing caught Pokémon.
    const [caughtPokemons, setCaughtPokemons] = useState([]);

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
        const fetchPokemons = async () => {
            if (!sessionStorage.getItem('allPokemons')) { // Check if the data is already cached.
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
       
        fetchPokemons(); // Execute the fetch operation.
        
          // Cleanup function to clear session storage when the component unmounts.
          return () => {
            sessionStorage.removeItem('allPokemons');
            sessionStorage.removeItem('totalPokemons');
        };
    }, []);

    // Context provider that supplies caught and all Pokémon data to child components.
    return (
        <PokemonContext.Provider value={{ caughtPokemons, allPokemons, totalPokemons, setCaughtPokemons }}>
            {children} // Render child components that now have access to Pokémon context.
        </PokemonContext.Provider>
    );
};

export default PokemonContext;
