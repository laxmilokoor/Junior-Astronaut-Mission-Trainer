/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * ResourceBar.jsx: Animated telemetry gauge for individual life-support and habitat resources.
 * Color smoothly adapts from Green (>50%) to Amber (25-50%) to Red (<25%).
 */

import React from 'react';
import {
  OxygenIcon,
  WaterIcon,
  FoodIcon,
  PowerIcon,
  HealthIcon
} from './Icons.jsx';

export function ResourceBar({
  type = 'oxygen',
  label = 'Oxygen',
  value = 100,
  delta = 0,
  isCriticalVital = false
}) {
  const clampedValue = Math.min(Math.max(Math.round(value), 0), 100);

  // Status & Color calculation
  let statusClass = 'status-green';
  let statusText = 'NOMINAL';
  let barColor = '#10b981'; // Green
  let glowColor = 'rgba(16, 185, 129, 0.4)';

  if (clampedValue <= 20) {
    statusClass = 'status-red pulsing-critical';
    statusText = 'CRITICAL';
    barColor = '#ef4444';
    glowColor = 'rgba(239, 68, 68, 0.6)';
  } else if (clampedValue <= 45) {
    statusClass = 'status-yellow';
    statusText = 'CAUTION';
    barColor = '#f59e0b';
    glowColor = 'rgba(245, 158, 11, 0.5)';
  }

  const renderIcon = () => {
    switch (type.toLowerCase()) {
      case 'oxygen':
        return <OxygenIcon size={20} className="resource-icon" />;
      case 'water':
        return <WaterIcon size={20} className="resource-icon" />;
      case 'food':
        return <FoodIcon size={20} className="resource-icon" />;
      case 'power':
        return <PowerIcon size={20} className="resource-icon" />;
      case 'health':
        return <HealthIcon size={20} className="resource-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`resource-card ${statusClass}`}>
      <div className="resource-header">
        <div className="resource-title-wrap">
          <div className="icon-container" style={{ borderColor: barColor }}>
            {renderIcon()}
          </div>
          <div className="resource-meta">
            <span className="resource-label">{label}</span>
            {isCriticalVital && (
              <span className="vital-tag" title="If this vital drops to 0%, mission fails immediately">
                CRITICAL VITAL
              </span>
            )}
          </div>
        </div>

        <div className="resource-numeric">
          {delta !== 0 && (
            <span className={`delta-badge ${delta > 0 ? 'delta-pos' : 'delta-neg'}`}>
              {delta > 0 ? `+${delta}%` : `${delta}%`}
            </span>
          )}
          <span className="resource-percent">{clampedValue}%</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="progress-track" role="progressbar" aria-valuenow={clampedValue} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-fill"
          style={{
            width: `${clampedValue}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 14px ${glowColor}`
          }}
        />
        {/* Subtle grid ticks on the bar */}
        <div className="gauge-markers">
          <span className="marker marker-25" />
          <span className="marker marker-50" />
          <span className="marker marker-75" />
        </div>
      </div>

      <div className="resource-footer">
        <span className="status-badge" style={{ color: barColor }}>
          {statusText}
        </span>
        <span className="safe-margin-text">
          {clampedValue <= 20 ? 'Immediate Action Required' : clampedValue <= 45 ? 'Elevated Monitoring' : 'Within Safety Margin'}
        </span>
      </div>
    </div>
  );
}
