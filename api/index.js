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
            wallet: parseFloat(usdtFree).toFixed(2),
            estrategia: "SCALPER 1% AGRESSIVO"
        });
    } catch (e) {
        res.status(200).json({ 
            status: "ERRO DE CONEXÃO", 
            btc_price: "0.00", 
            wallet: "Verifique API Key",
            estrategia: e.message 
        });
    }
};
