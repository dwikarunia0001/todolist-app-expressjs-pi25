const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');

router.use("/users", verifyToken, userRoutes);

module.exports = router;