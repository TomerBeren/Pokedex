// src/services/favorites.service.js

// Retrieve all favorite Pokemons from localStorage
export async function getFavorites() {
  return new Promise((resolve) => {
    const favorites = sessionStorage.getItem("favorites");
    setTimeout(() => {
      resolve(JSON.parse(favorites) || []);
    }, 500); // Simulate delay for asynchronous behavior
  });
}

// Add a Pokemon to favorites in localStorage
export async function addFavorite(pokemon) {
  return new Promise(async (resolve, reject) => {
    try {
      const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
      // Check if the Pokemon is not already in favorites
      if (!favorites.find((fav) => fav.id === pokemon.id)) {
        favorites.push(pokemon); // Add the Pokemon to favorites
        sessionStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
      }
      resolve(favorites); // Resolve with updated favorites array
    } catch (error) {
      console.error('Failed to add favorite:', error);
      reject(error); // Reject if there's an error
    }
  });
}

// Remove a Pokemon from favorites in localStorage
export async function removeFavorite(pokemonId) {
  return new Promise((resolve) => {
    let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    // Filter out the Pokemon with the specified ID
    favorites = favorites.filter((fav) => fav.id !== pokemonId);
    sessionStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
    resolve(favorites); // Resolve with updated favorites array
  });
}

// Check if a Pokemon is in favorites
export function isFavorite(pokemon) {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  // Check if any favorite Pokemon has the same ID as the given Pokemon
  return favorites.some((fav) => fav.id === pokemon.id);
}
