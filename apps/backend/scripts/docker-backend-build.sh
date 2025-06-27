#!/bin/sh
echo "✅ Script docker-backend-build.sh started"
env

cd /app/apps/backend

echo "🤖 ENV CONTENTS:"
env

echo "🚧 Building backend..."
yarn build
yarn generate

# echo "🚜 Running migrations..."
# yarn prisma migrate deploy

# echo "🌱 Seeding data..."
# yarn prisma db seed

echo "🚀 Starting server..."
node dist/server.js
