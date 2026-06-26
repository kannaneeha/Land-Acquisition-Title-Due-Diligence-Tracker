import express from 'express';
import { getWorkflows, getWorkflowByRecord, updateWorkflowStage } from '../controllers/workflowController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/workflows', protect, getWorkflows);
router.get('/workflows/:recordId', protect, getWorkflowByRecord);
router.patch('/workflows/:recordId', protect, authorize('ADMIN', 'OFFICER'), updateWorkflowStage);

export default router;
