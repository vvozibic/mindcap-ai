#!/bin/bash

set -e

echo "🛠 Сборка frontend..."
cd ../frontend
pnpm install
pnpm build
cp -r dist ../backend/public

echo "🛠 Сборка admin..."
cd ../admin
pnpm install
pnpm build
cp -r dist ../backend/admin

echo "🚀 Деплой на Fly.io"
cd ../backend
fly deploy
