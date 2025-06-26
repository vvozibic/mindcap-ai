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

WORKDIR /app/apps/backend
RUN chmod +x docker-backend-build.sh
CMD ["./start.sh"]

EXPOSE 3001