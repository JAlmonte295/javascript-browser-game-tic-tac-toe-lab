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
    render(); // got confused with the order of these functions, so I put render at the end
    console.log("I have been initilized!")
    squareEls.forEach(square => {
        square.className = 'sqr'; 
        square.style.color = '';
        square.style.backgroundColor = '';
    });

};

function handleClick(event) {

    const squareIndex = parseInt(event.target.id); 
    console.log(`Square Index: ${squareIndex}`); 
    if (board[squareIndex] !== '' || winner || tie) {
        return; 
    };
    placePiece(squareIndex); //dry?
    checkWinner(); 
    console.log(winner);
    checkForTie();
    switchPlayerTurn();
    render();
};

function placePiece(index) {
    board[index] = turn;
    console.log(board[index]);

};

function switchPlayerTurn() {
    if (winner) {
        return; 
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
        if (board[a] && board[a] === board[b] && board[a] === board[c]) { //this one was hard to figure out on my own.
            winner = true;
        }
    }
};

function checkForTie() {
    if (winner) {
        return;
    }
    if (board.every(square => square !== '')) {
        tie = true; 
        console.log(tie);
  
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
        squareEl.textContent = square; 
        squareEl.className = 'sqr'; 
        if (square === 'X') {
            squareEl.classList.add('x');
            squareEl.style.color = 'blue';
            squareEl.style.backgroundColor = '#FFEBCD'; 
        }
        else if (square === 'O') {
            squareEl.classList.add('o');
            squareEl.style.color = 'red';
            squareEl.style.backgroundColor = '#FFEBCD'; 
        }
        else {
            squareEl.classList.remove('x', 'o');
        }
    })};

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's player ${turn}'s turn! 🫵`;
        messageEl.style.color = turn === 'X' ? 'blue' : 'red'; 
    }
    else if (winner === false && tie === true) {
        messageEl.textContent = `It's a tie! 🤷`;
        messageEl.style.color = 'black'; 
    }
    else if (winner === true) {
        messageEl.textContent = `Player ${turn} wins! 🎉`;
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
