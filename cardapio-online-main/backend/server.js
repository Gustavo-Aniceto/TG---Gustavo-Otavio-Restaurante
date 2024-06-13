const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'meu_site'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
