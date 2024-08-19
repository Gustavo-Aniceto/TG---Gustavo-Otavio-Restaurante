const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Usuario = sequelize.define('Usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Usuario;
