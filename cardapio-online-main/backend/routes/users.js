const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');

// Rotas de Usuários
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/usuarios', usersController.listarUser);
router.put('/usuarios/:id', usersController.atualizarUser);
router.delete('/usuarios/:id', usersController.deletarUser);

module.exports = router;