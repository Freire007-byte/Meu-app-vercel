const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        enableRateLimit: true
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const precoAtual = ticker.last;
        
        // --- LÓGICA DE SCALPER 1% ---
        const alvoLucro = precoAtual * 1.01; 
        const stopLoss = precoAtual * 0.98; // Proteção: vende se cair 2%

        res.status(200).json({
            status: "ANALISANDO MERCADO",
            btc_price: precoAtual,
            compra_em: precoAtual.toFixed(2),
            venda_em: alvoLucro.toFixed(2),
            protecao: stopLoss.toFixed(2),
            estrategia: "SCALPER 1% ATIVADO"
        });
    } catch (e) {
        res.status(200).json({ status: "ERRO", erro: e.message });
    }
};
