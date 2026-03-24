const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        enableRateLimit: true
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const balance = await exchange.fetchBalance();
        const usdtFree = (balance.total && balance.total['USDT']) ? balance.total['USDT'] : 0;

        res.status(200).json({
            status: "ATIVO - ANALISANDO COMPRA",
            btc_price: ticker.last,
            wallet: usdtFree.toFixed(2),
            estrategia: "SCALPER 1% AGRESSIVO",
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        res.status(500).json({ error: "Erro na API: " + e.message });
    }
};
// Update: Tue Mar 24 13:33:57 UTC 2026
