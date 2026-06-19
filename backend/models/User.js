const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'OFFICER', 'LEGAL', 'PM', 'DIRECTOR'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
