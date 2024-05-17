const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

let foods = [];

router.post('/', upload.single('imagem'), (req, res) => {
    const { categoria, nome, preco } = req.body;
    const imagem = req.file ? req.file.path : null;
    const id = foods.length + 1;
    foods.push({ id, categoria, nome, preco, imagem });
    res.status(201).json({ message: 'Food item created', id });
});

router.get('/:id', (req, res) => {
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (food) {
        res.status(200).json(food);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
});

router.put('/:id', upload.single('imagem'), (req, res) => {
    const { id } = req.params;
    const { categoria, nome, preco } = req.body;
    const imagem = req.file ? req.file.path : null;

    let food = foods.find(f => f.id === parseInt(id));
    if (food) {
        food.categoria = categoria;
        food.nome = nome;
        food.preco = preco;
        if (imagem) food.imagem = imagem;
        res.status(200).json({ message: 'Food item updated', food });
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    foods = foods.filter(f => f.id !== parseInt(id));
    res.status(200).json({ message: 'Food item deleted' });
});

module.exports = router;
