const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');
const todoRoutes = require('./todo.router');

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

module.exports = router;