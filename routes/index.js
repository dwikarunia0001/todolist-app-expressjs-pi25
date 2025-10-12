const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.router');
const userRoutes = require('./user.router');
const todoRoutes = require('./todo.router');

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

module.exports = router;