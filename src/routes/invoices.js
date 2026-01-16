const express = require('express');
const router = express.Router();
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  addPayment
} = require('../controllers/invoiceController');
const { authenticate, authorize } = require('../middleware/auth');

router.route('/')
  .get(authenticate, getInvoices)
  .post(authenticate, authorize('hospital_admin'), createInvoice);

router.route('/:id')
  .get(authenticate, getInvoiceById)
  .put(authenticate, authorize('hospital_admin'), updateInvoice)
  .delete(authenticate, authorize('hospital_admin'), deleteInvoice);

router.route('/:id/payments')
    .post(authenticate, addPayment);

module.exports = router;
