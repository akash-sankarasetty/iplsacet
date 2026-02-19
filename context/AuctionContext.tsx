import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Team, Player, AuctionStatus, AuctionState, Bid } from '../types';
import { MOCK_PLAYERS, INITIAL_BUDGET, AUCTION_TIMER_DEFAULT } from '../constants';

interface AuctionContextType {
  teams: Team[];
  players: Player[];
  auctionState: AuctionState;
  registerTeam: (team: Omit<Team, 'id' | 'status' | 'budget' | 'spent' | 'squad'>) => void;
  approveTeam: (id: string) => void;
  rejectTeam: (id: string) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
  startAuction: () => void;
  pauseAuction: () => void;
  nextPlayer: () => void;
  placeBid: (teamId: string, amount: number) => boolean;
  endAuctionForPlayer: (unsold?: boolean) => void;
  resetAuction: () => void;
  updateTimer: (time: number) => void;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or defaults
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('ipl_teams');
    return saved ? JSON.parse(saved) : [];
  });

  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('ipl_players');
    return saved ? JSON.parse(saved) : MOCK_PLAYERS;
  });

  const [auctionState, setAuctionState] = useState<AuctionState>(() => {
    const saved = localStorage.getItem('ipl_auction_state');
    return saved ? JSON.parse(saved) : {
      status: AuctionStatus.REGISTRATION,
      currentTimer: 0,
      currentPlayerId: null,
      currentBid: null,
      bidHistory: []
    };
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('ipl_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('ipl_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('ipl_auction_state', JSON.stringify(auctionState));
  }, [auctionState]);

  // Actions
  const registerTeam = (data: Omit<Team, 'id' | 'status' | 'budget' | 'spent' | 'squad'>) => {
    const newTeam: Team = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
      budget: INITIAL_BUDGET,
      spent: 0,
      squad: []
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const approveTeam = (id: string) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t));
  };

  const rejectTeam = (id: string) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected' } : t));
  };

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const updatePlayer = (updatedPlayer: Player) => {
    setPlayers(prev => prev.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
  };

  const deletePlayer = (id: string) => {
    // If the player being deleted is currently on stage, reset the stage
    if (auctionState.currentPlayerId === id) {
       setAuctionState(prev => ({
        ...prev,
        status: AuctionStatus.READY,
        currentPlayerId: null,
        currentBid: null,
        bidHistory: []
      }));
    }
    
    setPlayers(prev => prev.filter(p => p.id !== id));
    
    // Optional: Remove from team squads if already sold (cleanup)
    setTeams(prev => prev.map(t => ({
      ...t,
      squad: t.squad.filter(pid => pid !== id)
    })));
  };

  const startAuction = () => {
    setAuctionState(prev => ({ ...prev, status: AuctionStatus.READY }));
  };

  const pauseAuction = () => {
    setAuctionState(prev => ({ 
        ...prev, 
        status: prev.status === AuctionStatus.LIVE ? AuctionStatus.PAUSED : AuctionStatus.LIVE 
    }));
  };

  const nextPlayer = () => {
    const unsoldPlayers = players.filter(p => !p.isSold);
    if (unsoldPlayers.length === 0) {
      setAuctionState(prev => ({ ...prev, status: AuctionStatus.COMPLETED, currentPlayerId: null }));
      return;
    }
    
    // Pick next player (simple order for now)
    const next = unsoldPlayers[0];
    setAuctionState({
      status: AuctionStatus.LIVE,
      currentTimer: AUCTION_TIMER_DEFAULT,
      currentPlayerId: next.id,
      currentBid: null,
      bidHistory: []
    });
  };

  const placeBid = (teamId: string, amount: number): boolean => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return false;

    // Validation
    if (auctionState.status !== AuctionStatus.LIVE) return false;
    if (amount > team.budget) return false; // Can't bid more than remaining budget
    if (auctionState.currentBid && amount <= auctionState.currentBid.amount) return false; // Must be higher
    if (!auctionState.currentBid && amount < (players.find(p => p.id === auctionState.currentPlayerId)?.basePrice || 0)) return false; // Must meet base price

    const newBid: Bid = {
      amount,
      teamId,
      timestamp: Date.now()
    };

    setAuctionState(prev => ({
      ...prev,
      currentBid: newBid,
      bidHistory: [newBid, ...prev.bidHistory],
      currentTimer: AUCTION_TIMER_DEFAULT // Reset timer on new bid
    }));

    return true;
  };

  const endAuctionForPlayer = (unsold: boolean = false) => {
    const playerId = auctionState.currentPlayerId;
    if (!playerId) return;

    if (unsold || !auctionState.currentBid) {
      // Mark player as unsold (optional: or just skip logic for now, keep them in pool)
      // For simplicity, we just reset the state to READY
      setAuctionState(prev => ({
        ...prev,
        status: AuctionStatus.READY,
        currentPlayerId: null,
        currentBid: null,
        bidHistory: []
      }));
    } else {
      // Sold!
      const winningBid = auctionState.currentBid;
      
      // Update Player
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, isSold: true, soldToTeamId: winningBid.teamId, soldPrice: winningBid.amount } : p
      ));

      // Update Team
      setTeams(prev => prev.map(t => 
        t.id === winningBid.teamId ? {
          ...t,
          budget: t.budget - winningBid.amount,
          spent: t.spent + winningBid.amount,
          squad: [...t.squad, playerId]
        } : t
      ));

      setAuctionState(prev => ({
        ...prev,
        status: AuctionStatus.READY,
        currentPlayerId: null,
        currentBid: null,
        bidHistory: []
      }));
    }
  };

  const resetAuction = () => {
     localStorage.clear();
     window.location.reload();
  };
  
  const updateTimer = (time: number) => {
      setAuctionState(prev => ({...prev, currentTimer: time}));
  }

  return (
    <AuctionContext.Provider value={{
      teams,
      players,
      auctionState,
      registerTeam,
      approveTeam,
      rejectTeam,
      addPlayer,
      updatePlayer,
      deletePlayer,
      startAuction,
      pauseAuction,
      nextPlayer,
      placeBid,
      endAuctionForPlayer,
      resetAuction,
      updateTimer
    }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};