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
    // Transform the fetched data into a simplified structure
    const transformedData = {
      id: data.id,
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default,
        front_shiny: data.sprites.front_shiny,
        back_shiny: data.sprites.back_shiny,
      },
      types: data.types.map(type => type.type.name),
      weight: data.weight,
      height: data.height,
      abilities: data.abilities.map(ability => ability.ability.name),
    };

    return transformedData; // Returns the transformed Pokémon data
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;  // Rethrow the error after logging it
  }
}

// Fetches all Pokémon and their details
export async function fetchAllPokemons() {
  const allPokemons = []; // Stores detailed Pokémon information.
  let offset = 0; // Current offset for API pagination.
  const limit = 100; // Number of Pokémon fetched per batch.
  let totalPokemonsCount = 0; // Total number of Pokémon available.
  let hasMore = true; // Indicates if more Pokémon are available for fetching.

  while (hasMore) {
    // Fetch a batch of Pokémon and update total count.
    const [pokemons, pokemonCount] = await fetchPokemonsBatch(offset, limit);
    if (totalPokemonsCount === 0) {
      totalPokemonsCount = pokemonCount;
    }

    // Fetch detailed data for each Pokémon in the batch.
    const detailsPromises = pokemons.map(pokemon => fetchPokemonDetails(pokemon.url));
    const detailedPokemons = await Promise.all(detailsPromises);
    allPokemons.push(...detailedPokemons);

    // Prepare for the next batch.
    offset += limit;
    hasMore = pokemons.length === limit;
  }

  return [allPokemons, totalPokemonsCount];
}

