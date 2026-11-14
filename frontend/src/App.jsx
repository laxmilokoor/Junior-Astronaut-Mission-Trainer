/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * App.jsx: Main application shell, state management, and screen coordinator.
 */

import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { MissionSelectScreen } from './screens/MissionSelectScreen.jsx';
import { DashboardScreen } from './screens/DashboardScreen.jsx';
import { EmergencyScreen } from './screens/EmergencyScreen.jsx';
import { ResultsScreen } from './screens/ResultsScreen.jsx';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { StarryBackground } from './components/StarryBackground.jsx';

import {
  startMission,
  applyDecision,
  resolveEmergency,
  nextDay,
  calculateScore
} from './gameLogic.js';
import { soundManager } from './utils/soundEffects.js';

export function App() {
  // Screen state: 'home' | 'missionSelect' | 'dashboard' | 'emergency' | 'results'
  const [currentScreen, setCurrentScreen] = useState('home');

  // Simulation state
  const [gameState, setGameState] = useState(null);

  // Audio preference
  const [soundMuted, setSoundMuted] = useState(false);

  // Navigate to mission selection
  const handleGoToMissionSelect = () => {
    setCurrentScreen('missionSelect');
  };

  // Launch chosen mission
  const handleSelectMission = (missionId) => {
    const freshState = startMission(missionId);
    setGameState(freshState);
    setCurrentScreen('dashboard');
  };

  // Execute daily tactical decision
  const handleApplyDecision = (decisionId, optionId) => {
    if (!gameState) return;
    const updated = applyDecision(gameState, decisionId, optionId);

    if (updated.status === 'failed') {
      const scoredState = {
        ...updated,
        scoreData: calculateScore(updated)
      };
      setGameState(scoredState);
      setCurrentScreen('results');
      return;
    }

    setGameState(updated);
  };

  // Resolve emergency challenge
  const handleResolveEmergency = (emergencyId, optionId) => {
    if (!gameState) return;
    const updated = resolveEmergency(gameState, emergencyId, optionId);

    if (updated.status === 'failed') {
      const scoredState = {
        ...updated,
        scoreData: calculateScore(updated)
      };
      setGameState(scoredState);
      setCurrentScreen('results');
      return;
    }

    setGameState(updated);
    if (currentScreen === 'emergency') {
      setCurrentScreen('dashboard');
    }
  };

  // Advance to next mission day
  const handleAdvanceDay = () => {
    if (!gameState) return;
    const updated = nextDay(gameState);

    if (updated.status === 'completed' || updated.status === 'failed') {
      const scoredState = {
        ...updated,
        scoreData: calculateScore(updated)
      };
      setGameState(scoredState);
      setCurrentScreen('results');
      return;
    }

    setGameState(updated);
  };

  // Abort ongoing mission
  const handleAbortMission = () => {
    if (window.confirm('Are you sure you want to abort the current mission simulation?')) {
      const abortedState = {
        ...gameState,
        status: 'failed',
        failReason: 'Mission aborted by Flight Commander directive.'
      };
      abortedState.scoreData = calculateScore(abortedState);
      setGameState(abortedState);
      setCurrentScreen('results');
    }
  };

  // Retry same mission
  const handlePlayAgain = () => {
    const missionId = gameState?.missionId || 'moon';
    const freshState = startMission(missionId);
    setGameState(freshState);
    setCurrentScreen('dashboard');
  };

  // Switch mission
  const handleChooseAnotherMission = () => {
    setCurrentScreen('missionSelect');
  };

  // Return to Home
  const handleNavigateHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="app-layout">
      {/* Animated Deep Space Canvas / SVG Background */}
      <StarryBackground />

      {/* Top Telemetry Header */}
      <Header
        currentScreen={currentScreen}
        onNavigateHome={handleNavigateHome}
        soundMuted={soundMuted}
        onToggleSound={setSoundMuted}
        missionState={gameState}
      />

      {/* Main Screen Router */}
      <main className="main-content-area">
        {currentScreen === 'home' && (
          <HomeScreen onStartMission={handleGoToMissionSelect} />
        )}

        {currentScreen === 'missionSelect' && (
          <MissionSelectScreen
            onSelectMission={handleSelectMission}
            onBackToHome={handleNavigateHome}
          />
        )}

        {currentScreen === 'dashboard' && gameState && (
          <DashboardScreen
            state={gameState}
            onApplyDecision={handleApplyDecision}
            onResolveEmergency={handleResolveEmergency}
            onAdvanceDay={handleAdvanceDay}
            onAbortMission={handleAbortMission}
          />
        )}

        {currentScreen === 'emergency' && gameState && (
          <EmergencyScreen
            emergency={gameState.currentEmergency}
            onResolveEmergency={handleResolveEmergency}
            onReturnToDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'results' && gameState && (
          <ResultsScreen
            state={gameState}
            onPlayAgain={handlePlayAgain}
            onChooseAnotherMission={handleChooseAnotherMission}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
