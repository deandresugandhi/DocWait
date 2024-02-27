import { Router } from 'express';
import { UserModel } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }

      // If token is valid, save decoded token in request object for further use
      req.userId = decoded.id;
      next();
  });
};


// create User route
router.post('/', verifyToken, async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: 'Username and password are required' });
      }

      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
          username,
          password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: 'Username and password are required' });
      }

      const user = await UserModel.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User route by username
router.delete('/remove/:username', verifyToken, async (req, res) => {
  try {
      const deletedUser = await UserModel.findOneAndDelete({ username: req.params.username });
      if (deletedUser) {
          res.status(200).send({ message: 'User deletion successful' });
      } else {
          res.status(404).send({ error: 'User not found' });
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

export default router;
