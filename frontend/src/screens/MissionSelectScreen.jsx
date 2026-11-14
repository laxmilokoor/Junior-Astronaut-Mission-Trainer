/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * MissionSelectScreen.jsx: Mission selection deck for Moon (Artemis) and Mars (Ares).
 */

import React from 'react';
import { MISSIONS } from '../data/missions.js';
import { MissionCard } from '../components/MissionCard.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function MissionSelectScreen({ onSelectMission, onBackToHome }) {
  return (
    <div className="screen-container mission-select-screen">
      <div className="select-screen-header">
        <button
          type="button"
          className="back-btn"
          onClick={() => {
            soundManager.playClick();
            onBackToHome();
          }}
        >
          ← BACK TO MISSION CONTROL
        </button>

        <div className="select-title-box">
          <span className="section-subtitle">FLIGHT ROSTER ASSIGNMENT</span>
          <h2 className="section-title">CHOOSE YOUR EXPEDITION TARGET</h2>
          <p className="section-desc">
            Select your training destination. Moon offers an intermediate 7-day lunar trial with fast communications; Mars presents an unforgiving 10-day deep space ordeal.
          </p>
        </div>
      </div>

      <div className="missions-grid">
        {MISSIONS.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onSelectMission={onSelectMission}
          />
        ))}
      </div>
    </div>
  );
}
