const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ auth: false, message: 'Nenhum token fornecido' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token' });
        }

        req.userId = decoded.id;
        next();
    });
};
