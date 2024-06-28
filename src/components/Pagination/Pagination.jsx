import React, { useState, useEffect } from 'react';

function Pagination({ currentPage, totalPages, handlePageChange, main }) {
  let pagesToShow = 5
  if(!main){
    pagesToShow = 3;
  }
   // Number of page links to show in the pagination

  // Function to get the initial start page number
  const getInitialStart = () => {
    const start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    // Adjusts the start to not exceed range at initialization
    return Math.min(start, Math.max(1, totalPages - pagesToShow + 1)); 
  };

  // State to track the dynamic start and end of the page range
  const [dynamicStart, setDynamicStart] = useState(getInitialStart());
  const [dynamicEnd, setDynamicEnd] = useState(Math.min(totalPages, getInitialStart() + pagesToShow - 1));

  useEffect(() => {
    // Recalculate the start and end when totalPages changes
    const start = getInitialStart();
    setDynamicStart(start);
    setDynamicEnd(Math.min(totalPages, start + pagesToShow - 1));
  }, [totalPages]);

  useEffect(() => {
    // Adjust the range when boundary conditions are met
    if (currentPage > dynamicEnd) {
      const newStart = dynamicStart + pagesToShow;
      setDynamicStart(newStart);
      setDynamicEnd(Math.min(totalPages, newStart + pagesToShow - 1));
    } else if (currentPage < dynamicStart) {
      const newStart = dynamicStart - pagesToShow;
      setDynamicStart(newStart);
      setDynamicEnd(Math.min(totalPages, newStart + pagesToShow - 1));
    }
  }, [currentPage]);

  // Generate the page numbers to be displayed
  const pageNumbers = [];
  for (let i = dynamicStart; i <= dynamicEnd; i++) {
    pageNumbers.push(i);
  }

  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      if (currentPage - 1 < dynamicStart) {
        const newStart = Math.max(1, dynamicStart - pagesToShow);
        setDynamicStart(newStart);
        setDynamicEnd(Math.min(totalPages, newStart + pagesToShow - 1));
      }
    }
  };

  // Handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      if (currentPage + 1 > dynamicEnd) {
        const newStart = dynamicStart + pagesToShow;
        setDynamicStart(newStart);
        setDynamicEnd(Math.min(totalPages, newStart + pagesToShow - 1));
      }
    }
  };

  return (
    <nav aria-label="Page navigation" className={`${main ? 'mt-3 d-flex justify-content-center' : ''}`}>
      <ul className="pagination">
        {/* Previous page button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePrevPage}>&lt;</button>
        </li>
        {/* Page number buttons */}
        {pageNumbers.map(page => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
          </li>
        ))}
        {/* Next page button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNextPage}>&gt;</button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
