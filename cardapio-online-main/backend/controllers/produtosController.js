const Produto = require('../models/produto');

exports.create = async (req, res) => {
    try {
        const produto = await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco,
            imagem: req.file ? req.file.path : null,
            categoria_id: req.body.categoria_id
        });
        res.status(201).json({ message: 'Produto criado com sucesso!', id: produto.id });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar produto.' });
    }
};

exports.read = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar produtos.' });
    }
};

exports.update = async (req, res) => {
    try {
        await Produto.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Produto atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
};

exports.delete = async (req, res) => {
    try {
        await Produto.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Produto deletado com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
};

exports.getProdutosByCategoria = async (req, res) => {
    try {
        const produtos = await Produto.findAll({ where: { categoria_id: req.params.id } });
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos por categoria.' });
    }
};
