import User from './User.js';
import Watchlist from './Watchlist.js';

// Definisikan hubungan
User.hasMany(Watchlist, { foreignKey: 'userId', as: 'watchlist' });
Watchlist.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Watchlist };
