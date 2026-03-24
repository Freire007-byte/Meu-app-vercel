const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        enableRateLimit: true
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const preco = ticker.last;
        
        // Ajustando para 1.2% para garantir 1% de lucro LIMPO após taxas
        const alvoReal = preco * 1.012; 
        const protecao = preco * 0.98;

        res.status(200).json({
            status: "CAÇANDO LUCRO LIMPO",
            btc_now: preco.toFixed(2),
            meta_com_taxa: alvoReal.toFixed(2),
            stop_loss: protecao.toFixed(2),
            obs: "Alvo ajustado para cobrir 0.2% de taxas"
        });
    } catch (e) {
        res.status(200).json({ status: "ERRO", msg: "Ajuste as chaves na Vercel" });
    }
};
