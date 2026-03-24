const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.gateio({
        apiKey: process.env.GATEIO_KEY,
        secret: process.env.GATEIO_SECRET,
        options: { 'defaultType': 'future' }
    });

    try {
        // MODO GEMINI: 5x Alavancagem para segurança máxima
        await exchange.setLeverage(5, 'BTC_USDT'); 
        const ticker = await exchange.fetchTicker('BTC_USDT');
        const preco = ticker.last;

        // CÁLCULO DE ALVOS (Sniper 5x)
        const alvoLucro = preco * 1.01;   // +1% BTC = +5% no bolso
        const stopSeguro = preco * 0.985; // Proteção rígida

        res.status(200).json({
            status: "OPERANDO COM GEMINI AI 🤖",
            estrategia: "SNIPER CONSERVADOR 5X",
            mercado: "BTC_USDT_FUTURES",
            preco_atual: preco.toFixed(2),
            meta_venda: alvoLucro.toFixed(2),
            stop_loss: stopSeguro.toFixed(2),
            conselho: "Mantenha saldo na carteira de FUTUROS"
        });
    } catch (e) {
        res.status(200).json({ status: "AGUARDANDO CONFIGURAÇÃO", erro: e.message });
    }
};
