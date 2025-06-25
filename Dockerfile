FROM node:20

# Устанавливаем Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Создаём рабочую директорию
WORKDIR /app

# Копируем всё из монорепы
COPY . .

# Установка зависимостей на уровне root и workspaces
RUN yarn install

ENV DATABASE_URL="file:./prisma/dev.db"

# Сборка frontend (vite build)
RUN yarn --cwd apps/frontend build

# Сборка backend
RUN yarn --cwd apps/backend build
RUN yarn --cwd apps/backend generate

# Применение миграций (создание dev.db)
RUN yarn --cwd apps/backend prisma migrate deploy

# Опционально: вывести содержимое базы
RUN apt-get update && apt-get install -y sqlite3
RUN echo "--- Tables in dev.db ---" && sqlite3 apps/backend/prisma/dev.db ".tables"

# Вывести содержимое dist для отладки
RUN echo "--- Contents of backend/dist ---" && ls -la /app/apps/backend/dist

# Вывести ENV
RUN echo "ENV CONTENTS:" && env

RUN yarn --cwd apps/backend seed

# Переход в backend и запуск
WORKDIR /app/apps/backend
CMD ["node", "dist/server.js"]

EXPOSE 3001