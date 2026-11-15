/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * ResultsScreen.jsx: Mission culmination screen displaying survival score, badge, and debrief.
 */

import React, { useEffect } from 'react';
import { ScoreCard } from '../components/ScoreCard.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function ResultsScreen({
  state,
  missionHistory = [],
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
      {missionHistory.length > 0 && (
        <section className="mission-history-panel" aria-labelledby="mission-history-title">
          <h3 id="mission-history-title">RECENT MISSION HISTORY</h3>
          <ul>
            {missionHistory.slice(0, 5).map((mission) => (
              <li key={mission.id}>
                <span>
                  {mission.missionId === 'mars' ? 'Ares Mars Expedition' : 'Artemis Lunar Outpost'}
                  {' · '}
                  {mission.startedAt ? new Date(mission.startedAt).toLocaleDateString() : 'Date unavailable'}
                </span>
                <strong className={`mission-history-${mission.status}`}>
                  {mission.status.toUpperCase()}
                  {Number.isInteger(mission.score) ? ` · ${mission.score}/100` : ''}
                </strong>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
