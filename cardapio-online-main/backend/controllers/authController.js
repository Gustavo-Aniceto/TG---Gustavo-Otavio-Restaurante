const User = require('../models/usuario.js'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        const token = jwt.sign({ id: user.id }, 'seu_segredo', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login.');
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).send('Erro ao registrar usuário.');
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout realizado com sucesso!' });
};

exports.checkAuth = (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

        jwt.verify(token, 'seu_segredo', (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Token inválido.' });

            req.userId = decoded.id;
            res.status(200).json({ message: 'Autenticação válida.' });
        });
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        res.status(500).send('Erro ao verificar autenticação.');
    }
};
