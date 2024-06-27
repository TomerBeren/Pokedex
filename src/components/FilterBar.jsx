// src/components/FilterBar.jsx
import React from 'react';

function FilterBar() {
  return (
    <div className="row mb-3 align-items-center">
      <div className="col-7">
        <input type="text" className="form-control form-control-sm" placeholder="Search by name" />
      </div>
      <div className="col-5">
        <select className="form-select form-select-sm">
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
