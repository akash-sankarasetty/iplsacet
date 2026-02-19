import React, { useEffect, useState, useRef } from 'react';
import { useAuction } from '../context/AuctionContext';
import { AuctionStatus, Team } from '../types';
import PlayerCard from '../components/PlayerCard';
import { formatCurrency } from '../constants';

const AuctionRoom: React.FC = () => {
  const { 
    auctionState, 
    players, 
    teams, 
    nextPlayer, 
    placeBid, 
    endAuctionForPlayer, 
    updateTimer, 
    pauseAuction 
  } = useAuction();

  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const timerRef = useRef<number | null>(null);

  const currentPlayer = players.find(p => p.id === auctionState.currentPlayerId);
  const currentWinningTeam = auctionState.currentBid 
    ? teams.find(t => t.id === auctionState.currentBid?.teamId) 
    : null;

  // Timer Logic
  useEffect(() => {
    if (auctionState.status === AuctionStatus.LIVE && auctionState.currentTimer > 0) {
      timerRef.current = window.setInterval(() => {
        updateTimer(auctionState.currentTimer - 1);
      }, 1000);
    } else if (auctionState.currentTimer === 0 && auctionState.status === AuctionStatus.LIVE) {
      // Time's up!
      if (timerRef.current) clearInterval(timerRef.current);
      endAuctionForPlayer(auctionState.currentBid === null); // If no bid, unsold
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionState.status, auctionState.currentTimer]);

  const handleBid = (amount: number) => {
    if (!selectedTeamId) {
      alert("Select a team to place a bid on behalf of.");
      return;
    }
    placeBid(selectedTeamId, amount);
  };

  const getNextBidAmounts = () => {
     const currentAmount = auctionState.currentBid ? auctionState.currentBid.amount : (currentPlayer?.basePrice || 0);
     // Increments logic
     let increment = 100000; // 1L default
     if (currentAmount >= 10000000) increment = 500000; // 5L
     if (currentAmount >= 50000000) increment = 1000000; // 10L
     
     if (!auctionState.currentBid) return [currentAmount]; // First bid is base price

     return [
         currentAmount + increment,
         currentAmount + (increment * 2),
         currentAmount + (increment * 5)
     ];
  };

  if (auctionState.status === AuctionStatus.REGISTRATION) {
      return (
          <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Auction Has Not Started</h2>
                  <p className="text-gray-400">Waiting for Admin to initialize the auction.</p>
              </div>
          </div>
      )
  }

  if (auctionState.status === AuctionStatus.COMPLETED) {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
                <i className="fas fa-trophy text-6xl text-iplGold mb-6"></i>
                <h2 className="text-4xl font-bold mb-4">Auction Completed!</h2>
                <p className="text-gray-400">Check the leaderboard for results.</p>
            </div>
        </div>
    )
}

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Left Column: Player on Stage */}
      <div className="lg:col-span-2 space-y-4">
        {/* Status Bar */}
        <div className="glass-panel p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <span className={`w-3 h-3 rounded-full ${auctionState.status === AuctionStatus.LIVE ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                <span className="font-bold uppercase tracking-widest">{auctionState.status === AuctionStatus.LIVE ? 'LIVE AUCTION' : 'READY'}</span>
            </div>
            {auctionState.status === AuctionStatus.READY && (
                <button 
                    onClick={nextPlayer}
                    className="bg-iplGold text-black font-bold px-6 py-2 rounded hover:brightness-110"
                >
                    CALL NEXT PLAYER
                </button>
            )}
             {auctionState.status === AuctionStatus.LIVE && (
                <button 
                    onClick={pauseAuction}
                    className="bg-slate-700 text-white font-bold px-4 py-2 rounded hover:bg-slate-600 text-xs"
                >
                   PAUSE
                </button>
            )}
        </div>

        {/* Main Stage */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[500px] justify-center relative">
            {currentPlayer ? (
                <>
                    <div className="w-full max-w-sm">
                         <PlayerCard player={currentPlayer} large />
                    </div>
                    
                    <div className="flex-1 w-full space-y-6">
                        {/* Timer */}
                        {auctionState.status === AuctionStatus.LIVE && (
                             <div className="flex items-center justify-between bg-black/40 p-4 rounded-lg border border-white/5">
                                <span className="text-gray-400">TIME REMAINING</span>
                                <span className={`text-4xl font-mono font-bold ${auctionState.currentTimer <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    00:{auctionState.currentTimer.toString().padStart(2, '0')}
                                </span>
                            </div>
                        )}

                        {/* Current Bid Display */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-white/10 text-center">
                            <span className="text-sm text-gray-400 block mb-2">CURRENT HIGHEST BID</span>
                            {auctionState.currentBid ? (
                                <div>
                                    <div className="text-5xl font-bold text-iplGold mb-2">
                                        {formatCurrency(auctionState.currentBid.amount)}
                                    </div>
                                    <div className="text-xl text-white">
                                        Hld by: <span className="font-bold text-blue-400">{currentWinningTeam?.name}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-3xl text-gray-500 font-bold py-4">NO BIDS YET</div>
                            )}
                        </div>

                        {/* Controls (Simulating Admin/Team Console) */}
                        {auctionState.status === AuctionStatus.LIVE && (
                             <div className="space-y-4">
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    <select 
                                        className="bg-slate-700 text-white p-3 rounded"
                                        value={selectedTeamId}
                                        onChange={(e) => setSelectedTeamId(e.target.value)}
                                    >
                                        <option value="">Select Team to Bid...</option>
                                        {teams.filter(t => t.status === 'approved').map(t => (
                                            <option key={t.id} value={t.id}>{t.name} (Rem: {formatCurrency(t.budget)})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {getNextBidAmounts().map((amt, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleBid(amt)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded shadow-lg transition-transform active:scale-95"
                                        >
                                            Bid {formatCurrency(amt)}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => endAuctionForPlayer(false)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded mt-4"
                                    disabled={!auctionState.currentBid}
                                >
                                    SOLD TO {currentWinningTeam?.name || '...'}
                                </button>
                                <button 
                                    onClick={() => endAuctionForPlayer(true)}
                                    className="w-full bg-red-900/50 hover:bg-red-900 text-red-200 font-bold py-2 rounded text-sm"
                                >
                                    MARK UNSOLD
                                </button>
                             </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center self-center m-auto">
                    <div className="text-6xl text-gray-700 mb-4"><i className="fas fa-pause-circle"></i></div>
                    <h3 className="text-2xl text-gray-400">Waiting for next player...</h3>
                </div>
            )}
        </div>
      </div>

      {/* Right Column: Feed & History */}
      <div className="bg-slate-900 border-l border-white/10 p-4 space-y-4 overflow-hidden flex flex-col">
        <h3 className="font-bold text-lg border-b border-white/10 pb-2">Recent Activity</h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {auctionState.bidHistory.map((bid, index) => {
                const team = teams.find(t => t.id === bid.teamId);
                return (
                    <div key={index} className="bg-slate-800 p-3 rounded text-sm flex justify-between items-center animate-[fadeIn_0.3s_ease-out]">
                        <div>
                            <span className="font-bold text-blue-300 block">{team?.name}</span>
                            <span className="text-xs text-gray-500">{new Date(bid.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <span className="font-bold text-iplGold">{formatCurrency(bid.amount)}</span>
                    </div>
                )
            })}
             {auctionState.bidHistory.length === 0 && <p className="text-gray-600 text-center italic mt-10">No bids yet.</p>}
        </div>

        <div className="h-1/3 border-t border-white/10 pt-4">
             <h3 className="font-bold text-lg mb-2">Upcoming Players</h3>
             <div className="space-y-2 overflow-y-auto h-full pb-4">
                {players.filter(p => !p.isSold && p.id !== currentPlayer?.id).slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center space-x-3 bg-white/5 p-2 rounded">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.category}</p>
                        </div>
                        <span className="text-xs text-iplGold">{formatCurrency(p.basePrice)}</span>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;