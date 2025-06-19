
# 🧠 Attention.fi — Monorepo

A project that tracks and visualizes the influence of key opinion leaders on crypto projects. It includes:
- `backend`: Express + Prisma + SQLite + Auth
- `frontend`: leaderboard site
- `admin`: management panel

---

## 📦 Structure

```
attention-fi/
├── apps/
│   ├── backend/     # Express API
│   ├── frontend/    # Public website
│   └── admin/       # Admin panel
├── package.json     # workspaces
├── pnpm-workspace.yaml
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
pnpm install
```

> If you don't have `pnpm` yet:  
> `npm install -g pnpm`

---

### 2. Setup `.env`

Create `.env` inside `apps/backend`:
```env
PORT=3000
JWT_SECRET=supersecretkey
```

---

### 3. Setup and run the database
```bash
cd apps/backend
pnpm prisma generate
pnpm prisma migrate dev --name init
```

---

### 4. (Optional) Seed admin user
```ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: { username: 'admin', password: hash, role: 'admin' },
  })
}
main()
```

---

### 5. Run

#### Backend API
```bash
cd apps/backend
pnpm dev
```

#### Frontend and Admin
```bash
cd apps/frontend
pnpm dev

cd apps/admin
pnpm dev
```

---

## ✨ TODO
- [ ] Integrate Twitter API
- [ ] Setup cron jobs
- [ ] Add user roles
- [ ] Deploy backend + frontend
