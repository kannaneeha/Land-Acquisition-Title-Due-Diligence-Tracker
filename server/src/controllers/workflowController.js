import ActivityLog from '../models/ActivityLog.js';
import LandRecord from '../models/LandRecord.js';

export const getWorkflows = async (_req, res) => {
  try {
    const records = await LandRecord.find({}, { surveyNumber: 1, ownerName: 1, location: 1, area: 1, workflowStage: 1, legalClearanceStatus: 1, village: 1, createdAt: 1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch workflows.' });
  }
};

export const getWorkflowByRecord = async (req, res) => {
  try {
    const record = await LandRecord.findById(req.params.recordId);
    if (!record) return res.status(404).json({ message: 'Record not found.' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch workflow.' });
  }
};

export const updateWorkflowStage = async (req, res) => {
  try {
    const record = await LandRecord.findById(req.params.recordId);
    if (!record) return res.status(404).json({ message: 'Record not found.' });

    const stage = Number(req.body.stage);
    if (stage < 1 || stage > 6) {
      return res.status(400).json({ message: 'Stage must be between 1 and 6.' });
    }

    record.workflowStage = stage;
    record.updatedBy = req.user._id;
    await record.save();

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Workflow stage updated to ${stage} for ${record.surveyNumber}`,
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update workflow stage.' });
  }
};
