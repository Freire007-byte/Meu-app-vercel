import requests, time, os

ALVO_SAIDA = 93.20
ENTRADA = 92.02
SALDO = 19.42

print("🛡️ MODO COMBATE LOCAL - FOCO TOTAL NO ALVO")

while True:
    try:
        url = "https://api.gateio.ws/api/v4/futures/usdt/tickers?settle=usdt&contract=SOL_USDT"
        r = requests.get(url, timeout=5).json()
        price = float(r[0]['last_price'])
        
        # Cálculo de Lucro Real (10x)
        lucro = round(SALDO * ((price - ENTRADA) / ENTRADA) * 10, 2)
        
        os.system('clear')
        print(f"""
        🛡️ --- RADAR DE ELITE (SOLANA) --- 🛡️
        ESTADO: VIGILÂNCIA DE LUCRO
        -----------------------------------
        PREÇO ATUAL: $ {price}
        LUCRO ESTIMADO: $ {lucro} USDT
        -----------------------------------
        ALVO DE SAÍDA: $ {ALVO_SAIDA}
        FALTA PARA O ALVO: $ {round(ALVO_SAIDA - price, 3)}
        -----------------------------------
        """)

        if price >= ALVO_SAIDA:
            print("\n💰 !!! ALVO ATINGIDO !!! LUCRO NO BOLSO!")
            break
        time.sleep(2)
    except:
        time.sleep(2)
