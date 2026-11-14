/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * MissionCard.jsx: Mission selection card with vector planet art and mission telemetry.
 */

import React from 'react';
import { PlanetGraphic } from './PlanetGraphic.jsx';
import { RocketIcon } from './Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function MissionCard({ mission, onSelectMission }) {
  const isMoon = mission.id === 'moon';

  const handleSelect = () => {
    soundManager.playConfirm();
    onSelectMission(mission.id);
  };

  return (
    <div
      className={`mission-card ${isMoon ? 'mission-moon' : 'mission-mars'}`}
      style={{
        '--card-glow': mission.glowColor || 'rgba(56, 189, 248, 0.4)',
        '--card-accent': mission.color || '#38bdf8'
      }}
    >
      <div className="card-top-header">
        <span className="mission-target-badge">{mission.destination}</span>
        <span className={`difficulty-pill diff-${mission.difficultyLevel}`}>
          {mission.difficulty}
        </span>
      </div>

      {/* Planet Art Centerpiece */}
      <div className="card-planet-center">
        <PlanetGraphic type={mission.id} size={150} animated={true} />
      </div>

      <div className="card-body">
        <h3 className="card-mission-name">{mission.name}</h3>
        <p className="card-tagline">{mission.tagline}</p>
        <p className="card-description">{mission.description}</p>

        {/* Key Mission Parameters Grid */}
        <div className="mission-specs-grid">
          <div className="spec-box">
            <span className="spec-label">DURATION</span>
            <span className="spec-val highlight-val">{mission.durationDays} Days</span>
          </div>
          <div className="spec-box">
            <span className="spec-label">SURFACE GRAVITY</span>
            <span className="spec-val">{mission.environment?.gravity}</span>
          </div>
          <div className="spec-box">
            <span className="spec-label">AVG TEMP</span>
            <span className="spec-val">{mission.environment?.avgTemp}</span>
          </div>
          <div className="spec-box">
            <span className="spec-label">COMM DELAY</span>
            <span className="spec-val">{mission.environment?.commDelay}</span>
          </div>
        </div>

        {/* Initial Resource Allocation Preview */}
        <div className="initial-res-preview">
          <span className="preview-label">INITIAL SUPPLY PODS:</span>
          <div className="supply-pills">
            <span className="supply-pill">O₂: {mission.initialResources.oxygen}%</span>
            <span className="supply-pill">H₂O: {mission.initialResources.water}%</span>
            <span className="supply-pill">PWR: {mission.initialResources.power}%</span>
            <span className="supply-pill">FOOD: {mission.initialResources.food}%</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button
          type="button"
          className="select-mission-btn glow-btn"
          onClick={handleSelect}
        >
          <RocketIcon size={18} className="btn-icon" />
          <span>ACCEPT MISSION & LAUNCH</span>
        </button>
      </div>
    </div>
  );
}
