const express = require('express');
const router = express.Router();

const categoriasController = require('../controllers/categoriasController');

// Rotas de Categorias
router.get('/categorias', categoriasController.listarCategorias);
router.post('/categorias', categoriasController.adicionarCategorias);
router.put('/categorias/:id', categoriasController.atualizarCategorias);
router.delete('/categorias/:id', categoriasController.deletarCategorias);
router.get('/categorias/produtos', categoriasController.getCategoriasComProdutos);


module.exports = router;
