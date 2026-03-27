#!/bin/sh
echo "🚀 Iniciando deploy via iSH..."
git add .
git commit -m "update: $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Push concluído! Acompanhe na Vercel."
