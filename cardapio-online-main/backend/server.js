const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurar o body-parser para ler JSON
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '021003Gu.',
  database: 'Burguer'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Endpoint para inserir dados na tabela 'usuarios'
app.post('/cadastro', (req, res) => {
  const { id, name, img, dsc, price  } = req.body;
  const query = 'INSERT INTO cadastro (id, name, img, dsc,price) VALUES (?, ?, ?, ? ,?)';

  db.query(query, [id, name, img, dsc, price ], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
      return;
    }
    res.status(201).send('Usuário criado com sucesso');
  });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  