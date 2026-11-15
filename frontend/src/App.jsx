/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * App.jsx: Main application shell, state management, and screen coordinator.
 */

import React, { useEffect, useRef, useState } from 'react';

import { HomeScreen } from './screens/HomeScreen.jsx';
import { MissionSelectScreen } from './screens/MissionSelectScreen.jsx';
import { DashboardScreen } from './screens/DashboardScreen.jsx';
import { EmergencyScreen } from './screens/EmergencyScreen.jsx';
import { ResultsScreen } from './screens/ResultsScreen.jsx';

import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { StarryBackground } from './components/StarryBackground.jsx';

import {
  checkBackendConnection,
  endBackendMission,
  getMissionHistory,
  startBackendMission,
  updateBackendResources
} from './utils/api.js';

import {
  startMission,
  applyDecision,
  resolveEmergency,
  nextDay,
  calculateScore
} from './gameLogic.js';

export function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [gameState, setGameState] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [missionHistory, setMissionHistory] = useState([]);
  const backendMissionId = useRef(null);
  const backendSyncQueue = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;
    const checkConnection = () => {
      checkBackendConnection()
        .then(() => {
          if (active) setBackendStatus('connected');
        })
        .catch(() => {
          if (active) setBackendStatus('disconnected');
        });
    };

    checkConnection();
    getMissionHistory()
      .then((history) => {
        if (active) setMissionHistory(history);
      })
      .catch(() => {
        if (active) setBackendStatus('disconnected');
      });

    const intervalId = window.setInterval(checkConnection, 15000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const queueBackendSync = (operation) => {
    const result = backendSyncQueue.current.then(operation);
    backendSyncQueue.current = result.catch(() => {
      backendMissionId.current = null;
      setBackendStatus('disconnected');
    });
    result
      .then(() => setBackendStatus('connected'))
      .catch(() => {});
  };

  const syncMissionStart = (state) => {
    queueBackendSync(async () => {
      await startBackendMission(state.missionId, state.resources);
      backendMissionId.current = state.missionId;
    });
  };

  const syncMissionTransition = (previousState, nextState) => {
    queueBackendSync(async () => {
      if (backendMissionId.current !== nextState.missionId) {
        await startBackendMission(nextState.missionId, nextState.resources);
        backendMissionId.current = nextState.missionId;
      } else {
        const deltas = Object.fromEntries(
          Object.keys(nextState.resources).map((resource) => [
            resource,
            nextState.resources[resource] - previousState.resources[resource]
          ])
        );
        if (Object.values(deltas).some((amount) => amount !== 0)) {
          await updateBackendResources(deltas);
        }
      }

      if (nextState.status === 'completed' || nextState.status === 'failed') {
        await endBackendMission({
          missionId: nextState.missionId,
          status: nextState.status,
          resources: nextState.resources,
          failReason: nextState.failReason,
          score: nextState.scoreData?.score
        });
        backendMissionId.current = null;
        setMissionHistory(await getMissionHistory());
      }
    });
  };

  const finishState = (updated) => ({
    ...updated,
    scoreData: calculateScore(updated)
  });

  const handleGoToMissionSelect = () => {
    setCurrentScreen('missionSelect');
  };

  const handleSelectMission = (missionId) => {
    const freshState = startMission(missionId);
    setGameState(freshState);
    setCurrentScreen('dashboard');
    syncMissionStart(freshState);
  };

  const handleApplyDecision = (decisionId, optionId) => {
    if (!gameState) return;

    const updated = applyDecision(gameState, decisionId, optionId);
    const nextState = updated.status === 'failed' ? finishState(updated) : updated;

    setGameState(nextState);
    syncMissionTransition(gameState, nextState);
    if (nextState.status === 'failed') setCurrentScreen('results');
  };

  const handleResolveEmergency = (emergencyId, optionId) => {
    if (!gameState) return;

    const updated = resolveEmergency(gameState, emergencyId, optionId);
    const nextState = updated.status === 'failed' ? finishState(updated) : updated;

    setGameState(nextState);
    syncMissionTransition(gameState, nextState);
    if (nextState.status === 'failed') {
      setCurrentScreen('results');
    } else if (currentScreen === 'emergency') {
      setCurrentScreen('dashboard');
    }
  };

  const handleAdvanceDay = () => {
    if (!gameState) return;

    const updated = nextDay(gameState);
    const nextState = updated.status === 'completed' || updated.status === 'failed'
      ? finishState(updated)
      : updated;

    setGameState(nextState);
    syncMissionTransition(gameState, nextState);
    if (nextState.status === 'completed' || nextState.status === 'failed') {
      setCurrentScreen('results');
    }
  };

  const handleAbortMission = () => {
    if (
      gameState &&
      window.confirm('Are you sure you want to abort the current mission simulation?')
    ) {
      const abortedState = finishState({
        ...gameState,
        status: 'failed',
        failReason: 'Mission aborted by Flight Commander directive.'
      });

      setGameState(abortedState);
      setCurrentScreen('results');
      syncMissionTransition(gameState, abortedState);
    }
  };

  const handlePlayAgain = () => {
    const missionId = gameState?.missionId || 'moon';
    const freshState = startMission(missionId);

    setGameState(freshState);
    setCurrentScreen('dashboard');
    syncMissionStart(freshState);
  };

  const handleChooseAnotherMission = () => {
    setCurrentScreen('missionSelect');
  };

  const handleNavigateHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="app-layout">
      <StarryBackground />

      <Header
        currentScreen={currentScreen}
        onNavigateHome={handleNavigateHome}
        soundMuted={soundMuted}
        onToggleSound={setSoundMuted}
        missionState={gameState}
        backendStatus={backendStatus}
      />

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
            missionHistory={missionHistory}
            onPlayAgain={handlePlayAgain}
            onChooseAnotherMission={handleChooseAnotherMission}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
