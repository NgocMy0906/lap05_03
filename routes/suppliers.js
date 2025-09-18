const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', supplierController.index);
router.get('/add', isAuthenticated, supplierController.form);
router.post('/add', isAuthenticated, supplierController.create);
router.get('/edit/:id', isAuthenticated, supplierController.form);
router.put('/edit/:id', isAuthenticated, supplierController.update);
router.delete('/delete/:id', isAuthenticated, supplierController.delete);

module.exports = router;