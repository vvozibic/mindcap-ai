FROM node:20

# Устанавливаем Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Рабочая директория
WORKDIR /app

# Копируем все файлы монорепы
COPY . .

# Установка зависимостей
RUN yarn install

# Сборка фронта
RUN yarn --cwd apps/frontend build

# Сборка бэкенда
RUN yarn --cwd apps/backend build

# Генерация Prisma
RUN yarn --cwd apps/backend generate

RUN echo "--- Contents of dist ---" && ls -la /app/apps/backend/dist
RUN echo "ENV CONTENTS:" && env

# Запуск backend
WORKDIR /app/apps/backend
CMD ["node", "dist/server.js"]

EXPOSE 3001
