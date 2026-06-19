import express from 'express';
import {
  createLand,
  deleteLand,
  getLandById,
  getLands,
  updateLand,
} from '../controllers/landController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/lands', protect, getLands);
router.get('/lands/:id', protect, getLandById);
router.post('/lands', protect, authorize('ADMIN', 'OFFICER'), createLand);
router.put('/lands/:id', protect, authorize('ADMIN', 'OFFICER', 'LEGAL'), updateLand);
router.delete('/lands/:id', protect, authorize('ADMIN'), deleteLand);

export default router;
