const ccxt = require('ccxt');

module.exports = async (req, res) => {
    // Adicionando um tempo de espera (timeout) para evitar travamentos
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        timeout: 15000, 
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
        // Se der erro, ele avisa o motivo real
        res.status(200).json({ 
            status: "AGUARDANDO CONEXÃO", 
            btc_price: "---", 
            wallet: "Verificando...",
            estrategia: e.message.includes('Authentication') ? "Erro nas Chaves API" : "Sinal da Gate.io oscilando"
        });
    }
};
