const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bedController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, bedController.createBed);
router.get('/', authenticate, bedController.getBeds);
router.get('/:id', authenticate, bedController.getBed);
router.put('/:id', authenticate, bedController.updateBed);
router.delete('/:id', authenticate, bedController.deleteBed);

module.exports = router;
