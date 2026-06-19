const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/activity', authMiddleware, async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/activity', authMiddleware, async (req, res) => {
  try {
    res.status(201).json({ message: 'Activity logged', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
