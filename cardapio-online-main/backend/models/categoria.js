// models/Categoria.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Categoria extends Model {}

Categoria.init({
    nome: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Categoria',
});

Categoria.associate = (models) => {
    Categoria.hasMany(models.Produto, { as: 'produtos', foreignKey: 'categoriaId' });
};

module.exports = Categoria;
