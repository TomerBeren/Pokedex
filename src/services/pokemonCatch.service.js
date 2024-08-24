// src/services/pokemonCatch.service.js

/**
 * Retrieves the number of catch attempts for a specific Pokémon from session storage.
 * @param {number} pokemonId - The ID of the Pokémon.
 * @returns {number} - The number of catch attempts for the given Pokémon.
 */
export function getCatchAttempts(pokemonId) {
    const attempts = JSON.parse(sessionStorage.getItem('catchAttempts')) || {};
    return attempts[pokemonId] || 0;
  }
  
  /**
   * Stores the number of catch attempts for a specific Pokémon in session storage.
   * @param {number} pokemonId - The ID of the Pokémon.
   * @param {number} attempts - The number of catch attempts to set for the given Pokémon.
   */
  export function setCatchAttempts(pokemonId, attempts) {
    const allAttempts = JSON.parse(sessionStorage.getItem('catchAttempts')) || {};
    allAttempts[pokemonId] = attempts;
    sessionStorage.setItem('catchAttempts', JSON.stringify(allAttempts));
  }
  
  /**
   * Simulates a Pokémon catch attempt with a 50% chance of success.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the catch is successful, or `false` otherwise.
   */
  export function attemptCatch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // 50% chance of success
        resolve(success);
      }, 1000); // Simulate a 1-second delay
    });
  }
  