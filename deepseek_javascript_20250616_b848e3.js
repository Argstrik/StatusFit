// src/utils/achievements.js
import { ACHIEVEMENTS } from '../constants/calisthenicsData';

export const checkNewAchievements = (newMetrics, oldMetrics, newStats, oldStats) => {
  const newAchievements = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    // Check if already unlocked in old data
    const wasUnlocked = oldMetrics 
      ? achievement.condition(oldMetrics, oldStats)
      : false;
      
    // Check if unlocked in new data
    const isUnlocked = achievement.condition(newMetrics, newStats);
    
    // If newly unlocked
    if (isUnlocked && !wasUnlocked) {
      newAchievements.push(achievement.name);
    }
  });
  
  return newAchievements;
};

// Usage in InputMatrix:
const newAchievements = checkNewAchievements(
  metrics, 
  prevMetrics, 
  stats, 
  prevStats
);

if (newAchievements.length > 0) {
  // Show notification to user
}