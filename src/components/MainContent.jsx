import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import PokemonList from './PokemonList';
import FavoritesSideBar from './FavoritesSideBar';
import Pagination from './Pagination';
import { getFavorites, addFavorite, removeFavorite } from '../services/favorites.service';
import { fetchAllPokemons } from '../services/pokemon.service';

function MainContent() {
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const pokemonsPerPage = 24;
  const pagesToShow = 5;

  useEffect(() => {
    async function fetchFavorites() {
      const favorites = await getFavorites();
      setCaughtPokemons(favorites);
    }
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchTotalPokemons = async () => {
      try {
        const allPokemons = await fetchAllPokemons();
        setTotalPokemons(allPokemons.length);
      } catch (error) {
        console.error('Failed to fetch total pokemons', error);
      }
    };

    fetchTotalPokemons();
  }, []);

  const handleCatchPokemon = async (pokemon) => {
    try {
      const favorites = await addFavorite(pokemon);
      setCaughtPokemons(favorites);
    } catch (error) {
      console.error('Error catching Pokémon:', error);
    }
  };

  const handleRemoveFavorite = async (pokemonId) => {
    const favorites = await removeFavorite(pokemonId);
    setCaughtPokemons(favorites);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar favoriteCount={caughtPokemons.length} />
      <hr className="m-0" />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-12 col-md-3 bg-white d-flex flex-column">
            <FavoritesSideBar caughtPokemons={caughtPokemons} handleRemoveFavorite={handleRemoveFavorite} />
          </div>
          <div className="col-12 col-md-9 bg-gray d-flex flex-column">
            <div className="flex-grow-1">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <PokemonList 
                      handleCatchPokemon={handleCatchPokemon} 
                      currentPage={currentPage} 
                      pokemonsPerPage={pokemonsPerPage}
                    />
                  } 
                />
              </Routes>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePageChange={handlePageChange} 
                main={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
