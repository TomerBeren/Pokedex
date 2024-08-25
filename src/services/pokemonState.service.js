// src/services/pokemonStateService.js

import { useState } from 'react';
import { fetchPokemonsForPage, prefetchNextPage } from './pokemon.service';

// Custom hook to manage Pokémon state and handle data fetching
export const usePokemonState = () => {
    // State to store the list of caught Pokémon
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    
    // State to store the list of Pokémon for the current page
    const [currentPokemons, setCurrentPokemons] = useState([]); 
    
    // State to store the total number of Pokémon
    const [totalPokemons, setTotalPokemons] = useState(0);
    
    // State to store the list of prefetched Pokémon for the next page
    const [nextPagePokemons, setNextPagePokemons] = useState([]); 
    
    // State to store the offset for the next page of Pokémon
    const [nextPageOffset, setNextPageOffset] = useState(null);

    // Function to fetch Pokémon for the current page and prefetch the next page's data
    const handleFetchPokemonsForPage = async (currentPage, pokemonsPerPage) => {
        const offset = (currentPage - 1) * pokemonsPerPage;

        // Check if there is prefetched data available and it matches the current offset
        if (nextPagePokemons && nextPagePokemons.length > 0 && nextPageOffset === offset) {

            // Use the prefetched Pokémon data and clear the prefetched state
            setCurrentPokemons(nextPagePokemons);
            setNextPagePokemons([]);
            setNextPageOffset(null);
        } else {
            // Fetch the current page's Pokémon data from the API
            const { validPokemons, totalCount } = await fetchPokemonsForPage(currentPage, pokemonsPerPage);
            
            // Update the state with the fetched Pokémon data
            setCurrentPokemons(validPokemons);
            setTotalPokemons(totalCount);
        }

        // Prefetch the next page's data in the background
        const nextOffset = currentPage * pokemonsPerPage;
        prefetchNextPage(nextOffset, pokemonsPerPage)
            .then(({ offset, validPokemons }) => {
                // Store the prefetched Pokémon data and its offset
                setNextPagePokemons(validPokemons);
                setNextPageOffset(offset);
            })
            .catch(err => console.error('Error prefetching next page:', err));
    };

    // Return the state and functions to manage Pokémon data
    return {
        caughtPokemons, // List of caught Pokémon
        currentPokemons, // List of Pokémon for the current page
        totalPokemons, // Total number of Pokémon
        nextPagePokemons, // List of prefetched Pokémon for the next page
        setCaughtPokemons, // Function to update the list of caught Pokémon
        fetchPokemonsForPage: handleFetchPokemonsForPage, // Function to fetch Pokémon data
    };
};
