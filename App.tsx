import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuctionProvider } from './context/AuctionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AuctionRoom from './pages/AuctionRoom';
import TeamDashboard from './pages/TeamDashboard';
import Leaderboard from './pages/Leaderboard';

const App: React.FC = () => {
  return (
    <AuctionProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auction" element={<AuctionRoom />} />
            <Route path="/team-view" element={<TeamDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuctionProvider>
  );
};

export default App;