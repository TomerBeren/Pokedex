// src/services/Pagination/paginationUtils.service.js

// Function to generate an array of page numbers based on the dynamic start and end range
export function generatePageNumbers(dynamicStart, dynamicEnd) {
  const pageNumbers = [];  // Array to hold the page numbers

  // Loop through the range from dynamicStart to dynamicEnd, inclusive
  for (let i = dynamicStart; i <= dynamicEnd; i++) {
    pageNumbers.push(i);  // Add each page number to the array
  }

  // Return the array of generated page numbers
  return pageNumbers;
}
