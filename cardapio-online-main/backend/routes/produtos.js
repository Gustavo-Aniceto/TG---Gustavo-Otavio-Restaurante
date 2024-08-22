// backend/routes/produtos.js
const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const upload = require('../middlewares/multerConfig');



// Rota para listar todos os produtos
router.get('/produtos', produtosController.listarProdutos);

// Rota para adicionar um novo produto
router.post('/produtos', produtosController.adicionarProduto);

// Rota para atualizar um produto
router.put('/produtos/:id', produtosController.atualizarProduto);

// Rota para deletar um produto
router.delete('/produtos/:id', produtosController.deletarProduto);

// Rota para obter produtos por categoria
router.get('/produtos/categoria/:categoria_id', produtosController.getProdutosPorCategoria);


module.exports = router;