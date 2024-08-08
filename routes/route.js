import express from 'express';
import AuthController from '../controllers/AuthControllers.js';
import WatchlistController from '../controllers/WatchlistControllers.js';
import EmailController from '../controllers/EmailControllers.js';
import authenticateToken from '../middleware/Auth.js';
import UserController from '../controllers/UserControllers.js';

const router = express.Router();

// Authentication routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authenticateToken, AuthController.login);

// UDAH GA DIPAKE LAGI BRO
// router.post('/register-admin', AuthController.registerAdmin);
// router.post('/login-admin', AuthController.loginAdmin);
// router.get('/admin', authenticateToken, UserController.getUserAdmin);

router.get('/users', authenticateToken, UserController.getAllUsers);
router.get('/user/:userId', authenticateToken, UserController.getUserById);
router.put('/user/:userId', UserController.editUsername);

// Watchlist routes with middleware
router.get('/watchlists', authenticateToken, WatchlistController.getAllWatchlists);
router.post('/add-watchlist', authenticateToken, WatchlistController.create);
router.get('/watchlist/:userId', authenticateToken, WatchlistController.getByUser);
router.delete('/watchlist', authenticateToken, WatchlistController.deleteList);

// Verify email
router.get('/verify-email', EmailController.verifyEmail);

export default router;
