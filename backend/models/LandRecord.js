const mongoose = require('mongoose');

const landRecordSchema = new mongoose.Schema(
  {
    parcelId: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    location: { type: String, required: true },
    acquisitionStatus: { type: String, required: true },
    legalStatus: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('LandRecord', landRecordSchema);
