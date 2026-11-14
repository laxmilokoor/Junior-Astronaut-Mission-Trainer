/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * HomeScreen.jsx: Landing screen with animated hero, brief, and glowing Start Mission button.
 */

import React from 'react';
import { PlanetGraphic } from '../components/PlanetGraphic.jsx';
import { RocketIcon, AstronautHelmetIcon } from '../components/Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function HomeScreen({ onStartMission }) {
  const handleStart = () => {
    soundManager.playConfirm();
    onStartMission();
  };

  return (
    <div className="screen-container home-screen">
      {/* Hero Section */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulsing-radar-dot" />
          <span>NASA SPACE APPS CHALLENGE • CADET TRAINING SIMULATOR</span>
        </div>

        <h1 className="hero-main-title">
          JUNIOR ASTRONAUT
          <span className="title-gradient-glow"> MISSION TRAINER</span>
        </h1>

        <p className="hero-tagline">
          Train as a junior astronaut on critical Moon & Mars surface missions. Manage vital life support systems, conquer hazardous space emergencies, and prove your readiness for humanity’s next giant leap!
        </p>

        {/* Planet Showcase */}
        <div className="hero-planets-display">
          <div className="planet-preview-col">
            <PlanetGraphic type="moon" size={130} />
            <span className="planet-caption">TARGET 1: THE MOON</span>
          </div>

          <div className="hero-shuttle-center">
            <div className="shuttle-orbit-ring" />
            <div className="shuttle-badge">
              <RocketIcon size={32} className="shuttle-icon" />
              <span>ORBITAL TRANSIT</span>
            </div>
          </div>

          <div className="planet-preview-col">
            <PlanetGraphic type="mars" size={130} />
            <span className="planet-caption">TARGET 2: MARS</span>
          </div>
        </div>

        {/* Big Glowing Start Button */}
        <div className="hero-cta-wrap">
          <button
            type="button"
            className="start-mission-btn glow-btn pulse-glow"
            onClick={handleStart}
          >
            <AstronautHelmetIcon size={24} className="cta-icon" />
            <span>START ASTRONAUT MISSION</span>
          </button>
        </div>

        {/* Orientation Briefing Cards */}
        <div className="orientation-grid">
          <div className="orientation-card">
            <div className="ori-num">01</div>
            <h3 className="ori-title">Resource Survival</h3>
            <p className="ori-desc">
              Balance Oxygen (O₂), Water (H₂O), Food, Power, and Crew Health. If any vital life support reaches zero, the mission aborts!
            </p>
          </div>

          <div className="orientation-card">
            <div className="ori-num">02</div>
            <h3 className="ori-title">Daily Tactical Decisions</h3>
            <p className="ori-desc">
              Every sol presents operational dilemmas. Analyze the projected telemetry deltas and choose the optimal compromise for your outpost.
            </p>
          </div>

          <div className="orientation-card">
            <div className="ori-num">03</div>
            <h3 className="ori-title">Emergency Challenges</h3>
            <p className="ori-desc">
              Handle solar flares, hull punctures, rover failures, and dust storms using real NASA science protocols under pressure.
            </p>
          </div>

          <div className="orientation-card">
            <div className="ori-num">04</div>
            <h3 className="ori-title">Flight Score & Rank</h3>
            <p className="ori-desc">
              Survive the full mission duration to earn an authentic NASA Cadet Rank, a survival score out of 100, and mission debrief insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
