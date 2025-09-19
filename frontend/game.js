const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const mulliganBtn = document.getElementById("mulliganBtn");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");
const typeInput = document.getElementById("typeInput");


const canvas = document.getElementById("asteroid-game-canvas")
const ctx = canvas.getContext("2d");

// Game Variables
let score = 0;
let asteroids =[];
let gameRunning = false;

const wordList = ["asteroid", "planet", "comet", "rocket", "football", "soccer","javascript"];

// Event Listeners

startBtn.addEventListener("click", startGame)
mulliganBtn.addEventListener("click", startGame)

typeInput.addEventListener("input", () => {
    asteroids = asteroids.filter(a => {
        if(typeInput.value.trim() === a.text){
            score += 1;
            scoreDisplay.textContent = score;
            typeInput.value = "";
            return false; // matched word removed
        }
        return true; // keep matched word
    });
});

// Game Functions

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

    // inital words
    for (let i = 0; i < 5; i++) spawnWord();

    requestAnimationFrame(gameLoop);
}

// Spawn word function
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

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    asteroids.forEach(a => (a.y += a.speed));

    // Spawn new words if fewer than 5 on screen
    if (asteroids.length < 5) spawnWord();

    // Check if any word reached bottom
    asteroids.forEach(a => {
        if (a.y > canvas.height) gameOver();
    });
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw words
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    asteroids.forEach(a => ctx.fillText(a.text, a.x, a.y));

    // Draw player ship
    ctx.fillStyle = "cyan";
    ctx.fillRect(canvas.width / 2 - 15, canvas.height - 40, 30, 30);
}

// Game over
function gameOver() {
    gameRunning = false;
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScoreDisplay.textContent = score;
}

