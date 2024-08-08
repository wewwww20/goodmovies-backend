import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import EmailController from './EmailControllers.js';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
dotenv.config();

const { sign } = jwt;
const AuthController = {
  // UDAH GA DIPAKE LAGI BRO
  // registerAdmin: async (req, res) => {
  //   const { email, password } = req.body;

  //   try {
  //     const newHashedPassword = await hash(password, 10);
  //     await Admin.create({
  //       email,
  //       password: newHashedPassword,
  //     });

  //     res.status(201).json({ message: 'Admin registered.' });
  //   } catch (error) {
  //     console.log(error);

  //     res.status(500).json('Error while registering admin.');
  //   }
  // },

  // loginAdmin: async (req, res) => {
  //   const { email, password } = req.body;

  //   try {
  //     const admin = await Admin.findOne({
  //       where: {
  //         email,
  //       },
  //     });

  //     if (!admin) {
  //       res.status(400).json({ message: 'Incorrect email or password.' });
  //     }

  //     const isMatch = await compare(password, admin.password);

  //     if (!isMatch) {
  //       res.status(400).json({ message: 'Incorrect email or password.' });
  //     }

  //     const token = sign({ adminId: admin.id }, process.env.JWT_SECRET, {
  //       expiresIn: '24h',
  //     });

  //     res.status(200).json({ adminId: admin.id, token });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },

  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      await EmailController.sendVerificationEmail(user);

      res.status(201).json({ message: 'User registered. Verification email sent.' });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      if (!user.isVerified) {
        return res.status(400).json({ message: 'Email not verified' });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.status(200).json({ userId: user.id, token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // Here we would invalidate the token, if we're using token blacklisting
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default AuthController;
