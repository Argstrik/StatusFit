// src/components/StatusWindow.jsx
import { TITLES, CONSTELLATIONS, RARITY_BADGES } from '../constants/calisthenicsData';

export default function StatusWindow({ userData }) {
  const { name, stats, title, constellation, achievements } = userData;
  const { color, badge, rank, rarity, dominance } = stats;
  
  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 shadow-xl" 
         style={{ border: `3px solid ${color}` }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Constellation Panel */}
        <div className="text-center p-4 rounded-lg bg-gray-800">
          <div className="text-xl font-bold mb-2">{constellation}</div>
          <div className="text-lg mb-4" style={{ color }}>
            {rarity.toUpperCase()} {badge}
          </div>
          <div className="h-40 flex items-center justify-center bg-gray-700 rounded-lg">
            <div className="text-5xl opacity-50">⭐</div>
          </div>
          <div className="mt-4 italic opacity-75">
            "Character quote would go here"
          </div>
        </div>
        
        {/* Stats Panel */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <h2 className="text-xl" style={{ color }}>"{title}"</h2>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Rank</div>
              <div className="text-4xl font-bold" style={{ color }}>{rank}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-lg">PILLARS OF POWER</h3>
            <div className="grid grid-cols-2 gap-4">
              <PillarStat name="Strength" value={stats.strength} color={color} />
              <PillarStat name="Speed" value={stats.speed} color={color} />
              <PillarStat name="Core" value={stats.core} color={color} />
              <PillarStat name="Endurance" value={stats.endurance} color={color} />
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">DOMINANT: 
              <span className="ml-2 uppercase" style={{ color }}>{dominance}</span>
            </h3>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-lg">
              ACHIEVEMENTS ({achievements.length}/50)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {achievements.map((ach, index) => (
                <div key={index} className="bg-gray-800 px-3 py-2 rounded text-sm">
                  {ach}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarStat({ name, value, color }) {
  return (
    <div className="bg-gray-800 p-3 rounded-lg">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div 
          className="h-2 rounded-full" 
          style={{ width: `${value}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}