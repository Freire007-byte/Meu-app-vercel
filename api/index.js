const ccxt = require('ccxt');

module.exports = async (req, res) => {
    const exchange = new ccxt.binance({ enableRateLimit: true });
    
    try {
        const ticker = await exchange.fetchTicker('BTC/USDT');
        const preco = ticker.last;

        // Se o navegador pedir a página (HTML)
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            res.setHeader('Content-Type', 'text/html');
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <script src='https://cdn.tailwindcss.com'></script>
                    <title>Gemini AI Trader</title>
                </head>
                <body class='bg-[#0a0a0a] text-white font-mono flex items-center justify-center min-h-screen'>
                    <div class='p-10 bg-[#111] rounded-[40px] border border-zinc-800 shadow-2xl w-full max-w-sm text-center'>
                        <div class='flex justify-between items-center mb-10'>
                            <span class='text-[10px] bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20'>GEMINI AI ACTIVE</span>
                            <div class='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        </div>
                        <h1 class='text-xs text-zinc-500 mb-2 uppercase tracking-widest'>Monitorando BTC/USDT</h1>
                        <div class='text-5xl font-black mb-10 tracking-tighter text-blue-500'>${preco.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                        <div class='grid grid-cols-2 gap-4 text-[10px] text-zinc-600'>
                            <div class='bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50'>
                                <p>STATUS</p>
                                <p class='text-zinc-300 font-bold'>OPERANDO</p>
                            </div>
                            <div class='bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50'>
                                <p>IA INSIGHT</p>
                                <p class='text-green-500 font-bold'>HOLD</p>
                            </div>
                        </div>
                    </div>
                    <script>setTimeout(() => location.reload(), 10000);</script>
                </body>
                </html>
            `);
        }

        // Se for uma chamada de sistema (JSON)
        res.status(200).json({ btc_price: preco, status: 'Bot Ativo' });

    } catch (e) {
        res.status(500).send('Erro na conexão com a Exchange');
    }
};
