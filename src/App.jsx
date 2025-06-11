import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavTabs from './components/NavTabs';
import LiveMatches from './pages/LiveMatches';
import TeamStats from './pages/TeamStats';
import CorrectScore from './pages/CorrectScore';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <NavTabs />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<LiveMatches />} />
          <Route path="/team-stats" element={<TeamStats />} />
          <Route path="/correct-score" element={<CorrectScore />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;