/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * DecisionButton.jsx: Interactive tactical choice button displaying resource effects.
 */

import React from 'react';
import { soundManager } from '../utils/soundEffects.js';

export function DecisionButton({ option, index, onSelect, disabled = false }) {
  const handleClick = () => {
    if (disabled) return;
    soundManager.playConfirm();
    onSelect(option.id || index);
  };

  const effects = option.effects || {};
  const hasEffects = Object.keys(effects).length > 0;

  // Render resource delta badges
  const renderEffectBadges = () => {
    const list = [
      { key: 'oxygen', label: 'O₂', val: effects.oxygen },
      { key: 'water', label: 'H₂O', val: effects.water },
      { key: 'food', label: 'Food', val: effects.food },
      { key: 'power', label: 'Power', val: effects.power },
      { key: 'health', label: 'Health', val: effects.health }
    ].filter((item) => item.val !== undefined && item.val !== 0);

    if (list.length === 0) {
      return <span className="delta-pill-neutral">No net impact</span>;
    }

    return list.map((item) => {
      const isPositive = item.val > 0;
      return (
        <span
          key={item.key}
          className={`delta-pill ${isPositive ? 'delta-pill-pos' : 'delta-pill-neg'}`}
        >
          {item.label}: {isPositive ? `+${item.val}%` : `${item.val}%`}
        </span>
      );
    });
  };

  const letters = ['A', 'B', 'C'];
  const optionLetter = letters[index] || (index + 1);

  return (
    <button
      type="button"
      className="decision-choice-btn"
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="choice-header">
        <span className="choice-letter-badge">PLAN {optionLetter}</span>
        <h4 className="choice-title">{option.title}</h4>
      </div>

      <p className="choice-desc">{option.description}</p>

      {hasEffects && (
        <div className="choice-effects-row">
          <span className="effects-label">ANTICIPATED IMPACT:</span>
          <div className="effects-badges">{renderEffectBadges()}</div>
        </div>
      )}
    </button>
  );
}
