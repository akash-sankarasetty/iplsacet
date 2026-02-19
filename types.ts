export enum PlayerCategory {
  BATTER = 'Batter',
  BOWLER = 'Bowler',
  ALL_ROUNDER = 'All-Rounder',
  WICKET_KEEPER = 'Wicket Keeper'
}

export enum PlayerType {
  INDIAN = 'Indian',
  OVERSEAS = 'Overseas'
}

export enum AuctionStatus {
  REGISTRATION = 'REGISTRATION',
  READY = 'READY',
  LIVE = 'LIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export interface Player {
  id: string;
  name: string;
  category: PlayerCategory;
  type: PlayerType;
  basePrice: number;
  points: number; // For winner calculation
  stats: string; // AI generated description/stats
  isSold: boolean;
  soldToTeamId?: string;
  soldPrice?: number;
  image?: string;
}

export interface Team {
  id: string;
  name: string;
  email: string;
  members: string[]; // Array of 4 names
  department: string;
  budget: number;
  spent: number;
  status: 'pending' | 'approved' | 'rejected';
  squad: string[]; // Array of Player IDs
}

export interface Bid {
  amount: number;
  teamId: string;
  timestamp: number;
}

export interface AuctionState {
  status: AuctionStatus;
  currentTimer: number;
  currentPlayerId: string | null;
  currentBid: Bid | null;
  bidHistory: Bid[];
}