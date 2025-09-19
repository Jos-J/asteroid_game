const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const mulliganBtn = document.getElementById("mulliganBtn");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");


startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  startGame();
});

mulliganBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    startGame();
})

function startGame() {
    console.log("Game Started")
    setTimeout(() => gameOver(100), 1000);
}


function gameOver(finalScore) {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    document.getElementById("finalScore").textContent = finalScore;
}


/*
var c = document.getElementById("asteroid-game-canvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillStyle = "green";
ctx.fillText("Hello World", 10, 50);
*/
