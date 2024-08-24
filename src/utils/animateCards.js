// src/utils/animateCards.js

/**
 * Adds a 'visible' class to each card element with a staggered delay to create an animation effect.
 *
 * @param {string} selector - The CSS selector for the card elements to be animated.
 * @param {number} [delay=50] - The delay in milliseconds between each card's animation.
 */
export function animateCards(selector, delay = 50) {
    // Select all elements that match the provided selector
    const cards = document.querySelectorAll(selector);
    
    // Loop through each card and add the 'visible' class with a delay
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');  // Add the 'visible' class to trigger CSS animation
      }, index * delay);  // Delay each card's animation to create a staggered effect
    });
  }
  