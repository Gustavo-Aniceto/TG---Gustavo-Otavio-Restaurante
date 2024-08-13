const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;
const Stripe = require('stripe');
const stripe = Stripe('Aniceto');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const produtosRoutes = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');
const usersRoutes = require('./routes/users');


// Usando as rotas
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/users', usersRoutes);


app.post('/api/pagar', async (req, res) => {
    try {
        const { amount, currency, source } = req.body;

        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description: 'Descrição do pagamento',
        });

        res.json(charge);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
});



// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
