// src/services/Pagination/paginationnavigation.service.js

// Function to handle navigation to the previous or next page
export function navigateToPage(currentPage, dynamicStart, dynamicEnd, pagesToShow, totalPages, direction) {
  let newPage = currentPage;  // Start with the current page as the default new page
  let newStart = dynamicStart;  // Start with the current start of the page range
  let newEnd = dynamicEnd;  // Start with the current end of the page range

  // Handle the "previous" page navigation
  if (direction === 'prev' && currentPage > 1) {
    newPage = currentPage - 1;  // Decrease the page by 1

    // If the new page is outside the current start of the range, adjust the range
    if (newPage < dynamicStart) {
      newStart = Math.max(1, newPage);  // Ensure the start is not less than 1
      newEnd = newStart + pagesToShow - 1;  // Adjust the end of the range based on the new start
    }
  } 
  // Handle the "next" page navigation
  else if (direction === 'next' && currentPage < totalPages) {
    newPage = currentPage + 1;  // Increase the page by 1

    // If the new page is outside the current end of the range, adjust the range
    if (newPage > dynamicEnd) {
      newEnd = Math.min(totalPages, newPage + pagesToShow - 1);  // Ensure the end does not exceed the total pages
      newStart = newEnd - pagesToShow + 1;  // Adjust the start of the range based on the new end
    }
  }

  // Return the new start, end, and current page after navigation
  return { newStart, newEnd, newPage };
}
