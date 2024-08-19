const Usuario = require('./usuario');
const Produto = require('./produto');
const Categoria = require('./categoria');

// Associações
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = {
    Usuario,
    Produto,
    Categoria,
};
