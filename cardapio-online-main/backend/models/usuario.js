const db = require('../config/db');

const Usuario = {
    criar: (novoUsuario, callback) => {
        const sql = 'INSERT INTO usuarios SET ?';
        db.query(sql, novoUsuario, callback);
    },

    buscarPorUsuario: (usuario, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
        db.query(sql, [usuario], callback);
    }
};

module.exports = Usuario;
