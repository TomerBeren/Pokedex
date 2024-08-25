import React, { createContext } from 'react';
import { usePokemonState } from '../services/pokemonState.service';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => { 
    const pokemonState = usePokemonState();

    return (
        <PokemonContext.Provider value={pokemonState}>
            {children}
        </PokemonContext.Provider>
    );
};

export default PokemonContext;
