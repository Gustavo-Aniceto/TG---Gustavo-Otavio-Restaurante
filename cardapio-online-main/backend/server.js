const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Configure a chave do Stripe a partir da variável de ambiente

const app = express();
const port = process.env.PORT || 3000;

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
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');

// Usando as rotas
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Rota para criar uma sessão de checkout
app.post('/api/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items, // itens no formato { price: 'price_id', quantity: 1 }
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Erro ao criar a sessão de checkout:', error);
        res.status(500).json({ error: 'Erro ao criar a sessão de checkout' });
    }
});

// Rota para processar o pagamento diretamente (se necessário)
app.post('/api/pagar', async (req, res) => {
    const { amount, currency, source } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            description: 'Descrição do pagamento',
        });

        res.json(charge);
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        res.status(500).send('Erro ao processar pagamento.');
    }
});

// Rota para o webhook do Stripe
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            endpointSecret
        );

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('PaymentIntent was successful!');
                // Handle successful payment here
                break;
            case 'payment_method.attached':
                console.log('PaymentMethod was attached to a Customer!');
                // Handle payment method attachment here
                break;
            // Adicione mais tipos de eventos conforme necessário
            default:
                console.warn(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error(`Webhook error: ${err.message}`);
        res.status(400).send(`Webhook error: ${err.message}`);
    }
});

// Adicione esta rota no seu server.js
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe e a senha está correta
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao fazer login.' });
        if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });

        const user = results[0];
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Senha incorreta.' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.json({ token });
    });
});


// Rota protegida de exemplo
app.get('/api/protected-route', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acesso autorizado!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
