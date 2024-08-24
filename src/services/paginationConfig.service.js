// src/services/Pagination/paginationConfig.service.js

// Determines how many pages to show based on whether the pagination is in the main view
export function getPagesToShow(main) {
  return main ? 5 : 3;  // Shows 5 pages in the main view, 3 pages otherwise
}

// Calculates the initial range of pages to display
export function calculateInitialRange(currentPage, pagesToShow, totalPages) {
  // Start from the middle of the range, ensuring the start is at least 1
  const start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  
  // Calculate the end of the range, ensuring it does not exceed the total number of pages
  const end = Math.min(totalPages, start + pagesToShow - 1);
  
  return { start, end };  // Return the calculated start and end of the page range
}
