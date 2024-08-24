import React from 'react';
import { getPagesToShow } from '../../services/paginationConfig.service';
import { navigateToPreviousPage, navigateToNextPage } from '../../services/paginationNavigation.service';
import { generatePageNumbers } from '../../services/paginationUtils.service';
import { usePaginationState } from '../../services/paginationState.service';

function Pagination({ currentPage, totalPages, handlePageChange, main }) {
  // Determine how many pages to show based on whether 'main' is true or false
  const pagesToShow = getPagesToShow(main);

  // Manage the current range of pages being displayed
  const { start, end, setRange } = usePaginationState(currentPage, totalPages, pagesToShow);

  // Generate an array of page numbers to render in the pagination UI
  const pageNumbers = generatePageNumbers(start, end);

  // Handles page navigation by calling the appropriate navigation function
  const handlePage = (navigationFunction) => {
    const { newStart, newEnd, newPage } = navigationFunction(
      currentPage, // Current active page
      end,         // Current end of the displayed page range
      start,       // Current start of the displayed page range
      pagesToShow, // Total pages to show at a time
      totalPages   // Total number of pages
    );
    setRange({ start: newStart, end: newEnd }); // Update the start and end range for page display
    handlePageChange(newPage); // Change the page
  };

  return (
    <nav aria-label="Page navigation" className={`${main ? 'mt-3 d-flex justify-content-center' : ''}`}>
      <ul className="pagination">
        {/* Button to navigate to the previous page */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePage(navigateToPreviousPage)}>&lt;</button>
        </li>
        {/* Render each page number in the current range */}
        {pageNumbers.map(page => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
          </li>
        ))}
        {/* Button to navigate to the next page */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePage(navigateToNextPage)}>&gt;</button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
