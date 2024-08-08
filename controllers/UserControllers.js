// controllers/UserController.js
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Watchlist,
            attributes: ['movie_id', 'movie_name', 'movie_poster_url', 'year', 'vote_average'],
            as: 'watchlist',
          },
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: ['username', 'email', 'createdAt', 'role'],
        include: [
          {
            model: Watchlist,
            attributes: ['movie_id', 'movie_name', 'movie_poster_url', 'year', 'vote_average'],
            as: 'watchlist',
          },
        ],
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { username, email, createdAt, role } = user;
      const year = createdAt.getFullYear(); // Mengambil tahun dari createdAt
      res.json({ username, email, year, watchlist: user.watchlist, role });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  },

  editUsername: async (req, res) => {
    try {
      const { userId } = req.params;
      const { newUsername } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.username = newUsername;
      await user.save();

      res.json({
        message: 'Username updated successfully',
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating username', error });
    }
  },
};

export default UserController;
