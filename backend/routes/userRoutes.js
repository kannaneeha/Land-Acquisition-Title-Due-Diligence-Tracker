const express = require('express');
const { authMiddleware, authorize } = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/users', authMiddleware, authorize('ADMIN'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/users', authMiddleware, authorize('ADMIN'), async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });
    const { password: _password, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id', authMiddleware, authorize('ADMIN'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/users/:id', authMiddleware, authorize('ADMIN'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
