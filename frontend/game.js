// Grab DOM elements
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
const pauseBtn = document.getElementById("pauseBtn")
const lifeImg = new Image();
lifeImg.src ="../assets/syringe.png";

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

// Word list
const wordList = ["asteroid", "planet", "comet", "rocket", "football", "soccer","javascript"];

// Event listeners
startBtn.addEventListener("click", startGame);
mulliganBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause"
});

// Input listener with partial word highlight
typeInput.addEventListener("input", () => {
    const typed = typeInput.value.trim().toLowerCase();

    asteroids = asteroids.filter(a => {
        const word = a.text.toLowerCase();

        // Full match → remove word and update score
        if (typed === word) {
            score += 1;
            scoreDisplay.textContent = score;
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
    const speed = 1 + Math.random() * 2;
    asteroids.push({ text, x, y, speed });
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
    asteroids.forEach(a => a.y += a.speed);

    // Spawn new words if fewer than 5
    if (asteroids.length < 5) spawnWord();

    // Check for words reaching bottom
    asteroids.forEach(a => {
        if (a.y > canvas.height) gameOver();
    });
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
    finalScoreDisplay.textContent = score;
}
