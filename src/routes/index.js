const express = require('express');
const authRoutes = require('./auth');
const appointmentRoutes = require('./appointments');
const bedRoutes = require('./beds');
const doctorRoutes = require('./doctors');
const patientRoutes = require('./patients');
const userRoutes = require('./users');
const facilityRoutes = require('./facilities');
const invoiceRoutes = require('./invoices');
const reportRoutes = require('./reports');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/beds', bedRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/users', userRoutes);
router.use('/facilities', facilityRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/reports', reportRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
