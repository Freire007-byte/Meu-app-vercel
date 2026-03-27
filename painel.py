import os, time
from datetime import datetime

def desenhar():
    os.system('clear')
    agora = datetime.now().strftime('%H:%M:%S')
    print("="*40)
    print("🛡️  GEMINI SNIPER AI - TORRE DE COMANDO")
    print(f"   STATUS: ONLINE | HORA: {agora}")
    print("="*40)
    print(f"💰 SALDO: $ 19.42 USDT | MODO: FUTUROS")
    print(f"🎯 ALVO: BTC/USDT:USDT | GATILHO: $ 72.000")
    print("-" * 40)
    print(f"[{agora}] Sniper pronto para o rompimento!")

try:
    while True:
        desenhar()
        time.sleep(5)
except:
    print("\nSaindo...")
