/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']; //state of the squares on the board
let turn = 'X'; //whose turn is it?
let winner = false; //has anyone won yet?
let tie = false; //game has ended on a tie.


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

console.log(squareEls);
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    turn = 'X'; // Reset turn to X
    winner = false; // Reset winner
    tie = false; // Reset tie
    render();
    console.log("I have been initilized!")
};

function handleClick(event) {

    const squareIndex = parseInt(event.target.id); // Get the index from the id of the clicked square
    console.log(`Square Index: ${squareIndex}`); // Debugging line to check the index
    if (board[squareIndex] !== '' || winner || tie) {
        return; // Ignore the click if the square is already filled or the game is over
    };
    placePiece(squareIndex); // call the function and pass the squareIndex as an argument
    checkWinner(); // Check if there's a winner after placing the piece
    console.log(winner); // Debugging line to check if a winner is found
    checkForTie(); // Check for a tie after placing the piece
    switchPlayerTurn(); // Switch the turn after placing the piece
    render(); // Render the updated board and message

};

function placePiece(index) {
    board[index] = turn;
    console.log(board[index]);

};

function switchPlayerTurn() {
    if (winner) {
        return; // If there's a winner, no need to switch turns
    }
    else if (turn === 'X') {
        turn = 'O'; // Switch to player O
    }
    else {
        turn = 'X'; // Switch to player X
    }
};

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true; // Set winner to true if a winning combo is found
        }
    }
};

function checkForTie() {
    if (winner) {
        return; // If there's a winner, no need to check for a tie
    }
    if (board.every(square => square !== '')) {
        tie = true; 
        console.log(tie);
        // Set tie to true if all squares are filled and no winner
    }
};

function render() {
    console.log("I have been rendered!")
    updateBoard();
    updateMessage();
};

function updateBoard() {
    board.forEach((square, index) => {
        const squareEl = squareEls[index];
        squareEl.textContent = square; // Update the text content of each square element
        squareEl.className = 'sqr'; // Reset the class name to 'sqr'
        if (square === 'X') {
            squareEl.classList.add('x'); // Add 'x' class if the square is occupied by player X
        }
        else if (square === 'O') {
            squareEl.classList.add('o'); // Add 'o' class if the square is occupied by player O
        }
        else {
            squareEl.classList.remove('x', 'o'); // Remove both classes if the square is empty
        }
    })};

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    }
    else if (winner === false && tie === true) {
        messageEl.textContent = `It's a tie!`;
    }
    else if (winner === true) {
        messageEl.textContent = `${turn} wins!`;
    };
}; 


init();

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', () => {
    init(); 
});
