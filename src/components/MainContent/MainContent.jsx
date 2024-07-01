// src/components/MainContent/MainContent.jsx
import React, { useState, useEffect , useContext} from 'react';
import NavBar from '../NavBar/NavBar';
import PokemonList from '../Pokemon/PokemonList';
import FavoritesSideBar from '../Favorites/FavoritesSideBar';
import Pagination from '../Pagination/Pagination';
import { getFavorites, addFavorite, removeFavorite } from '../../services/favorites.service';
import PokemonContext from '../../contexts/PokemonContext';

function MainContent() {
  const { caughtPokemons, allPokemons, totalPokemons, setCaughtPokemons } = useContext(PokemonContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 24;

  // Fetch favorite Pokemons when the component mounts
  useEffect(() => {
    async function fetchFavorites() {
      const favorites = await getFavorites();
      setCaughtPokemons(favorites);
    }
    fetchFavorites();
  }, []);
 
  // Handle catching a Pokemon and updating the favorite list
  const handleCatchPokemon = async (pokemon) => {
    try {
      const favorites = await addFavorite(pokemon);
      setCaughtPokemons(favorites);
    } catch (error) {
      console.error('Error catching Pokémon:', error);
    }
  };

  // Handle removing a Pokemon from favorites
  const handleRemoveFavorite = async (pokemonId) => {
    const favorites = await removeFavorite(pokemonId);
    setCaughtPokemons(favorites);
  };

  // Handle page changes for pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages for pagination
  const totalPages = totalPokemons ? Math.ceil(totalPokemons / pokemonsPerPage) : 0;

  return (
    <div className="d-flex flex-column h-100">
      {/* Navigation bar displaying the count of favorite Pokemons */}
      <NavBar favoriteCount={caughtPokemons.length} />
      <hr className="m-0" />
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Sidebar for displaying and managing favorite Pokemons */}
          <div className="col-12 col-md-3 bg-white d-flex flex-column">
            <FavoritesSideBar caughtPokemons={caughtPokemons} handleRemoveFavorite={handleRemoveFavorite} />
          </div>
          {/* Main area for displaying the list of Pokemons and pagination */}
          <div className="col-12 col-md-9 bg-gray d-flex flex-column">
            <div className="flex-grow-1">
              <PokemonList
                pokemons={allPokemons} 
                handleCatchPokemon={handleCatchPokemon} 
                currentPage={currentPage} 
                pokemonsPerPage={pokemonsPerPage}
              />
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
