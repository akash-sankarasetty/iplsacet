import { Player, PlayerCategory, PlayerType } from './types';

export const INITIAL_BUDGET = 100000000; // 100 Cr (represented as units)
export const AUCTION_TIMER_DEFAULT = 30; // seconds

export const MOCK_PLAYERS: Player[] = [
  // Indian Players (Preserved)
  {
    id: 'p1',
    name: 'Virat Kohli',
    category: PlayerCategory.BATTER,
    type: PlayerType.INDIAN,
    basePrice: 20000000,
    points: 100,
    stats: 'The Run Machine. Consistent aggregator of runs across all formats.',
    isSold: false,
  },
  {
    id: 'p2',
    name: 'Jasprit Bumrah',
    category: PlayerCategory.BOWLER,
    type: PlayerType.INDIAN,
    basePrice: 20000000,
    points: 95,
    stats: 'Yorker King. Economy rate master and wicket-taker in death overs.',
    isSold: false,
  },
  {
    id: 'p5',
    name: 'MS Dhoni',
    category: PlayerCategory.WICKET_KEEPER,
    type: PlayerType.INDIAN,
    basePrice: 15000000,
    points: 92,
    stats: 'Captain Cool. Best finisher and lightning fast hands behind stumps.',
    isSold: false,
  },
  {
    id: 'p7',
    name: 'Rohit Sharma',
    category: PlayerCategory.BATTER,
    type: PlayerType.INDIAN,
    basePrice: 18000000,
    points: 93,
    stats: 'Hitman. Effortless six hitting ability and tactical captaincy.',
    isSold: false,
  },
  // New Overseas Players
  { id: 'op1', name: 'Travis Head', country: 'Australia', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 90, stats: 'Aggressive opener from Australia', isSold: false },
  { id: 'op2', name: 'Josh Inglis', country: 'Australia', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 85, stats: 'Versatile batter from Australia', isSold: false },
  { id: 'op3', name: 'Alex Carey', country: 'Australia', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 84, stats: 'Reliable batter from Australia', isSold: false },
  { id: 'op4', name: 'Harry Brook', country: 'England', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 88, stats: 'Dynamic batter from England', isSold: false },
  { id: 'op5', name: 'Jos Buttler', country: 'England', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 94, stats: 'Explosive batter from England', isSold: false },
  { id: 'op6', name: 'Phil Salt', country: 'England', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Aggressive batter from England', isSold: false },
  { id: 'op7', name: 'Liam Livingstone', country: 'England', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Power hitter from England', isSold: false },
  { id: 'op8', name: 'Devon Conway', country: 'New Zealand', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 88, stats: 'Consistent batter from New Zealand', isSold: false },
  { id: 'op9', name: 'Kane Williamson', country: 'New Zealand', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 92, stats: 'Classy batter from New Zealand', isSold: false },
  { id: 'op10', name: 'Rahmanullah Gurbaz', country: 'Afghanistan', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 82, stats: 'Exciting talent from Afghanistan', isSold: false },
  { id: 'op11', name: 'Dewald Brevis', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 80, stats: 'Young prodigy from South Africa', isSold: false },
  { id: 'op12', name: 'Quinton de Kock', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 91, stats: 'Experienced batter from South Africa', isSold: false },
  { id: 'op13', name: 'Heinrich Klaasen', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 93, stats: 'Destructive batter from South Africa', isSold: false },
  { id: 'op14', name: 'Aiden Markram', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 88, stats: 'Solid batter from South Africa', isSold: false },
  { id: 'op15', name: 'Ryan Rickelton', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 80, stats: 'Promising batter from South Africa', isSold: false },
  { id: 'op16', name: 'David Miller', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Finisher from South Africa', isSold: false },
  { id: 'op17', name: 'Tristan Stubbs', country: 'South Africa', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 83, stats: 'Young talent from South Africa', isSold: false },
  { id: 'op18', name: 'Pathum Nissanka', country: 'Sri Lanka', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 81, stats: 'Steady batter from Sri Lanka', isSold: false },
  { id: 'op19', name: 'Shimron Hetmyer', country: 'West Indies', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 85, stats: 'Power hitter from West Indies', isSold: false },
  { id: 'op20', name: 'Nicholas Pooran', country: 'West Indies', category: PlayerCategory.BATTER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 90, stats: 'Explosive batter from West Indies', isSold: false },
  { id: 'op21', name: 'Noor Ahmad', country: 'Afghanistan', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 84, stats: 'Mystery spinner from Afghanistan', isSold: false },
  { id: 'op22', name: 'Fazalhaq Farooqi', country: 'Afghanistan', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 83, stats: 'Pacer from Afghanistan', isSold: false },
  { id: 'op23', name: 'Pat Cummins', country: 'Australia', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 95, stats: 'Premier pacer from Australia', isSold: false },
  { id: 'op24', name: 'Josh Hazlewood', country: 'Australia', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 91, stats: 'Accurate pacer from Australia', isSold: false },
  { id: 'op25', name: 'Mitchell Starc', country: 'Australia', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 94, stats: 'Express pacer from Australia', isSold: false },
  { id: 'op26', name: 'Mustafizur Rahman', country: 'Bangladesh', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Cutter specialist from Bangladesh', isSold: false },
  { id: 'op27', name: 'Jofra Archer', country: 'England', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 90, stats: 'Express pacer from England', isSold: false },
  { id: 'op28', name: 'Chris Woakes', country: 'England', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 85, stats: 'Swing bowler from England', isSold: false },
  { id: 'op29', name: 'Mark Wood', country: 'England', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Express pacer from England', isSold: false },
  { id: 'op30', name: 'Lockie Ferguson', country: 'New Zealand', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 87, stats: 'Fast bowler from New Zealand', isSold: false },
  { id: 'op31', name: 'Kyle Jamieson', country: 'New Zealand', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 84, stats: 'Tall pacer from New Zealand', isSold: false },
  { id: 'op32', name: 'Trent Boult', country: 'New Zealand', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 92, stats: 'Swing king from New Zealand', isSold: false },
  { id: 'op33', name: 'Lungi Ngidi', country: 'South Africa', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 83, stats: 'Pacer from South Africa', isSold: false },
  { id: 'op34', name: 'Anrich Nortje', country: 'South Africa', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 88, stats: 'Express pacer from South Africa', isSold: false },
  { id: 'op35', name: 'Kagiso Rabada', country: 'South Africa', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 93, stats: 'Strike bowler from South Africa', isSold: false },
  { id: 'op36', name: 'Dushmantha Chameera', country: 'Sri Lanka', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 81, stats: 'Pacer from Sri Lanka', isSold: false },
  { id: 'op37', name: 'Matheesha Pathirana', country: 'Sri Lanka', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 85, stats: 'Slingy pacer from Sri Lanka', isSold: false },
  { id: 'op38', name: 'Maheesh Theekshana', country: 'Sri Lanka', category: PlayerCategory.BOWLER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 84, stats: 'Mystery spinner from Sri Lanka', isSold: false },
  { id: 'op39', name: 'Rashid Khan', country: 'Afghanistan', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 96, stats: 'Global superstar from Afghanistan', isSold: false },
  { id: 'op40', name: 'Mohammad Nabi', country: 'Afghanistan', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 85, stats: 'Veteran all-rounder from Afghanistan', isSold: false },
  { id: 'op41', name: 'Mitchell Marsh', country: 'Australia', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Powerful all-rounder from Australia', isSold: false },
  { id: 'op42', name: 'Glenn Maxwell', country: 'Australia', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 91, stats: 'The Big Show from Australia', isSold: false },
  { id: 'op43', name: 'Marcus Stoinis', country: 'Australia', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 87, stats: 'Strong all-rounder from Australia', isSold: false },
  { id: 'op44', name: 'Cameron Green', country: 'Australia', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 88, stats: 'Talented all-rounder from Australia', isSold: false },
  { id: 'op45', name: 'Tim David', country: 'Australia', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Finisher from Australia', isSold: false },
  { id: 'op46', name: 'Jacob Bethell', country: 'England', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 10000000, points: 80, stats: 'Young all-rounder from England', isSold: false },
  { id: 'op47', name: 'Sam Curran', country: 'England', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Skilled all-rounder from England', isSold: false },
  { id: 'op48', name: 'Will Jacks', country: 'England', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 85, stats: 'Explosive all-rounder from England', isSold: false },
  { id: 'op49', name: 'Liam Livingstone', country: 'England', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 18000000, points: 89, stats: 'Versatile all-rounder from England', isSold: false },
  { id: 'op50', name: 'Ben Stokes', country: 'England', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 20000000, points: 95, stats: 'Match winner from England', isSold: false },
  { id: 'op51', name: 'Daryl Mitchell', country: 'New Zealand', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 87, stats: 'Steady all-rounder from New Zealand', isSold: false },
  { id: 'op52', name: 'Rachin Ravindra', country: 'New Zealand', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 88, stats: 'Young sensation from New Zealand', isSold: false },
  { id: 'op53', name: 'Glenn Phillips', country: 'New Zealand', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Athletic all-rounder from New Zealand', isSold: false },
  { id: 'op54', name: 'Mitchell Santner', country: 'New Zealand', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 84, stats: 'Smart all-rounder from New Zealand', isSold: false },
  { id: 'op55', name: 'Marco Jansen', country: 'South Africa', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Tall all-rounder from South Africa', isSold: false },
  { id: 'op56', name: 'Wanindu Hasaranga', country: 'Sri Lanka', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 88, stats: 'Spin all-rounder from Sri Lanka', isSold: false },
  { id: 'op57', name: 'Jason Holder', country: 'West Indies', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 85, stats: 'Experienced all-rounder from West Indies', isSold: false },
  { id: 'op58', name: 'Rovman Powell', country: 'West Indies', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 86, stats: 'Power hitter from West Indies', isSold: false },
  { id: 'op59', name: 'Romario Shepherd', country: 'West Indies', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 12000000, points: 83, stats: 'All-rounder from West Indies', isSold: false },
  { id: 'op60', name: 'Sunil Narine', country: 'West Indies', category: PlayerCategory.ALL_ROUNDER, type: PlayerType.OVERSEAS, basePrice: 15000000, points: 90, stats: 'Mystery spinner and hitter from West Indies', isSold: false },
];

// Helper to format currency
export const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString()}`;
};