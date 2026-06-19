import express from 'express';
import { createActivity, getActivity } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/activity', protect, getActivity);
router.post('/activity', protect, createActivity);

export default router;
