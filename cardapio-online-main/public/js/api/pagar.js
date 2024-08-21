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
