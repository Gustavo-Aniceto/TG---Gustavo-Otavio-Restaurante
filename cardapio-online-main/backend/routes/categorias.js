const express = require('express');
const router = express.Router();

const categoriasController = require('../controllers/categoriasController');

// Rotas de Categorias
router.get('/categorias', categoriasController.read);
router.post('/categorias', categoriasController.create);
router.put('/categorias/:id', categoriasController.update);
router.delete('/categorias/:id', categoriasController.delete);
router.get('/categorias/produtos', categoriasController.getCategoriasComProdutos);

// Se `listarCategorias` não está definido no controlador, remova essa linha:
// router.get('/', categoriasController.listarCategorias);

// Se precisar da função `listarCategorias`, adicione esta função no `categoriasController.js`.

module.exports = router;
