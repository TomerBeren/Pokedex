// src/services/Pagination/paginationState.service.js

import { useState, useEffect } from 'react';
import { calculateInitialRange } from './paginationConfig.service';

// Custom hook to manage the pagination state (start and end of the page range)
export function usePaginationState(currentPage, totalPages, pagesToShow) {
  
  // Initialize the pagination range based on the current page, total pages, and the number of pages to show
  const [{ start, end }, setRange] = useState(() =>
    calculateInitialRange(currentPage, pagesToShow, totalPages)
  );

  // Update the pagination range whenever the total number of pages changes
  useEffect(() => {
    const newRange = calculateInitialRange(currentPage, pagesToShow, totalPages);
    setRange(newRange);
  }, [totalPages]);

  // Return the current start and end of the page range, along with the function to update the range
  return { start, end, setRange };
}
