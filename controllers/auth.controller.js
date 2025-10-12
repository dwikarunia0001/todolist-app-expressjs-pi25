const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Cek duplikasi email
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Generate salt 
      const salt = await bcrypt.genSalt(10); 

      // Hash password dengan salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Simpan user dengan password ter-hash
      const user = await User.create({
        username,
        email,
        password: hashedPassword // simpan hash, bukan plain text!
      });

      res.status(201).json({
        message: 'User registered successfully',
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation error', errors: messages });
      }
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },

  // LOGIN USER — verifikasi dengan compare
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // 🔍 Bandingkan password plain dengan hash di database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.json({
        message: 'Login successful',
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
};