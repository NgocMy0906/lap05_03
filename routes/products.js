const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', productController.index);
router.get('/add', isAuthenticated, productController.form);
router.post('/add', isAuthenticated, productController.create);
router.get('/edit/:id', isAuthenticated, productController.form);
router.put('/edit/:id', isAuthenticated, productController.update);
router.delete('/delete/:id', isAuthenticated, productController.delete);

module.exports = router;