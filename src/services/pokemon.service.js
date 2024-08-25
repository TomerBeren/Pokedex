// src/services/pokemon.service.js

// Fetches a list of Pokémon from PokeAPI based on offset and limit
export async function getPokemons(offset = 0, limit = 20) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const pokemonData = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return [pokemonData.results, pokemonData.count]; // Returns an array of Pokémon results
}

// Fetches detailed information about a Pokémon from its given URL
export async function getPokemonDetailsByURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const transformedData = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default, // Fetches only the front default sprite for efficiency
      types: data.types.map(type => type.type.name),
      weight: data.weight,
      height: data.height,
      abilities: data.abilities.map(ability => ability.ability.name),
    };
    return transformedData; // Returns the transformed Pokémon data
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
}

// Fetches Pokémon for the current page and prefetches the next page
export async function fetchPokemonsForPage(currentPage, pokemonsPerPage) {
  try {
    const offset = (currentPage - 1) * pokemonsPerPage;

    // Fetch the current page's Pokémon data
    const [pokemonList, totalCount] = await getPokemons(offset, pokemonsPerPage);
    const validPokemons = await fetchDetailedPokemons(pokemonList);

    return { validPokemons, totalCount }; // Return current page data and total count
  } catch (error) {
    console.error('Failed to fetch and prefetch pokemons', error);
    throw error;
  }
}

// Prefetches Pokémon data for the next page and preloads images
export async function prefetchNextPage(offset, limit) {
  try {
    const [pokemonList] = await getPokemons(offset, limit);
    const validPokemons = await fetchDetailedPokemons(pokemonList);
    
    // Preload images for the next page
    const spriteUrls = validPokemons.map(pokemon => pokemon.sprite);
    preloadImages(spriteUrls);

    return { offset, validPokemons }; // Returns the pre-fetched Pokémon data
  } catch (error) {
    console.error('Failed to prefetch next page pokemons', error);
    throw error;
  }
}

// Helper function to fetch and filter detailed Pokémon data
async function fetchDetailedPokemons(pokemonList) {
  const detailedPokemonsPromises = pokemonList.map(pokemon => getPokemonDetailsByURL(pokemon.url));
  const detailedPokemons = await Promise.all(detailedPokemonsPromises);
  return detailedPokemons.filter(pokemon => pokemon !== null); // Filters out null Pokémon data
}

// Preloads images to improve perceived performance
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url; // Preloads image by setting its source
  });
}
