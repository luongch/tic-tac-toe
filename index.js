const board = (() => {
    const gridSize = 3;
    let boardState = [[],[],[]];
    let currentTurn = 0;
    let winner = false;


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
            currentTurn++;
            placeMark(e);
            updateBoard(e);

            if(currentTurn >= 5) {
                checkForWinner(e);
            }
            
            if(currentTurn == 9 && !winner) {
                console.log("it's a tie")
            }
        })

        return square;
    }

    const updateBoard = (e) => {

        let rowIndex = parseInt(e.target.dataset.row)
        let colIndex = parseInt(e.target.dataset.col)
        boardState[rowIndex][colIndex] = e.target.innerHTML == 'o';
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
        
        for(let i = 0; i<boardState[rowIndex].length; i++) {
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
        
        for(let i = 0; i<gridSize; i++) {
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
            trueCount == 3 ? console.log("p1 wins") : console.log("p2 wins");
            winner = true;
        }
    }

    return {createBoard, boardState};
})();

const displayController = (()=>{
    let player = true;

    placeMark = (e) => {
        if(e.target.innerHTML == "") {
            let index = parseInt(e.target.dataset.squareId);
            e.target.innerHTML = player ? 'o' : 'x';
            player = !player;
        }   
    }
})();

const playerFactory = (name, number) => {
    return {};
}



board.createBoard();


let playerOne = playerFactory("A", 1);
let playerTwo = playerFactory("B", 2);

