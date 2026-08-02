#!/bin/bash
# Script para ejecutar Django en red local
# Uso: ./backend_run.sh

echo ""
echo "============================================"
echo "   Servidor Backend Django - Red Local"
echo "============================================"
echo ""

# Obtener la IP local
IP=$(hostname -I | awk '{print $1}')

# Si no funciona el comando anterior, intenta con ifconfig
if [ -z "$IP" ]; then
    IP=$(ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}' | head -1)
fi

echo "Tu IP local es: $IP"
echo ""
echo "Iniciando Django en: http://$IP:8000/api/"
echo ""

cd c:/proyecto/DJANGOREST/backend
python manage.py runserver $IP:8000
