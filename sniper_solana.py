import gate_api
import requests
import time
import os

# --- CONFIGURAÇÃO DE COMANDO SOLANA ---
API_KEY = "53a27f382613b8dafdf942077815101f"
API_SECRET = "SUA_SECRET_KEY_AQUI"
SYMBOL = "SOL_USDT"
TRIGGER_PRICE = 92.00  
LEVERAGE = 5

configuration = gate_api.Configuration(key=API_KEY, secret=API_SECRET)
api_client = gate_api.ApiClient(configuration)
futures_api = gate_api.FuturesApi(api_client)

def get_sol_price():
    try:
        url = "https://api.gateio.ws/api/v4/futures/usdt/tickers?settle=usdt&contract=SOL_USDT"
        r = requests.get(url).json()
        return float(r[0]['last_price'])
    except:
        return 0

def abrir_ordem_sol():
    try:
        # Ordem de mercado 5x na Solana
        order = gate_api.FuturesOrder(contract="SOL_USDT", size=10, price="0", tif="ioc") 
        futures_api.create_futures_order("usdt", order)
        return True
    except Exception as e:
        print(f"Erro na Solana: {e}")
        return False

print("🛡️ SNIPER SOLANA - MODO CAÇA ATIVADO")

while True:
    try:
        price = get_sol_price()
        if price == 0: continue
        
        os.system('clear')
        print(f"--- RADAR SOLANA (SOL) ---")
        print(f"PREÇO ATUAL: ${price}")
        print(f"ALVO DO TIRO: ${TRIGGER_PRICE}")
        print(f"FALTAM: ${round(TRIGGER_PRICE - price, 3)} PARA O ROMPIMENTO")
        
        if price >= TRIGGER_PRICE:
            print("🚀 SOLANA ROMPEU! EXECUTANDO 5X...")
            if abrir_ordem_sol():
                print("✅ MISSÃO CUMPRIDA! POSIÇÃO SOL ABERTA.")
                break
        
        time.sleep(1) 

    except Exception as e:
        time.sleep(3)
