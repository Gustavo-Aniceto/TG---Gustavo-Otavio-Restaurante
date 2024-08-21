const Produto = require('../models/produto');
const Categoria = require('../models/categoria');

exports.renderAdminDashboard = (req, res) => {
    try {
        res.render('admin/index'); // Renderiza a página principal do admin
    } catch (error) {
        console.error('Erro ao renderizar o painel administrativo:', error);
        res.status(500).send('Erro ao renderizar o painel administrativo.');
    }
};

exports.renderProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('admin/produtos', { produtos });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        res.status(500).send('Erro ao carregar produtos.');
    }
};

exports.renderCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.render('admin/categorias', { categorias });
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        res.status(500).send('Erro ao carregar categorias.');
    }
};
