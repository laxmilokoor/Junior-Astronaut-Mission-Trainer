/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * EmergencyModal.jsx: Critical incident crisis alert popup.
 * Features red alert styling, 2-3 resolution options, and educational outcome feedback.
 */

import React, { useState } from 'react';
import { AlertTriangleIcon, ShieldCheckIcon } from './Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function EmergencyModal({
  emergency,
  onResolveEmergency,
  onClose
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);

  if (!emergency) return null;

  const handleChooseOption = (option) => {
    soundManager.playConfirm();
    setSelectedOption(option);
    setFeedbackState({
      option,
      feedback: option.feedback,
      effects: option.effects
    });
  };

  const handleAcknowledge = () => {
    soundManager.playClick();
    if (selectedOption) {
      onResolveEmergency(emergency.id, selectedOption.id);
    }
  };

  const renderEffectPills = (effects = {}) => {
    const list = [
      { key: 'oxygen', label: 'O₂', val: effects.oxygen },
      { key: 'water', label: 'H₂O', val: effects.water },
      { key: 'food', label: 'Food', val: effects.food },
      { key: 'power', label: 'Power', val: effects.power },
      { key: 'health', label: 'Health', val: effects.health }
    ].filter((item) => item.val !== undefined && item.val !== 0);

    if (list.length === 0) return <span className="delta-pill-neutral">No net impact</span>;

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
    <div className="modal-backdrop emergency-backdrop" role="dialog" aria-modal="true">
      <div className="emergency-modal-panel">
        {/* Flashing Alert Header */}
        <div className="emergency-header">
          <div className="alert-badge-wrap">
            <AlertTriangleIcon size={28} className="alert-icon-siren" />
            <span className="emergency-title-tag">MISSION CRITICAL CRISIS</span>
          </div>
          <span className="severity-badge">SEVERITY: {emergency.severity || 'HIGH'}</span>
        </div>

        {/* Content */}
        <div className="emergency-content">
          <h2 className="emergency-scenario-name">{emergency.title}</h2>
          <div className="emergency-message-box">
            <p className="emergency-desc-text">{emergency.message}</p>
          </div>

          {!feedbackState ? (
            /* Options list */
            <div className="emergency-options-block">
              <h3 className="options-prompt-heading">SELECT EMERGENCY PROTOCOL:</h3>
              <div className="emergency-options-grid">
                {emergency.options.map((opt, idx) => (
                  <button
                    key={opt.id || idx}
                    type="button"
                    className="emergency-opt-card"
                    onClick={() => handleChooseOption(opt)}
                  >
                    <div className="opt-title-line">
                      <span className="opt-num">0{idx + 1}</span>
                      <h4 className="opt-name">{opt.title}</h4>
                    </div>
                    <p className="opt-text">{opt.description}</p>
                    <div className="opt-effects-row">
                      <span className="opt-effects-lbl">PROJECTED DELTA:</span>
                      <div className="opt-effects-tags">{renderEffectPills(opt.effects)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Outcome Feedback View */
            <div className="emergency-feedback-block">
              <div className="feedback-result-header">
                <ShieldCheckIcon size={26} className="feedback-icon" />
                <div>
                  <h3 className="feedback-title">PROTOCOL OUTCOME DEBRIEF</h3>
                  <p className="feedback-subtitle">Action taken: {feedbackState.option.title}</p>
                </div>
              </div>

              <div className="feedback-body-box">
                <p className="feedback-text">{feedbackState.feedback}</p>
                <div className="feedback-impact-summary">
                  <span className="impact-label">SYSTEMS TELEMETRY SHIFT:</span>
                  <div className="impact-pills">{renderEffectPills(feedbackState.effects)}</div>
                </div>
              </div>

              <div className="feedback-actions">
                <button
                  type="button"
                  className="acknowledge-btn glow-btn"
                  onClick={handleAcknowledge}
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
