import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';

const WatchlistController = {
  create: async (req, res) => {
    const { movie_id, movie_name, movie_poster_url, year, vote_average, userId } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const existingWatchlist = await Watchlist.findOne({
        where: {
          userId,
          movie_id,
        },
      });

      if (existingWatchlist) {
        return res.status(400).json({ message: 'This movie is already in the watchlist for this user' });
      }

      const watchlist = await Watchlist.create({
        movie_id,
        movie_name,
        movie_poster_url,
        year,
        vote_average,
        userId,
      });

      user.watchlistId = watchlist.id;
      await user.save();

      res.status(201).json({ status: true, code: 200, message: 'Watchlist created successfully', data: watchlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  getAllWatchlists: async (req, res) => {
    try {
      const watchlists = await Watchlist.findAll({
        attributes: ['movie_id', 'movie_name', 'movie_poster_url', 'year', 'vote_average', 'userId'],
        include: {
          model: User,
          attributes: ['username', 'email'],
          as: 'user', // pastikan alias sama dengan yang digunakan di model Watchlist
        },
      });
      res.status(200).json(watchlists);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  getByUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const watchlists = await Watchlist.findAll({ where: { userId } });
      res.status(200).json(watchlists);
    } catch (err) {
      console.log(err);

      res.status(500).json({ error: err.message });
    }
  },

  deleteList: async (req, res) => {
    const { userId, movie_id } = req.body;

    try {
      const watchlist = await Watchlist.findOne({
        where: { userId, movie_id },
      });

      if (!watchlist) {
        return res.status(404).json({ message: 'Watchlist entry not found' });
      }

      await watchlist.destroy();
      res.status(200).json({ message: 'Watchlist entry deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default WatchlistController;
