const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login
router.post('/login', authController.login);

// Rota para registro de novos usuários (opcional)
router.post('/register', authController.register);

module.exports = router;
