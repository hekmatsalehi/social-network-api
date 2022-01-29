const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Gather all routes and export them to use in server file
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;