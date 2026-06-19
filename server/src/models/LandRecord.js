import mongoose from 'mongoose';

const landRecordSchema = new mongoose.Schema(
  {
    surveyNumber: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    area: { type: Number, required: true },
    titleStatus: {
      type: String,
      enum: ['Pending', 'Verified', 'Issue Found', 'Cleared'],
      default: 'Pending',
    },
    legalClearanceStatus: {
      type: String,
      enum: ['Pending', 'In Review', 'Approved', 'Blocked'],
      default: 'Pending',
    },
    encumbranceStatus: {
      type: String,
      enum: ['Pending', 'Cleared', 'Issue Found'],
      default: 'Pending',
    },
    workflowStage: { type: Number, default: 1, min: 1, max: 6 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const LandRecord = mongoose.model('LandRecord', landRecordSchema);
export default LandRecord;
