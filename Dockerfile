FROM node:20

# Устанавливаем tree и Yarn
RUN apt-get update && \
  corepack enable && \
  corepack prepare yarn@stable --activate

# Создаём рабочую директорию
WORKDIR /app

# Копируем всё из монорепы
COPY . .
ENV NODE_ENV=production

# Установка зависимостей
RUN echo "📦 Installing dependencies..." && \
  yarn install

# Сборка фронта
RUN echo "🚧 Building frontend..." && \
  yarn --cwd apps/frontend build

WORKDIR /app/apps/backend
RUN chmod +x ./scripts/docker-backend-build.sh
CMD ["./scripts/docker-backend-build.sh"]

EXPOSE 3001