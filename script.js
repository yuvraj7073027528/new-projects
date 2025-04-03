const board = document.getElementById('board');
const rollDiceButton = document.getElementById('rollDice');
const diceResult = document.getElementById('diceResult');
const message = document.getElementById('message');

let playerPosition = 0;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

function createBoard() {
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = i;
        board.appendChild(cell);
    }
}

function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceResult.innerText = `You rolled: ${dice}`;
    movePlayer(dice);
}

function movePlayer(dice) {
    playerPosition += dice;
    if (playerPosition > 100) {
        playerPosition = 100; // Stay at 100 if overshoot
    }
    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
        message.innerText = "Oh no! You hit a snake!";
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
        message.innerText = "Yay! You climbed a ladder!";
    } else {
        message.innerText = "";
    }
    updateBoard();
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = ''); // Clear previous player position
    const playerCell = cells[100 - playerPosition];
    const playerMarker = document.createElement('div');
    playerMarker.classList.add('player');
    playerCell.appendChild(playerMarker);
}

rollDiceButton.addEventListener('click', rollDice);
createBoard();
updateBoard();