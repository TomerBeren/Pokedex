// src/components/AnimatedPokemonImage/AnimatedPokemonImage.jsx
import React, { useEffect, useState } from 'react';

const AnimatedPokemonImage = ({ sprites }) => {
  // State to track the current sprite being displayed
  const [currentSprite, setCurrentSprite] = useState(sprites[0]);
  // State to track the index of the sprite in the array
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to cycle through the sprites every second
    const interval = setInterval(() => {
      setSpriteIndex((prevIndex) => (prevIndex + 1) % sprites.length);
    }, 1000);

    // Clean up the interval when the component unmounts or sprites length changes
    return () => clearInterval(interval);
  }, [sprites.length]);

  useEffect(() => {
    // Update the current sprite whenever the spriteIndex changes
    setCurrentSprite(sprites[spriteIndex]);
  }, [spriteIndex, sprites]);

  return <img src={currentSprite} alt="pokemon sprite" className="animated-pokemon-image" />;
};

export default AnimatedPokemonImage;
