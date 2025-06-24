#!/bin/bash

# Прибиваем занятые порты
for port in 5173 5174 3001; do
  PID=$(lsof -ti tcp:$port)
  if [ -n "$PID" ]; then
    echo "🔴 Killing process on port $port (PID: $PID)..."
    kill -9 $PID
  fi
done

# Запускаем фронт и админку
pnpm --filter frontend dev -- --port 5173 &> /dev/null &

# Ждём чуть-чуть, чтобы они успели стартовать
sleep 2

# Запускаем backend
pnpm --filter backend dev &

# Ждём, пока поднимется Express
sleep 2

# Запускаем ngrok
echo "🌐 Пробрасываем порт через ngrok..."
ngrok http 3001
