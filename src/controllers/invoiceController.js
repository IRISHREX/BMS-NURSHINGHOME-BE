const Invoice = require('../models/Invoice');
const Patient = require('../models/Patient');
const Admission = require('../models/Admission');
const asyncHandler = require('express-async-handler');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
  const { patientId, status, startDate, endDate } = req.query;
  const query = {};

  if (patientId) query.patient = patientId;
  if (status) query.status = status;
  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const invoices = await Invoice.find(query)
    .populate('patient', 'name patientId')
    .populate('generatedBy', 'name email')
    .sort({ createdAt: -1 });
    
  res.json(invoices);
});

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate('patient')
    .populate('admission')
    .populate('generatedBy', 'name email')
    .populate('lastUpdatedBy', 'name email')
    .populate('payments.receivedBy', 'name email');

  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Create an invoice
// @route   POST /api/invoices
// @access  Private/Admin
const createInvoice = asyncHandler(async (req, res) => {
  const {
    patient,
    admission,
    appointment,
    type,
    items,
    subtotal,
    discountAmount,
    discountReason,
    taxDetails,
    totalTax,
    totalAmount,
    status,
    dueDate,
    notes,
  } = req.body;

  const invoice = new Invoice({
    patient,
    admission,
    appointment,
    type,
    items,
    subtotal,
    discountAmount,
    discountReason,
    taxDetails,
    totalTax,
    totalAmount,
    paidAmount: 0,
    dueAmount: totalAmount,
    status: status || 'pending',
    dueDate,
    notes,
    generatedBy: req.user._id,
  });

  const createdInvoice = await invoice.save();
  res.status(201).json(createdInvoice);
});

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private/Admin
const updateInvoice = asyncHandler(async (req, res) => {
  const {
    status,
    notes,
    dueDate,
    items,
    subtotal,
    totalAmount
  } = req.body;

  const invoice = await Invoice.findById(req.params.id);

  if (invoice) {
    invoice.status = status || invoice.status;
    invoice.notes = notes || invoice.notes;
    invoice.dueDate = dueDate || invoice.dueDate;
    invoice.items = items || invoice.items;
    invoice.subtotal = subtotal || invoice.subtotal;
    invoice.totalAmount = totalAmount || invoice.totalAmount;
    invoice.lastUpdatedBy = req.user._id;

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Delete an invoice
// @route   DELETE /api/invoices/:id
// @access  Private/Admin
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  if (invoice) {
    // Or maybe just mark as cancelled
    // invoice.status = 'cancelled';
    // await invoice.save();
    await invoice.remove();
    res.json({ message: 'Invoice removed' });
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Add payment to an invoice
// @route   POST /api/invoices/:id/payments
// @access  Private
const addPayment = asyncHandler(async (req, res) => {
    const { amount, method, reference } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
        const payment = {
            amount,
            method,
            reference,
            receivedBy: req.user._id,
        };
        invoice.payments.push(payment);
        invoice.paidAmount += amount;
        
        await invoice.save();
        res.status(201).json(invoice);
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
});


module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  addPayment
};
