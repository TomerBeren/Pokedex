// src/services/pokemon.service.js

export async function getPokemons(offset = 0, limit = 20) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetailsByURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Transform the data
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

    return transformedData;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;  // Rethrow the error after logging it
  }
}

export async function fetchAllPokemons() {
  const allPokemons = [];
  let offset = 0;
  const limit = 100; // Number of Pokémon to fetch per request
  let hasMore = true;

  while (hasMore) {
    const pokemons = await getPokemons(offset, limit);
    allPokemons.push(...pokemons);

    offset += limit; // Increment offset to fetch the next set of Pokémon
    hasMore = pokemons.length === limit; // Check if there are more Pokémon to fetch
  }

  return allPokemons;
}
