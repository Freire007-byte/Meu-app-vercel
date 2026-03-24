const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.binance({
        apiKey: process.env.BINANCE_KEY,
        secret: process.env.BINANCE_SECRET,
        enableRateLimit: true
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const preco = ticker.last;

        // LÓGICA DE TRADE (EXEMPLO):
        // Se o preço cair 1% em relação à última média, o robô compra.
        // Se subir 0.5%, o robô realiza o lucro.
        
        const status_ia = 'Analisando Tendência...';

        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            // Mantém o seu Dashboard bonito funcionando
            res.setHeader('Content-Type', 'text/html');
            return res.send(`Dashboard HTML Aqui...`); 
        }

        res.status(200).json({ btc_price: preco, status: status_ia });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
