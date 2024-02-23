import { Router } from 'express';
import { UserModel } from '../db.js';

const router = Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });
  
        // If authentication is successful, create a session or token (e.g., JWT)
      const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

        // Send the token in the response
      res.json({ token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });




export default router