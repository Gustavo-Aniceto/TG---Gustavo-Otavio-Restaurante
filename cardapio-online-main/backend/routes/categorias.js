const express = require('express');
const router = express.Router();

const produtosController = require('./controllers/produtosController');
const categoriasController = require('./controllers/categoriasController');
const usersController = require('./controllers/usersController');

// Rotas de Categorias
router.get('/categorias', categoriasController.read);
router.post('/categorias', categoriasController.create);
router.put('/categorias/:id', categoriasController.update);
router.delete('/categorias/:id', categoriasController.delete);
router.get('/categorias/produtos', categoriasController.getCategoriasComProdutos);

module.exports = router;