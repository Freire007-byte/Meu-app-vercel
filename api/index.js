const ccxt = require('ccxt');
module.exports = async (req, res) => {
    const exchange = new ccxt.binance({ enableRateLimit: true });
    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        res.status(200).json({ btc_price: ticker.last });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
