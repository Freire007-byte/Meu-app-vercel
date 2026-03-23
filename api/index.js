const ccxt = require('ccxt');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const binance = new ccxt.binance();
    const ticker = await binance.fetchTicker('BTC/USDT');
    return res.status(200).json({ btc_price: ticker.last });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
