FROM node:20

# Устанавливаем tree и Yarn
RUN apt-get update && apt-get install -y tree && \
  corepack enable && corepack prepare yarn@stable --activate

# Создаём рабочую директорию
WORKDIR /app

# Копируем всё из монорепы
COPY . .
ENV DATABASE_URL="file:./prisma/dev.db"

# Установка зависимостей
RUN echo "📦 Installing dependencies..." && yarn install

# Сборка фронта
RUN echo "🚧 Building frontend..." && yarn --cwd apps/frontend build

# Лог: структура фронта
RUN echo "📂 Tree of frontend after build:" && tree -L 3 apps/frontend

# Сборка и генерация Prisma
RUN echo "🚧 Building backend..." && yarn --cwd apps/backend build && yarn --cwd apps/backend generate

# Лог: структура бэкенда после сборки
RUN echo "📂 Tree of backend after build:" && tree -L 3 apps/backend

# Применение миграций (создание dev.db)
RUN yarn --cwd apps/backend prisma migrate deploy

# Опционально: вывести содержимое базы
RUN apt-get update && apt-get install -y sqlite3
RUN echo "--- Tables in dev.db ---" && sqlite3 apps/backend/prisma/dev.db ".tables"

# Вывести содержимое dist для отладки
RUN echo "--- Contents of backend/dist ---" && ls -la /app/apps/backend/dist

# Вывести ENV
RUN echo "ENV CONTENTS:" && env

# Прогон сидов после генерации Prisma
RUN echo "🌱 Seeding database..." && yarn --cwd apps/backend prisma db seed

# Переход в backend и запуск
WORKDIR /app/apps/backend
CMD ["node", "dist/server.js"]

EXPOSE 3001