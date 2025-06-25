# 1. Базовый образ
FROM node:20

# # 2. Установка pnpm
# RUN npm install -g pnpm

# # 3. Создание рабочей директории
# WORKDIR /app

# # 4. Копируем корневые файлы монорепы
# COPY pnpm-workspace.yaml ./
# COPY pnpm-lock.yaml ./
# COPY package.json ./

# # 5. Установка зависимостей на уровне корня (workspace)
# RUN pnpm install

# # 6. Копируем backend-приложение
# COPY apps/backend ./apps/backend
# # COPY apps/backend/.env ./apps/backend/.env

# # 7. Копируем frontend-приложение и билдим его
# COPY apps/frontend ./apps/frontend
# WORKDIR /app/apps/frontend
# RUN pnpm install && pnpm build

# # 8. Возвращаемся в backend и билдим backend
# WORKDIR /app/apps/backend
# RUN pnpm install
# RUN pnpm prisma generate

# # 9. Запускаем backend
# CMD ["pnpm", "dev"]

# EXPOSE 3001