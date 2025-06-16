// src/utils/calculations.js
import { RARITY_COLORS, RARITY_BADGES } from '../constants/calisthenicsData';

export const calculateRank = (strength, core, speed, endurance) => {
  const total = (strength * 0.35) + (core * 0.20) + (speed * 0.25) + (endurance * 0.20);
  const thresholds = [20, 40, 55, 70, 85, 95, 110, 125, 145];
  const ranks = ["F", "E", "D", "C", "B", "A", "S", "SS", "SSS", "SSS+"];
  
  for (let i = 0; i < thresholds.length; i++) {
    if (total < thresholds[i]) return ranks[i];
  }
  return "SSS+";
};

export const determineDominance = (scores) => {
  const max = Math.max(...Object.values(scores));
  const dominant = Object.keys(scores).filter(key => scores[key] === max);
  return dominant.length > 1 ? 'balanced' : dominant[0];
};

export const getRarity = (rank) => {
  if (['F','E'].includes(rank)) return 'common';
  if (['D','C'].includes(rank)) return 'rare';
  if (['B','A'].includes(rank)) return 'epic';
  if (['S','SS'].includes(rank)) return 'legendary';
  return 'mythical';
};

export const calculateStats = (metrics) => {
  // Simplified scoring (real implementation would use physics-based formulas)
  const strength = Math.min(100, 
    (metrics.pushups || 0) * 0.5 + 
    (metrics.pullups || 0) * 1.5 + 
    (metrics.one_arm_pushups || 0) * 5
  );
  
  const core = Math.min(100, 
    (metrics.plank || 0) * 0.1 + 
    (metrics.l_sit || 0) * 0.3 + 
    (metrics.v_sit || 0) * 0.5
  );
  
  const speed = Math.min(100, 
    (metrics.jump_squats || 0) * 0.2 + 
    (metrics.clap_pushups || 0) * 0.4 + 
    (metrics.muscle_ups || 0) * 1.2
  );
  
  const endurance = Math.min(100, 
    (metrics.squats || 0) * 0.1 + 
    (metrics.situps || 0) * 0.1 + 
    (metrics.burpees || 0) * 0.3
  );
  
  const rank = calculateRank(strength, core, speed, endurance);
  const rarity = getRarity(rank);
  const dominance = determineDominance({ strength, core, speed, endurance });
  
  return {
    strength: Math.round(strength),
    core: Math.round(core),
    speed: Math.round(speed),
    endurance: Math.round(endurance),
    total: Math.round((strength * 0.35) + (core * 0.20) + (speed * 0.25) + (endurance * 0.20)),
    rank,
    rarity,
    dominance,
    color: RARITY_COLORS[rarity],
    badge: RARITY_BADGES[rarity]
  };
};