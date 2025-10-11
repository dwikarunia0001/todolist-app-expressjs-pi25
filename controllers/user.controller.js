const User = require("../models/user.model");

module.exports = {
  // GET /api/users — Mendapatkan semua user
  getAllUser: async (req, res) => {
    try {
      const users = await User.find().select('-password'); // jangan tampilkan password
      res.status(200).json({
        message: "Successfully get all users",
        data: users
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // GET /api/users/:id — Mendapatkan user berdasarkan ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User retrieved successfully",
        data: user
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // POST /api/users — Membuat user baru
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validasi dasar (opsional, karena model sudah punya validator)
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
      }

      // Cek duplikasi
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
      }

      const newUser = new User({
        username,
        email,
        password
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (error) {
      // Tangani error validasi Mongoose
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation error", errors: messages });
      }
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // PUT /api/users/:id — Memperbarui user berdasarkan ID
  updateUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      // Cari user
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Cek duplikasi username/email (kecuali milik diri sendiri)
      const duplicate = await User.findOne({
        $or: [
          { username: username, _id: { $ne: user._id } },
          { email: email, _id: { $ne: user._id } }
        ]
      });
      if (duplicate) {
        return res.status(400).json({ message: "Username or email already in use" });
      }

      // Update field
      user.username = username || user.username;
      user.email = email || user.email;

      await user.save();

      res.status(200).json({
        message: "User updated successfully",
        data: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation error", errors: messages });
      }
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // DELETE /api/users/:id — Menghapus user berdasarkan ID
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deleted successfully"
      });
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};