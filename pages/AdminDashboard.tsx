import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { AuctionStatus, PlayerCategory, PlayerType, Player } from '../types';
import PlayerCard from '../components/PlayerCard';
import { generatePlayerAnalysis } from '../services/geminiService';

const DEFAULT_PLAYER_STATE = {
    name: '',
    category: PlayerCategory.BATTER,
    type: PlayerType.INDIAN,
    basePrice: 1000000,
    points: 80
};

const AdminDashboard: React.FC = () => {
  const { 
      teams, 
      players, 
      approveTeam, 
      rejectTeam, 
      addPlayer, 
      updatePlayer,
      deletePlayer,
      startAuction, 
      resetAuction, 
      auctionState 
  } = useAuction();

  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'control'>('teams');
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [newPlayer, setNewPlayer] = useState(DEFAULT_PLAYER_STATE);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (editingPlayerId) {
          // Update existing player
          const originalPlayer = players.find(p => p.id === editingPlayerId);
          if (originalPlayer) {
              updatePlayer({
                  ...originalPlayer,
                  name: newPlayer.name,
                  category: newPlayer.category,
                  type: newPlayer.type,
                  basePrice: newPlayer.basePrice,
                  points: newPlayer.points
                  // We preserve ID, stats, sold status, etc.
              });
          }
          setEditingPlayerId(null);
          setNewPlayer(DEFAULT_PLAYER_STATE);
      } else {
          // Add new player
          const stats = await generatePlayerAnalysis(newPlayer.name, newPlayer.category);
          addPlayer({
              id: Date.now().toString(),
              ...newPlayer,
              stats,
              isSold: false
          });
          setNewPlayer(DEFAULT_PLAYER_STATE);
      }
  };

  const handleDeletePlayer = (id: string) => {
      if (window.confirm("Are you sure you want to delete this player?")) {
          deletePlayer(id);
          if (editingPlayerId === id) {
              handleCancelEdit();
          }
      }
  };

  const handleEditClick = (player: Player) => {
      setNewPlayer({
          name: player.name,
          category: player.category,
          type: player.type,
          basePrice: player.basePrice,
          points: player.points
      });
      setEditingPlayerId(player.id);
      // Scroll to top of form if needed, or just visual focus
  };

  const handleCancelEdit = () => {
      setNewPlayer(DEFAULT_PLAYER_STATE);
      setEditingPlayerId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
             <button onClick={resetAuction} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm">
                Reset Data
             </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg w-fit">
        {['teams', 'players', 'control'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-md capitalize font-medium transition-all ${
                    activeTab === tab 
                    ? 'bg-iplGold text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6 min-h-[600px]">
        {activeTab === 'teams' && (
            <div>
                <h2 className="text-xl font-bold mb-4">Registered Teams ({teams.length})</h2>
                <div className="grid gap-4">
                    {teams.length === 0 && <p className="text-gray-500">No teams registered yet.</p>}
                    {teams.map(team => (
                        <div key={team.id} className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-white/5">
                            <div>
                                <h3 className="font-bold text-lg">{team.name}</h3>
                                <p className="text-sm text-gray-400">{team.members.join(', ')}</p>
                                <p className="text-xs text-gray-500">{team.department}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`px-2 py-1 rounded text-xs uppercase ${
                                    team.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                    team.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                    {team.status}
                                </span>
                                {team.status === 'pending' && (
                                    <>
                                        <button onClick={() => approveTeam(team.id)} className="p-2 bg-green-600 rounded hover:bg-green-700 text-white"><i className="fas fa-check"></i></button>
                                        <button onClick={() => rejectTeam(team.id)} className="p-2 bg-red-600 rounded hover:bg-red-700 text-white"><i className="fas fa-times"></i></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'players' && (
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-slate-900 p-6 rounded-lg h-fit sticky top-6">
                    <h3 className="font-bold text-lg mb-4">{editingPlayerId ? 'Edit Player' : 'Add New Player'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400">Player Name</label>
                            <input 
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" 
                                value={newPlayer.name}
                                onChange={e => setNewPlayer({...newPlayer, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Category</label>
                            <select 
                                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                                value={newPlayer.category}
                                onChange={e => setNewPlayer({...newPlayer, category: e.target.value as PlayerCategory})}
                            >
                                {Object.values(PlayerCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Type</label>
                            <select 
                                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                                value={newPlayer.type}
                                onChange={e => setNewPlayer({...newPlayer, type: e.target.value as PlayerType})}
                            >
                                {Object.values(PlayerType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="text-sm text-gray-400">Base Price</label>
                                <input 
                                    type="number"
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" 
                                    value={newPlayer.basePrice}
                                    onChange={e => setNewPlayer({...newPlayer, basePrice: parseInt(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Points</label>
                                <input 
                                    type="number"
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white" 
                                    value={newPlayer.points}
                                    onChange={e => setNewPlayer({...newPlayer, points: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button type="submit" className={`flex-1 ${editingPlayerId ? 'bg-iplGold text-black' : 'bg-blue-600 text-white'} font-bold py-2 rounded hover:brightness-110`}>
                                {editingPlayerId ? 'Update Player' : 'Add Player'}
                            </button>
                            {editingPlayerId && (
                                <button type="button" onClick={handleCancelEdit} className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                    {players.map(p => (
                        <div key={p.id} className={`relative group transition-all ${editingPlayerId === p.id ? 'ring-2 ring-iplGold rounded-xl transform scale-[0.92]' : ''}`}>
                             <div className="scale-90 origin-top-left">
                                <PlayerCard player={p} showStats={false} />
                             </div>
                             <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button
                                    onClick={() => handleEditClick(p)}
                                    className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700"
                                    title="Edit Player"
                                >
                                    <i className="fas fa-edit text-sm"></i>
                                </button>
                                <button
                                    onClick={() => handleDeletePlayer(p.id)}
                                    className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700"
                                    title="Delete Player"
                                >
                                    <i className="fas fa-trash-alt text-sm"></i>
                                </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'control' && (
            <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Auction Status: <span className="text-iplGold">{auctionState.status}</span></h2>
                    <p className="text-gray-400">Manage the flow of the auction here.</p>
                </div>

                <div className="flex space-x-4">
                    {auctionState.status === AuctionStatus.REGISTRATION && (
                        <button 
                            onClick={startAuction}
                            className="px-8 py-4 bg-green-600 rounded-xl text-xl font-bold hover:bg-green-500 shadow-lg shadow-green-900/50"
                        >
                            <i className="fas fa-play mr-2"></i> Start Auction
                        </button>
                    )}
                    
                    {auctionState.status !== AuctionStatus.REGISTRATION && auctionState.status !== AuctionStatus.COMPLETED && (
                        <button className="px-8 py-4 bg-yellow-600 rounded-xl text-xl font-bold hover:bg-yellow-500 cursor-not-allowed opacity-50">
                             Auction in Progress
                        </button>
                    )}

                    {auctionState.status === AuctionStatus.COMPLETED && (
                        <div className="text-center p-6 bg-slate-900 rounded-xl">
                            <i className="fas fa-flag-checkered text-4xl text-white mb-4"></i>
                            <h3 className="text-xl font-bold">Auction Completed</h3>
                        </div>
                    )}
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-center w-full max-w-3xl">
                    <div className="bg-slate-900 p-6 rounded-lg">
                        <span className="block text-4xl font-bold text-white">{teams.filter(t => t.status === 'approved').length}</span>
                        <span className="text-gray-500">Approved Teams</span>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-lg">
                        <span className="block text-4xl font-bold text-white">{players.length}</span>
                        <span className="text-gray-500">Total Players</span>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-lg">
                        <span className="block text-4xl font-bold text-white">{players.filter(p => !p.isSold).length}</span>
                        <span className="text-gray-500">Remaining Players</span>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;