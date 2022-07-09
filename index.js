const board = (() => {
    const gridSize = 3;
    let boardState = [[],[],[]];

    const createBoard = () => {
        let container = document.querySelector(".container");
        
        for(let i = 0; i<gridSize; i++) {
            let row = createRow(i);
            container.appendChild(row)
        }
    }

    const createRow = (rowIndex) => {
        let row = document.createElement('div');
        row.classList.add('row');
        for(let i = 0; i<gridSize; i++) {
            let square = createSquare(rowIndex, i);
            row.appendChild(square)
        }
        
        return row;
    }

    const createSquare = (rowIndex, colIndex) => {
        let square = document.createElement('div');
        square.dataset.row = rowIndex;
        square.dataset.col = colIndex;
        square.classList.add('square')

        square.addEventListener('click', function(e) {
            placeMark(e);
            updateBoard(e);
            displayController.checkForWinner(e)
        })

        return square;
    }

    const updateBoard = (e) => {
        let rowIndex = parseInt(e.target.dataset.row)
        let colIndex = parseInt(e.target.dataset.col)
        boardState[rowIndex][colIndex] = e.target.innerHTML == 'o';
    }    

    const reset = () => {
        let container = document.querySelector(".container");
        container.querySelectorAll('*').forEach(n => n.remove());
        boardState = [[],[],[]]
        createBoard();
        displayController.reset();
    }

    return {createBoard, reset, boardState};
})();

const displayController = (()=>{
    let playerA = null;
    let playerB = null;
    let playerOne = true;
    let currentTurn = 0;
    let winner = false;

    placeMark = (e) => {
        if(e.target.innerHTML == "") {
            let index = parseInt(e.target.dataset.squareId);
            e.target.innerHTML = playerOne ? 'o' : 'x';
            playerOne = !playerOne;
            currentTurn++;

            if(currentTurn >= 5) {
                checkForWinner(e);
            }
            
            if(currentTurn == 9 && !winner) {
                displayController.setMessage("It's a tie")
                displayController.showMessage();
            }
        }   
    }

    const checkForWinner = (e) => {
        checkRow(parseInt(e.target.dataset.row))
        checkCol(parseInt(e.target.dataset.col))
        checkDiagonal([[0,0],[1,1],[2,2]]);
        checkDiagonal([[2,0],[1,1],[0,2]]);
    }

    const checkRow = (rowIndex) => {
        let trueCount = 0;
        let falseCount = 0;

        for(let i = 0; i<board.boardState.length; i++) {
            if(board.boardState[rowIndex][i] == undefined) {
                break; //if anything in the row is empty then we can stop
            }
            board.boardState[rowIndex][i] ? trueCount++ : falseCount++;
        }
        checkWinner(trueCount,falseCount);
    }

    const checkCol = (colIndex) => {
        let trueCount = 0;
        let falseCount = 0;
        
        for(let i = 0; i<board.boardState.length; i++) {
            if(board.boardState[i][colIndex] == undefined) {
                break;
            }
            board.boardState[i][colIndex] ? trueCount++ : falseCount++;

        }
        checkWinner(trueCount,falseCount);
    }

    const checkDiagonal = (diagonal) => {
        let trueCount = 0;
        let falseCount = 0;
        
        for(let i = 0; i<diagonal.length; i++) {
            if(board.boardState[diagonal[i][0]][diagonal[i][1]] == undefined) {
                break;
            }   
            board.boardState[diagonal[i][0]][diagonal[i][1]] ? trueCount++ : falseCount++; 
        }
        checkWinner(trueCount,falseCount);
    }

    const checkWinner = (trueCount, falseCount) => {
        if(trueCount == 3 || falseCount == 3 ) {
            winner = true;
            trueCount == 3 ?  setMessage("p1 wins") :  setMessage("p2 wins");
            showMessage();
        }
    }
    const reset = () => {
        playerOne = true;
        currentTurn = 0;
        winner = false;
        hideMessage();
    }

    const hideMessage = () => {
        let winnerContainer =  document.querySelector('.winnerContainer');
        winnerContainer.classList.add('hidden');
    }

    const showMessage = () => {
        let winnerContainer =  document.querySelector('.winnerContainer');
        winnerContainer.classList.remove('hidden')
    }

    const setMessage = (message) => {
        let winnerMessage = document.querySelector('.winnerMessage');
        winnerMessage.innerHTML = message
    }

    const hideForm = () => {
        let form = document.querySelector(".form");
        form.classList.add("hidden");
    }

    const startGame = () => {
        board.createBoard();

        playerA = playerFactory()

        hideForm();


    }

    return {checkForWinner, reset, showMessage, setMessage, startGame}
})();

const playerFactory = (name, number) => {
    const getName = () => {
        return this.name;
    }

    const getNumber = () => {
        return this.number;
    }
    return {getName, getNumber};
}

// board.createBoard();

// let playerOne = playerFactory("A", 1);
// let playerTwo = playerFactory("B", 2);

