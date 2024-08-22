const Produto = require('../models/produto');

exports.listarProdutos = (req, res) => {
    Produto.findAll()
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).json({ message: 'Erro ao listar produtos.' }));
};

exports.adicionarProduto = (req, res) => {
    Produto.create(req.body)
        .then(produto => res.status(201).json(produto))
        .catch(err => res.status(500).json({ message: 'Erro ao adicionar produto.' }));
};

exports.atualizarProduto = (req, res) => {
    Produto.update(req.body, { where: { id: req.params.id } })
        .then(() => res.json({ message: 'Produto atualizado com sucesso!' }))
        .catch(err => res.status(500).json({ message: 'Erro ao atualizar produto.' }));
};

exports.deletarProduto = (req, res) => {
    Produto.destroy({ where: { id: req.params.id } })
        .then(() => res.json({ message: 'Produto deletado com sucesso!' }))
        .catch(err => res.status(500).json({ message: 'Erro ao deletar produto.' }));
};

exports.getProdutosPorCategoria = (req, res) => {
    Produto.findAll({ where: { categoria_id: req.params.categoria_id } })
        .then(produtos => res.json(produtos))
        .catch(err => res.status(500).json({ message: 'Erro ao buscar produtos da categoria.' }));
};
