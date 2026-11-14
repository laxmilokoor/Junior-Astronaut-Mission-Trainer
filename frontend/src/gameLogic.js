/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * gameLogic.js: Core simulation engine & state transitions.
 * Pure functional game logic decoupled from the UI.
 * Can be readily substituted by backend API endpoints if needed.
 */

import { MISSIONS, EDUCATIONAL_FACTS } from './data/missions.js';
import { EMERGENCIES } from './data/emergencies.js';
import { DECISIONS } from './data/decisions.js';

/**
 * Clamp a numeric value between min and max.
 * @param {number} value
 * @param {number} [min=0]
 * @param {number} [max=100]
 * @returns {number}
 */
export function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(Math.round(value), min), max);
}

/**
 * Helper to safely clamp all resources in a resource dictionary.
 * @param {Object} resources
 * @returns {Object}
 */
export function clampResources(resources) {
  return {
    oxygen: clamp(resources.oxygen),
    water: clamp(resources.water),
    food: clamp(resources.food),
    power: clamp(resources.power),
    health: clamp(resources.health)
  };
}

/**
 * Apply resource deltas to a state's current resources.
 * @param {Object} currentResources
 * @param {Object} deltas
 * @returns {Object} new clamped resources
 */
export function applyDeltas(currentResources, deltas = {}) {
  return {
    oxygen: clamp(currentResources.oxygen + (deltas.oxygen || 0)),
    water: clamp(currentResources.water + (deltas.water || 0)),
    food: clamp(currentResources.food + (deltas.food || 0)),
    power: clamp(currentResources.power + (deltas.power || 0)),
    health: clamp(currentResources.health + (deltas.health || 0))
  };
}

/**
 * Checks vital fail conditions and completion status.
 * Mission fails if oxygen, water, or crew health reaches 0.
 * Succeeds if crew survives all days.
 * @param {Object} state
 * @returns {Object} updated state with status and failReason if applicable
 */
export function checkMissionStatus(state) {
  const { resources, currentDay, totalDays } = state;

  if (resources.oxygen <= 0) {
    return {
      ...state,
      status: 'failed',
      failReason: 'Life Support Failure: Oxygen levels dropped to 0%. Atmosphere unbreathable.'
    };
  }

  if (resources.water <= 0) {
    return {
      ...state,
      status: 'failed',
      failReason: 'Dehydration Emergency: Water recycling systems collapsed and water supplies were exhausted.'
    };
  }

  if (resources.health <= 0) {
    return {
      ...state,
      status: 'failed',
      failReason: 'Medical Incapacitation: Crew health hit 0% due to extreme fatigue, trauma, or radiation.'
    };
  }

  if (currentDay > totalDays) {
    return {
      ...state,
      status: 'completed',
      failReason: null
    };
  }

  return state;
}

/**
 * Selects an emergency event. Can exclude recently triggered IDs to avoid repetition.
 * @param {Object} [state]
 * @param {string[]} [excludeIds=[]]
 * @returns {Object}
 */
export function getRandomEmergency(state = null, excludeIds = []) {
  const usedIds = state?.history
    ?.filter((h) => h.type === 'emergency')
    ?.map((h) => h.id) || excludeIds;

  let candidates = EMERGENCIES.filter((e) => !usedIds.includes(e.id));
  if (candidates.length === 0) {
    // If all emergencies have been seen, fall back to any emergency
    candidates = EMERGENCIES;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

/**
 * Gets a random educational fact suitable for the current mission.
 * @param {string} missionId
 * @param {number[]} [seenIndices=[]]
 * @returns {Object}
 */
export function getEducationalFact(missionId = 'moon', seenIndices = []) {
  const relevantFacts = EDUCATIONAL_FACTS.filter(
    (f) => f.missionRef === 'both' || f.missionRef === missionId
  );

  if (relevantFacts.length === 0) {
    return EDUCATIONAL_FACTS[0];
  }

  const randomIndex = Math.floor(Math.random() * relevantFacts.length);
  return relevantFacts[randomIndex];
}

/**
 * Retrieves a decision suitable for the given day number and mission.
 * @param {number} dayNumber
 * @returns {Object}
 */
export function getDecisionForDay(dayNumber) {
  const index = (dayNumber - 1) % DECISIONS.length;
  return DECISIONS[index];
}

/**
 * Initializes a new mission state.
 * @param {string} missionId - 'moon' or 'mars'
 * @returns {Object} Initial mission state
 */
export function startMission(missionId = 'moon') {
  const selectedMission = MISSIONS.find((m) => m.id === missionId) || MISSIONS[0];

  const initialState = {
    missionId: selectedMission.id,
    mission: selectedMission,
    currentDay: 1,
    totalDays: selectedMission.durationDays,
    resources: { ...selectedMission.initialResources },
    status: 'active', // 'active' | 'completed' | 'failed'
    failReason: null,
    activeDecision: getDecisionForDay(1),
    currentEmergency: null,
    pendingFact: null,
    history: [],
    lastFeedback: null,
    stats: {
      decisionsMade: 0,
      emergenciesEncountered: 0,
      emergenciesResolved: 0
    }
  };

  return initialState;
}

/**
 * Applies a tactical daily decision and calculates resource changes.
 * Also rolls for whether an emergency should occur on this day.
 * @param {Object} state - Current game state
 * @param {string} decisionId - The ID of the decision
 * @param {string|number} optionIdOrIndex - The chosen option ID or index (0, 1, 2)
 * @returns {Object} New updated state
 */
export function applyDecision(state, decisionId, optionIdOrIndex) {
  if (state.status !== 'active') return state;

  const decision = state.activeDecision || DECISIONS.find((d) => d.id === decisionId) || DECISIONS[0];
  let option = null;

  if (typeof optionIdOrIndex === 'number') {
    option = decision.options[optionIdOrIndex] || decision.options[0];
  } else {
    option = decision.options.find((opt) => opt.id === optionIdOrIndex) || decision.options[0];
  }

  const updatedResources = applyDeltas(state.resources, option.effects);

  const historyEntry = {
    day: state.currentDay,
    type: 'decision',
    id: decision.id,
    title: decision.dayTitle,
    chosenOption: option.title,
    effects: option.effects,
    timestamp: Date.now()
  };

  let newState = {
    ...state,
    resources: updatedResources,
    history: [...state.history, historyEntry],
    lastFeedback: {
      type: 'decision',
      title: `Choice Executed: ${option.title}`,
      description: option.feedback,
      effects: option.effects
    },
    stats: {
      ...state.stats,
      decisionsMade: state.stats.decisionsMade + 1
    }
  };

  // Check if vitals fell to 0
  newState = checkMissionStatus(newState);
  if (newState.status === 'failed') {
    return newState;
  }

  // Determine whether an emergency challenge triggers today
  // Trigger on days 2, 4, 6, 8, etc., or dynamic chance (approx 60% chance on mid-mission days)
  const isEmergencyDay = state.currentDay % 2 === 0 || (state.currentDay > 1 && Math.random() < 0.5);
  const alreadyHadEmergencyToday = state.history.some(
    (h) => h.day === state.currentDay && h.type === 'emergency'
  );

  if (isEmergencyDay && !alreadyHadEmergencyToday) {
    const emergency = getRandomEmergency(state);
    newState.currentEmergency = emergency;
    newState.stats.emergenciesEncountered += 1;
  } else {
    // No emergency today, prepare educational fact for day transition
    newState.pendingFact = getEducationalFact(state.missionId);
  }

  return newState;
}

/**
 * Resolves an active emergency challenge based on the cadet's chosen option.
 * @param {Object} state - Current game state
 * @param {string} emergencyId - The ID of the emergency
 * @param {string|number} optionIdOrIndex - The chosen option ID or index
 * @returns {Object} New updated state
 */
export function resolveEmergency(state, emergencyId, optionIdOrIndex) {
  if (state.status !== 'active') return state;

  const emergency = state.currentEmergency || EMERGENCIES.find((e) => e.id === emergencyId);
  if (!emergency) return state;

  let option = null;
  if (typeof optionIdOrIndex === 'number') {
    option = emergency.options[optionIdOrIndex] || emergency.options[0];
  } else {
    option = emergency.options.find((opt) => opt.id === optionIdOrIndex) || emergency.options[0];
  }

  const updatedResources = applyDeltas(state.resources, option.effects);

  const historyEntry = {
    day: state.currentDay,
    type: 'emergency',
    id: emergency.id,
    title: emergency.title,
    chosenOption: option.title,
    effects: option.effects,
    timestamp: Date.now()
  };

  let newState = {
    ...state,
    resources: updatedResources,
    currentEmergency: null, // Clear emergency
    pendingFact: getEducationalFact(state.missionId), // Prepare fact for next transition
    history: [...state.history, historyEntry],
    lastFeedback: {
      type: 'emergency',
      title: `Emergency Resolved: ${option.title}`,
      description: option.feedback,
      effects: option.effects
    },
    stats: {
      ...state.stats,
      emergenciesResolved: state.stats.emergenciesResolved + 1
    }
  };

  // Check if vitals fell to 0
  newState = checkMissionStatus(newState);
  return newState;
}

/**
 * Advances the mission to the next day.
 * Applies natural daily consumption and transitions to the next sol.
 * @param {Object} state - Current game state
 * @returns {Object} New updated state
 */
export function nextDay(state) {
  if (state.status !== 'active') return state;

  // Apply baseline daily resource consumption
  const dailyConsumption = state.mission.dailyConsumption || {
    oxygen: -4,
    water: -4,
    food: -4,
    power: -5,
    health: -1
  };

  const consumedResources = applyDeltas(state.resources, dailyConsumption);

  let nextDayNumber = state.currentDay + 1;

  let newState = {
    ...state,
    resources: consumedResources,
    currentDay: nextDayNumber,
    currentEmergency: null,
    pendingFact: null,
    activeDecision: getDecisionForDay(nextDayNumber)
  };

  // Check if consumption pushed any vital to 0
  newState = checkMissionStatus(newState);

  // If completed, score will be computed
  if (newState.status === 'completed') {
    newState.scoreData = calculateScore(newState);
  }

  return newState;
}

/**
 * Calculates final survival score (0 to 100) and awards astronaut rank.
 * @param {Object} state
 * @returns {Object} Score details and debrief
 */
export function calculateScore(state) {
  const { resources, status, currentDay, totalDays, stats } = state;

  // 1. Resource Health Component (0 to 60 points)
  // Weighted vitals:
  // Oxygen: 25%, Water: 20%, Health: 25%, Power: 15%, Food: 15%
  const resourceScore = (
    (resources.oxygen * 0.25) +
    (resources.water * 0.20) +
    (resources.health * 0.25) +
    (resources.power * 0.15) +
    (resources.food * 0.15)
  ) * 0.60;

  // 2. Mission Survival & Days Component (0 to 25 points)
  const daysRatio = Math.min(currentDay / totalDays, 1);
  let survivalScore = daysRatio * 25;
  if (status === 'completed') {
    survivalScore = 25;
  } else if (status === 'failed') {
    survivalScore = Math.floor(survivalScore * 0.5); // Penalty for failure
  }

  // 3. Emergency Crisis Management Component (0 to 15 points)
  const emergencyScore = Math.min((stats.emergenciesResolved * 5), 15);

  let finalScore = clamp(resourceScore + survivalScore + emergencyScore, 0, 100);

  // Determine Rank and Badge
  let rank = 'Junior Cadet';
  let badgeTitle = 'Spaceflight Trainee';
  let badgeColor = '#94a3b8';
  let lessonLearned = '';

  if (status === 'completed') {
    if (finalScore >= 90) {
      rank = 'Flight Director / Legendary Commander';
      badgeTitle = 'Master Astronaut Gold Wings';
      badgeColor = '#facc15';
      lessonLearned = 'Flawless mission execution! Your mastery over closed-loop life support (ECLSS), power load management, and calm crisis resolution represents NASA astronaut training at its finest.';
    } else if (finalScore >= 75) {
      rank = 'Senior Mission Commander';
      badgeTitle = 'Silver Artemis Wings';
      badgeColor = '#38bdf8';
      lessonLearned = 'Superb command! You effectively balanced resource consumption against unexpected planetary hazards, keeping your crew safe and healthy throughout the duration.';
    } else if (finalScore >= 60) {
      rank = 'Qualified Flight Specialist';
      badgeTitle = 'Bronze Mission Insignia';
      badgeColor = '#c084fc';
      lessonLearned = 'Mission accomplished! While some resources ran perilously low toward the end, your prompt emergency responses preserved crew life and secured mission objectives.';
    } else {
      rank = 'Junior Astronaut Cadet';
      badgeTitle = 'Survival Merit Pin';
      badgeColor = '#34d399';
      lessonLearned = 'You survived the full mission, but resource reserves were pushed to dangerous margins. In future missions, prioritize water conservation and preventative maintenance earlier.';
    }
  } else {
    // Mission failed
    rank = 'Cadet in Training';
    badgeTitle = 'Simulation Debrief Required';
    badgeColor = '#f87171';
    lessonLearned = state.failReason
      ? `${state.failReason} In real space missions, redundant ECLSS backups and conservative resource rationing are vital before emergencies strike.`
      : 'Mission abort! Space is unforgiving. Take this simulation as a crucial stepping stone to refine your resource allocation.';
  }

  return {
    score: finalScore,
    rank,
    badgeTitle,
    badgeColor,
    lessonLearned,
    breakdown: {
      resourceScore: Math.round(resourceScore),
      survivalScore: Math.round(survivalScore),
      emergencyScore: Math.round(emergencyScore)
    }
  };
}
