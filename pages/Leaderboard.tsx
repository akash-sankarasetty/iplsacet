import React from 'react';
import { useAuction } from '../context/AuctionContext';
import { formatCurrency } from '../constants';
import { Team } from '../types';

const Leaderboard: React.FC = () => {
  const { teams, players } = useAuction();

  const calculateTotalPoints = (team: Team) => {
    return team.squad.reduce((sum, playerId) => {
        const player = players.find(p => p.id === playerId);
        return sum + (player?.points || 0);
    }, 0);
  };

  const sortedTeams = [...teams]
    .filter(t => t.status === 'approved')
    .map(t => ({...t, totalPoints: calculateTotalPoints(t)}))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">TOURNAMENT STANDINGS</h1>
        <p className="text-gray-400">Teams ranked by total squad strength (points).</p>
      </div>

      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-900 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Team Name</div>
            <div className="col-span-2 text-right">Plyrs</div>
            <div className="col-span-2 text-right">Budget Left</div>
            <div className="col-span-2 text-right">Points</div>
        </div>
        
        {sortedTeams.map((team, index) => (
            <div key={team.id} className={`grid grid-cols-12 p-4 items-center border-b border-white/5 ${index === 0 ? 'bg-yellow-500/10' : 'hover:bg-white/5'}`}>
                <div className="col-span-1 text-center font-bold text-lg">
                    {index + 1}
                    {index === 0 && <i className="fas fa-crown text-yellow-500 ml-1 text-xs"></i>}
                </div>
                <div className="col-span-5">
                    <h3 className={`font-bold text-lg ${index === 0 ? 'text-iplGold' : 'text-white'}`}>{team.name}</h3>
                    <p className="text-xs text-gray-500">{team.department}</p>
                </div>
                <div className="col-span-2 text-right font-mono text-gray-300">
                    {team.squad.length}
                </div>
                <div className="col-span-2 text-right font-mono text-blue-300">
                    {formatCurrency(team.budget)}
                </div>
                <div className="col-span-2 text-right font-bold text-xl text-white">
                    {team.totalPoints}
                </div>
            </div>
        ))}
        
        {sortedTeams.length === 0 && (
             <div className="text-center py-12 text-gray-500">
                No active teams found.
             </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;