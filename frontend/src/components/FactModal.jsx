/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * FactModal.jsx: Educational science brief displayed between mission sols/days.
 */

import React from 'react';
import { AstronautHelmetIcon } from './Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function FactModal({
  fact,
  dayNumber,
  onProceed,
  lastFeedback
}) {
  const handleProceed = () => {
    soundManager.playClick();
    onProceed();
  };

  return (
    <div className="modal-backdrop fact-backdrop" role="dialog" aria-modal="true">
      <div className="fact-modal-panel">
        <div className="fact-header">
          <div className="fact-badge">
            <AstronautHelmetIcon size={24} />
            <span>SOL {dayNumber} COMPLETED • SCIENCE LOG</span>
          </div>
          <span className="nasa-ed-tag">NASA SPACE APPS STEM</span>
        </div>

        {lastFeedback && (
          <div className="recent-log-summary">
            <h4 className="log-summary-title">{lastFeedback.title}</h4>
            <p className="log-summary-desc">{lastFeedback.description}</p>
          </div>
        )}

        <div className="fact-content-box">
          <div className="fact-quote-icon">DID YOU KNOW?</div>
          <h3 className="fact-title">{fact?.title || 'Deep Space Life Support'}</h3>
          <p className="fact-body-text">{fact?.fact}</p>
        </div>

        <div className="fact-footer">
          <button
            type="button"
            className="proceed-day-btn glow-btn"
            onClick={handleProceed}
          >
            PROCEED TO SOL / DAY {dayNumber + 1}
          </button>
        </div>
      </div>
    </div>
  );
}
