/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * EmergencyScreen.jsx: Dedicated full-screen crisis management console.
 */

import React, { useState } from 'react';
import { AlertTriangleIcon, ShieldCheckIcon } from '../components/Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function EmergencyScreen({
  emergency,
  onResolveEmergency,
  onReturnToDashboard
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);

  if (!emergency) {
    return (
      <div className="screen-container emergency-screen-empty">
        <p>No active emergency detected. Returning to habitat dashboard...</p>
        <button
          type="button"
          className="glow-btn"
          onClick={onReturnToDashboard}
        >
          RETURN TO DASHBOARD
        </button>
      </div>
    );
  }

  const handleChoose = (opt) => {
    soundManager.playConfirm();
    setSelectedOption(opt);
    setFeedbackState({
      option: opt,
      feedback: opt.feedback,
      effects: opt.effects
    });
  };

  const handleResolve = () => {
    soundManager.playClick();
    if (selectedOption) {
      onResolveEmergency(emergency.id, selectedOption.id);
    }
  };

  const renderEffects = (effects = {}) => {
    const list = [
      { key: 'oxygen', label: 'O₂', val: effects.oxygen },
      { key: 'water', label: 'H₂O', val: effects.water },
      { key: 'food', label: 'Food', val: effects.food },
      { key: 'power', label: 'Power', val: effects.power },
      { key: 'health', label: 'Health', val: effects.health }
    ].filter((item) => item.val !== undefined && item.val !== 0);

    return list.map((item) => (
      <span
        key={item.key}
        className={`delta-pill ${item.val > 0 ? 'delta-pill-pos' : 'delta-pill-neg'}`}
      >
        {item.label}: {item.val > 0 ? `+${item.val}%` : `${item.val}%`}
      </span>
    ));
  };

  return (
    <div className="screen-container emergency-screen">
      <div className="emergency-screen-box">
        <div className="emergency-header">
          <div className="alert-badge-wrap">
            <AlertTriangleIcon size={32} className="alert-icon-siren" />
            <span className="emergency-title-tag">CRITICAL ALERT PROTOCOL</span>
          </div>
          <span className="severity-badge">SEVERITY: {emergency.severity || 'CRITICAL'}</span>
        </div>

        <div className="emergency-content">
          <h2 className="emergency-scenario-name">{emergency.title}</h2>
          <div className="emergency-message-box">
            <p className="emergency-desc-text">{emergency.message}</p>
          </div>

          {!feedbackState ? (
            <div className="emergency-options-block">
              <h3 className="options-prompt-heading">SELECT EMERGENCY ACTION:</h3>
              <div className="emergency-options-grid">
                {emergency.options.map((opt, idx) => (
                  <button
                    key={opt.id || idx}
                    type="button"
                    className="emergency-opt-card"
                    onClick={() => handleChoose(opt)}
                  >
                    <div className="opt-title-line">
                      <span className="opt-num">0{idx + 1}</span>
                      <h4 className="opt-name">{opt.title}</h4>
                    </div>
                    <p className="opt-text">{opt.description}</p>
                    <div className="opt-effects-row">
                      <span className="opt-effects-lbl">PROJECTED IMPACT:</span>
                      <div className="opt-effects-tags">{renderEffects(opt.effects)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="emergency-feedback-block">
              <div className="feedback-result-header">
                <ShieldCheckIcon size={28} className="feedback-icon" />
                <div>
                  <h3 className="feedback-title">INCIDENT RESOLUTION DEBRIEF</h3>
                  <p className="feedback-subtitle">Action taken: {feedbackState.option.title}</p>
                </div>
              </div>

              <div className="feedback-body-box">
                <p className="feedback-text">{feedbackState.feedback}</p>
                <div className="feedback-impact-summary">
                  <span className="impact-label">SYSTEMS TELEMETRY SHIFT:</span>
                  <div className="impact-pills">{renderEffects(feedbackState.effects)}</div>
                </div>
              </div>

              <div className="feedback-actions">
                <button
                  type="button"
                  className="acknowledge-btn glow-btn"
                  onClick={handleResolve}
                >
                  ACKNOWLEDGE TELEMETRY & RESUME MISSION
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
