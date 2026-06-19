import ActivityLog from '../models/ActivityLog.js';
import LandRecord from '../models/LandRecord.js';

export const getLands = async (_req, res) => {
  try {
    const lands = await LandRecord.find().sort({ createdAt: -1 });
    res.status(200).json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch lands.' });
  }
};

export const getLandById = async (req, res) => {
  try {
    const land = await LandRecord.findById(req.params.id);
    if (!land) return res.status(404).json({ message: 'Land record not found.' });
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch land record.' });
  }
};

export const createLand = async (req, res) => {
  try {
    const land = await LandRecord.create({
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Created land record: ${land.surveyNumber}`,
    });

    res.status(201).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create land record.' });
  }
};

export const updateLand = async (req, res) => {
  try {
    const land = await LandRecord.findById(req.params.id);
    if (!land) return res.status(404).json({ message: 'Land record not found.' });

    Object.assign(land, req.body, { updatedBy: req.user._id });
    await land.save();

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Updated land record: ${land.surveyNumber}`,
    });

    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update land record.' });
  }
};

export const deleteLand = async (req, res) => {
  try {
    const land = await LandRecord.findById(req.params.id);
    if (!land) return res.status(404).json({ message: 'Land record not found.' });

    await land.deleteOne();

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Deleted land record: ${land.surveyNumber}`,
    });

    res.status(200).json({ message: 'Land record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete land record.' });
  }
};
