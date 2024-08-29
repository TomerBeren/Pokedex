// src/utils/animateCards.js

/**
 * Adds a 'visible' class to each card element with a staggered delay to create an animation effect.
 *
 * @param {string} selector - The CSS selector for the card elements to be animated.
 * @param {number} [delay=50] - The delay in milliseconds between each card's animation.
 */
export function animateCards(selector, delay = 50) {
  const cards = document.querySelectorAll(selector);

  cards.forEach((card, index) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * delay);
    });
  });
}
  