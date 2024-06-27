// src/components/FilterBar.jsx
import React from 'react';

function FilterBar({ types, onNameChange, onTypeChange }) {
  return (
    <div className="row mb-3 align-items-center">
      <div className="col-7">
        <input 
          type="text" 
          className="form-control form-control-sm" 
          placeholder="Search by name" 
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="col-5">
        <select className="form-select form-select-sm" onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
