export async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetailsByURL(url) {
  const response = await fetch(url);
  const data = await response.json();

  // Transform the data
  const transformedData = {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
    },
    types: data.types.map(type => type.type.name),
    weight: data.weight,
    height: data.height,
    abilities: data.abilities.map(ability => ability.ability.name),
  };

  return transformedData;
}

