// User Data & AI Constellation Logic
let user = {
    name: "",
    weight: 50,
    strength: 0,
    endurance: 0,
    agility: 0,
    constellation: "",
    rarity: "Common",
    history: []
};

// AI Constellation Assignment
function assignConstellation() {
    const stats = [user.strength, user.endurance, user.agility];
    const maxStat = Math.max(...stats);
    const constellations = {
        strength: ["All Might (Legendary)", "Toji Fushiguro (Epic)", "Saitama (Rare)"],
        endurance: ["Midoriya Izuku (Epic)", "Jonathan Joestar (Rare)", "Rock Lee (Common)"],
        agility: ["Killua Zoldyck (Epic)", "Levi Ackerman (Legendary)", "Sung Jin-Woo (Mythical)"]
    };

    let type;
    if (maxStat === user.strength) type = "strength";
    else if (maxStat === user.endurance) type = "endurance";
    else type = "agility";

    if (maxStat < 20) user.rarity = "Common";
    else if (maxStat < 50) user.rarity = "Rare";
    else if (maxStat < 100) user.rarity = "Epic";
    else if (maxStat < 200) user.rarity = "Legendary";
    else user.rarity = "Mythical";

    user.constellation = constellations[type][Math.floor(Math.random() * 3)];
    updateUI();
}

// Leaderboard (Simulated)
const leaderboard = [
    { name: "Saitama", strength: 9999, rarity: "Mythical" },
    { name: "Goku", strength: 8500, rarity: "Legendary" }
];

// Initialize Chart
let progressChart;
function initChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Strength',
                data: user.history,
                borderColor: '#FFA500',
                tension: 0.4
            }]
        }
    });
}

// Update Stats
function updateStats(exercise, reps) {
    switch(exercise) {
        case 'pushups': user.strength += reps; break;
        case 'squats': user.endurance += reps; break;
        case 'jumpsquats': user.agility += reps; break;
    }
    user.history.push(user.strength);
    assignConstellation();
    localStorage.setItem('user', JSON.stringify(user));
    updateUI();
}

// Signup
function signup() {
    user.name = document.getElementById('username').value;
    user.weight = document.getElementById('weight').value;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    localStorage.setItem('user', JSON.stringify(user));
    generateQuests();
    initChart();
    updateLeaderboard();
}

// Generate Quests
function generateQuests() {
    const quests = [
        { title: "20 Push-Ups", action: () => updateStats('pushups', 20), reward: "💪 +20 Strength" },
        { title: "30 Squats", action: () => updateStats('squats', 30), reward: "🏃 +30 Endurance" },
        { title: "15 Jump Squats", action: () => updateStats('jumpsquats', 15), reward: "⚡ +15 Agility" }
    ];

    const questList = document.getElementById('quest-list');
    questList.innerHTML = quests.map(quest => `
        <div class="stat-box">
            <h3>${quest.title}</h3>
            <p>${quest.reward}</p>
            <button onclick="${quest.action.toString().replace('function () ', '')}">Complete</button>
        </div>
    `).join('');
}

// Leaderboard
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = leaderboard.concat(user)
        .sort((a, b) => b.strength - a.strength)
        .map((u, i) => `
            <div class="stat-box">
                <h3>${i + 1}. ${u.name}</h3>
                <p>Strength: ${u.strength} <span class="rarity-${u.rarity.toLowerCase()}">${u.rarity}</span></p>
            </div>
        `).join('');
}

// Tab Navigation
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Load User
window.onload = () => {
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        generateQuests();
        initChart();
        updateLeaderboard();
    }
};
