const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const db = require('../config/db'); // Se necessário, configure a conexão do banco em um arquivo separado

router.get('/produtos', produtosController.getProdutosByCategoria);

module.exports = router;


exports.create = (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : null;
    let sql = 'INSERT INTO produtos (nome, categoria, preco, imagem) VALUES (?, ?, ?, ?)';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao inserir produto.' });
        res.send({ message: 'Produto inserido com sucesso!', id: result.insertId });
    });
};

exports.read = (req, res) => {
    let sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar produtos.' });
        res.send(results);
    });
};

exports.update = (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : produto.imagem;
    let sql = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, imagem = ? WHERE id = ?';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar produto.' });
        res.send({ message: 'Produto atualizado com sucesso!' });
    });
};

exports.delete = (req, res) => {
    let sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar produto.' });
        res.send({ message: 'Produto deletado com sucesso!' });
    });
};
const Produto = require('../models/produto'); // Modelo do produto

// produtosController.js

exports.getProdutosByCategoria = (req, res) => {
    const categoriaId = req.params.id;

    // Supondo que você esteja usando um ORM, algo como:
    Produto.findAll({ where: { categoriaId: categoriaId } })
        .then(produtos => {
            res.json(produtos);
        })
        .catch(error => {
            res.status(500).json({ error: 'Erro ao buscar produtos por categoria' });
        });
};

