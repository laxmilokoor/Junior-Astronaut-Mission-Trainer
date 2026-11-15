/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * Header.jsx: Top navigation & telemetry HUD banner.
 */

import React from 'react';
import { AstronautHelmetIcon, VolumeOnIcon, VolumeOffIcon } from './Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function Header({
  currentScreen,
  onNavigateHome,
  soundMuted,
  onToggleSound,
  missionState,
  backendStatus
}) {
  const handleSoundClick = () => {
    const newState = !soundMuted;
    soundManager.setSound(!newState);
    onToggleSound(newState);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div
          className="brand-group"
          onClick={() => {
            soundManager.playClick();
            onNavigateHome();
          }}
          role="button"
          tabIndex={0}
          title="Return to Mission Control Home"
        >
          <div className="helmet-icon-glow">
            <AstronautHelmetIcon size={32} className="helmet-svg" />
          </div>
          <div className="brand-text">
            <div className="brand-subtitle">
              <span className="nasa-pill">NASA SPACE APPS</span>
              <span className="telemetry-badge">SIMULATOR V2.4</span>
            </div>
            <h1 className="brand-title">JUNIOR ASTRONAUT MISSION TRAINER</h1>
          </div>
        </div>

        {/* Live Mission Status (if in Dashboard/Emergency/Results) */}
        {missionState && missionState.status && (
          <div className="header-telemetry-status">
            <div className="telemetry-pill">
              <span className="telemetry-dot" />
              <span className="telemetry-label">DESTINATION:</span>
              <span className="telemetry-value">
                {missionState.mission?.destination ? missionState.mission.name : 'ORBIT'}
              </span>
            </div>
            <div className="telemetry-pill">
              <span className="telemetry-label">SOL / DAY:</span>
              <span className="telemetry-value">
                {missionState.currentDay} / {missionState.totalDays}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="header-actions">
          <div
            className={`backend-status-pill backend-status-${backendStatus}`}
            role="status"
            aria-live="polite"
            title={
              backendStatus === 'connected'
                ? 'FastAPI backend connected'
                : backendStatus === 'checking'
                  ? 'Checking FastAPI backend connection'
                  : 'FastAPI backend unavailable; the game will continue locally'
            }
          >
            <span className="backend-status-dot" />
            <span>
              {backendStatus === 'connected'
                ? 'API ONLINE'
                : backendStatus === 'checking'
                  ? 'API CHECKING'
                  : 'API OFFLINE'}
            </span>
          </div>
          <button
            type="button"
            className="sound-toggle-btn"
            onClick={handleSoundClick}
            title={soundMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
            aria-label={soundMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
          >
            {soundMuted ? (
              <>
                <VolumeOffIcon size={18} />
                <span className="sound-text">AUDIO OFF</span>
              </>
            ) : (
              <>
                <VolumeOnIcon size={18} />
                <span className="sound-text">AUDIO ON</span>
              </>
            )}
          </button>

          {currentScreen !== 'home' && (
            <button
              type="button"
              className="home-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigateHome();
              }}
              title="Return to Home screen"
            >
              MISSION CONTROL
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
