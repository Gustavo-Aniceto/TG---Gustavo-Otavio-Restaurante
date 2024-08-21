const db = require('../config/db');

// Criar um novo produto
exports.create = (req, res) => {
    const produto = req.body;
    const sql = 'INSERT INTO produtos (nome, preco, categoria_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [produto.nome, produto.preco, produto.descricao, produto.categoria_id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao inserir produto.' });
        res.send({ message: 'Produto inserido com sucesso!', id: result.insertId });
    });
};

// Listar todos os produtos
exports.read = (req, res) => {
    const sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar produtos.' });
        res.send(results);
    });
};

// Atualizar um produto
exports.update = (req, res) => {
    const produto = req.body;
    const sql = 'UPDATE produtos SET nome = ?, preco = ?, categoria_id = ? WHERE id = ?';
    db.query(sql, [produto.nome, produto.preco, produto.descricao, produto.categoria_id, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar produto.' });
        res.send({ message: 'Produto atualizado com sucesso!' });
    });
};

// Deletar um produto
exports.delete = (req, res) => {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar produto.' });
        res.send({ message: 'Produto deletado com sucesso!' });
    });
};

// Obter todos os produtos de uma categoria específica
exports.getProdutosPorCategoria = (req, res) => {
    const sql = 'SELECT * FROM produtos WHERE categoria_id = ?';
    db.query(sql, [req.params.categoria_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar produtos da categoria.' });
        res.send(results);
    });
};
