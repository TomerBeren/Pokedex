// src/components/MainContent.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import FavoritesSideBar from './FavoritesSideBar';

function MainContent() {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-evenly h-100">
        <div className="col-3 bg-white">
          <FavoritesSideBar />
        </div>
        <div className="col-9 bg-gray">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
