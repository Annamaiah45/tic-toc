const gameBoard = document.getElementById('gameBoard');
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

function handleClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] !== '' || checkForWinner()) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkForWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (boardState.every(cell => cell !== '')) {
        setTimeout(() => alert("It's a draw!"), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkForWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
