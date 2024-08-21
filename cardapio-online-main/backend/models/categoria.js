const db = require('../config/db');

const Categoria = {
    criar: (novaCategoria, callback) => {
        const sql = 'INSERT INTO categorias SET ?';
        db.query(sql, novaCategoria, callback);
    },

    buscarTodas: (callback) => {
        const sql = 'SELECT * FROM categorias';
        db.query(sql, callback);
    }
};

module.exports = Categoria;
