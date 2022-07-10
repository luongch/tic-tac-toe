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
        boardState[rowIndex][colIndex] = e.target.classList.contains('o');
    }    

    const reset = () => {
        let container = document.querySelector(".container");
        container.querySelectorAll('*').forEach(n => n.remove());
        boardState = [[],[],[]];
        createBoard();
        displayController.reset();
    }

    const getState = () => {
        //this is needed because if you reference the boardState directly then you can't reset it later
        return boardState;
    }

    return {createBoard, reset, getState};
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
            let mark = document.createElement("img");
            
            mark.src = playerOne ?  "./images/checkbox-blank-circle-outline.svg" : "./images/sword-cross.svg";
            mark.alt = playerOne ?  "o" : "x";

            e.target.classList.add(playerOne ?  "o" : "x")
            e.target.appendChild(mark);

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
        let boardState = board.getState();

        for(let i = 0; i< boardState.length; i++) {
            if(boardState[rowIndex][i] == undefined) {
                break; //if anything in the row is empty then we can stop
            }
            boardState[rowIndex][i] ? trueCount++ : falseCount++;
        }
        checkWinner(trueCount,falseCount);
    }

    const checkCol = (colIndex) => {
        let trueCount = 0;
        let falseCount = 0;
        let boardState = board.getState();
        
        for(let i = 0; i<boardState.length; i++) {
            if(boardState[i][colIndex] == undefined) {
                break;
            }
            boardState[i][colIndex] ? trueCount++ : falseCount++;

        }
        checkWinner(trueCount,falseCount);
    }

    const checkDiagonal = (diagonal) => {
        let trueCount = 0;
        let falseCount = 0;
        let boardState = board.getState();
        
        for(let i = 0; i<diagonal.length; i++) {
            if(boardState[diagonal[i][0]][diagonal[i][1]] == undefined) {
                break;
            }   
            boardState[diagonal[i][0]][diagonal[i][1]] ? trueCount++ : falseCount++; 
        }
        checkWinner(trueCount,falseCount);
    }

    const checkWinner = (trueCount, falseCount) => {
        if(trueCount == 3 || falseCount == 3 ) {
            winner = true;
            trueCount == 3 ?  setMessage(`${playerA.name} wins`) :  setMessage(`${playerB.name} wins`);
            showMessage();
            disableGame();
        }
    }

    const disableGame = () => {
        let container = document.querySelector(".container");
        container.querySelectorAll('.square').forEach(square => {
            square.replaceWith(square.cloneNode(true)); //clone each square and remove event listener
        });
    }

    const reset = () => {
        playerOne = true;
        currentTurn = 0;
        winner = false;
        hideMessage();
    }

    const hideMessage = () => {
        let winnerContainer = document.querySelector('.winnerContainer');
        winnerContainer.classList.add('hidden');
    }

    const showMessage = () => {
        let winnerContainer = document.querySelector('.winnerContainer');
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

    const createPlayers = () => {
        let data = document.getElementById('form')
        playerA = playerFactory(data.elements['playerOne'].value, 1)
        playerB = playerFactory(data.elements['playerTwo'].value, 2)
    }

    const startGame = () => {
        board.createBoard();

        createPlayers();
        hideForm();
    }

    return {checkForWinner, reset, showMessage, setMessage, startGame}
})();

const playerFactory = (name, number) => {
    return {name, number};
}
