const express = require('express');
const router = express.Router();
const {
    getKpis,
    getFinancialReport,
    getAdmissionsReport
} = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/kpis', authenticate, getKpis);
router.get('/financial', authenticate, authorize('hospital_admin'), getFinancialReport);
router.get('/admissions', authenticate, authorize('hospital_admin'), getAdmissionsReport);

module.exports = router;
