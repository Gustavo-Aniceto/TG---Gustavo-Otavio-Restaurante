const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
});

module.exports = Produto;
