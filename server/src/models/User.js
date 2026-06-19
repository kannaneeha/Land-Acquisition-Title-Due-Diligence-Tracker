import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'OFFICER', 'LEGAL', 'PM', 'DIRECTOR'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
    },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    lastLogin: { type: Date, default: null },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    otpVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
