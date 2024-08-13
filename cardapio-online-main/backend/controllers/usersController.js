const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registrar um novo usuário
exports.register = (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(sql, [username, hash], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao registrar usuário.' });
        res.send({ message: 'Usuário registrado com sucesso!', id: result.insertId });
    });
};

// Fazer login de um usuário
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao fazer login.' });
        if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });

        const user = results[0];
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Senha incorreta.' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.json({ message: 'Login bem-sucedido!', token });
    });
};

// Listar todos os usuários
exports.read = (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar usuários.' });
        res.send(results);
    });
};

// Atualizar um usuário
exports.update = (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    const sql = 'UPDATE usuarios SET username = ?, password = ? WHERE id = ?';
    db.query(sql, [username, hash, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        res.send({ message: 'Usuário atualizado com sucesso!' });
    });
};

// Deletar um usuário
exports.delete = (req, res) => {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar usuário.' });
        res.send({ message: 'Usuário deletado com sucesso!' });
    });
};

module.exports = router;
