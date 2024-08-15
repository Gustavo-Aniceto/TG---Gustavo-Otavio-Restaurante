// backend/routes/produtos.js
const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const upload = require('../middlewares/multerConfig');

router.get('/', produtosController.read);
router.post('/', upload.single('imagem'), produtosController.create);
router.put('/:id', upload.single('imagem'), produtosController.update);
router.delete('/:id', produtosController.delete);
router.get('/categoria/:id', produtosController.getProdutosByCategoria);

module.exports = router;