// src/components/FilterBar/FilterBar.jsx
import React from 'react';

function FilterBar({ types, onNameChange, onTypeChange }) {
  return (
    <div className="row mb-3 align-items-center">
      <div className="col-7">
        {/* Input field for filtering Pokemons by name */}
        <input 
          type="text" 
          className="form-control form-control-sm" 
          placeholder="Search by name" 
          onChange={(e) => onNameChange(e.target.value)} // Call onNameChange with the input value
        />
      </div>
      <div className="col-5">
        {/* Dropdown for filtering Pokemons by type */}
        <select className="form-select form-select-sm" onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All Types</option>
          {/* Map through the types to create an option for each type */}
          {types.map((type) => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
