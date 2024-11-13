let score = 0;
let sequence = [];
let playerSequence = [];
let difficulty = "easy";

function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

function startGame() {
    score = 0;
    sequence = [];
    playerSequence = [];
    updateScore();
    nextRound();
}

function nextRound() {
    playerSequence = [];
    const colors = ["red", "green", "yellow", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);

    showSequence();
}

function showSequence() {
    let delay = 500;
    if (difficulty === "medium") delay = 400;
    if (difficulty === "hard") delay = 300;

    sequence.forEach((color, index) => {
        setTimeout(() => activateTile(color), delay * (index + 1));
    });
}

function activateTile(color) {
    const tile = document.querySelector(`.tile-${color}`);
    tile.classList.add("activated");
    setTimeout(() => tile.classList.remove("activated"), 300);
}

function handleTileClick(color) {
    playerSequence.push(color);
    activateTile(color);

    if (!checkPlayerInput()) {
        alert("Wrong! Game Over");
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score++;
        updateScore();
        nextRound();
    }
}

function checkPlayerInput() {
    return playerSequence.every((color, index) => color === sequence[index]);
}

function updateScore() {
    document.getElementById("score").textContent = score;
}

function resetGame() {
    score = 0;
    sequence = [];
    playerSequence = [];
    updateScore();
}


