const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const startBtn = document.getElementById("startBtn");
const mulliganBtn = document.getElementById("mulliganBtn");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");
const typeInput = document.getElementById("typeInput");
const canvas = document.getElementById("asteroid-game-canvas");
const ctx = canvas.getContext("2d");
const shipX = canvas.width / 2;
const shipY = canvas.height - 40;
const pauseBtn = document.getElementById("pauseBtn")
const lifeImg = new Image();
lifeImg.src ="../assets/lifebar.png";
const bgMusic = new Audio("../assets/backgroundMusic.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.2; 
const errorSound = new Audio("../assets/typeError.mp3")
const footer = document.querySelector("footer");


function drawLives(lives) {
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(lifeImg, canvas.width - 30 -i*30, 10, 20, 20);
    }
}

// Game variables
let score = 0;
let playerLives = 3;
let asteroids = [];
let gameRunning = false;
let isPaused = false;
let explosions =[];
let bullets = [];
let activeAsteroid = null;
let userInput = "";



// Word list
const wordList = ["asteroid", "planet", "comet", "rocket", "football", "soccer", "javascript", "galaxy", "orbit", "spaceship"];

// Event listeners
startBtn.addEventListener("click", () => {
    footer.style.display = "none";
    bgMusic.play();
    startGame();
});
mulliganBtn.addEventListener("click",() => {
    bgMusic.play();
    startGame();
});
pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause"

    if(isPaused){
        bgMusic.pause(); // pause music
    }else {
        bgMusic.play(); // resume music
    }
});

// Input listener with partial word highlight
typeInput.addEventListener("input", () => {
    const typed = typeInput.value.trim().toLowerCase();

    console.log("player typed", typed);

    let hasMatch = false;
    if (typed.length > 0) {
        for (const a of asteroids) {
            const word = a.text.toLowerCase();

            if (word.startsWith(typed)) {
                hasMatch = true;
                console.log("partial match with", word);
                break;
            }
        }

        if(!hasMatch) {
            console.log("no match found -> play error sound");
            errorSound.currentTime = 0;
            errorSound.play();
        }
    }

    asteroids = asteroids.filter(a => {
        const word = a.text.toLowerCase();

        // Full match → remove word and update score
        if (typed === word) {
            console.log("full match with:", word)
            score += 1;
            scoreDisplay.textContent = score;

            // shooting at word
            shootAtWord(a);

            typeInput.value = "";
            return false; // remove matched word
        } 
            return true;
    });
});





// Start game
function startGame() {
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "block";

    score = 0;
    scoreDisplay.textContent = score;
    asteroids = [];
    playerLives = 3;
    gameRunning = true;
    typeInput.value = "";
    typeInput.focus();

    // Spawn initial words
    for (let i = 0; i < 5; i++) spawnWord();

    requestAnimationFrame(gameLoop);
}

// Spawn a word
function spawnWord() {
    const text = wordList[Math.floor(Math.random() * wordList.length)];
    const x = Math.random() * (canvas.width - 100);
    const y = -30;
    const speed = .1 + Math.random() * 2;
    asteroids.push({ text, x, y, speed });

    if(!activeAsteroid) setActiveAsteroid();
}

function setActiveAsteroid() {
    if(asteroids.length > 0) {
        activeAsteroid = asteroids[0];
        userInput = "";
    } else {
        activeAsteroid = null;
    }
}

function explodeWord(wordObj) {
    // letter become a particle
    const letters = [];
    for (let i = 0; i < wordObj.text.length; i++) {
        letters.push({
            char: wordObj.text[i],
            x: wordObj.x + i * 12, // letter spacing
            y: wordObj.y,
            dx: (Math.random() - 0.5) * 4, // horizontal speed
            dy: (Math.random() - 0.5) * 4, // vertical speed
            alpha: 1
        });
    }
    explosions.push(letters);
}

function shootAtWord(wordObj) {
    bullets.push({
        x: shipX,
        y: shipY,
        targetX: wordObj.x,
        targetY: wordObj.y,
        word: wordObj,
        progress: 0,   // progress between 0 → 1
        speed: 0.05    // adjust to make bullet faster/slower
    });
}



// Game loop
function gameLoop() {
    if (!gameRunning) return;

    if (!isPaused) {
        update();
        draw();
    }
    
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    if (!gameRunning || isPaused) return;

    // asteroids.forEach(a => a.y += a.speed);

    for (let i = asteroids.length -1; i >= 0; i--) {
        const a = asteroids[i];
        a.y += a.speed;

     if (a.y > canvas.height) {
            playerLives--;           // lose a life
            asteroids.splice(i, 1); // remove word

            if (playerLives <= 0) {
                gameOver();          // game over if no lives
            }
        }
    }
    
    // new word spawn
    if (asteroids.length < 5) spawnWord();


    // bullets moving towards target
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.progress += b.speed;
        b.x = shipX + (b.targetX - shipX) * b.progress;
        b.y = shipY + (b.targetY - shipY) * b.progress;

        if (b.progress >= 1) {
            explodeWord(b.word);
            bullets.splice(i, 1);
        }
    }

   

    // -----------------------------
    // Update explosions
    // -----------------------------
   for (let i = explosions.length - 1; i >= 0; i--) {
        const letters = explosions[i];
        letters.forEach(l => {
            l.x += l.dx;
            l.y += l.dy;
            l.alpha -= 0.03;
        });

        if (letters.every(l => l.alpha <= 0)) {
            explosions.splice(i, 1);
        }
    }
}


// draw the score 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // score 
    ctx.font = "16px Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Score: ${score}`, 10, 10); 
    
    drawLives(playerLives);


    asteroids.forEach(a => {
        const word = a.text;
        const typed = typeInput.value.trim();

        // Count matching letters
        let matchLength = 0;
        for (let i = 0; i < typed.length && i < word.length; i++) {
            if (typed[i].toLowerCase() === word[i].toLowerCase()) {
                matchLength++;
            } else {
                break;
            }
        }
// Draw function with partial word highlight
        // Draw matched part in green
        ctx.fillStyle = "green";
        ctx.fillText(word.slice(0, matchLength), a.x, a.y);

        // Draw remaining part in white
        ctx.fillStyle = "white";
        ctx.fillText(word.slice(matchLength), a.x + ctx.measureText(word.slice(0, matchLength)).width, a.y);
    });

    // draw bullets
    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "Green";
        ctx.fill();
    });

    // Draw explosions
    explosions.forEach((letters, index) => {
        letters.forEach(l => {
            ctx.fillStyle = `rgba(255, 165, 0, ${l.alpha})`;
            ctx.font = "14px Arial";
            ctx.fillText(l.char, l.x, l.y);

            l.x += l.dx;
            l.y += l.dy;
            l.alpha -= 0.03;
        });

        // invisible letters
        if (letters.every(l => l.alpha <= 0)) {
            explosions.splice(index, 1);
        }
    });


    // Draw player ship
   ctx.beginPath();
   ctx.moveTo(canvas.width / 2, canvas.height - 50);      // top point
   ctx.lineTo(canvas.width / 2 - 10, canvas.height - 30); // bottom-left
   ctx.lineTo(canvas.width / 2 + 10, canvas.height - 30); // bottom-right
   ctx.closePath(); // close the triangle
   
   ctx.fillStyle = "Black";
   ctx.fill();
   ctx.lineWidth = 3;
   ctx.strokeStyle = "White";
   ctx.stroke();

}

 
// Game over
function gameOver() {
    gameRunning = false;
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    console.log("final score", score);
    console.log(finalScoreDisplay);
    finalScoreDisplay.textContent = score;
    bgMusic.pause();
}
