import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, authorize('ADMIN'), getUsers);
router.post('/users', protect, authorize('ADMIN'), createUser);
router.put('/users/:id', protect, authorize('ADMIN'), updateUser);
router.delete('/users/:id', protect, authorize('ADMIN'), deleteUser);

export default router;
