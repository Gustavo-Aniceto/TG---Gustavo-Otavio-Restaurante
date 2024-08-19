const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rotas administrativas
router.get('/', adminController.renderAdminDashboard);
router.get('/produtos', adminController.renderProdutos);
router.get('/categorias', adminController.renderCategorias);

module.exports = router;
