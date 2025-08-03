# 📝 Word Asteroid Game  

A creative twist on the classic Asteroids game — instead of shooting rocks, you type words to destroy falling asteroids!  
Built using **Java** and **Swing**, this game helps improve your typing speed and reaction time while having fun.

---

## 🚀 Gameplay Overview

- Words fall from the top of the screen like asteroids ☄️  
- Type the full word and press `Enter` to destroy it  
- Earn points for each word destroyed  
- If a word reaches the bottom, you lose a life  
- Game gets progressively faster!

---

## 🎮 Controls

| Action             | Key                        |
|--------------------|----------------------------|
| Type word          | Keyboard                   |
| Submit word        | `Enter`                    |
| Restart game       | `R` (after game over)      |
| Exit game          | `ESC`                      |

---

## 🧠 Features

🔹 Real-time falling word animation  
🔹 Typing-based input system  
🔹 Score and life tracking  
🔹 Random word selection from list  
🔹 Dynamic difficulty scaling  
🔹 Simple GUI using `JFrame` and `JPanel`  

---

## 📁 Project Structure
```
AsteroidGame/
├── assets/
│   ├── words.txt                         # Word list for gameplay
│   ├── background.png                    # Background image
│   ├── hit.wav                           # Sound effect for correct word
│   └── miss.wav                          # Sound for missed asteroid
│
├── bin/                                  # ← Compiled .class files will go here
│   └── src/
│       ├── GameFrame.class
│       ├── GamePanel.class
│       ├── WordAsteroid.class
│       ├── WordManager.class
│       ├── InputHandler.class
│       └── Utils.class
│
├── src/
│   ├── GameFrame.java                    # Game window setup
│   ├── GamePanel.java                    # Game loop and rendering
│   ├── WordAsteroid.java                 # Represents falling word
│   ├── WordManager.java                  # Controls word spawning and matching
│   ├── InputHandler.java                 # Typing input logic
│   └── Utils.java                        # Helper functions
└── README.md
```

---

## 🛠 How to Build & Run

### 🔧 Compile and Run (Command Line)

```bash
clone the repo to IDE of choice
after cloning repo enter two steps below

javac -d bin src/*.java                  # Program will complile
java -cp bin src.WordAsteroid            # Program will run
```

### License 
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