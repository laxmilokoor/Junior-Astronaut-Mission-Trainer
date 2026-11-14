/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * ScoreCard.jsx: Final mission debrief, score calculation (0-100), and rank badge.
 */

import React from 'react';
import {
  OxygenIcon,
  WaterIcon,
  FoodIcon,
  PowerIcon,
  HealthIcon,
  ShieldCheckIcon,
  AlertTriangleIcon
} from './Icons.jsx';
import { soundManager } from '../utils/soundEffects.js';

export function ScoreCard({
  state,
  onPlayAgain,
  onChooseAnotherMission
}) {
  const isCompleted = state.status === 'completed';
  const scoreData = state.scoreData || {
    score: 0,
    rank: 'Cadet',
    badgeTitle: 'Participant',
    badgeColor: '#94a3b8',
    lessonLearned: 'Simulation finished.',
    breakdown: { resourceScore: 0, survivalScore: 0, emergencyScore: 0 }
  };

  const { resources, stats, mission, currentDay, totalDays } = state;

  return (
    <div className={`score-card-container ${isCompleted ? 'outcome-success' : 'outcome-failed'}`}>
      {/* Banner */}
      <div className="outcome-banner">
        <div className="outcome-icon-wrap">
          {isCompleted ? (
            <ShieldCheckIcon size={40} className="icon-success" />
          ) : (
            <AlertTriangleIcon size={40} className="icon-failed" />
          )}
        </div>
        <div className="outcome-heading">
          <span className="outcome-status-tag">
            {isCompleted ? 'OFFICIAL SIMULATION SUCCESS' : 'CRITICAL INCIDENT REPORT'}
          </span>
          <h2 className="outcome-title">
            {isCompleted
              ? `${mission?.name || 'MISSION'} COMPLETED!`
              : 'MISSION ABORTED: LIFE SUPPORT DEPLETED'}
          </h2>
          <p className="outcome-destination-sub">
            Target Destination: {mission?.destination} • Survived {Math.min(currentDay, totalDays)} of {totalDays} Sols
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="score-main-grid">
        {/* Survival Score Gauge */}
        <div className="score-circle-panel">
          <span className="score-label">OVERALL SURVIVAL SCORE</span>
          <div className="score-numeric-wrap">
            <span className="score-number">{scoreData.score}</span>
            <span className="score-denominator">/ 100</span>
          </div>

          <div className="rank-badge-box" style={{ borderColor: scoreData.badgeColor }}>
            <span className="rank-title-label">ASTRONAUT RANK:</span>
            <h3 className="rank-name" style={{ color: scoreData.badgeColor }}>
              {scoreData.rank}
            </h3>
            <span className="badge-insignia-text">{scoreData.badgeTitle}</span>
          </div>

          {scoreData.breakdown && (
            <div className="score-breakdown-row">
              <div className="breakdown-item">
                <span className="bd-label">Resources</span>
                <span className="bd-val">{scoreData.breakdown.resourceScore}/60</span>
              </div>
              <div className="breakdown-item">
                <span className="bd-label">Survival</span>
                <span className="bd-val">{scoreData.breakdown.survivalScore}/25</span>
              </div>
              <div className="breakdown-item">
                <span className="bd-label">Crises</span>
                <span className="bd-val">{scoreData.breakdown.emergencyScore}/15</span>
              </div>
            </div>
          )}
        </div>

        {/* Final Resources Snapshot */}
        <div className="final-resources-panel">
          <h3 className="panel-title">FINAL LIFE SUPPORT TELEMETRY</h3>
          <div className="final-resources-list">
            <div className="final-res-item">
              <div className="res-name-icon">
                <OxygenIcon size={18} />
                <span>Oxygen (O₂)</span>
              </div>
              <div className="res-stat-bar-wrap">
                <div className="res-mini-bar">
                  <div
                    className="res-mini-fill"
                    style={{
                      width: `${resources.oxygen}%`,
                      backgroundColor: resources.oxygen <= 20 ? '#ef4444' : resources.oxygen <= 45 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className="res-val-txt">{resources.oxygen}%</span>
              </div>
            </div>

            <div className="final-res-item">
              <div className="res-name-icon">
                <WaterIcon size={18} />
                <span>Water (H₂O)</span>
              </div>
              <div className="res-stat-bar-wrap">
                <div className="res-mini-bar">
                  <div
                    className="res-mini-fill"
                    style={{
                      width: `${resources.water}%`,
                      backgroundColor: resources.water <= 20 ? '#ef4444' : resources.water <= 45 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className="res-val-txt">{resources.water}%</span>
              </div>
            </div>

            <div className="final-res-item">
              <div className="res-name-icon">
                <FoodIcon size={18} />
                <span>Food Supplies</span>
              </div>
              <div className="res-stat-bar-wrap">
                <div className="res-mini-bar">
                  <div
                    className="res-mini-fill"
                    style={{
                      width: `${resources.food}%`,
                      backgroundColor: resources.food <= 20 ? '#ef4444' : resources.food <= 45 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className="res-val-txt">{resources.food}%</span>
              </div>
            </div>

            <div className="final-res-item">
              <div className="res-name-icon">
                <PowerIcon size={18} />
                <span>Power Grid</span>
              </div>
              <div className="res-stat-bar-wrap">
                <div className="res-mini-bar">
                  <div
                    className="res-mini-fill"
                    style={{
                      width: `${resources.power}%`,
                      backgroundColor: resources.power <= 20 ? '#ef4444' : resources.power <= 45 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className="res-val-txt">{resources.power}%</span>
              </div>
            </div>

            <div className="final-res-item">
              <div className="res-name-icon">
                <HealthIcon size={18} />
                <span>Crew Health</span>
              </div>
              <div className="res-stat-bar-wrap">
                <div className="res-mini-bar">
                  <div
                    className="res-mini-fill"
                    style={{
                      width: `${resources.health}%`,
                      backgroundColor: resources.health <= 20 ? '#ef4444' : resources.health <= 45 ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
                <span className="res-val-txt">{resources.health}%</span>
              </div>
            </div>
          </div>

          <div className="cadet-kpis">
            <div className="kpi-box">
              <span className="kpi-num">{stats.decisionsMade}</span>
              <span className="kpi-lbl">Decisions Executed</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-num">{stats.emergenciesResolved}</span>
              <span className="kpi-lbl">Emergencies Overcome</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Director Debrief / Lesson Learned */}
      <div className="lesson-learned-box">
        <h4 className="debrief-heading">
          <span className="debrief-tag">NASA FLIGHT DIRECTOR DEBRIEF</span>
          LESSONS LEARNED IN DEEP SPACE SURVIVAL
        </h4>
        <p className="debrief-text">{scoreData.lessonLearned}</p>
      </div>

      {/* Buttons */}
      <div className="score-actions-row">
        <button
          type="button"
          className="retry-btn glow-btn"
          onClick={() => {
            soundManager.playConfirm();
            onPlayAgain();
          }}
        >
          RETRY THIS MISSION
        </button>
        <button
          type="button"
          className="another-mission-btn"
          onClick={() => {
            soundManager.playClick();
            onChooseAnotherMission();
          }}
        >
          CHOOSE ANOTHER MISSION
        </button>
      </div>
    </div>
  );
}
