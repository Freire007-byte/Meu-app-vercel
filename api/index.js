const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        enableRateLimit: true,
        timeout: 20000
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const balance = await exchange.fetchBalance();
        
        // Garante que se não houver saldo, ele retorne 0.00 em vez de erro
        const totalUSDT = (balance && balance.total && balance.total['USDT']) ? balance.total['USDT'] : 0;

        res.status(200).json({
            status: "ATIVO - ANALISANDO",
            btc_price: ticker.last || 0,
            wallet: parseFloat(totalUSDT).toFixed(2),
            estrategia: "SCALPER 1% AGRESSIVO"
        });
    } catch (e) {
        // Se houver erro de API, ele mostra no lugar do preço para você saber o que é
        res.status(200).json({
            status: "ERRO DE API",
            btc_price: "0.00",
            wallet: "0.00",
            estrategia: "ERRO: " + e.message.substring(0, 20)
        });
    }
};
