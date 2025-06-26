FROM node:20

# Устанавливаем tree и Yarn
RUN apt-get update && \
  corepack enable && \
  corepack prepare yarn@stable --activate

# Создаём рабочую директорию
WORKDIR /app

# Копируем всё из монорепы
COPY . .
# ENV DATABASE_URL="file:./prisma/dev.db"
ENV NODE_ENV=production

# Вывести ENV
RUN echo "🤖 ENV CONTENTS:" && env

# Установка зависимостей
RUN echo "📦 Installing dependencies..." && \
  yarn install

# Сборка фронта
RUN echo "🚧 Building frontend..." && \
  yarn --cwd apps/frontend build

# Сборка и генерация Prisma
RUN echo "🚧 Building backend..." && \
  yarn --cwd apps/backend build && \
  yarn --cwd apps/backend generate

# Применение миграций (создание dev.db)
RUN echo "🚜 Migration..." && \
  yarn --cwd apps/backend prisma migrate deploy

# Прогон сидов после генерации Prisma
RUN echo "🌱 Seeding database..." && \
  yarn --cwd apps/backend prisma db seed

# Переход в backend и запуск
WORKDIR /app/apps/backend
CMD ["node", "dist/server.js"]

EXPOSE 3001