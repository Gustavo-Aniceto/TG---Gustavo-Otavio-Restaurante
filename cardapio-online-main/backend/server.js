const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '021003Gu.',
    database: 'gorestaurante'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
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

// Endpoint de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
        }

        if (results.length > 0) {
            const user = results[0];
            
            // Verificar a senha
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao verificar a senha.' });
                }

                if (isMatch) {
                    // Gerar um token JWT
                    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

                    return res.json({ message: 'Login bem-sucedido!', token });
                } else {
                    return res.status(401).json({ message: 'Senha incorreta.' });
                }
            });
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    });
});

// Rotas CRUD para produtos

// Create (Inserir)
app.post('/produtos', upload.single('imagem'), (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : null;
    let sql = 'INSERT INTO produtos (nome, categoria, preco, imagem) VALUES (?, ?, ?, ?)';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao inserir produto.' });
        res.send({ message: 'Produto inserido com sucesso!', id: result.insertId });
    });
});

// Read (Listar)
app.get('/produtos', (req, res) => {
    let sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar produtos.' });
        res.send(results);
    });
});

// Update (Atualizar)
app.put('/produtos/:id', upload.single('imagem'), (req, res) => {
    let produto = req.body;
    let imagem = req.file ? req.file.path : produto.imagem;
    let sql = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, imagem = ? WHERE id = ?';
    db.query(sql, [produto.nome, produto.categoria, produto.preco, imagem, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar produto.' });
        res.send({ message: 'Produto atualizado com sucesso!' });
    });
});

// Delete (Deletar)
app.delete('/produtos/:id', (req, res) => {
    let sql = 'DELETE FROM produtos WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar produto.' });
        res.send({ message: 'Produto deletado com sucesso!' });
    });
});

// Rota para listar categorias
app.get('/api/categorias', (req, res) => {
    let sql = 'SELECT id, nome FROM categorias';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao listar categorias.' });
        res.json(results);
    });
});

// Rota para verificar se um usuário específico existe
app.get('/check-user/:username', (req, res) => {
    const { username } = req.params;
    
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
        }

        if (results.length > 0) {
            return res.json(results[0]);  // Retorna o primeiro (e único) resultado
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
