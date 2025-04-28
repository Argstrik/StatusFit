// app.js
// ========================
// ANIMEFIT RPG CORE ENGINE
// ========================

const EXERCISE_DB = {
    // Strength (25 exercises)
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
    "Dragon Press": {type: 'strength', multiplier: 3.8},
    "Iron Cross Hold": {type: 'strength', multiplier: 4.8},
    "Front Lever Pulls": {type: 'strength', multiplier: 3.6},
    "Back Squats": {type: 'strength', multiplier: 2.6},

    // Agility (20 exercises)
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

    // Core (25 exercises)
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

    // Endurance (20 exercises)
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

// Global Variables
let allUsers = JSON.parse(localStorage.getItem('animefitUsers')) || [];
let currentUser = null;
let progressChart = null;

// ========================
// EXERCISE SYSTEM
// ========================

function filterExercises() {
    const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';
    
    Object.keys(EXERCISE_DB).forEach(exercise => {
        if(exercise.toLowerCase().includes(searchTerm)) {
            const exerciseItem = document.createElement('div');
            exerciseItem.className = 'exercise-item';
            exerciseItem.innerHTML = `
                <i class="fas fa-plus-circle"></i> ${exercise}
                <span class="exercise-type ${EXERCISE_DB[exercise].type}">
                    ${EXERCISE_DB[exercise].type.toUpperCase()}
                </span>
            `;
            exerciseItem.onclick = () => addExercise(exercise);
            exerciseList.appendChild(exerciseItem);
        }
    });
}

function addExercise(exerciseName) {
    if(!currentUser?.exercises?.[exerciseName]) {
        const exerciseContainer = document.getElementById('selected-exercises');
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'selected-exercise';
        exerciseDiv.innerHTML = `
            <div class="exercise-name">${exerciseName}</div>
            <input type="number" 
                   min="0"
                   class="exercise-reps"
                   placeholder="Reps"
                   onchange="updateExercise('${exerciseName}', this.value)">
            <button class="remove-btn" onclick="removeExercise('${exerciseName}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        exerciseContainer.appendChild(exerciseDiv);
        
        if(!currentUser) currentUser = {exercises: {}};
        currentUser.exercises[exerciseName] = 0;
    }
}

function updateExercise(exerciseName, reps) {
    if(currentUser) {
        currentUser.exercises[exerciseName] = parseInt(reps) || 0;
        calculateStats();
    }
}

function removeExercise(exerciseName) {
    if(currentUser?.exercises) {
        delete currentUser.exercises[exerciseName];
        document.querySelectorAll('.selected-exercise').forEach(item => {
            if(item.textContent.includes(exerciseName)) item.remove();
        });
        calculateStats();
    }
}

// ========================
// STAT CALCULATION
// ========================

function calculateStats() {
    if(!currentUser) return;
    
    const stats = {strength: 0, agility: 0, core: 0, endurance: 0};
    
    Object.entries(currentUser.exercises).forEach(([exercise, reps]) => {
        const details = EXERCISE_DB[exercise];
        if(details) {
            stats[details.type] += reps * details.multiplier;
        }
    });
    
    // Update UI
    document.getElementById('strength').textContent = Math.round(stats.strength);
    document.getElementById('agility').textContent = Math.round(stats.agility);
    document.getElementById('core').textContent = Math.round(stats.core);
    document.getElementById('endurance').textContent = Math.round(stats.endurance);
    
    currentUser.stats = stats;
    assignConstellation();
    updateLeaderboard();
}

// ========================
// CONSTELLATION SYSTEM
// ========================

function assignConstellation() {
    const maxStatEntry = Object.entries(currentUser.stats).reduce((a, b) => a[1] > b[1] ? a : b);
    const [maxStatType, maxStatValue] = maxStatEntry;
    
    const constellation = CONSTELLATIONS[maxStatType].find(c => maxStatValue >= c.threshold) || {
        name: getDefaultConstellation(maxStatType),
        rarity: 'rare'
    };
    
    currentUser.constellation = constellation;
    updateConstellationDisplay();
}

function getDefaultConstellation(type) {
    const defaults = {
        strength: "Midoriya Izuku",
        agility: "Kakashi Hatake",
        core: "Rock Lee",
        endurance: "Kambei Shimada"
    };
    return defaults[type];
}

function updateConstellationDisplay() {
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
}

// ========================
// PROGRESS TRACKING
// ========================

function initializeProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {label: 'Strength', data: [], borderColor: '#FF6B6B'},
                {label: 'Agility', data: [], borderColor: '#4ECDC4'},
                {label: 'Core', data: [], borderColor: '#45B7D1'},
                {label: 'Endurance', data: [], borderColor: '#96CEB4'}
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {position: 'bottom'},
                title: {display: true, text: 'Monthly Progress'}
            }
        }
    });
}

// ========================
// LEADERBOARD SYSTEM
// ========================

function updateLeaderboard() {
    if(currentUser) {
        currentUser.totalPower = 
            currentUser.stats.strength * 0.4 +
            currentUser.stats.agility * 0.3 +
            currentUser.stats.core * 0.2 +
            currentUser.stats.endurance * 0.1;
        
        if(!allUsers.some(u => u.name === currentUser.name)) {
            allUsers.push(currentUser);
        }
    }

    allUsers.sort((a, b) => b.totalPower - a.totalPower);
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = allUsers.slice(0, 10).map(user => `
        <div class="leaderboard-entry ${user.name === currentUser?.name ? 'current-user' : ''}">
            <div class="rank">#${user.rank}</div>
            <div class="name">${user.name}</div>
            <div class="power">${Math.round(user.totalPower)}</div>
            <div class="constellation rarity-${user.constellation.rarity}">
                ${user.constellation.name}
            </div>
        </div>
    `).join('');
    
    localStorage.setItem('animefitUsers', JSON.stringify(allUsers));
}

// ========================
// USER SYSTEM
// ========================

function signup() {
    const username = document.getElementById('username').value.trim();
    const weight = parseInt(document.getElementById('weight').value);
    
    if(!username || isNaN(weight)) {
        alert("Please enter valid name and weight!");
        return;
    }
    
    currentUser = {
        name: username,
        weight: weight,
        stats: {strength: 0, agility: 0, core: 0, endurance: 0},
        exercises: {},
        constellation: {name: "New Hero", rarity: 'common'},
        joinDate: new Date().toISOString()
    };
    
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('user-name').textContent = username;
    calculateStats();
}

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

// ========================
// INITIALIZATION
// ========================

window.onload = () => {
    initializeProgressChart();
    filterExercises();
    updateLeaderboard();
};
