// src/constants/calisthenicsData.js

// Rarity Colors
export const RARITY_COLORS = {
  common: '#999999',
  rare: '#2ECC71',
  epic: '#3498DB',
  legendary: '#9B59B6',
  mythical: '#F1C40F'
};

// Rarity Badges
export const RARITY_BADGES = {
  common: '●',
  rare: '◆',
  epic: '■',
  legendary: '★',
  mythical: '✦'
};

// Titles for each rarity and dominance
export const TITLES = {
  common: {
    strength: "The Unsung Extra",
    speed: "Early Bird Cameo",
    core: "Background Resilience",
    endurance: "The Persistent Minor Character",
    balanced: "The Unexpected Sidekick"
  },
  rare: {
    strength: "The Foreshadowed Blow",
    speed: "The Glancing Afterimage",
    core: "The Gritty Comeback",
    endurance: "The Arc Survivor",
    balanced: "The Rising Star of the Guild"
  },
  epic: {
    strength: "The Catalyst of Destruction",
    speed: "The Warp in Perception",
    core: "The Unbreakable Narrative Thread",
    endurance: "The Endless Escalation",
    balanced: "The Monarch's Successor"
  },
  legendary: {
    strength: "The World-Ending Page Break",
    speed: "The Plot Twist Sprint",
    core: "The Protagonist's Privilege",
    endurance: "The Endless Side Quest",
    balanced: "The Architect of Destiny"
  },
  mythical: {
    strength: "The Editor's Strike",
    speed: "The Fast-Forward Button",
    core: "The Reroll Immunity",
    endurance: "The Ever-Loading Chapter",
    balanced: "The Plot Device Incarnate"
  }
};

// Constellations for each rarity and dominance
export const CONSTELLATIONS = {
  common: {
    strength: "Rock Lee",
    speed: "Sero Hanta",
    core: "Tanjiro Kamado",
    endurance: "Yuji Itadori",
    balanced: "Mash Burnedead"
  },
  rare: {
    strength: "Guts",
    speed: "Killua Zoldyck",
    core: "Roronoa Zoro",
    endurance: "Izuku Midoriya",
    balanced: "Ken Kaneki"
  },
  epic: {
    strength: "Alex Louis Armstrong",
    speed: "Ichigo Kurosaki",
    core: "Monkey D. Luffy",
    endurance: "Eren Yeager",
    balanced: "Mirio Togata"
  },
  legendary: {
    strength: "Son Goku",
    speed: "Minato Namikaze",
    core: "Vegeta",
    endurance: "All Might",
    balanced: "Yoruichi Shihouin"
  },
  mythical: {
    strength: "Saitama",
    speed: "Kizaru/Borsalino",
    core: "Kaido",
    endurance: "Son Goku (Ultra Instinct)",
    balanced: "Broly"
  }
};

// Achievement definitions
export const ACHIEVEMENTS = [
  { id: 1, name: "A Newbie", condition: () => true },
  { id: 2, name: "Awakened Warrior", condition: (stats) => 
    stats.rank >= 'C' || stats.strength >= 40 || stats.speed >= 40 || stats.core >= 40 || stats.endurance >= 40 
  },
  { id: 3, name: "Transcended Champion", condition: (stats) => 
    stats.rank >= 'S' || stats.strength >= 95 || stats.speed >= 95 || stats.core >= 95 || stats.endurance >= 95 
  },
  { id: 4, name: "Diamond Push-ups Mastery", condition: (metrics) => metrics.diamond_pushups > 0 },
  { id: 5, name: "Archer Push-ups Mastery", condition: (metrics) => metrics.archer_pushups > 0 },
  { id: 6, name: "One-Arm Push-ups Mastery", condition: (metrics) => metrics.one_arm_pushups > 0 },
  { id: 7, name: "Pseudo Planche Push-ups Mastery", condition: (metrics) => metrics.pseudo_planche > 0 },
  { id: 8, name: "Clap Push-ups Mastery", condition: (metrics) => metrics.clap_pushups > 0 },
  { id: 9, name: "Muscle-ups Mastery", condition: (metrics) => metrics.muscle_ups > 0 },
  { id: 10, name: "Ring Muscle-ups Mastery", condition: (metrics) => metrics.ring_muscle_ups > 0 },
  { id: 11, name: "Bar Muscle-ups Mastery", condition: (metrics) => metrics.bar_muscle_ups > 0 },
  { id: 12, name: "Archer Pull-ups Mastery", condition: (metrics) => metrics.archer_pullups > 0 },
  { id: 13, name: "Typewriter Pull-ups Mastery", condition: (metrics) => metrics.typewriter_pullups > 0 },
  { id: 14, name: "One-Arm Pull-ups Mastery", condition: (metrics) => metrics.one_arm_pullups > 0 },
  { id: 15, name: "One-Arm Chin-ups Mastery", condition: (metrics) => metrics.one_arm_chinups > 0 },
  { id: 16, name: "Weighted Pull-ups Mastery", condition: (metrics) => metrics.weighted_pullups > 0 },
  { id: 17, name: "Weighted Dips Mastery", condition: (metrics) => metrics.weighted_dips > 0 },
  { id: 18, name: "Pistol Squats Mastery", condition: (metrics) => metrics.pistol_squats > 0 },
  { id: 19, name: "Sissy Squats Mastery", condition: (metrics) => metrics.sissy_squats > 0 },
  { id: 20, name: "Explosive Squats Mastery", condition: (metrics) => metrics.explosive_squats > 0 },
  { id: 21, name: "Jump Squats Mastery", condition: (metrics) => metrics.jump_squats > 0 },
  { id: 22, name: "Nordic Hamstring Curl Mastery", condition: (metrics) => metrics.nordic_curls > 0 },
  { id: 23, name: "Back Lever Mastery", condition: (metrics) => metrics.back_lever > 0 },
  { id: 24, name: "Front Lever Mastery", condition: (metrics) => metrics.front_lever > 0 },
  { id: 25, name: "Planche Mastery", condition: (metrics) => metrics.planche > 0 },
  { id: 26, name: "Tuck Planche Mastery", condition: (metrics) => metrics.tuck_planche > 0 },
  { id: 27, name: "L-sit Mastery", condition: (metrics) => metrics.l_sit > 0 },
  { id: 28, name: "V-sit Mastery", condition: (metrics) => metrics.v_sit > 0 },
  { id: 29, name: "L-Sit to V-Sit Mastery", condition: (metrics) => metrics.lsit_to_vsit > 0 },
  { id: 30, name: "L-Sit to Handstand Mastery", condition: (metrics) => metrics.lsit_to_handstand > 0 },
  { id: 31, name: "Handstand Push-ups Mastery", condition: (metrics) => metrics.handstand_pushups > 0 },
  { id: 32, name: "Handstand Hold Mastery", condition: (metrics) => metrics.handstand_hold > 0 },
  { id: 33, name: "Handstand Walk Mastery", condition: (metrics) => metrics.handstand_walk > 0 },
  { id: 34, name: "Dragon Flag Mastery", condition: (metrics) => metrics.dragon_flag > 0 },
  { id: 35, name: "Hollow Body Mastery", condition: (metrics) => metrics.hollow_body > 0 },
  { id: 36, name: "Skin-the-Cat Mastery", condition: (metrics) => metrics.skin_the_cat > 0 },
  { id: 37, name: "German Hang Mastery", condition: (metrics) => metrics.german_hang > 0 },
  { id: 38, name: "Back Bridge Mastery", condition: (metrics) => metrics.back_bridge > 0 },
  { id: 39, name: "Human Flag Mastery", condition: (metrics) => metrics.human_flag > 0 },
  { id: 40, name: "Flagpole Hold Mastery", condition: (metrics) => metrics.flagpole_hold > 0 },
  { id: 41, name: "Korean Dips Mastery", condition: (metrics) => metrics.korean_dips > 0 },
  { id: 42, name: "RTO Dips Mastery", condition: (metrics) => metrics.rto_dips > 0 },
  { id: 43, name: "Dips Mastery (weighted)", condition: (metrics) => metrics.weighted_dips > 0 },
  { id: 44, name: "Nordic Curl Mastery", condition: (metrics) => metrics.nordic_curls > 0 },
  { id: 45, name: "Hanging Leg Raise Mastery", condition: (metrics) => metrics.hanging_leg_raise > 0 },
  { id: 46, name: "Hanging Windshield Wipers Mastery", condition: (metrics) => metrics.windshield_wipers > 0 },
  { id: 47, name: "Weighted L-Sit Mastery", condition: (metrics) => metrics.weighted_lsit > 0 },
  { id: 48, name: "Weighted Pull-ups Mastery", condition: (metrics) => metrics.weighted_pullups > 0 },
  { id: 49, name: "Weighted Dips Mastery", condition: (metrics) => metrics.weighted_dips > 0 },
  { id: 50, name: "True Grip Pull-ups Mastery", condition: (metrics) => metrics.true_grip_pullups > 0 }
];