import { getPokemonDetailsByURL } from './pokemon.service';

export async function getFavorites() {
  return new Promise((resolve) => {
    const favorites = localStorage.getItem("favorites");
    setTimeout(() => {
      resolve(JSON.parse(favorites) || []);
    }, 500);
  });
}

export async function addFavorite(pokemon) {
  return new Promise(async (resolve, reject) => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.find((fav) => fav.id === pokemon.id)) {
        favorites.push(pokemon);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      resolve(favorites);
    } catch (error) {
      console.error('Failed to add favorite:', error);
      reject(error);
    }
  });
}

export async function removeFavorite(pokemonId) {
  return new Promise((resolve) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((fav) => fav.id !== pokemonId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    resolve(favorites);
  });
}

export function isFavorite(pokemon) {
  console.log(pokemon.id)
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((fav) => fav.id === pokemon.id);
}
