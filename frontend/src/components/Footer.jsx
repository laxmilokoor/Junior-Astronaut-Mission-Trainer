/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * Footer.jsx: Footer component with credits and educational mission info.
 */

import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="nasa-meatball-emblem">
            <span className="nasa-txt">NASA</span>
          </div>
          <div className="footer-desc">
            <p className="footer-title">Created for the <strong>NASA Space Apps Challenge</strong></p>
            <p className="footer-sub">
              Empowering next-generation Artemis and Mars explorers through interactive stem education & life support simulation.
            </p>
          </div>
        </div>

        <div className="footer-right">
          <div className="safety-badge">
            <span className="safe-dot" />
            <span>ALL SYSTEMS TELEMETRY ACTIVE</span>
          </div>
          <p className="copyright-note">
            Educational prototype • Open Science & Deep Space Survival
          </p>
        </div>
      </div>
    </footer>
  );
}
