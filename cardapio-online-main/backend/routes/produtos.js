const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const upload = require('../middlewares/multerConfig'); // Mova a configuração do multer para um middleware separado

// Rotas CRUD
router.post('/', upload.single('imagem'), produtosController.create);
router.get('/', produtosController.read);
router.put('/:id', upload.single('imagem'), produtosController.update);
router.delete('/:id', produtosController.delete);

module.exports = router;


