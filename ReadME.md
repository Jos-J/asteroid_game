# 🚀 Asteroid Typing Game

full-stack project where a classic typing game meets modern web development.  
This project demonstrates frontend game design, backend API development, and SQL database integration. project is created for personal learning.   

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
├── assets/                        # Images, sounds, fonts for the game
│   ├── backgroundmusic.mp3
│   ├── lifebar.png
│   ├── background.jpg
│   └── wireframe.wav
│   
│
│
├── backend/                       # Java backend (Spring Boot or Servlets)
│   ├── pom.xml                    # Maven configuration
│   └── src/
│       └── main/
│           ├── java/com/game/      
│           │   ├── AsteroidGameApp.java       # Main entry point
│           │   ├── controller/
│           │   │   ├── WordController.java    # API for words
│           │   │   └── ScoreController.java   # API for scores
│           │   ├── model/
│           │   │   ├── Word.java
│           │   │   └── Score.java
│           │   ├── service/
│           │   │   ├── WordService.java
│           │   │   └── ScoreService.java
│           │   └── repository/
│           │       ├── WordRepository.java
│           │       └── ScoreRepository.java
│           └── resources/
│               ├── application.properties   # DB config
│               ├── seed.sql
│               └── schema.sql                 # Optional sample data
│
└── frontend/                      
    ├── index.html                 
    ├── style.css
    ├── game.js                   
    └── api.js                    

```

---

### 🔌 API Endpoints
- `GET /api/words` → Fetch random words from database  
- `POST /api/score` → Save a player score  
- `GET /api/leaderboard` → Fetch top scores  

---

### 🛠️ Tech Stack
Frontend: HTML5, CSS3, JavaScript  
Backend: Java (Spring Boot)  
Database: SQL (MySQL)  

---

### 🚀 Getting Started
1. Import `db/schema.sql` into your SQL database.  
2. Run the Java backend (`mvn spring-boot:run`).  
3. Open `frontend/index.html` in your browser to start playing.  

---

### 📌 Roadmap
- [x] Add animations for projectile hits  
- [x] Game over + restart screen  
- [ ] Difficulty scaling (faster asteroids over time)  
- [ ] Deploy online  

---

### 📜 License

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

Copyright (c) 2025 Jos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
