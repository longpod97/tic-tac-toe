const grid = document.querySelector(".grid-container");
const player1Input = document.getElementById("player1-input")
const player2Input = document.getElementById("player2-input")
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', '']


// Player creation
function createPlayer (name, symbol, score) {
    const getName  = () => name;
    const getSymbol = () => symbol;
    const getScore = () => score;
    const addScore = () => score++;
    return {getName, getSymbol, getScore, addScore}
 };



// win combinations array
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Row win combos
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Col win combos
    [0, 4, 8], [2, 4, 6] // Diagonal win combos
]

const gameBoard = ( () => {

    const displayBoard = () => {
        board.forEach ((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("grid-box");
            cell.setAttribute("data-index", index);
            grid.appendChild(cell);
         });
        };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];      
    };
      
      return {displayBoard, resetBoard}
})();

const playGame = ( () => {

    // player creation 
    const player1 = createPlayer(player1Input.value, 'X', 0)
    const player2 = createPlayer(player2Input.value, 'O', 0)
    let currentPlayer = player1; 

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
    }

    const checkWin = () => {

        // check for a draw
            if (board.every(cell => cell === player1.getSymbol() || cell === player2.getSymbol())) {
                gameOver = true
                alert("It's a Draw!")
            }
        // check for a win
        for (let combo of winCombos) {
            if (board[combo[0]] === currentPlayer.getSymbol() && board[combo[1]] === currentPlayer.getSymbol() && board[combo[2]] === currentPlayer.getSymbol()) {
                gameOver = true  
                alert("You Win");
                currentPlayer.addScore()
                return  true                
            }
        } return false
    }

    const  playRound = () => {
        gameBoard.displayBoard();
        const cells = document.querySelectorAll(".grid-box");
        cells.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                const index = cell.getAttribute('data-index');
                if (!board[index]) {
                    board[index] = currentPlayer.getSymbol();
                    cell.textContent = currentPlayer.getSymbol();
                }
                    if (!checkWin()) {
                        switchPlayer();
                    } 
                
            })
        })               
    } 
    return player1, player2, {playRound, checkWin}
})();


const newGameBttn = document.getElementById("game-button");
const dialog = document.getElementById("new-game-dialog");
const playGameBttn = document.getElementById("play-game-button");
const cancelBttn = document.getElementById("cancel");


cancelBttn.addEventListener("click", () => {
    dialog.close();
})

playGameBttn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
    grid.innerHTML = ""

    grid.classList.remove("hidden");

    const playerInfo = document.getElementById("players");
    playerInfo.innerHTML = ""
    const player1Info = document.createElement("div");
    const player2Info = document.createElement("div");
    player1Info.textContent = `Player 1: ${player1Input.value},      Symbol: X`
    player2Info.textContent = `Player 2: ${player2Input.value},      Symbol: O`
    playerInfo.appendChild(player1Info);
    playerInfo.appendChild(player2Info);
    playerInfo.classList.add("player-card");
    

   
    playGame.playRound();
    

    

    
}) 

newGameBttn.addEventListener("click", () => {
    gameBoard.resetBoard();

   
    player1Input.value = ""
    player2Input.value = ""
    dialog.showModal();
})




 