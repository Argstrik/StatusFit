// src/components/InputMatrix.jsx
import { useState } from 'react';
import { calculateStats } from '../utils/calculations';
import { TITLES, CONSTELLATIONS, ACHIEVEMENTS } from '../constants/calisthenicsData';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function InputMatrix({ onStatsCalculated }) {
  const [metrics, setMetrics] = useState({
    // Personal Metrics
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    armSpan: '',
    
    // Performance Metrics
    pushups: '',
    pullups: '',
    squats: '',
    jump_squats: '',
    explosive_squats: '',
    diamond_pushups: '',
    archer_pushups: '',
    plank: '',
    situps: '',
    burpees: '',
    
    // Advanced Metrics
    one_arm_pushups: '',
    pseudo_planche: '',
    clap_pushups: '',
    muscle_ups: '',
    ring_muscle_ups: '',
    bar_muscle_ups: '',
    archer_pullups: '',
    typewriter_pullups: '',
    one_arm_pullups: '',
    one_arm_chinups: '',
    weighted_pullups: '',
    weighted_dips: '',
    pistol_squats: '',
    sissy_squats: '',
    nordic_curls: '',
    back_lever: '',
    front_lever: '',
    planche: '',
    tuck_planche: '',
    l_sit: '',
    v_sit: '',
    lsit_to_vsit: '',
    lsit_to_handstand: '',
    handstand_pushups: '',
    handstand_hold: '',
    handstand_walk: '',
    dragon_flag: '',
    hollow_body: '',
    skin_the_cat: '',
    german_hang: '',
    back_bridge: '',
    human_flag: '',
    flagpole_hold: '',
    korean_dips: '',
    rto_dips: '',
    hanging_leg_raise: '',
    windshield_wipers: '',
    weighted_lsit: '',
    true_grip_pullups: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetrics(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate stats
    const stats = calculateStats(metrics);
    
    // Determine title and constellation
    const title = TITLES[stats.rarity][stats.dominance];
    const constellation = CONSTELLATIONS[stats.rarity][stats.dominance];
    
    // Check achievements
    const unlockedAchievements = ACHIEVEMENTS
      .filter(ach => ach.condition(metrics, stats))
      .map(ach => ach.name);
    
    const userData = {
      ...metrics,
      stats,
      title,
      constellation,
      achievements: unlockedAchievements,
      lastUpdated: new Date()
    };
    
    // Save to Firestore
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), userData);
    }
    
    onStatsCalculated(userData);
  };

  // Render form with all input fields
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <h2 className="text-2xl font-bold col-span-full">Personal Metrics</h2>
      
      <div>
        <label>Name</label>
        <input type="text" name="name" value={metrics.name} onChange={handleChange} />
      </div>
      
      <div>
        <label>Age</label>
        <input type="number" name="age" value={metrics.age} onChange={handleChange} />
      </div>
      
      <div>
        <label>Gender</label>
        <select name="gender" value={metrics.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label>Height (cm)</label>
        <input type="number" name="height" value={metrics.height} onChange={handleChange} />
      </div>
      
      <div>
        <label>Weight (kg)</label>
        <input type="number" name="weight" value={metrics.weight} onChange={handleChange} />
      </div>
      
      <div>
        <label>Arm Span (cm)</label>
        <input type="number" name="armSpan" value={metrics.armSpan} onChange={handleChange} />
      </div>
      
      <h2 className="text-2xl font-bold col-span-full mt-8">Performance Metrics</h2>
      
      {/* Basic Exercises */}
      <div>
        <label>Push-ups</label>
        <input type="number" name="pushups" value={metrics.pushups} onChange={handleChange} />
      </div>
      
      <div>
        <label>Pull-ups</label>
        <input type="number" name="pullups" value={metrics.pullups} onChange={handleChange} />
      </div>
      
      {/* Add all other metrics similarly... */}
      
      <div className="col-span-full mt-8">
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg"
        >
          Calculate My Stats
        </button>
      </div>
    </div>
  );
}