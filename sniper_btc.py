import requests, time, os

TRIGGER_BTC = 71100.00
ALVO_FINAL = 72000.00

print("🛡️ SENTINELA BITCOIN - ALVO 72K ATIVADO")

while True:
    try:
        url = "https://api.gateio.ws/api/v4/futures/usdt/tickers?settle=usdt&contract=BTC_USDT"
        r = requests.get(url, timeout=5).json()
        price = float(r[0]['last_price'])
        
        os.system('clear')
        distancia = round(TRIGGER_BTC - price, 2)
        
        print(f"""
        🛡️ --- RADAR BITCOIN (BTC) --- 🛡️
        ESTADO: VIGILÂNCIA DE ROMPIMENTO
        -----------------------------------
        PREÇO ATUAL: $ {price}
        GATILHO ENTRADA: $ {TRIGGER_BTC}
        ALVO DE LUCRO: $ {ALVO_FINAL}
        -----------------------------------
        FALTAM: $ {distancia} PARA O TIRO!
        """)

        if price >= TRIGGER_BTC:
            print("\n🚀 !!! ROMPIMENTO BTC !!! DISPARANDO...")
            break
        time.sleep(2)
    except:
        time.sleep(2)
