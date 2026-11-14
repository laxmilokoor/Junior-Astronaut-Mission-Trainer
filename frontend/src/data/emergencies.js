/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * emergencies.js: Emergency crisis events triggered during the mission.
 * Each emergency presents critical tactical options with clear resource trade-offs.
 */

export const EMERGENCIES = [
  {
    id: 'solar-storm',
    title: 'Severe Solar Particle Event',
    type: 'Radiation',
    severity: 'High',
    icon: 'sun',
    message: 'The Deep Space Climate Observatory detects an intense coronal mass ejection (solar flare) heading directly toward your sector. Dangerous ionizing radiation is incoming in 15 minutes!',
    options: [
      {
        id: 'storm-bunker',
        title: 'Shelter Crew in Storm Haven',
        description: 'Move all astronauts to the heavily shielded interior storm bunker and power down external telemetry.',
        effects: {
          power: -10,
          health: 0,
          oxygen: -4
        },
        feedback: 'Excellent protocol! The water-walled storm bunker blocked 99% of dangerous gamma radiation. Crew vitals remain nominal, though emergency shielding drained battery reserves.'
      },
      {
        id: 'storm-shields',
        title: 'Overcharge Magnetic Deflector Shielding',
        description: 'Divert maximum habitat power to create an active magnetic deflection field around the habitat.',
        effects: {
          power: -25,
          health: -5,
          oxygen: 0
        },
        feedback: 'High-risk maneuver! The magnetic field dispersed the brunt of the ionized particles, but excessive electrical load caused localized circuit burnouts.'
      },
      {
        id: 'storm-rush',
        title: 'Delay Shelter to Secure Exterior Experiments',
        description: 'Send two astronauts in EVA suits to bring sensitive scientific instruments inside before seeking shelter.',
        effects: {
          power: 0,
          health: -25,
          food: +5
        },
        feedback: 'Dangerous mistake! The instruments were salvaged, but the crew suffered elevated radiation exposure and fatigue, requiring immediate medical therapy.'
      }
    ]
  },
  {
    id: 'oxygen-leak',
    title: 'Airlock Micro-Puncture & Pressure Drop',
    type: 'Atmospheric',
    severity: 'Critical',
    icon: 'wind',
    message: 'Habitat barometric pressure is falling rapidly. Telemetry pinpoints a micro-puncture in the secondary airlock seal. Atmospheric gas is venting into space!',
    options: [
      {
        id: 'leak-seal',
        title: 'Deploy Rapid Epoxy Patch & Emergency Sealant',
        description: 'Dispatch an astronaut with quick-curing resin tape to physically seal the breach from inside.',
        effects: {
          oxygen: -10,
          power: -5,
          health: -3
        },
        feedback: 'Patch applied in under 4 minutes! A small amount of O2 was vented during the repair, but the structural integrity of the airlock is restored.'
      },
      {
        id: 'leak-isolate',
        title: 'Bulkhead Depressurization & Compartment Lockdown',
        description: 'Remotely seal the blast doors and vent the secondary airlock to vacuum to prevent structural rupture.',
        effects: {
          oxygen: -18,
          power: 0,
          health: 0
        },
        feedback: 'Calculated decision! The habitat atmosphere was preserved with zero risk of injury to the crew, though all air trapped inside the airlock was lost.'
      },
      {
        id: 'leak-boost',
        title: 'Over-Pressurize With Reserve Oxygen Tanks',
        description: 'Pump high-pressure reserve oxygen into the habitat to compensate while you search for the leak origin.',
        effects: {
          oxygen: -28,
          power: -8,
          health: -10
        },
        feedback: 'Inefficient response! Pumping pure oxygen accelerated the leak rate and depleted precious life support reserves before the puncture could be located.'
      }
    ]
  },
  {
    id: 'rover-breakdown',
    title: 'Exploration Rover Stranded in Crater',
    type: 'Mechanical',
    severity: 'Medium',
    icon: 'truck',
    message: 'While surveying mineral deposits 4 kilometers from base, the pressurized exploration rover suffered a drive-train shear and dead lithium battery pack.',
    options: [
      {
        id: 'rover-rescue',
        title: 'Launch Auxiliary Tug & Tow Vehicle',
        description: 'Deploy the automated battery recharge drone and tow the rover back to the base maintenance hangar.',
        effects: {
          power: -15,
          water: -5,
          health: +5
        },
        feedback: 'Successful recovery! The rover was safely returned. The energy expenditure was significant, but the crew stayed safe and morale surged.'
      },
      {
        id: 'rover-walk',
        title: 'Crew Trek Back on Suit Life Support',
        description: 'Instruct the two astronauts to tether together and hike back to base on spacesuit reserves, leaving the rover.',
        effects: {
          oxygen: -12,
          water: -10,
          health: -15,
          power: 0
        },
        feedback: 'Arduous trek! The astronauts made it back safely, but suit carbon dioxide scrubbers were pushed to the limit, causing exhaustion and dehydration.'
      },
      {
        id: 'rover-solar',
        title: 'Deploy Deployable Solar Wings on Site',
        description: 'Remotely deploy solar awnings to slowly trickle charge the rover battery until it can limp home.',
        effects: {
          power: +5,
          water: -5,
          food: -5,
          health: -5
        },
        feedback: 'Patience paid off! It took 8 hours of waiting in thermal blankets, but the rover recharged enough power to drive itself home.'
      }
    ]
  },
  {
    id: 'meteor-shower',
    title: 'High-Velocity Micrometeorite Swarm',
    type: 'External Hazard',
    severity: 'High',
    icon: 'zap',
    message: 'Orbital radar detects an unexpected stream of high-velocity cometary micrometeorites crossing your landing zone. Multiple impacts detected on external solar arrays!',
    options: [
      {
        id: 'meteor-retract',
        title: 'Retract Solar Panels & Activate Whipple Shields',
        description: 'Fold sensitive photovoltaic wings into armored protective sleeves and switch base to auxiliary batteries.',
        effects: {
          power: -12,
          oxygen: 0,
          health: 0
        },
        feedback: 'Smart engineering! Retracting the solar panels prevented severe debris punctures. Whipple shielding absorbed the impacts with zero hull breaches.'
      },
      {
        id: 'meteor-angle',
        title: 'Tilt Solar Arrays Edge-On to Particle Vector',
        description: 'Rotate the arrays 90 degrees edge-on to minimize their frontal cross-section while maintaining partial power generation.',
        effects: {
          power: -5,
          health: -4
        },
        feedback: 'Clever geometry! Minimal solar surface was exposed to the debris stream. Only minor pitting was recorded, saving precious battery energy.'
      },
      {
        id: 'meteor-ignore',
        title: 'Maintain Full Solar Generation & Gamble on Trajectory',
        description: 'Keep arrays fully extended in hopes that the majority of particles will disintegrate in high orbit.',
        effects: {
          power: -30,
          oxygen: -5,
          health: -12
        },
        feedback: 'Disastrous gamble! Multiple hypervelocity particles shattered three primary photovoltaic cells and triggered a short-circuit surge through the habitat.'
      }
    ]
  },
  {
    id: 'power-failure',
    title: 'Main Grid Inverter Cascade Failure',
    type: 'Electrical',
    severity: 'Critical',
    icon: 'battery-alert',
    message: 'An electrical arc has tripped the central power distribution bus. Internal lighting flickers off, oxygen scrubbers halt, and base heating begins to plummet!',
    options: [
      {
        id: 'power-subsystems',
        title: 'Reroute Power via Secondary Fuel Cell Grid',
        description: 'Manually throw breaker switches to isolate the damaged bus and run critical life support on hydrogen fuel cells.',
        effects: {
          power: -10,
          water: +6,
          oxygen: -4
        },
        feedback: 'Great systems thinking! Fuel cells restored life support. As a bonus, the hydrogen fuel reaction generated clean drinkable byproduct water!'
      },
      {
        id: 'power-shedding',
        title: 'Implement Emergency Deep Load Shedding',
        description: 'Shut off all science labs, climate control, and non-essential computers; route all residual juice exclusively to O2 generators.',
        effects: {
          power: -5,
          health: -12,
          oxygen: +4
        },
        feedback: 'Life support stayed online! However, habitat internal temperatures dropped near freezing (+4°C), leaving the crew shivering and fatigued.'
      },
      {
        id: 'power-jump',
        title: 'Hotwire High-Voltage Bypass Circuit',
        description: 'Attempt an unscheduled manual bypass of the damaged transformer bus with heavy copper jumpers.',
        effects: {
          power: -20,
          health: -20,
          oxygen: -8
        },
        feedback: 'Dangerous arc flash! The technician suffered minor burns from high-amperage sparks, and the transient voltage spike blew two backup capacitors.'
      }
    ]
  },
  {
    id: 'water-contamination',
    title: 'ECLSS Water Recycling Bio-Filter Anomaly',
    type: 'Life Support',
    severity: 'High',
    icon: 'droplet',
    message: 'Sensors in the Environmental Control and Life Support System (ECLSS) detect microbial bacterial growth in the secondary water purification loop. Drinkable water reserves are at risk!',
    options: [
      {
        id: 'water-uv',
        title: 'Execute High-Heat UV-C Flash Sterilization',
        description: 'Superheat the filtration loop to 95°C and cycle high-intensity ultraviolet-C sterilizers for 3 hours.',
        effects: {
          power: -15,
          water: -4,
          health: 0
        },
        feedback: 'Purity restored! The thermal flash and UV-C radiation completely eradicated the bacterial biofilm. Water quality is once again 100% NASA potable.'
      },
      {
        id: 'water-iodine',
        title: 'Flush Secondary Lines with Biocidal Iodine',
        description: 'Inject chemical iodine microbial agents and flush contaminated filters into emergency storage.',
        effects: {
          water: -14,
          power: -2,
          health: -3
        },
        feedback: 'Microbes neutralized, but purging the contaminated lines dumped 14% of base water. The crew also noted a strong chemical iodine aftertaste.'
      },
      {
        id: 'water-ration',
        title: 'Ration Unfiltered Water Through Emergency Straws',
        description: 'Shut down the purifier and drink directly through portable silver-mesh filtration straws to conserve power.',
        effects: {
          water: -6,
          power: 0,
          health: -22
        },
        feedback: 'Severe medical issue! Portable straws failed to filter sub-micron endotoxins. Two crew members developed gastrointestinal distress and fever.'
      }
    ]
  },
  {
    id: 'hydroponics-blight',
    title: 'Hydroponic Greenhouse Nutrient Pump Failure',
    type: 'Agriculture',
    severity: 'Medium',
    icon: 'leaf',
    message: 'The aeroponic nutrient delivery pump has seized. Fresh space crops (lettuce, radishes, and dwarf wheat) are wilting rapidly in the low-pressure chamber.',
    options: [
      {
        id: 'crops-hand',
        title: 'Manual Irrigation & Nutrient Misting Shift',
        description: 'Organize a continuous 6-hour crew shift to hand-mist crop roots with nutrient solution until parts are replaced.',
        effects: {
          food: +8,
          water: -6,
          health: -8
        },
        feedback: 'Harvest saved! Hand-misting preserved 95% of the crop yield. Fresh greens provided crucial vitamins, though the crew is exhausted from the shift.'
      },
      {
        id: 'crops-repurpose',
        title: 'Repurpose Cooling Fluid Pump for Agriculture',
        description: 'Cannibalize an auxiliary heat-exchanger pump to automate crop feeding.',
        effects: {
          food: +10,
          power: -8,
          health: 0
        },
        feedback: 'MacGyver-level engineering! The repurposed impeller pump fit the hydroponic plumbing flawlessly. Crops are thriving with crisp yields.'
      },
      {
        id: 'crops-compost',
        title: 'Jettison Wilted Plants & Rely on Dried Rations',
        description: 'Cut losses, compost dying vegetation, and transition crew entirely to packaged MRE space rations.',
        effects: {
          food: -15,
          water: +4,
          health: -6
        },
        feedback: 'Safe but demoralizing! Throwing out the crops wasted weeks of agricultural effort. Crew morale dipped from having to eat dehydrated pastes.'
      }
    ]
  },
  {
    id: 'dust-storm',
    title: 'Electrostatic Dust Vortex Engulfs Outpost',
    type: 'Environmental',
    severity: 'High',
    icon: 'cloud-lightning',
    message: 'A towering localized dust vortex carrying high electrostatic charge sweeps over the outpost, coating optical sensors and solar panels in sticky dielectric dust.',
    options: [
      {
        id: 'dust-piezo',
        title: 'Pulse Ultrasonic Vibrator Transducers',
        description: 'Trigger acoustic transducers mounted on solar array glass to shake off dust using resonant vibrations.',
        effects: {
          power: -8,
          health: 0,
          oxygen: 0
        },
        feedback: 'Vibrational clearing successful! Over 80% of dust was flung off the panels without requiring any dangerous spacewalks in the tempest.'
      },
      {
        id: 'dust-ground',
        title: 'Ground Base Antennas & Wait Out Vortex',
        description: 'Deploy copper grounding rods to bleed off static charge and hold position indoors until the storm clears.',
        effects: {
          power: -16,
          oxygen: -4,
          health: +2
        },
        feedback: 'Cautious and safe! The grounding network prevented electronic arcing. Solar output dropped temporarily, but equipment and crew were uninjured.'
      },
      {
        id: 'dust-manual',
        title: 'Deploy EVA Crew to Squeegee Solar Arrays',
        description: 'Send two astronauts outside with anti-static microfiber sweeps to scrub panels during high winds.',
        effects: {
          power: +10,
          health: -24,
          oxygen: -8
        },
        feedback: 'Near disaster! Violent electrostatic discharges struck suit telemetry. Lunar/Martian grit scratched helmet visors and caused serious suit abrasions.'
      }
    ]
  },
  {
    id: 'thermal-failure',
    title: 'Radiator Ammonia Coolant Leak',
    type: 'Thermal Control',
    severity: 'High',
    icon: 'thermometer',
    message: 'Telemetry detects pressure drop in Loop A of the external thermal radiator. Without ammonia coolant circulation, base electronic racks will overheat within hours!',
    options: [
      {
        id: 'thermal-loop-b',
        title: 'Isolate Loop A & Overdrive Backup Loop B',
        description: 'Close isolation valves on the ruptured segment and pump secondary coolant at maximum flow rate.',
        effects: {
          power: -12,
          oxygen: 0,
          health: -2
        },
        feedback: 'Nominal temperatures restored! Backup Loop B compensated for heat dissipation. Base electronics cooled down before any chip thermal throttles tripped.'
      },
      {
        id: 'thermal-passive',
        title: 'Angle Shaded Radiator Panels into Deep Space',
        description: 'Reorient the habitat attitude so external radiators point directly into 3-Kelvin cosmic darkness for passive radiative cooling.',
        effects: {
          power: -5,
          health: +4
        },
        feedback: 'Ingenious astrophysics solution! Using the extreme cold of outer space as a passive heat sink saved base hardware without burning excess pump power.'
      },
      {
        id: 'thermal-delay',
        title: 'Vent Internal Air into Plenum to Dissipate Heat',
        description: 'Blow chilled internal cabin air across the electronic server racks to dump heat into the living quarters.',
        effects: {
          oxygen: -15,
          power: -8,
          health: -14
        },
        feedback: 'Dangerous thermal runaway! Living quarters rose to an unbearable 39°C (102°F) with high humidity, exhausting crew and wasting air conditioning capacity.'
      }
    ]
  }
];
