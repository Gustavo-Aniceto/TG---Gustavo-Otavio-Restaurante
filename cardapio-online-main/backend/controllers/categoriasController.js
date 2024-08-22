const db = require('../config/db');

// Criar uma nova categoria
exports.adicionarCategorias = (req, res) => {
    const categoria = req.body;
    const sql = 'INSERT INTO categorias (nome) VALUES (?)';
    db.query(sql, [categoria.nome], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao inserir categoria.' });
        res.send({ message: 'Categoria inserida com sucesso!', id: result.insertId });
    });
};

// Listar todas as categorias
exports.listarCategorias = (req, res) => {
    const sql = 'SELECT * FROM categorias';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar categorias.' });
        res.send(results);
    });
};

// Atualizar uma categoria
exports.atualizarCategorias = (req, res) => {
    const categoria = req.body;
    const sql = 'UPDATE categorias SET nome = ? WHERE id = ?';
    db.query(sql, [categoria.nome, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar categoria.' });
        res.send({ message: 'Categoria atualizada com sucesso!' });
    });
};

// Deletar uma categoria
exports.deletarCategorias = (req, res) => {
    const sql = 'DELETE FROM categorias WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar categoria.' });
        res.send({ message: 'Categoria deletada com sucesso!' });
    });
};

// Obter categorias com seus respectivos produtos
exports.getCategoriasComProdutos = async (req, res) => {
    try {
        const sql = `
            SELECT c.nome AS categoria, p.*
            FROM categorias c
            LEFT JOIN produtos p ON c.id = p.categoria_id
            ORDER BY c.nome, p.nome
        `;
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ message: 'Erro ao buscar categorias e produtos.' });
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar categorias e produtos", error });
    }
};
