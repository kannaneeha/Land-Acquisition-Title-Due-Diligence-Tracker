import bcrypt from 'bcrypt';
import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch users.' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Created user: ${user.employeeId}`,
    });

    const { password: _password, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to create user.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    Object.assign(user, updates);
    await user.save();

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Updated user: ${user.employeeId}`,
    });

    const { password: _password, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update user.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.deleteOne();

    await ActivityLog.create({
      userId: req.user._id,
      role: req.user.role,
      action: `Deleted user: ${user.employeeId}`,
    });

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete user.' });
  }
};
