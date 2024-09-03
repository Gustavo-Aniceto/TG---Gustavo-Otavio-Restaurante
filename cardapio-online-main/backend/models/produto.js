// models/Produto.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Produto extends Model {}

Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    categoriaId: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'Produto',
});

Produto.associate = (models) => {
    Produto.belongsTo(models.Categoria, { as: 'categoria', foreignKey: 'categoriaId' });
};

module.exports = Produto;