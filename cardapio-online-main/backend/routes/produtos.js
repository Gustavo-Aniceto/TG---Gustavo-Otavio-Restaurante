const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const upload = require('../middlewares/multerConfig'); // Mova a configuração do multer para um middleware separado

// Rotas de Produtos
router.get('/produtos', produtosController.read);
router.post('/produtos', produtosController.create);
router.put('/produtos/:id', produtosController.update);
router.delete('/produtos/:id', produtosController.delete);
router.get('/produtos/categoria', produtosController.getProdutosByCategoria);
router.get('/produtos/categoria/:id', produtosController.getProdutosByCategoria);


module.exports = router;