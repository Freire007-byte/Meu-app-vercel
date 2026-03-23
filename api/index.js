const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.binance({
        apiKey: process.env.BINANCE_KEY,
        secret: process.env.BINANCE_SECRET,
        enableRateLimit: true
    });

    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const preco = ticker.last;
        
        // MINHA ESTRATÉGIA DE IA:
        // Se cair 1.5% da média recente -> EU COMPRO
        // Se subir 0.8% do meu preço de compra -> EU VENDO
        
        let decisaoIA = 'ANALISANDO TENDÊNCIA...';
        let corStatus = 'text-blue-400';

        // Lógica de Execução (Exemplo Simulado)
        if (preco < 67500) { 
            decisaoIA = '⚡ OPORTUNIDADE: COMPRANDO AGORA!';
            corStatus = 'text-green-400';
            // await exchange.createMarketOrder('BTC/USDT', 'buy', 0.001);
        } else if (preco > 71000) {
            decisaoIA = '🔥 LUCRO NO ALVO: VENDENDO!';
            corStatus = 'text-red-400';
            // await exchange.createMarketOrder('BTC/USDT', 'sell', 0.001);
        }

        res.status(200).json({
            operador: 'Gemini Trader AI',
            status: 'Ativo 24/7',
            btc_price: preco,
            insight: decisaoIA,
            cor: corStatus,
            timestamp: new Date().toISOString()
        });
    } catch (e) {
        res.status(500).json({ erro: 'Falha na conexão com a Exchange' });
    }
};
