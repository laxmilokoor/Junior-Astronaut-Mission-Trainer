/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * ResultsScreen.jsx: Mission culmination screen displaying survival score, badge, and debrief.
 */

import React, { useEffect } from 'react';
import { ScoreCard } from '../components/ScoreCard.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function ResultsScreen({
  state,
  onPlayAgain,
  onChooseAnotherMission
}) {
  const isCompleted = state.status === 'completed';

  useEffect(() => {
    if (isCompleted) {
      soundManager.playSuccess();
    } else {
      soundManager.playFailure();
    }
  }, [isCompleted]);

  return (
    <div className="screen-container results-screen">
      <ScoreCard
        state={state}
        onPlayAgain={onPlayAgain}
        onChooseAnotherMission={onChooseAnotherMission}
      />
    </div>
  );
}
