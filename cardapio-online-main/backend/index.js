const connection = require('./database');

// Exemplo de consulta
connection.query('SELECT * FROM Burguers', (err, results) => {
  if (err) {
    console.error('Erro na consulta:', err.stack);
    return;
  }
  console.log('Resultados da consulta:', results);
});

// Fechar a conexão
connection.end();
