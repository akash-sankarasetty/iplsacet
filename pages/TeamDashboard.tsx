import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../constants';
import PlayerCard from '../components/PlayerCard';

const TeamDashboard: React.FC = () => {
  const { teams, players } = useAuction();
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  const teamPlayers = selectedTeam 
    ? players.filter(p => selectedTeam.squad.includes(p.id))
    : [];
  
  const totalPoints = teamPlayers.reduce((sum, p) => sum + p.points, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Dashboard</h1>
        
        {/* Team Selector Simulating Login */}
        <select 
            className="bg-slate-800 border border-white/20 rounded p-2 text-white"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
        >
            <option value="">-- Select Your Team --</option>
            {teams.filter(t => t.status === 'approved').map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
            ))}
        </select>
      </div>

      {selectedTeam ? (
        <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-6 rounded-xl border border-white/10">
                    <p className="text-blue-300 text-sm font-medium mb-1">REMAINING PURSE</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(selectedTeam.budget)}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                    <p className="text-gray-400 text-sm font-medium mb-1">SQUAD SIZE</p>
                    <p className="text-3xl font-bold text-white">{selectedTeam.squad.length} <span className="text-lg text-gray-500">/ 15</span></p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                    <p className="text-gray-400 text-sm font-medium mb-1">TOTAL POINTS</p>
                    <p className="text-3xl font-bold text-iplGold">{totalPoints}</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                    <p className="text-gray-400 text-sm font-medium mb-1">MONEY SPENT</p>
                    <p className="text-3xl font-bold text-red-400">{formatCurrency(selectedTeam.spent)}</p>
                </div>
            </div>

            {/* Squad List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Your Squad</h2>
                {teamPlayers.length === 0 ? (
                    <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-white/20">
                        <p className="text-gray-500 text-lg">No players purchased yet.</p>
                        <p className="text-sm text-gray-600">Head to the Auction Room to start bidding.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamPlayers.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                )}
            </div>
        </>
      ) : (
          <div className="text-center py-20">
              <i className="fas fa-users text-6xl text-gray-700 mb-6"></i>
              <h2 className="text-2xl text-gray-400">Select a team to view dashboard details</h2>
          </div>
      )}
    </div>
  );
};

export default TeamDashboard;