const https = require('https');

module.exports = (req, res) => {
    const options = {
      hostname: 'api.coingecko.com',
      path: '/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };

    https.get(options, (apiRes) => {
        let body = '';
        apiRes.on('data', (d) => { body += d; });
        apiRes.on('end', () => {
            const json = JSON.parse(body);
            res.status(200).json({
                status: 'Bot Ativo',
                btc_price: json.bitcoin.usd,
                time: new Date().toISOString()
            });
        });
    }).on('error', (e) => {
        res.status(500).json({ error: e.message });
    });
};
