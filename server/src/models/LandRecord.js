import mongoose from 'mongoose';

const landRecordSchema = new mongoose.Schema(
  {
    surveyNumber: { type: String, required: true, trim: true },
    parcelId: { type: String, trim: true },
    ownerName: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    village: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    area: { type: Number, required: true },
    contactNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    remarks: { type: String, trim: true },
    titleStatus: {
      type: String,
      enum: ['Pending', 'Verified', 'Issue Found', 'Cleared', 'Rejected'],
      default: 'Pending',
    },
    legalClearanceStatus: {
      type: String,
      enum: ['Pending', 'In Review', 'Approved', 'Cleared', 'Blocked'],
      default: 'Pending',
    },
    encumbranceStatus: {
      type: String,
      enum: ['Pending', 'Cleared', 'Clear', 'Issue Found'],
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
