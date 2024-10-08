// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import pokeball from '../../assets/pokeball.svg';

function Navbar({ favoriteCount }) {
  // Function to refresh the page
  const handleRefresh = () => {
    window.location.reload(); // This will reload the page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 align-items-center">
      <div className="container-fluid">
        {/* Brand logo and name */}
        <Link className="navbar-brand h1 mb-0 ms-3 d-flex align-items-center" to="/" onClick={handleRefresh}>
          <img src={pokeball} alt="Pokeball" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          Pokedex
        </Link>
        {/* Navigation links */}
        <div className="navbar justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div>
                <span>Caught Pokémon </span>
                <span className="fw-bold h6">{favoriteCount}</span> {/* Display the count of favorite Pokemons */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
