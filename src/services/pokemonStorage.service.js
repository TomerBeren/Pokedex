// src/services/pokemonStorage.service.js
import { fetchAllPokemons, getPokemonDetailsByURL, getPokemons } from './pokemon.service';

// Retrieve stored Pokémon data from session storage by key
export const getStoredPokemons = (key) => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
};

// Store Pokémon data in session storage by key
export const setStoredPokemons = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

// Retrieve the total count of stored Pokémon from session storage
export const getStoredTotalPokemons = () => {
    return sessionStorage.getItem('totalPokemons') ? Number(sessionStorage.getItem('totalPokemons')) : 0;
};

// Store the total count of Pokémon in session storage
export const setStoredTotalPokemons = (count) => {
    sessionStorage.setItem('totalPokemons', count.toString());
};

// Fetch the initial batch of Pokémon (first 24) and update state and session storage
export const fetchInitialPokemons = async (setFirstBatch, setAllPokemons) => {
    const firstBatchStored = getStoredPokemons('firstBatch');
    // Check if the initial batch is already stored in session storage
    if (firstBatchStored.length === 0) {
        try {
            // Fetch the initial batch of Pokémon
            const [initialPokemons] = await getPokemons(0, 24);
            // Fetch detailed information for each Pokémon in the initial batch
            const detailedInitialPokemons = await Promise.all(
                initialPokemons.map(pokemon => getPokemonDetailsByURL(pokemon.url))
            );
            // Update state with the fetched data
            setFirstBatch(detailedInitialPokemons);
            setAllPokemons(detailedInitialPokemons);
            // Store the fetched data in session storage for future use
            setStoredPokemons('firstBatch', detailedInitialPokemons);
        } catch (error) {
            console.error('Failed to fetch initial Pokemons', error);
        }
    }
};

// Fetch all Pokémon data and update state and session storage
export const fetchAllPokemonsData = async (setAllPokemons, setTotalPokemons) => {
    const allPokemonsStored = getStoredPokemons('allPokemons');
    // Check if all Pokémon data is already stored in session storage
    if (allPokemonsStored.length === 0) {
        try {
            // Fetch all Pokémon data
            const [fetchedPokemons, pokemonCount] = await fetchAllPokemons();
            // Update state with the fetched data
            setAllPokemons(fetchedPokemons);
            setTotalPokemons(pokemonCount);
            // Store the fetched data in session storage for future use
            setStoredPokemons('allPokemons', fetchedPokemons);
            setStoredTotalPokemons(pokemonCount);
        } catch (error) {
            console.error('Failed to fetch total Pokemons', error);
        }
    }
};
