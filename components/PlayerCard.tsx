import React from 'react';
import { Player, PlayerCategory, PlayerType } from '../types';
import { formatCurrency } from '../constants';

interface PlayerCardProps {
  player: Player;
  showStats?: boolean;
  large?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, showStats = true, large = false }) => {
  const getCategoryIcon = (cat: PlayerCategory) => {
    switch (cat) {
      case PlayerCategory.BATTER: return 'fa-baseball-bat-ball';
      case PlayerCategory.BOWLER: return 'fa-bowling-ball';
      case PlayerCategory.ALL_ROUNDER: return 'fa-meteor';
      case PlayerCategory.WICKET_KEEPER: return 'fa-hands-holding-circle';
      default: return 'fa-user';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 ${large ? 'bg-slate-800' : 'bg-slate-800/50'} shadow-xl transition-all hover:scale-[1.02] duration-300`}>
      {/* Header Background */}
      <div className={`absolute top-0 left-0 w-full h-2 ${player.type === PlayerType.INDIAN ? 'bg-blue-500' : 'bg-green-500'}`}></div>
      
      <div className={`${large ? 'p-8' : 'p-4'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`rounded-full ${large ? 'w-24 h-24' : 'w-16 h-16'} bg-slate-700 flex items-center justify-center border-2 border-white/20`}>
                <i className={`fas ${getCategoryIcon(player.category)} ${large ? 'text-4xl' : 'text-2xl'} text-gray-400`}></i>
            </div>
            <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${player.type === PlayerType.INDIAN ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'} mb-2`}>
                    {player.type}
                </span>
                <div className="text-iplGold font-mono font-bold text-lg">
                    {formatCurrency(player.basePrice)}
                </div>
                <div className="text-xs text-gray-500">Base Price</div>
            </div>
        </div>

        <h3 className={`${large ? 'text-3xl' : 'text-xl'} font-bold text-white mb-1`}>{player.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{player.category}</p>

        {showStats && (
            <div className="bg-black/20 rounded-lg p-3 mb-4">
                <p className="text-gray-300 text-sm italic">"{player.stats}"</p>
            </div>
        )}

        <div className="flex justify-between items-center border-t border-white/10 pt-4">
            <div>
                <span className="text-xs text-gray-500 block">POINTS</span>
                <span className="text-xl font-bold text-white">{player.points}</span>
            </div>
            {player.isSold && player.soldPrice && (
                 <div className="text-right">
                    <span className="text-xs text-gray-500 block">SOLD FOR</span>
                    <span className="text-xl font-bold text-green-400">{formatCurrency(player.soldPrice)}</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;