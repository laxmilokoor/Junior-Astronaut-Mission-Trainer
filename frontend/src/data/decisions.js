/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * decisions.js: Daily tactical decision dilemmas.
 * Each decision contains 3 tactical options with visible resource trade-offs.
 */

export const DECISIONS = [
  {
    id: 'decision-life-support',
    dayTitle: 'Life Support & Atmospheric Tuning',
    category: 'Life Support',
    description: 'Mission Control updates your atmospheric targets. Cabin humidity is rising slightly, and the CO2 scrubbers require maintenance scheduling.',
    options: [
      {
        id: 'opt-ls-boost',
        title: 'Overdrive Electrolyzer & Water Splitter',
        description: 'Split reserve water to boost cabin oxygen saturation and flush trace gases.',
        effects: {
          oxygen: +14,
          water: -10,
          power: -10,
          health: +4,
          food: 0
        },
        feedback: 'Oxygen levels surged to optimal peak! The crew reports higher energy and alertness, though water reserves and battery power took a noticeable hit.'
      },
      {
        id: 'opt-ls-balanced',
        title: 'Maintain Standard ECLSS Baseline',
        description: 'Keep scrubbers running at default cruise specifications without adjusting output.',
        effects: {
          oxygen: +2,
          water: -2,
          power: -4,
          health: 0,
          food: 0
        },
        feedback: 'Standard protocols held stable. Life support parameters remain within nominal mission envelopes.'
      },
      {
        id: 'opt-ls-conserve',
        title: 'Activate Low-Power Passive Absorption',
        description: 'Throttle electric blowers and rely on passive lithium hydroxide chemical canisters to save electricity.',
        effects: {
          oxygen: -6,
          water: 0,
          power: +10,
          health: -6,
          food: 0
        },
        feedback: 'Conserved significant electrical power! However, mild CO2 accumulation caused mild morning headaches for the crew.'
      }
    ]
  },
  {
    id: 'decision-solar-cleaning',
    dayTitle: 'Photovoltaic Solar Array Efficiency',
    category: 'Power Grid',
    description: 'Fine electrostatic regolith dust has settled over the outer wings of the solar panel array, reducing charging efficiency by 18%.',
    options: [
      {
        id: 'opt-solar-eva',
        title: 'Conduct Spacewalk (EVA) Array Polish',
        description: 'Send two astronauts on a 3-hour EVA with ion-repelling brushes to physically scrub the photovoltaic glass.',
        effects: {
          power: +22,
          oxygen: -8,
          health: -6,
          water: -4,
          food: -2
        },
        feedback: 'Pristine solar wings! Solar array capture is back up to 100% capacity. The crew is tired from wrestling with stiff spacesuits, but power is abundant.'
      },
      {
        id: 'opt-solar-sonic',
        title: 'Run High-Frequency Ultrasonic Shake',
        description: 'Activate piezoelectric buzzers installed in the panel frames to shake off loose particulate dust.',
        effects: {
          power: +12,
          oxygen: 0,
          health: 0,
          water: 0,
          food: 0
        },
        feedback: 'Clean and automated! The acoustic waves cleared over 60% of the surface dust without risking any crew members outside.'
      },
      {
        id: 'opt-solar-defer',
        title: 'Defer Cleaning & Re-Angle Panel Gimbal',
        description: 'Tilt panels toward peak orbital sun angles and rely on existing surface coatings.',
        effects: {
          power: -6,
          oxygen: 0,
          health: +2,
          water: 0,
          food: 0
        },
        feedback: 'No resources spent, but dust continues to accumulate slowly. Solar efficiency remains degraded.'
      }
    ]
  },
  {
    id: 'decision-water-recycling',
    dayTitle: 'Water Reclamation & Greywater Distillation',
    category: 'Resource Recycling',
    description: 'The vapor compression distillation assembly is scheduled for filter media backwash. How should the crew manage water filtration today?',
    options: [
      {
        id: 'opt-water-overdrive',
        title: 'High-Temperature Deep Distillation Cycle',
        description: 'Power up auxiliary boiler elements to recover 99% of wastewater, including laundry and wash runoff.',
        effects: {
          water: +16,
          power: -12,
          oxygen: 0,
          health: +2,
          food: 0
        },
        feedback: 'Excellent hydration reserve! Water storage tanks refilled to safe levels, although the thermal boiler pulled heavy amperage from the batteries.'
      },
      {
        id: 'opt-water-strict',
        title: 'Enforce Strict Water Rationing Protocol',
        description: 'Cap personal hydration strictly at 1.8 liters per astronaut and ban sponge baths today.',
        effects: {
          water: +6,
          power: 0,
          health: -8,
          oxygen: 0,
          food: -2
        },
        feedback: 'Water was successfully banked, but dehydration and skin discomfort caused crew fatigue and lowered moral.'
      },
      {
        id: 'opt-water-balanced',
        title: 'Continuous Low-Flow Filtration',
        description: 'Run standard catalytic oxidizers and micro-filtration at steady, economical speeds.',
        effects: {
          water: +4,
          power: -4,
          health: 0,
          oxygen: 0,
          food: 0
        },
        feedback: 'Balanced operation. Moderate water generation achieved with steady power consumption.'
      }
    ]
  },
  {
    id: 'decision-nutrition-exercise',
    dayTitle: 'Crew Nutrition & Conditioning Drill',
    category: 'Crew Biometrics',
    description: 'Biometric telemetry indicates minor muscular atrophy in the lower limbs and slight caloric deficits. How should the daily routine be structured?',
    options: [
      {
        id: 'opt-nutri-feast',
        title: 'High-Protein Hot Meal & Double Resistance Workout',
        description: 'Prepare warm freeze-dried chili and conduct 2.5 hours on the advanced resistive exercise device (ARED).',
        effects: {
          health: +14,
          food: -8,
          water: -8,
          power: -4,
          oxygen: -4
        },
        feedback: 'Outstanding physical condition! Crew bone stress markers improved and mood is triumphant, though metabolic consumption of food and water was higher.'
      },
      {
        id: 'opt-nutri-ration',
        title: 'Strict Caloric Rationing & Light Calisthenics',
        description: 'Keep meals to base nutrient cubes and conduct light stretches to conserve pantry inventory.',
        effects: {
          food: +6,
          water: +2,
          health: -8,
          power: +2,
          oxygen: 0
        },
        feedback: 'Food reserves protected! However, reduced caloric intake caused sluggishness and mild loss of lean muscle mass.'
      },
      {
        id: 'opt-nutri-vr',
        title: 'Balanced Meals & Virtual Reality Relaxation',
        description: 'Standard meal packs paired with 1 hour of VR Earth relaxation simulations to relieve psychological stress.',
        effects: {
          health: +8,
          food: -4,
          water: -4,
          power: -2,
          oxygen: -2
        },
        feedback: 'Great mental reset! The crew enjoyed peaceful VR strolls through Earth forests, boosting psychological resilience.'
      }
    ]
  },
  {
    id: 'decision-hydroponics',
    dayTitle: 'Hydroponics & Fresh Crop Cultivation',
    category: 'Agriculture',
    description: 'The automated greenhouse module has a batch of fresh micro-greens and dwarf wheat ready for nutrient adjustment or harvest.',
    options: [
      {
        id: 'opt-hydro-harvest',
        title: 'Harvest Greens & Re-seed Growth Trays',
        description: 'Harvest fresh crisp greens for the crew and prepare high-yield seed beds with fresh nutrient water.',
        effects: {
          food: +16,
          oxygen: +4,
          water: -8,
          power: -6,
          health: +6
        },
        feedback: 'Superb harvest! Fresh space vegetables provided essential vitamin C and crisp crunch, revitalizing crew health and generating fresh oxygen.'
      },
      {
        id: 'opt-hydro-boost-led',
        title: 'Overdrive Specialized Red/Blue LED Spectrum',
        description: 'Accelerate vegetative growth by running continuous high-intensity photosynthetically active radiation.',
        effects: {
          food: +8,
          oxygen: +8,
          power: -12,
          water: -6,
          health: 0
        },
        feedback: 'Vigorous plant growth! The greenhouse acted as a biological carbon scrubber, producing fresh oxygen at the cost of power.'
      },
      {
        id: 'opt-hydro-dark',
        title: 'Put Greenhouse in Dark Rest Cycle',
        description: 'Turn off supplemental plant lighting to conserve grid battery capacity.',
        effects: {
          power: +10,
          food: -4,
          oxygen: -2,
          health: 0,
          water: +2
        },
        feedback: 'Conserved precious kilowatt-hours for base systems. Crop growth was paused for the sol.'
      }
    ]
  },
  {
    id: 'decision-subsurface-drilling',
    dayTitle: 'Subsurface Exploration & ISRU Extraction',
    category: 'Science & ISRU',
    description: 'The automated ISRU (In-Situ Resource Utilization) drill rig has reached a 3-meter deep stratum with high signatures of bound water ice.',
    options: [
      {
        id: 'opt-drill-full',
        title: 'Deep Core Extraction & Thermal Extraction',
        description: 'Fire up the microwave sublimation thermal core to melt and vaporize subsurface ice directly into storage tanks.',
        effects: {
          water: +20,
          oxygen: +6,
          power: -16,
          health: -4,
          food: 0
        },
        feedback: 'Remarkable discovery! The thermal extraction unlocked 20% water from pristine buried ice, also venting oxygen that was captured by base tanks.'
      },
      {
        id: 'opt-drill-conservative',
        title: 'Mechanical Auger Extraction & Sifting',
        description: 'Use the low-power mechanical auger to chip dry regolith samples for laboratory study.',
        effects: {
          water: +8,
          power: -6,
          health: 0,
          oxygen: 0,
          food: 0
        },
        feedback: 'Steady scientific progress! Modest ice yields recovered with safe, sustainable energy usage.'
      },
      {
        id: 'opt-drill-secure',
        title: 'Standby Drill Rig & Reallocate Energy to Batteries',
        description: 'Park the rover drill to avoid overheating mechanical gears in the vacuum.',
        effects: {
          power: +8,
          water: 0,
          health: +2,
          oxygen: 0,
          food: 0
        },
        feedback: 'Equipment wear prevented and batteries kept fully charged for the upcoming night cycle.'
      }
    ]
  },
  {
    id: 'decision-thermal-management',
    dayTitle: 'Thermal Loop Balance & Habitation Heating',
    category: 'Habitat Systems',
    description: 'The outpost is entering an extreme thermal phase with external temperatures dropping to -110°C.',
    options: [
      {
        id: 'opt-therm-resist',
        title: 'Power Up Supplementary Resistive Heaters',
        description: 'Warm the sleeping pods and equipment bays to comfortable room temperatures (22°C).',
        effects: {
          health: +10,
          power: -14,
          oxygen: 0,
          water: 0,
          food: -2
        },
        feedback: 'Restful sleep achieved! Crew awakened refreshed and warm, boosting immune health, despite high heater power usage.'
      },
      {
        id: 'opt-therm-blanket',
        title: 'Deploy Multi-Layer Thermal Blankets',
        description: 'Wrap sensitive electronics in aerogel insulation blankets and lower cabin thermostat to 16°C.',
        effects: {
          power: +4,
          health: -4,
          oxygen: 0,
          water: 0,
          food: 0
        },
        feedback: 'Smart power conservation! Crew wore thermal fleece layers. Systems remained operational without excessive battery drain.'
      },
      {
        id: 'opt-therm-waste',
        title: 'Reroute Server Waste Heat to Quarters',
        description: 'Run cooling fans across the central computer cores to blow exhaust heat into the bunkrooms.',
        effects: {
          power: -4,
          health: +6,
          oxygen: 0,
          water: 0,
          food: 0
        },
        feedback: 'Great thermodynamic optimization! Recycled computer heat provided cozy quarters with minimal extra power.'
      }
    ]
  },
  {
    id: 'decision-communications',
    dayTitle: 'Deep Space Network Antenna Alignment',
    category: 'Communications',
    description: 'A scheduled orbital downlink pass with NASA’s Deep Space Network is approaching to transmit research data to Earth.',
    options: [
      {
        id: 'opt-comm-high',
        title: 'Overdrive High-Gain X-Band Transmitter',
        description: 'Pump high power into the dish to transmit 4K geological imagery and receive family messages.',
        effects: {
          power: -10,
          health: +10,
          food: 0,
          water: 0,
          oxygen: 0
        },
        feedback: 'Data successfully downlinked! Uplinked video messages from family and flight directors sent crew morale soaring.'
      },
      {
        id: 'opt-comm-burst',
        title: 'Compressed Low-Power Telemetry Burst',
        description: 'Compress scientific data into a brief 60-second burst to conserve energy.',
        effects: {
          power: -2,
          health: +2,
          food: 0,
          water: 0,
          oxygen: 0
        },
        feedback: 'Efficient transmission! Mission Control confirmed telemetry receipt with minimal electrical footprint.'
      },
      {
        id: 'opt-comm-silence',
        title: 'Radio Silence & Local Data Cache',
        description: 'Store telemetry on solid-state drives and skip transmission until the next orbital window.',
        effects: {
          power: +6,
          health: -4,
          food: 0,
          water: 0,
          oxygen: 0
        },
        feedback: 'Power saved! However, lack of real-time confirmation from Earth caused slight uneasiness among the crew.'
      }
    ]
  }
];
