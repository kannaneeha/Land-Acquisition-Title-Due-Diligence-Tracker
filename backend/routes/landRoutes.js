const express = require('express');
const LandRecord = require('../models/LandRecord');
const { authMiddleware, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/lands', authMiddleware, async (req, res) => {
  try {
    const lands = await LandRecord.find();
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/lands', authMiddleware, authorize('ADMIN', 'OFFICER'), async (req, res) => {
  try {
    const land = await LandRecord.create(req.body);
    res.status(201).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/lands/:id', authMiddleware, authorize('ADMIN', 'OFFICER', 'LEGAL'), async (req, res) => {
  try {
    const land = await LandRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!land) return res.status(404).json({ message: 'Land record not found' });
    res.json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/lands/:id', authMiddleware, authorize('ADMIN'), async (req, res) => {
  try {
    const land = await LandRecord.findByIdAndDelete(req.params.id);
    if (!land) return res.status(404).json({ message: 'Land record not found' });
    res.json({ message: 'Land record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
