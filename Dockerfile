# 1. Базовый образ
FROM node:20

# 2. Создание рабочей директории
WORKDIR /app

# 3. Копируем корневые файлы монорепы
COPY package.json yarn.lock ./

# 4. Установка зависимостей
RUN yarn install

# 5. Копируем приложения
COPY apps ./apps

# 6. Билдим frontend
WORKDIR /app/apps/frontend
RUN yarn install && yarn build

# 7. Генерируем Prisma Client и билдим backend
WORKDIR /app/apps/backend
RUN yarn install && yarn build && yarn prisma generate

# 8. Запускаем backend
CMD ["node", "dist/server.js"]

EXPOSE 3001
