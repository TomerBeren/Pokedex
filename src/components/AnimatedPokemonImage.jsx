// src/components/AnimatedPokemonImage.jsx
import React, { useEffect, useState } from 'react';

const AnimatedPokemonImage = ({ sprites }) => {
  const [currentSprite, setCurrentSprite] = useState(sprites[0]);
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpriteIndex((prevIndex) => (prevIndex + 1) % sprites.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [sprites.length]);

  useEffect(() => {
    setCurrentSprite(sprites[spriteIndex]);
  }, [spriteIndex, sprites]);

  return <img src={currentSprite} alt="pokemon sprite" className="animated-pokemon-image" />;
};

export default AnimatedPokemonImage;
