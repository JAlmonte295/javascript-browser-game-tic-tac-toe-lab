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

const playerX = 'X';
const playerO = 'O';


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');

console.log(squareEls);
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/


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

function updateBoard() {
    for (let i = 0; i < board.length; i++) {
        const squareEl = squareEls[i];
                // Set the text content of the square
        squareEl.textContent = board[i]; // Directly use board[i]

                // Set the default color for the square
        squareEl.style.color = '#334155'; // Default color from your CSS

                // Apply specific colors based on the board value
        if (board[i] === playerX) {
            squareEl.style.color = '#ef4444'; // Red for X
            } else if (board[i] === playerO) {
             squareEl.style.color = '#3b82f6'; // Blue for O
            }
                // If board[i] is '', it will retain the default color, which is correct.
            }
}

// Still gotta figure out how this works....
function handleClick(event) {
    const squareIndex = parseInt(event.target.id); // Get the index from the id of the clicked square

    // If the board has a value of 'X' or 'O' at the squareIndex position, immediately return out of handleClick. That square is already taken. Also, if winner is true, immediately return out of handleClick because the game is over.
    if (board[squareIndex] !== '' || winner) {
        return;
    }
    placePiece(squareIndex);
    render();
    // need the above code explained.
}


function placePiece(index) {
    board[index] = turn;
    console.log(board[index]);
}

// Obtain the index of the clicked square. To do this, get the index from an id assigned to the target element in the HTML. Assign this to a constant called squareIndex.




function init() {
    render();
    console.log("I have been initilized!")
};


function render() {
    console.log("I have been rendered!")
    updateBoard();
    updateMessage();
};

init();

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});
init();

// should be able to manually change the values held in the board array in the init() function and see the style of the corresponding square change on your page.









/*----------------------------- Event Listeners -----------------------------*/

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


