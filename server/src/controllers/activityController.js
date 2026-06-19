import ActivityLog from '../models/ActivityLog.js';

export const getActivity = async (_req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch activity logs.' });
  }
};

export const createActivity = async (req, res) => {
  try {
    const activity = await ActivityLog.create({
      userId: req.user?._id || null,
      role: req.user?.role || 'SYSTEM',
      action: req.body.action,
      timestamp: req.body.timestamp || Date.now(),
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create activity log.' });
  }
};
