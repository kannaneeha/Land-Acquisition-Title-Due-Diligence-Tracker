import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    role: { type: String, default: 'SYSTEM' },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
