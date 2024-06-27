// src/components/MainContent.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import PokemonList from './PokemonList';
import FavoritesSideBar from './FavoritesSideBar';
import { getFavorites, addFavorite, removeFavorite } from '../services/favorites.service';
import { fetchAllPokemons } from '../services/pokemon.service';

function MainContent() {
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const pokemonsPerPage = 20;
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
    const favorites = await addFavorite(pokemon);
    setCaughtPokemons(favorites);
  };

  const handleRemoveFavorite = async (pokemonId) => {
    const favorites = await removeFavorite(pokemonId);
    setCaughtPokemons(favorites);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex flex-column h-100">
      <NavBar favoriteCount={caughtPokemons.length} />
      <hr className="m-0" />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-3 bg-white d-flex flex-column">
            <FavoritesSideBar caughtPokemons={caughtPokemons} handleRemoveFavorite={handleRemoveFavorite} />
          </div>
          <div className="col-9 bg-gray d-flex flex-column">
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
            <nav aria-label="Page navigation" className="mt-3 d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                </li>
                {pageNumbers.map(page => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
