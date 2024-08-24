// src/contexts/PokemonContext.js

import React, { createContext, useState } from 'react';
import { fetchPokemonsForPageAndPrefetch } from '../services/pokemon.service';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => { 
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const [currentPokemons, setCurrentPokemons] = useState([]); 
    const [totalPokemons, setTotalPokemons] = useState(0);
    const [nextPagePokemons, setNextPagePokemons] = useState([]); 

    // Function to fetch Pokémon for the current page and prefetch the next page's data
    const handleFetchPokemonsForPage = async (currentPage, pokemonsPerPage) => {
        const { validPokemons, totalCount, nextPageData } = await fetchPokemonsForPageAndPrefetch(currentPage, pokemonsPerPage);
        // Update state with the fetched data
        setCurrentPokemons(validPokemons);
        setTotalPokemons(totalCount);
        setNextPagePokemons(nextPageData);
    };

    return (
         // Provide Pokémon state and functions to the component tree
        <PokemonContext.Provider value={{
            caughtPokemons,
            currentPokemons,
            nextPagePokemons,
            totalPokemons,
            setCaughtPokemons,
            fetchPokemonsForPage: handleFetchPokemonsForPage,
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export default PokemonContext;
