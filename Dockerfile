FROM node:20

# Устанавливаем Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Создаём рабочую директорию
WORKDIR /app

# Копируем всё из монорепы
COPY . .

# Установка зависимостей на уровне root и workspaces
RUN yarn install

# Сборка frontend (vite build)
RUN yarn --cwd apps/frontend build

# Сборка backend
RUN yarn --cwd apps/backend build
RUN yarn --cwd apps/backend generate

# Поднимаем миграции (создаём таблицы в dev.db)
RUN yarn --cwd apps/backend prisma migrate deploy

# Убедимся, что база включена в образ
# Копируем явно если нужно
COPY apps/backend/prisma/dev.db apps/backend/prisma/dev.db

# Вывод содержимого dist и ENV (для отладки)
RUN echo "--- Contents of backend/dist ---" && ls -la /app/apps/backend/dist
RUN echo "--- Contents of prisma ---" && ls -la /app/apps/backend/prisma
RUN echo "ENV CONTENTS:" && env
RUN echo "--- DB file ---" && ls -la /app/apps/backend/prisma/dev.db
# RUN apt-get update && apt-get install -y sqlite3
# RUN sqlite3 /app/apps/backend/prisma/dev.db ".tables"

# Переходим в backend
WORKDIR /app/apps/backend

# Прокидываем порт
EXPOSE 3001

# Запуск backend
CMD ["node", "dist/server.js"]
