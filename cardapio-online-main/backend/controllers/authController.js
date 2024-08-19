const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const authConfig = require('../config/auth');

// Controlador para login
exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const user = await Usuario.findOne({ where: { usuario } });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return res.json({ auth: true, token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

// Controlador para registro de novos usuários (opcional)
exports.register = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const hash = await bcrypt.hash(senha, 10);
        const newUser = await Usuario.create({ usuario, senha: hash });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};
