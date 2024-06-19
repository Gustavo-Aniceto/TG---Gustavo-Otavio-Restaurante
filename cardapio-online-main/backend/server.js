const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'minha_loja'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rotas CRUD

// Create (Inserir)
app.post('/produtos', upload.single('imagem'), (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : null;
    let sql = 'INSERT INTO produtos (nome, categoria, preco, imagem) VALUES (?, ?, ?, ?)';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Produto inserido com sucesso!', id: result.insertId });
    });
});

// Read (Listar)
app.get('/produtos', (req, res) => {
    let sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update (Atualizar)
app.put('/produtos/:id', upload.single('imagem'), (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : produto.imagem;
    let sql = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, imagem = ? WHERE id = ?';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Produto atualizado com sucesso!' });
    });
});

// Delete (Deletar)
app.delete('/produtos/:id', (req, res) => {
    let sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Produto deletado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
