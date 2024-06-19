const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '021003Gu.',
    database: 'gorestaurante'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conexão bem sucedida com o ID: ' + connection.threadId);
});
