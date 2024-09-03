const { Categoria, Produto } = require('../models');

// Função para listar todas as categorias
exports.listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
};

// Função para adicionar uma nova categoria
exports.adicionarCategorias = async (req, res) => {
    try {
        const novaCategoria = await Categoria.create(req.body);
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar categoria' });
    }
};

// Função para atualizar uma categoria existente
exports.atualizarCategorias = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await categoria.update(req.body);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
};

// Função para deletar uma categoria
exports.deletarCategorias = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await categoria.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
};

// Função para listar categorias com seus produtos relacionados
exports.getCategoriasComProdutos = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            include: [{
                model: Produto, // Supondo que você tenha um relacionamento entre Categoria e Produto
                as: 'produtos'
            }]
        });
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar categorias com produtos' });
    }
};
