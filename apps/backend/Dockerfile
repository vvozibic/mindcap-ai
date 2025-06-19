
FROM node:18

WORKDIR /app
COPY . .

# Устанавливаем pnpm и зависимости
RUN npm install -g pnpm && pnpm install

# Сборка серверного кода (предполагается, что Vite используется)
RUN pnpm build

EXPOSE 3001

CMD ["node", "dist/server.js"]
