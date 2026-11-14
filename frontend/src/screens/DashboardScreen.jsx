/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * DashboardScreen.jsx: Primary interactive flight console and habitat management HUD.
 */

import React from 'react';
import { ResourceBar } from '../components/ResourceBar.jsx';
import { DecisionButton } from '../components/DecisionButton.jsx';
import { EmergencyModal } from '../components/EmergencyModal.jsx';
import { FactModal } from '../components/FactModal.jsx';
import { PlanetGraphic } from '../components/PlanetGraphic.jsx';
import { AlertTriangleIcon } from '../components/Icons.jsx';

export function DashboardScreen({
  state,
  onApplyDecision,
  onResolveEmergency,
  onAdvanceDay,
  onAbortMission
}) {
  const {
    mission,
    currentDay,
    totalDays,
    resources,
    activeDecision,
    currentEmergency,
    pendingFact,
    lastFeedback,
    history
  } = state;

  const dayProgressPct = Math.round((currentDay / totalDays) * 100);

  // Recent delta lookup from last feedback
  const lastDeltas = lastFeedback?.effects || {};

  return (
    <div className="screen-container dashboard-screen">
      {/* Top HUD Telemetry Bar */}
      <div className="dashboard-hud-header">
        <div className="hud-dest-info">
          <div className="hud-planet-thumb">
            <PlanetGraphic type={mission?.id || 'moon'} size={48} animated={false} />
          </div>
          <div>
            <div className="hud-dest-tag">{mission?.destination}</div>
            <h2 className="hud-mission-title">{mission?.name}</h2>
          </div>
        </div>

        {/* Day / Sol Tracker */}
        <div className="hud-sol-tracker">
          <div className="sol-counter-row">
            <span className="sol-label">MISSION SOL:</span>
            <span className="sol-current">{currentDay}</span>
            <span className="sol-total">/ {totalDays}</span>
          </div>
          <div className="sol-bar-track">
            <div className="sol-bar-fill" style={{ width: `${dayProgressPct}%` }} />
          </div>
        </div>

        {/* Abort Button */}
        <div className="hud-actions">
          <button
            type="button"
            className="abort-mission-btn"
            onClick={onAbortMission}
            title="Abort this mission simulation"
          >
            ABORT MISSION
          </button>
        </div>
      </div>

      {/* Main Grid: Life Support Telemetry (Left) and Decision Console (Right) */}
      <div className="dashboard-main-grid">
        {/* Left Column: 5 Resource Gauges */}
        <section className="vitals-section">
          <div className="section-label-bar">
            <span className="section-hud-tag">ECLSS TELEMETRY GAUGES</span>
            <span className="section-note">CRITICAL THRESHOLD: &lt; 20%</span>
          </div>

          <div className="vitals-gauges-grid">
            <ResourceBar
              type="oxygen"
              label="Oxygen (O₂)"
              value={resources.oxygen}
              delta={lastDeltas.oxygen}
              isCriticalVital={true}
            />
            <ResourceBar
              type="water"
              label="Water (H₂O)"
              value={resources.water}
              delta={lastDeltas.water}
              isCriticalVital={true}
            />
            <ResourceBar
              type="food"
              label="Food Supplies"
              value={resources.food}
              delta={lastDeltas.food}
              isCriticalVital={false}
            />
            <ResourceBar
              type="power"
              label="Power Grid"
              value={resources.power}
              delta={lastDeltas.power}
              isCriticalVital={false}
            />
            <ResourceBar
              type="health"
              label="Crew Biometrics"
              value={resources.health}
              delta={lastDeltas.health}
              isCriticalVital={true}
            />
          </div>

          {/* Quick Life Support Advice */}
          <div className="hud-telemetry-status-card">
            <div className="status-indicator-dot" />
            <div className="status-text-content">
              <span className="status-title">AUTOMATED LIFE SUPPORT MONITOR</span>
              <p className="status-advice">
                {resources.oxygen <= 25 || resources.water <= 25 || resources.health <= 25
                  ? 'CRITICAL ALERT: Core vital is running dangerously low! Divert power and prioritize replenishment immediately.'
                  : 'All life support circuits operational. Maintain balanced power reserves for solar night cycles.'}
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Daily Decision Center & Flight Log */}
        <section className="decisions-section">
          {activeDecision ? (
            <div className="decision-panel-card">
              <div className="decision-panel-top">
                <div className="decision-category-pill">
                  {activeDecision.category || 'HABITAT OPERATIONS'}
                </div>
                <span className="decision-sol-pill">SOL {currentDay} PROTOCOL</span>
              </div>

              <h3 className="decision-day-title">{activeDecision.dayTitle}</h3>
              <p className="decision-description">{activeDecision.description}</p>

              <div className="decision-options-prompt">
                <span>SELECT TACTICAL COURSE OF ACTION:</span>
              </div>

              <div className="decision-buttons-group">
                {activeDecision.options.map((option, index) => (
                  <DecisionButton
                    key={option.id || index}
                    option={option}
                    index={index}
                    onSelect={(optId) => onApplyDecision(activeDecision.id, optId)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="decision-panel-card awaiting-day">
              <h3 className="awaiting-title">SOL {currentDay} COMPLETE</h3>
              <p className="awaiting-desc">Telemetry synchronized. Ready to advance to the next mission day.</p>
              <button
                type="button"
                className="proceed-day-btn glow-btn"
                onClick={onAdvanceDay}
              >
                PROCEED TO SOL {currentDay + 1}
              </button>
            </div>
          )}

          {/* Flight History Log */}
          <div className="flight-log-panel">
            <div className="flight-log-header">
              <span className="flight-log-title">RECENT MISSION EVENT LOG</span>
              <span className="log-count">{history.length} Events Logged</span>
            </div>

            <div className="flight-log-entries">
              {history.length === 0 ? (
                <div className="log-empty">Mission underway. Telemetry recording initialized...</div>
              ) : (
                history
                  .slice(-4)
                  .reverse()
                  .map((entry, idx) => (
                    <div key={idx} className={`log-entry log-${entry.type}`}>
                      <div className="log-entry-meta">
                        <span className="log-sol">SOL {entry.day}</span>
                        <span className="log-tag">{entry.type.toUpperCase()}</span>
                      </div>
                      <div className="log-entry-title">{entry.chosenOption || entry.title}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Emergency Challenge Modal Popup */}
      {currentEmergency && (
        <EmergencyModal
          emergency={currentEmergency}
          onResolveEmergency={onResolveEmergency}
        />
      )}

      {/* Fact & Day Transition Modal Popup */}
      {pendingFact && !currentEmergency && (
        <FactModal
          fact={pendingFact}
          dayNumber={currentDay}
          lastFeedback={lastFeedback}
          onProceed={onAdvanceDay}
        />
      )}
    </div>
  );
}
