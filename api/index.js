const ccxt = require('ccxt');
module.exports = async (req, res) => {
    try {
        const exchange = new ccxt.binance();
        const ticker = await exchange.fetchTicker('BTC/USDT');
        res.status(200).json({ btc_price: ticker.last, status: 'Bot Online' });
    } catch (e) {
        res.status(500).json({ error: 'Erro na API' });
    }
};
