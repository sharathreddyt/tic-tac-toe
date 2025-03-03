
const statusDisplay = document.querySelector('.status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const cells = document.querySelectorAll("[data-cell-index]")
const restartButton = document.querySelector(".restart")

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellPlayed(cell))
})

restartButton.onclick = onRestart


statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(cell) {
    return (e) => {
        if (cell.innerHTML === '') {
            cell.innerHTML = currentPlayer
            if (!checkGameStatus()) {
                togglePlayer(cell)
            }
        }
    }
}

function togglePlayer(cell) {
    if (cell.innerHTML === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function onRestart(e) {
    cells.forEach((cell) => {
        cell.innerHTML = ""
    })
    currentPlayer = 'X'
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelector('.game').style.pointerEvents = 'auto'
}

function checkGameStatus() {
    let isGameDone = false;
    let allCellsFilled = true;
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    let characterMap = {}
    cells.forEach((cell, index) => {
        characterMap[index] = cell.innerHTML;
        if (cell.innerHTML === '') {
            allCellsFilled = false
        }
    })

    winningCombinations.forEach(([first, second, third]) => {
        if (characterMap[first] === characterMap[second] && characterMap[third] === characterMap[second] && characterMap[second] !== '') {
            statusDisplay.innerHTML = winningMessage()
            isGameDone = true
            document.querySelector('.game').style.pointerEvents = 'none'
        } else {
            if (allCellsFilled) {
                statusDisplay.innerHTML = drawMessage()
                isGameDone = true
                document.querySelector('.game').style.pointerEvents = 'none'
            }
        }
    })
    return isGameDone
}