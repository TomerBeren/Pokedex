// src/services/paginationNavigation.service.js

// Function to handle navigation to the previous page
export function navigateToPreviousPage(currentPage, dynamicStart, pagesToShow, totalPages) {
  if (currentPage > 1) {
    const newPage = currentPage - 1;

    // Adjust the start and end of the page range if the new page is outside the current range
    const newStart = newPage < dynamicStart ? Math.max(1, newPage) : dynamicStart;
    const newEnd = newStart + pagesToShow - 1;

    return { newStart, newEnd, newPage };
  }

  // If the current page is 1, the range remains unchanged
  return { newStart: dynamicStart, newEnd: dynamicStart + pagesToShow - 1, newPage: currentPage };
}

// Function to handle navigation to the next page
export function navigateToNextPage(currentPage, dynamicEnd, dynamicStart, pagesToShow, totalPages) {
  if (currentPage < totalPages) {
    const newPage = currentPage + 1;

    // Adjust the start and end of the page range if the new page is outside the current range
    const newEnd = newPage > dynamicEnd ? Math.min(totalPages, newPage + pagesToShow - 1) : dynamicEnd;
    const newStart = newEnd - pagesToShow + 1;

    return { newStart, newEnd, newPage };
  }

  // If the current page is the last page, the range remains unchanged
  return { newStart: dynamicStart, newEnd: dynamicEnd, newPage: currentPage };
}
