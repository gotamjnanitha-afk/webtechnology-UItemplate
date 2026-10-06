const stage = document.getElementById("runnerStage");
const player = document.getElementById("runnerPlayer");
const obstacle = document.getElementById("runnerObstacle");

const overlay = document.getElementById("runnerOverlay");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const scoreElement = document.getElementById("score");
const bestElement = document.getElementById("best");
const speedElement = document.getElementById("speed");

const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const statusElement = document.getElementById("runnerStatus");

const clouds = document.querySelectorAll(".runner-cloud");
const trackLine = document.querySelector(".runner-track-line");

let gameRunning = false;
let gameOver = false;

let score = 0;
let bestScore = Number(localStorage.getItem("playverse-jungle-best")) || 0;

let speed = 6;
let obstacleX = 100;
let sceneryX = 0;

let playerY = 0;
let playerVelocity = 0;
let jumping = false;

let lastTime = 0;
let animationFrame;

const gravity = 0.8;
const jumpPower = 15;
const groundHeight = 72;

bestElement.textContent = bestScore;
scoreElement.textContent = "0";
speedElement.textContent = "1.0x";

function resetGame() {
    cancelAnimationFrame(animationFrame);

    gameRunning = false;
    gameOver = false;

    score = 0;
    speed = 6;
    obstacleX = 100;
    sceneryX = 0;

    playerY = 0;
    playerVelocity = 0;
    jumping = false;

    scoreElement.textContent = "0";
    speedElement.textContent = "1.0x";

    player.style.bottom = groundHeight + "px";
    obstacle.style.left = obstacleX + "%";

    clouds.forEach((cloud, index) => {
        cloud.style.transform = `translateX(${index * 120}px)`;
    });

    if (trackLine) {
        trackLine.style.transform = "translateX(0)";
    }

    statusElement.textContent = "Ready to run!";
}

function startGame() {
    resetGame();

    gameRunning = true;
    gameOver = false;

    overlay.classList.add("hidden");

    statusElement.textContent = "Running! Press SPACE or tap to jump.";

    lastTime = performance.now();

    animationFrame = requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    gameOver = true;

    cancelAnimationFrame(animationFrame);

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("playverse-jungle-best", bestScore);
        bestElement.textContent = bestScore;
    }

    overlayTitle.textContent = "Game Over!";
    overlayText.textContent = `You scored ${score} points. Try again and beat your best score!`;

    startButton.textContent = "Play Again";

    overlay.classList.remove("hidden");

    statusElement.textContent = "Game over!";

    if (navigator.vibrate) {
        navigator.vibrate(150);
    }
}

function jump() {
    if (!gameRunning) {
        return;
    }

    if (!jumping) {
        jumping = true;
        playerVelocity = jumpPower;
    }
}

function updatePlayer() {
    if (!jumping) {
        return;
    }

    playerY += playerVelocity;
    playerVelocity -= gravity;

    if (playerY <= 0) {
        playerY = 0;
        playerVelocity = 0;
        jumping = false;
    }

    player.style.bottom = groundHeight + playerY + "px";
}

function updateObstacle() {
    obstacleX -= speed * 0.08;

    if (obstacleX < -15) {
        obstacleX = 100 + Math.random() * 30;

        score += 10;

        scoreElement.textContent = score;

        if (score % 50 === 0) {
            speed += 0.5;
        }

        const speedMultiplier = (speed / 6).toFixed(1);
        speedElement.textContent = speedMultiplier + "x";
    }

    obstacle.style.left = obstacleX + "%";
}

function updateScenery() {
    sceneryX -= speed * 0.25;

    if (trackLine) {
        trackLine.style.transform = `translateX(${sceneryX % 100}px)`;
    }

    clouds.forEach((cloud, index) => {
        const movement = sceneryX * (0.08 + index * 0.03);
        cloud.style.transform = `translateX(${movement}px)`;
    });
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    const padding = 8;

    const collision =
        playerRect.left + padding < obstacleRect.right - padding &&
        playerRect.right - padding > obstacleRect.left + padding &&
        playerRect.top + padding < obstacleRect.bottom - padding &&
        playerRect.bottom - padding > obstacleRect.top + padding;

    return collision;
}

function gameLoop(currentTime) {
    if (!gameRunning) {
        return;
    }

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    updatePlayer();
    updateObstacle();
    updateScenery();

    if (checkCollision()) {
        endGame();
        return;
    }

    animationFrame = requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", () => {
    startGame();
});

restartButton.addEventListener("click", () => {
    startGame();
});

stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
        return;
    }

    jump();
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (!gameRunning) {
            startGame();
        } else {
            jump();
        }
    }
});

resetGame();