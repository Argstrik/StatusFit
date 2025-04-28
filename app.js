// app.js
const EXERCISE_DB = {
    // Strength Exercises (25)
    "Push-Ups": { type: 'strength', multiplier: 1.2 },
    "Pull-Ups": { type: 'strength', multiplier: 2.0 },
    "Muscle-Ups": { type: 'strength', multiplier: 3.0 },
    "Handstand Push-Ups": { type: 'strength', multiplier: 2.5 },
    "One-Arm Push-Ups": { type: 'strength', multiplier: 3.5 },
    "Planche Push-Ups": { type: 'strength', multiplier: 4.0 },
    "Archer Pull-Ups": { type: 'strength', multiplier: 2.8 },
    "Typewriter Pull-Ups": { type: 'strength', multiplier: 3.2 },
    "90-Degree Push-Ups": { type: 'strength', multiplier: 3.8 },
    "Front Lever Rows": { type: 'strength', multiplier: 3.5 },
    "Back Lever Push-Ups": { type: 'strength', multiplier: 4.2 },
    "Pistol Squats": { type: 'strength', multiplier: 2.5 },
    "Shrimp Squats": { type: 'strength', multiplier: 2.2 },
    "Dragon Squats": { type: 'strength', multiplier: 3.0 },
    "Weighted Dips": { type: 'strength', multiplier: 2.3 },
    "Human Flag": { type: 'strength', multiplier: 4.5 },
    "Dragon Press": { type: 'strength', multiplier: 3.8 },
    "Iron Cross Hold": { type: 'strength', multiplier: 4.8 },
    "Front Lever Pulls": { type: 'strength', multiplier: 3.6 },
    "Back Squats": { type: 'strength', multiplier: 2.6 },

    // Agility Exercises (20)
    "Burpees": { type: 'agility', multiplier: 1.5 },
    "Box Jumps": { type: 'agility', multiplier: 1.8 },
    "Plyo Push-Ups": { type: 'agility', multiplier: 2.0 },
    "Tuck Jumps": { type: 'agility', multiplier: 1.7 },
    "Lateral Bounds": { type: 'agility', multiplier: 1.9 },
    "Spiderman Push-Ups": { type: 'agility', multiplier: 2.1 },
    "Depth Jumps": { type: 'agility', multiplier: 2.4 },
    "Split Squat Jumps": { type: 'agility', multiplier: 1.6 },
    "Kettlebell Swings": { type: 'agility', multiplier: 2.0 },
    "Med Ball Slams": { type: 'agility', multiplier: 1.8 },
    "Hindu Push-Ups": { type: 'agility', multiplier: 1.7 },
    "Star Jumps": { type: 'agility', multiplier: 1.4 },

    // Core Exercises (25)
    "Dragon Flags": { type: 'core', multiplier: 2.2 },
    "L-Sit Hold (seconds)": { type: 'core', multiplier: 0.8 },
    "Hollow Body Rocks": { type: 'core', multiplier: 1.5 },
    "Windshield Wipers": { type: 'core', multiplier: 1.9 },
    "Toes-to-Bar": { type: 'core', multiplier: 2.5 },
    "V-Ups": { type: 'core', multiplier: 1.8 },
    "Russian Twists": { type: 'core', multiplier: 1.2 },
    "Reverse Crunches": { type: 'core', multiplier: 1.0 },
    "Side Plank Rotations": { type: 'core', multiplier: 1.4 },
    "Hanging Leg Raises": { type: 'core', multiplier: 2.0 },
    "Ab Wheel Rollouts": { type: 'core', multiplier: 2.3 },
    "Dragon Press": { type: 'core', multiplier: 3.0 },

    // Endurance Exercises (20)
    "Air Squats": { type: 'endurance', multiplier: 0.5 },
    "Jump Rope (minutes)": { type: 'endurance', multiplier: 1.2 },
    "Mountain Climbers": { type: 'endurance', multiplier: 1.0 },
    "High-Rep Push-Ups": { type: 'endurance', multiplier: 0.7 },
    "Plank (minutes)": { type: 'endurance', multiplier: 0.6 },
    "Bear Crawls": { type: 'endurance', multiplier: 1.1 },
    "Farmer's Walk": { type: 'endurance', multiplier: 0.9 },
    "Inchworms": { type: 'endurance', multiplier: 0.8 },
    "Sprints": { type: 'endurance', multiplier: 1.5 },
    "Stair Running": { type: 'endurance', multiplier: 1.3 },
    "Rope Climbs": { type: 'endurance', multiplier: 1.4 },
    "Sandbag Carry": { type: 'endurance', multiplier: 1.0 }
};

class User {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
        this.stats = {
            strength: 0,
            agility: 0,
            core: 0,
            endurance: 0,
            totalPower: 0
        };
        this.constellation = { name: "New Hero", rarity: "common" };
        this.quests = [];
        this.achievements = [];
        this.history = [];
        this.rank = 0;
        this.level = 1;
        this.xp = 0;
        this.joinDate = new Date().toISOString();
    }

    calculateTotalPower() {
        this.stats.totalPower = Math.round(
            this.stats.strength * 0.4 +
            this.stats.agility * 0.3 +
            this.stats.core * 0.2 +
            this.stats.endurance * 0.1
        );
    }
}

const CONSTELLATIONS = {
    strength: [
        { name: "Common: Midoriya Izuku", rarity: 'common', threshold: 0 },
        { name: "Rare: Jonathan Joestar", rarity: 'rare', threshold: 100 },
        { name: "Epic: All Might", rarity: 'epic', threshold: 250 },
        { name: "Legendary: Saitama", rarity: 'legendary', threshold: 500 },
        { name: "Mythical: Broly", rarity: 'mythical', threshold: 1000 }
    ],
    agility: [
        { name: "Common: Kakashi Hatake", rarity: 'common', threshold: 0 },
        { name: "Rare: Sonic", rarity: 'rare', threshold: 80 },
        { name: "Epic: Levi Ackerman", rarity: 'epic', threshold: 200 },
        { name: "Legendary: Killua Zoldyck", rarity: 'legendary', threshold: 450 },
        { name: "Mythical: Minato Namikaze", rarity: 'mythical', threshold: 800 }
    ],
    core: [
        { name: "Common: Rock Lee", rarity: 'common', threshold: 0 },
        { name: "Rare: Sanji", rarity: 'rare', threshold: 90 },
        { name: "Epic: Might Guy", rarity: 'epic', threshold: 180 },
        { name: "Legendary: Toji Fushiguro", rarity: 'legendary', threshold: 350 },
        { name: "Mythical: Yujiro Hanma", rarity: 'mythical', threshold: 700 }
    ],
    endurance: [
        { name: "Common: Kambei Shimada", rarity: 'common', threshold: 0 },
        { name: "Rare: Tanjiro Kamado", rarity: 'rare', threshold: 120 },
        { name: "Epic: Deku", rarity: 'epic', threshold: 250 },
        { name: "Legendary: Naruto Uzumaki", rarity: 'legendary', threshold: 400 },
        { name: "Mythical: Gon Freecss", rarity: 'mythical', threshold: 650 }
    ]
};

let allUsers = JSON.parse(localStorage.getItem('animefitUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let progressChart = null;

// Core Functions
function saveData() {
    localStorage.setItem('animefitUsers', JSON.stringify(allUsers));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function calculateStats() {
    if (!currentUser) return;

    // Reset stats
    currentUser.stats = { strength: 0, agility: 0, core: 0, endurance: 0, totalPower: 0 };

    // Calculate new stats
    Object.entries(currentUser.exercises).forEach(([exercise, reps]) => {
        const details = EXERCISE_DB[exercise];
        if (details) currentUser.stats[details.type] += reps * details.multiplier;
    });

    // Update derived values
    currentUser.calculateTotalPower();
    assignConstellation();
    updateLeaderboard();
    updateUI();
    saveData();
}

function assignConstellation() {
    const stats = currentUser.stats;
    const maxStat = Math.max(stats.strength, stats.agility, stats.core, stats.endurance);
    const maxStatType = Object.keys(stats).find(key => stats[key] === maxStat);

    currentUser.constellation = CONSTELLATIONS[maxStatType]
        .slice()
        .reverse()
        .find(c => maxStat >= c.threshold) || { name: "New Hero", rarity: "common" };

    updateTheme();
}

// UI Functions
function updateUI() {
    // Update Stats
    document.getElementById('strength').textContent = Math.round(currentUser.stats.strength);
    document.getElementById('agility').textContent = Math.round(currentUser.stats.agility);
    document.getElementById('core').textContent = Math.round(currentUser.stats.core);
    document.getElementById('endurance').textContent = Math.round(currentUser.stats.endurance);
    
    // Update Constellation Display
    const constellationElement = document.getElementById('constellation');
    constellationElement.innerHTML = `
        <i class="fas fa-star"></i> Constellation: 
        <span class="constellation-name rarity-${currentUser.constellation.rarity}">
            ${currentUser.constellation.name}
        </span>
        <div class="rarity-badge rarity-${currentUser.constellation.rarity}">
            ${currentUser.constellation.rarity.toUpperCase()}
        </div>
    `;

    // Update Rank
    document.getElementById('global-rank').textContent = currentUser.rank;
}

function updateTheme() {
    const themes = {
        common: ['#3498db', '#2c3e50'],
        rare: ['#2ecc71', '#27ae60'],
        epic: ['#9b59b6', '#8e44ad'],
        legendary: ['#f1c40f', '#f39c12'],
        mythical: ['#e74c3c', '#c0392b']
    };

    const [primary, secondary] = themes[currentUser.constellation.rarity];
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
}

// Exercise System
function filterExercises() {
    const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';

    Object.entries(EXERCISE_DB).forEach(([name, details]) => {
        if (name.toLowerCase().includes(searchTerm)) {
            const exerciseItem = document.createElement('div');
            exerciseItem.className = 'exercise-item';
            exerciseItem.innerHTML = `
                <i class="fas fa-plus-circle"></i> ${name}
                <span class="exercise-type ${details.type}">
                    ${details.type.toUpperCase()}
                </span>
            `;
            exerciseItem.onclick = () => addExercise(name);
            exerciseList.appendChild(exerciseItem);
        }
    });
}

function addExercise(exerciseName) {
    if (!currentUser.exercises) currentUser.exercises = {};
    if (!currentUser.exercises[exerciseName]) {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'selected-exercise';
        exerciseDiv.innerHTML = `
            <div class="exercise-name">${exerciseName}</div>
            <input type="number" min="0" class="exercise-reps" 
                   placeholder="Reps" onchange="updateExercise('${exerciseName}', this.value)">
            <button class="remove-btn" onclick="removeExercise('${exerciseName}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.getElementById('selected-exercises').appendChild(exerciseDiv);
        currentUser.exercises[exerciseName] = 0;
    }
}

function removeExercise(exerciseName) {
    if (currentUser.exercises[exerciseName]) {
        delete currentUser.exercises[exerciseName];
        document.querySelectorAll('.selected-exercise').forEach(item => {
            if (item.textContent.includes(exerciseName)) item.remove();
        });
        calculateStats();
    }
}

// Quest System
function generateDailyQuests() {
    const weaknesses = Object.entries(currentUser.stats)
        .filter(([k]) => !['totalPower'].includes(k))
        .sort((a, b) => a[1] - b[1]);

    return {
        mainQuest: createQuest('strength', 1.2),
        weaknessQuest: createQuest(weaknesses[0][0], 1.5),
        enduranceQuest: createQuest('endurance', 1.1)
    };
}

function createQuest(type, multiplier) {
    const exercises = Object.keys(EXERCISE_DB).filter(e => EXERCISE_DB[e].type === type);
    return {
        type,
        exercise: exercises[Math.floor(Math.random() * exercises.length)],
        target: Math.round(currentUser.stats[type] * multiplier),
        xp: multiplier * 100,
        completed: false
    };
}

// Leaderboard System
function updateLeaderboard() {
    allUsers.sort((a, b) => b.stats.totalPower - a.stats.totalPower);
    allUsers.forEach((user, index) => user.rank = index + 1);
    
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = allUsers.slice(0, 10).map(user => `
        <div class="leaderboard-entry ${user.name === currentUser.name ? 'current-user' : ''}">
            <div class="rank">#${user.rank}</div>
            <div class="name">${user.name}</div>
            <div class="power">${Math.round(user.stats.totalPower)}</div>
            <div class="constellation rarity-${user.constellation.rarity}">
                ${user.constellation.name}
            </div>
        </div>
    `).join('');
    
    saveData();
}

// Initialization
function initializeProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                { label: 'Strength', data: [], borderColor: '#FF6B6B' },
                { label: 'Agility', data: [], borderColor: '#4ECDC4' },
                { label: 'Core', data: [], borderColor: '#45B7D1' },
                { label: 'Endurance', data: [], borderColor: '#96CEB4' }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Monthly Progress' }
            }
        }
    });
}

function signup() {
    const username = document.getElementById('username').value.trim();
    const weight = parseInt(document.getElementById('weight').value);

    if (!username || isNaN(weight)) {
        alert("Please enter valid name and weight!");
        return;
    }

    currentUser = new User(username, weight);
    allUsers.push(currentUser);
    
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-name').textContent = username;
    
    calculateStats();
    generateDailyQuests();
    saveData();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeProgressChart();
    document.getElementById('exercise-search').addEventListener('input', filterExercises);
    
    if (currentUser) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('user-name').textContent = currentUser.name;
        calculateStats();
        updateUI();
    }
});

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
  }
