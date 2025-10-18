# 🚀 Asteroid Typing Game

**currently in the  process of coverting Full Stack app into and typescript react full stack app**

A full-stack typing game where words fall like asteroids, and you must type them to destroy them. This project demonstrates React + TypeScript frontend, Node + TypeScript backend, Prisma ORM, and MySQL database integration. Built for personal learning and modern web development practice..   

---
### 🎮 Features
- Words fall like asteroids — type them correctly to destroy them.
- Shooting projectile effect when a word is destroyed.
- Score tracking with a persistent leaderboard.
- Backend API for words and scores.
- Database integration for storing words and high scores.

---

### 🏗️ Project Structure
```
AsteroidGame/
├── assets/                        # Game images, sounds, fonts
│   ├── backgroundmusic.mp3
│   ├── lifebar.png
│   ├── background.jpg
│   ├── typeError.mp3
│   └── wireframe.wav
│
├── backend/                       # Node.js + TypeScript backend
│   ├── package.json               # NPM config
│   ├── tsconfig.json              # TypeScript config
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.ts                # Optional seed script
│   └── src/
│       ├── index.ts               # Server entry point
│       ├── app.ts                 # Express app setup
│       ├── routes/
│       │   ├── wordRoutes.ts      # Words API
│       │   └── scoreRoutes.ts     # Scores API
│       ├── controllers/
│       │   ├── wordController.ts
│       │   └── scoreController.ts
│       ├── services/
│       │   ├── wordService.ts
│       │   └── scoreService.ts
│       └── utils/
│           └── db.ts              # Prisma client instance
│
└── frontend/                       # React + TypeScript frontend
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.tsx              # React entry point
        ├── App.tsx                # Main App component
        ├── components/            # Reusable UI/game components
        │   ├── Game.tsx
        │   ├── Leaderboard.tsx
        │   └── ScoreDisplay.tsx
        ├── hooks/                 # Custom React hooks
        ├── api/                   # API calls
        │   ├── wordApi.ts
        │   └── scoreApi.ts
        ├── types/                 # TypeScript interfaces & types
        │   └── gameTypes.ts
        └── assets/                # Optional game assets for frontend
                    
```


---

### 📜 License

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

