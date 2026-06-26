import express from 'express';
import { exportExcel, exportPdf, getAnalytics, getSummary } from '../controllers/reportController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reports/summary', protect, authorize('ADMIN', 'PM', 'DIRECTOR'), getSummary);
router.get('/reports/analytics', protect, authorize('ADMIN', 'PM', 'DIRECTOR'), getAnalytics);
router.get('/reports/export/pdf', protect, exportPdf);
router.get('/reports/export/excel', protect, authorize('ADMIN', 'OFFICER'), exportExcel);

export default router;
