const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const authConfig = require('../config/auth');


const authController = {
    register: (req, res) => {
        const { usuario, senha } = req.body;

        bcrypt.hash(senha, 10, (err, hash) => {
            if (err) {
                return res.status(500).send('Erro ao encriptar a senha');
            }

            const novoUsuario = {
                usuario,
                senha: hash
            };

            Usuario.criar(novoUsuario, (err, result) => {
                if (err) {
                    return res.status(500).send('Erro ao criar o usuário');
                }
                res.status(201).send('Usuário criado com sucesso');
            });
        });
    },

    login: (req, res) => {
        const { usuario, senha } = req.body;

        Usuario.buscarPorUsuario(usuario, (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao buscar usuário');
            }

            if (results.length === 0) {
                return res.status(404).send('Usuário não encontrado');
            }

            const usuarioEncontrado = results[0];

            bcrypt.compare(senha, usuarioEncontrado.senha, (err, isMatch) => {
                if (err) {
                    return res.status(500).send('Erro ao comparar senhas');
                }

                if (!isMatch) {
                    return res.status(401).send('Senha incorreta');
                }

                res.send('Login realizado com sucesso');
            });
        });
    }
};

module.exports = authController;