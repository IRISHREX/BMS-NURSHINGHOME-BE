const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bedController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  authenticate,
  body('bedNumber').trim().notEmpty().withMessage('Bed number is required'),
  body('bedType').isIn(['icu', 'ccu', 'general', 'semi_private', 'private', 'emergency', 'ventilator', 'pediatric', 'maternity']).withMessage('Valid bed type is required'),
  body('ward').trim().notEmpty().withMessage('Ward is required'),
  body('floor').isInt({ min: 0 }).withMessage('Floor must be a valid number'),
  body('pricePerDay').isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  validate
], bedController.createBed);
router.get('/', authenticate, bedController.getBeds);
router.get('/:id', authenticate, bedController.getBed);
router.put('/:id', authenticate, bedController.updateBed);
router.delete('/:id', authenticate, bedController.deleteBed);

module.exports = router;
