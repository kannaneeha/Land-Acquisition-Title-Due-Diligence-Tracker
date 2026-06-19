import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../config/email.js';
import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const createOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const login = async (req, res) => {
  try {
    const { employeeId, role, username, password } = req.body;

    if (!employeeId || !role || !username || !password) {
      return res.status(400).json({ message: 'Employee ID, role, username, and password are required.' });
    }

    const user = await User.findOne({ employeeId, username, role });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ message: `Account status is ${user.status}.` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    user.lastLogin = new Date();
    await user.save();

    await ActivityLog.create({
      userId: user._id,
      role: user.role,
      action: 'User Login',
    });

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        username: user.username,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { employeeId, email } = req.body;

    if (!employeeId || !email) {
      return res.status(400).json({ message: 'Employee ID and email are required.' });
    }

    const user = await User.findOne({ employeeId, email });
    if (!user) {
      return res.status(404).json({ message: 'No matching user found.' });
    }

    const otp = createOtp();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Password Reset OTP',
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to send OTP.' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { employeeId, otp } = req.body;

    if (!employeeId || !otp) {
      return res.status(400).json({ message: 'Employee ID and OTP are required.' });
    }

    const user = await User.findOne({ employeeId });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ message: 'Invalid OTP request.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (new Date() > user.otpExpiresAt) {
      user.otp = null;
      user.otpExpiresAt = null;
      user.otpVerified = false;
      await user.save();
      return res.status(400).json({ message: 'OTP expired.' });
    }

    user.otpVerified = true;
    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'OTP verification failed.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { employeeId, otp, newPassword } = req.body;

    if (!employeeId || !otp || !newPassword) {
      return res.status(400).json({ message: 'Employee ID, OTP, and new password are required.' });
    }

    const user = await User.findOne({ employeeId });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.otpVerified || user.otp !== otp || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: 'Please verify OTP before resetting your password.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    user.otpVerified = false;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Password reset failed.' });
  }
};
