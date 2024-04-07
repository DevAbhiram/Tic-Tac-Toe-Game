document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerMessage = document.getElementById('winner-message');
    const playAgainButton = document.getElementById('play-again-button');
    let currentPlayer = 'X';
    let winner = null;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);
    playAgainButton.addEventListener('click', resetGame);

    function handleClick(e) {
        const cell = e.target;
        if (!cell.textContent && !winner) {
            cell.textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                winner = currentPlayer;
                showWinnerPopup(`Player ${winner} wins!`);
            } else if (checkDraw()) {
                showWinnerPopup('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => cells[index].textContent === player);
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function showWinnerPopup(message) {
        winnerMessage.textContent = message;
        winnerPopup.classList.remove('hidden');
    }

    function hideWinnerPopup() {
        winnerPopup.classList.add('hidden');
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        winner = null;
        hideWinnerPopup();
    }
});
