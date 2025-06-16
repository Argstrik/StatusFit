// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import StatusWindow from '../components/StatusWindow';
import WorkoutSchedule from '../components/WorkoutSchedule';
import InputMatrix from '../components/InputMatrix';
import Leaderboard from '../components/Leaderboard';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('status');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Initialize new user
          const newUserData = {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
            createdAt: new Date(),
            lastLogin: new Date(),
            stats: null
          };
          await setDoc(docRef, newUserData);
          setUserData(newUserData);
        }
      }
    };
    
    fetchUserData();
  }, []);

  const handleStatsCalculated = async (newData) => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), newData);
      setUserData(newData);
      setActiveTab('status');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Calisthenics Ascension</h1>
          {userData && <div className="text-sm opacity-75">{userData.name}</div>}
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>
      
      {/* Navigation Tabs */}
      <div className="flex border-b bg-white">
        <button 
          className={`px-4 py-3 ${activeTab === 'status' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Status
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'workout' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          Workout
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'input' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          Update Metrics
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      
      {/* Main Content */}
      <main className="p-4 max-w-6xl mx-auto">
        {activeTab === 'status' && userData?.stats && (
          <StatusWindow userData={userData} />
        )}
        
        {activeTab === 'workout' && userData?.stats && (
          <WorkoutSchedule stats={userData.stats} />
        )}
        
        {activeTab === 'input' && (
          <InputMatrix onStatsCalculated={handleStatsCalculated} />
        )}
        
        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}
      </main>
    </div>
  );
}