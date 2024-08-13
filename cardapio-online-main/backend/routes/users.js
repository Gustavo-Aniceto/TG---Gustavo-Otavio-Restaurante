const express = require('express');
const router = express.Router();

const produtosController = require('./controllers/produtosController');
const categoriasController = require('./controllers/categoriasController');
const usersController = require('./controllers/usersController');

// Rotas de Usuários
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/usuarios', usersController.read);
router.put('/usuarios/:id', usersController.update);
router.delete('/usuarios/:id', usersController.delete);

module.exports = router;