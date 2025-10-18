import React, { useRef, useEffect, useState } from "react";
import type { Asteroid, Bullet, Explosion } from "../types/gameTypes";
import lifeImgSrc from "../assets/lifebar.png";
import bgMusicSrc from "../assets/backgroundMusic.mp3";
import errorSoundSrc from "../assets/typeError.mp3";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [score, setScore] = useState(0);
  const [playerLives, setPlayerLives] = useState(3);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const lifeImg = useRef<HTMLImageElement>(new Image());
  lifeImg.current.src = lifeImgSrc;

  const bgMusic = useRef<HTMLAudioElement>(new Audio(bgMusicSrc));
  const errorSound = useRef<HTMLAudioElement>(new Audio(errorSoundSrc));

  const wordList = ["asteroid","planet","comet","rocket","football","soccer","javascript","galaxy","orbit","spaceship"];
  const errorCooldown = 200;
  const lastErrorTime = useRef(0);

  const shipX = 400; // canvas center X (adjusted on draw)
  const shipY = 560; // canvas bottom Y

  // -----------------------
  // Game Functions
  // -----------------------

  const spawnWord = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = wordList[Math.floor(Math.random() * wordList.length)];
    const x = Math.random() * (canvas.width - 100);
    const y = -30;
    const speed = 0.5 + Math.random() * 2;

    setAsteroids(prev => [...prev, { text, x, y, speed }]);
  };

  const shootAtWord = (word: Asteroid) => {
    setBullets(prev => [...prev, {
      x: shipX,
      y: shipY,
      targetX: word.x,
      targetY: word.y,
      word,
      progress: 0,
      speed: 0.05
    }]);
  };

  const explodeWord = (wordObj: Asteroid) => {
    const letters: Explosion = wordObj.text.split("").map((char, i) => ({
      char,
      x: wordObj.x + i * 12,
      y: wordObj.y,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      alpha: 1
    }));
    setExplosions(prev => [...prev, letters]);
  };

  const drawLives = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < playerLives; i++) {
      ctx.drawImage(lifeImg.current, ctx.canvas.width - 30 - i * 30, 10, 20, 20);
    }
  };

  // -----------------------
  // Game Loop
  // -----------------------

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const gameLoop = () => {
      if (!gameRunning) return;

      if (!isPaused) {
        // ----------------
        // Update
        // ----------------
        setAsteroids(prev => prev.map(a => ({ ...a, y: a.y + a.speed })).filter(a => {
          if (a.y > canvas.height) {
            setPlayerLives(l => l - 1);
            return false;
          }
          return true;
        }));

        setBullets(prev => prev.map(b => {
          const progress = b.progress + b.speed;
          const x = shipX + (b.targetX - shipX) * progress;
          const y = shipY + (b.targetY - shipY) * progress;
          return { ...b, progress, x, y };
        }).filter(b => {
          if (b.progress >= 1) {
            explodeWord(b.word);
            return false;
          }
          return true;
        }));

        setExplosions(prev => prev.map(letters => letters.map(l => ({
          ...l,
          x: l.x + l.dx,
          y: l.y + l.dy,
          alpha: l.alpha - 0.03
        }))).filter(letters => letters.some(l => l.alpha > 0)));

        // Spawn new words
        if (asteroids.length < 5) spawnWord();

        // ----------------
        // Draw
        // ----------------
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Score
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Score: ${score}`, 10, 10);

        drawLives(ctx);

        // Asteroids with partial highlight
        asteroids.forEach(a => {
          const typed = inputRef.current?.value.trim().toLowerCase() || "";
          const word = a.text.toLowerCase();
          let matchLength = 0;
          for (let i = 0; i < typed.length && i < word.length; i++) {
            if (typed[i] === word[i]) matchLength++;
            else break;
          }

          ctx.fillStyle = "green";
          ctx.fillText(a.text.slice(0, matchLength), a.x, a.y);
          ctx.fillStyle = "white";
          ctx.fillText(a.text.slice(matchLength), a.x + ctx.measureText(a.text.slice(0, matchLength)).width, a.y);
        });

        // Bullets
        bullets.forEach(b => {
          ctx.beginPath();
          ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "green";
          ctx.fill();
        });

        // Explosions
        explosions.forEach(letters => {
          letters.forEach(l => {
            ctx.fillStyle = `rgba(255,165,0,${l.alpha})`;
            ctx.font = "14px Arial";
            ctx.fillText(l.char, l.x, l.y);
          });
        });

        // Player ship
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height - 50);
        ctx.lineTo(canvas.width / 2 - 10, canvas.height - 30);
        ctx.lineTo(canvas.width / 2 + 10, canvas.height - 30);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white";
        ctx.stroke();
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    if (gameRunning) animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  }, [gameRunning, isPaused, asteroids, bullets, explosions, score, playerLives]);

  // -----------------------
  // Input Handling
  // -----------------------

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key.toLowerCase();
    if (key.length !== 1) return;

    const typed = (inputRef.current?.value.trim().toLowerCase() || "") + key;

    const hasMatch = asteroids.some(a => a.text.toLowerCase().startsWith(typed));
    if (!hasMatch) {
      e.preventDefault();
      const now = Date.now();
      if (now - lastErrorTime.current > errorCooldown) {
        errorSound.current.currentTime = 0;
        errorSound.current.play();
        lastErrorTime.current = now;
      }
      return;
    }

    setTimeout(() => {
      const currentTyped = inputRef.current?.value.trim().toLowerCase() || "";
      asteroids.forEach(a => {
        if (currentTyped === a.text.toLowerCase()) {
          setScore(s => s + 1);
          shootAtWord(a);
          if (inputRef.current) inputRef.current.value = "";
          setAsteroids(prev => prev.filter(x => x !== a));
        }
      });
    }, 0);
  };

  // -----------------------
  // Start / Pause / Restart
  // -----------------------

  const startGame = () => {
    setScore(0);
    setPlayerLives(3);
    setAsteroids([]);
    setBullets([]);
    setExplosions([]);
    if (inputRef.current) inputRef.current.value = "";
    setGameRunning(true);
    bgMusic.current.loop = true;
    bgMusic.current.volume = 0.2;
    bgMusic.current.play();
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (isPaused) bgMusic.current.play();
    else bgMusic.current.pause();
  };

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      <div>
        <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid white" }} />
      </div>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Type here"
        autoFocus
      />
      <div>Score: {score}</div>
      <div>Lives: {playerLives}</div>
      {playerLives <= 0 && <div>Game Over</div>}
    </div>
  );
};

export default Game;
