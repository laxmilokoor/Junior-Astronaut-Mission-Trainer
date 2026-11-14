/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * StarryBackground.jsx: Canvas/CSS-driven animated deep space cosmos background.
 * Generates twinkling stars, dynamic nebula clouds, and shooting star trails.
 */

import React, { useMemo } from 'react';

export function StarryBackground() {
  // Generate a deterministic set of stars to avoid hydration mismatch
  const stars = useMemo(() => {
    const starList = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const x = Math.floor((Math.sin(i * 997) * 0.5 + 0.5) * 100);
      const y = Math.floor((Math.cos(i * 383) * 0.5 + 0.5) * 100);
      const size = (i % 3 === 0) ? 2.5 : (i % 5 === 0 ? 3 : 1.5);
      const duration = 2 + (i % 4) * 1.5;
      const delay = (i % 7) * 0.7;
      const opacity = 0.3 + ((i % 5) * 0.15);

      starList.push({ id: i, x, y, size, duration, delay, opacity });
    }
    return starList;
  }, []);

  return (
    <div className="space-star-container" aria-hidden="true">
      {/* Deep Space Gradients & Nebulas */}
      <div className="nebula nebula-purple" />
      <div className="nebula nebula-blue" />
      <div className="nebula nebula-cyan" />

      {/* Twinkling Star Field */}
      <div className="stars-layer">
        {stars.map((star) => (
          <span
            key={star.id}
            className="twinkle-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Shooting Star Animations */}
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />

      {/* Subtle Orbital Grid Lines */}
      <div className="orbital-grid" />
    </div>
  );
}
