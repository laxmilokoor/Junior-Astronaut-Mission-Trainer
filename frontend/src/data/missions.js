/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * missions.js: Defines available missions, starting parameters, and educational facts.
 */

export const MISSIONS = [
  {
    id: 'moon',
    name: 'Artemis Lunar Outpost',
    destination: 'The Moon (South Pole - Shackleton Crater)',
    durationDays: 7,
    difficulty: 'Cadet (Moderate)',
    difficultyLevel: 1,
    tagline: 'Establish life support near permanently shadowed ice craters.',
    description: 'Command the Artemis Base Alpha at the Moon’s South Pole. Your mission is to prospect for subsurface water ice while surviving extreme thermal fluctuations and abrasive lunar dust.',
    environment: {
      gravity: '0.166g (1/6 Earth)',
      atmosphere: 'Exosphere / Vacuum',
      avgTemp: '-130°C to +120°C',
      commDelay: '1.3 seconds'
    },
    initialResources: {
      oxygen: 90,
      water: 85,
      food: 85,
      power: 90,
      health: 100
    },
    // Daily background consumption/wear rate
    dailyConsumption: {
      oxygen: -4,
      water: -4,
      food: -4,
      power: -5,
      health: -1
    },
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)'
  },
  {
    id: 'mars',
    name: 'Ares Mars Expedition',
    destination: 'Mars (Jezero Crater)',
    durationDays: 10,
    difficulty: 'Commander (Challenging)',
    difficultyLevel: 2,
    tagline: 'Pioneer the Red Planet through intense dust storms and long supply lines.',
    description: 'Lead humanity’s first crewed outpost on Mars. With communication delays of up to 20 minutes from Earth, you must self-reliantly manage scarce power, recycle water, and safeguard crew biometrics through harsh dust storms.',
    environment: {
      gravity: '0.38g (3/8 Earth)',
      atmosphere: 'Thin CO2 (0.6% Earth pressure)',
      avgTemp: '-63°C (down to -140°C)',
      commDelay: '4 to 20 minutes'
    },
    initialResources: {
      oxygen: 80,
      water: 75,
      food: 80,
      power: 85,
      health: 100
    },
    dailyConsumption: {
      oxygen: -5,
      water: -5,
      food: -5,
      power: -6,
      health: -2
    },
    color: '#fb7185',
    glowColor: 'rgba(251, 113, 133, 0.4)'
  }
];

export const EDUCATIONAL_FACTS = [
  {
    title: 'Lunar Gravity',
    fact: 'The Moon has roughly 1/6th of Earth’s surface gravity. An astronaut weighing 70 kg on Earth weighs only about 11.5 kg on the lunar surface, making jumping effortless but walking tricky!',
    missionRef: 'moon'
  },
  {
    title: 'Martian Sols',
    fact: 'A solar day on Mars is called a "sol" and lasts 24 hours, 39 minutes, and 35 seconds—just slightly longer than an Earth day.',
    missionRef: 'mars'
  },
  {
    title: 'Water Recycling (ECLSS)',
    fact: 'NASA’s Environmental Control and Life Support System (ECLSS) on the ISS recovers over 98% of crew moisture and sweat, turning it into pure drinkable water!',
    missionRef: 'both'
  },
  {
    title: 'Lunar Dust is Razor Sharp',
    fact: 'Because the Moon has no wind or liquid water to erode rock particles, lunar regolith (dust) is jagged like microscopic shards of glass and abrades spacesuit seals rapidly.',
    missionRef: 'moon'
  },
  {
    title: 'Martian Dust Devils',
    fact: 'Mars experiences massive dust storms that can envelope the entire planet for months, cutting solar panel efficiency by more than 70%.',
    missionRef: 'mars'
  },
  {
    title: 'Bone Density & Exercise',
    fact: 'In partial gravity and microgravity, astronauts can lose up to 1% of bone density per month. NASA astronauts train for 2 to 2.5 hours every single day using specialized resistance harnesses.',
    missionRef: 'both'
  },
  {
    title: 'Subsurface Ice Reserves',
    fact: 'Permanently shadowed craters at the Moon’s south pole harbour millions of tons of water ice. Future astronauts can split this water into hydrogen fuel and breathable oxygen!',
    missionRef: 'moon'
  },
  {
    title: 'MOXIE Oxygen Production',
    fact: 'NASA’s Perseverance rover demonstrated MOXIE (Mars Oxygen ISRU Experiment), which successfully split Mars’ atmospheric carbon dioxide into breathable oxygen!',
    missionRef: 'mars'
  },
  {
    title: 'Lava Tubes for Shelter',
    fact: 'Both the Moon and Mars have hollow underground volcanic lava tubes big enough to house whole cities, shielding crews from cosmic radiation and micrometeorites.',
    missionRef: 'both'
  },
  {
    title: 'Spaceflight Psychology',
    fact: 'Astronauts maintain high mission morale through regular sleep schedules, fresh hydroponic greens, communal meals, and team problem-solving drills.',
    missionRef: 'both'
  }
];
