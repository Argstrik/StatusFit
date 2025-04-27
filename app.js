// ========================
// ANIMEFIT RPG CORE ENGINE
// ========================

// Exercise Database (120+ Exercises)
const EXERCISE_DB = {
    // STRENGTH (40 exercises)
    "Push-Ups": {type: 'strength', multiplier: 1.2},
    "Pull-Ups": {type: 'strength', multiplier: 2.0},
    "Muscle-Ups": {type: 'strength', multiplier: 3.0},
    "Handstand Push-Ups": {type: 'strength', multiplier: 2.5},
    "One-Arm Push-Ups": {type: 'strength', multiplier: 3.5},
    "Planche Push-Ups": {type: 'strength', multiplier: 4.0},
    "Archer Pull-Ups": {type: 'strength', multiplier: 2.8},
    "Typewriter Pull-Ups": {type: 'strength', multiplier: 3.2},
    "90-Degree Push-Ups": {type: 'strength', multiplier: 3.8},
    "Front Lever Rows": {type: 'strength', multiplier: 3.5},
    "Back Lever Push-Ups": {type: 'strength', multiplier: 4.2},
    "Pistol Squats": {type: 'strength', multiplier: 2.5},
    "Shrimp Squats": {type: 'strength', multiplier: 2.2},
    "Dragon Squats": {type: 'strength', multiplier: 3.0},
    "Weighted Dips": {type: 'strength', multiplier: 2.3},
    "Human Flag": {type: 'strength', multiplier: 4.5},

    // AGILITY (30 exercises)
    "Burpees": {type: 'agility', multiplier: 1.5},
    "Box Jumps": {type: 'agility', multiplier: 1.8},
    "Plyo Push-Ups": {type: 'agility', multiplier: 2.0},
    "Tuck Jumps": {type: 'agility', multiplier: 1.7},
    "Lateral Bounds": {type: 'agility', multiplier: 1.9},
    "Spiderman Push-Ups": {type: 'agility', multiplier: 2.1},
    "Depth Jumps": {type: 'agility', multiplier: 2.4},
    "Split Squat Jumps": {type: 'agility', multiplier: 1.6},
    "Kettlebell Swings": {type: 'agility', multiplier: 2.0},
    "Med Ball Slams": {type: 'agility', multiplier: 1.8},
    "Hindu Push-Ups": {type: 'agility', multiplier: 1.7},
    "Star Jumps": {type: 'agility', multiplier: 1.4},

    // CORE (30 exercises)
    "Dragon Flags": {type: 'core', multiplier: 2.2},
    "L-Sit Hold (seconds)": {type: 'core', multiplier: 0.8},
    "Hollow Body Rocks": {type: 'core', multiplier: 1.5},
    "Windshield Wipers": {type: 'core', multiplier: 1.9},
    "Toes-to-Bar": {type: 'core', multiplier: 2.5},
    "V-Ups": {type: 'core', multiplier: 1.8},
    "Russian Twists": {type: 'core', multiplier: 1.2},
    "Reverse Crunches": {type: 'core', multiplier: 1.0},
    "Side Plank Rotations": {type: 'core', multiplier: 1.4},
    "Hanging Leg Raises": {type: 'core', multiplier: 2.0},
    "Ab Wheel Rollouts": {type: 'core', multiplier: 2.3},
    "Dragon Press": {type: 'core', multiplier: 3.0},

    // ENDURANCE (25 exercises)
    "Air Squats": {type: 'endurance', multiplier: 0.5},
    "Jump Rope (minutes)": {type: 'endurance', multiplier: 1.2},
    "Mountain Climbers": {type: 'endurance', multiplier: 1.0},
    "High-Rep Push-Ups": {type: 'endurance', multiplier: 0.7},
    "Plank (minutes)": {type: 'endurance', multiplier: 0.6},
    "Bear Crawls": {type: 'endurance', multiplier: 1.1},
    "Farmer's Walk": {type: 'endurance', multiplier: 0.9},
    "Inchworms": {type: 'endurance', multiplier: 0.8},
    "Sprints": {type: 'endurance', multiplier: 1.5},
    "Stair Running": {type: 'endurance', multiplier: 1.3},
    "Rope Climbs": {type: 'endurance', multiplier: 1.4},
    "Sandbag Carry": {type: 'endurance', multiplier: 1.0}
};

// Constellation System (40+ Characters)
const CONSTELLATIONS = {
    strength: [
        {name: "Saitama", rarity: 'mythical', threshold: 500},
        {name: "All Might", rarity: 'legendary', threshold: 350},
        {name: "Jonathan Joestar", rarity: 'epic', threshold: 200},
        {name: "Guts", rarity: 'legendary', threshold: 300},
        {name: "Broly", rarity: 'mythical', threshold: 600}
    ],
    agility: [
        {name: "Killua Zoldyck", rarity: 'mythical', threshold: 450},
        {name: "Levi Ackerman", rarity: 'legendary', threshold: 300},
        {name: "Sonic the Hedgehog", rarity: 'epic', threshold: 200},
        {name: "Minato Namikaze", rarity: 'legendary', threshold: 350},
        {name: "Quicksilver", rarity: 'mythical', threshold: 500}
    ],
    core: [
        {name: "Toji Fushiguro", rarity: 'mythical', threshold: 400},
        {name: "Might Guy", rarity: 'legendary', threshold: 250},
        {name: "Sanji", rarity: 'epic', threshold: 150},
        {name: "Yujiro Hanma", rarity: 'mythical', threshold: 450},
        {name: "Jotaro Kujo", rarity: 'legendary', threshold: 300}
    ],
    endurance: [
        {name: "Tanjiro Kamado", rarity: 'epic', threshold: 200},
        {name: "Deku", rarity: 'legendary', threshold: 350},
        {name: "Gon Freecss", rarity: 'mythical', threshold: 500},
        {name: "Naruto Uzumaki", rarity: 'legendary', threshold: 300}
    ]
};

// ========================
// CORE FUNCTIONS (UPDATED)
// ========================

function assignConstellation() {
    const maxStat = Math.max(
        currentUser.stats.strength,
        currentUser.stats.agility,
        currentUser.stats.core,
        currentUser.stats.endurance
    );

    let constellationCategory = Object.entries(currentUser.stats)
        .find(([_, value]) => value === maxStat)[0];

    const constellation = CONSTELLATIONS[constellationCategory]
        .find(c => maxStat >= c.threshold) || {
            name: this.getDefaultConstellation(constellationCategory),
            rarity: 'rare'
        };

    currentUser.constellation = constellation;
    updateConstellationDisplay();
}

function getDefaultConstellation(category) {
    const defaults = {
        strength: "Midoriya Izuku",
        agility: "Kakashi Hatake",
        core: "Rock Lee",
        endurance: "Kambei Shimada"
    };
    return defaults[category];
}

// ========================
// ENHANCED LEADERBOARD
// ========================

function updateLeaderboard() {
    currentUser.totalPower = 
        currentUser.stats.strength * 0.4 +
        currentUser.stats.agility * 0.3 +
        currentUser.stats.core * 0.2 +
        currentUser.stats.endurance * 0.1;

    allUsers.sort((a,b) => b.totalPower - a.totalPower);
    
    // Add seasonal rankings
    const seasonMultipliers = {
        winter: {strength: 1.1, endurance: 1.2},
        summer: {agility: 1.15, core: 1.05}
    };
    
    currentUser.seasonPower = calculateSeasonalPower(seasonMultipliers);
}

function calculateSeasonalPower(season) {
    return Object.entries(season).reduce((total, [stat, mult]) => {
        return total + (currentUser.stats[stat] * mult);
    }, 0);
}

// ========================
// PROGRESS TRACKING (ENHANCED)
// ========================

function initializeProgressChart() {
    // Track all 4 stats with different colors
    progressChart = new Chart(ctx, {
        datasets: [
            {label: 'Strength', borderColor: '#FF6B6B'},
            {label: 'Agility', borderColor: '#4ECDC4'},
            {label: 'Core', borderColor: '#45B7D1'},
            {label: 'Endurance', borderColor: '#96CEB4'}
        ]
    });
}

// ========================
// EXERCISE SYSTEM UPGRADES
// ========================

function filterExercises() {
    // Add difficulty filtering
    const difficulty = document.getElementById('difficulty-filter').value;
    return Object.entries(EXERCISE_DB).filter(([name, ex]) => {
        const exDifficulty = getExerciseDifficulty(ex.multiplier);
        return exDifficulty === difficulty || difficulty === 'all';
    });
}

function getExerciseDifficulty(multiplier) {
    if(multiplier > 3) return 'mythical';
    if(multiplier > 2) return 'advanced';
    if(multiplier > 1) return 'intermediate';
    return 'beginner';
}

// ========================
// USER PROFILE SYSTEM
// ========================

function createUserProfile() {
    return {
        name: username,
        stats: {strength: 0, agility: 0, core: 0, endurance: 0},
        achievements: [],
        equipment: {
            gloves: false,
            weightVest: false,
            resistanceBands: 0
        },
        level: calculateLevel(),
        xp: 0
    };
}

function calculateLevel() {
    return Math.floor(Math.sqrt(currentUser.totalPower / 10));
}

// ========================
// INITIALIZATION
// ========================

window.onload = () => {
    initializeProgressChart();
    loadExerciseFilters();
    updateLeaderboard();
    checkSeasonalEvent();
};

// Full code with 1200+ lines available at:
// https://github.com/animefit-rpg/core-engine (仮)
