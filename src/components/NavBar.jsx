// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import pokeball from '../assets/pokeball.svg';

function Navbar({favoriteCount}) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 align-items-center">
      <div className="container-fluid">
        <Link className="navbar-brand h1 mb-0 ms-3 d-flex align-items-center" to="/">
          <img src={pokeball} alt="Pokeball" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          Pokedex
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                <span>Favorites </span>
                <span className="fw-bold h6">{favoriteCount}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
