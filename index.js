const board = (() => {
    const gridSize = 3;
    let board = [[],[],[]];
    console.log(board)
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
        })

        return square;
    }

    const updateBoard = (e) => {

        let rowIndex = parseInt(e.target.dataset.row)
        let colIndex = parseInt(e.target.dataset.col)
        board[rowIndex][colIndex] = e.target.innerHTML;
    }

    return {createBoard};
})();

const displayController = (()=>{
    let player = true;

    placeMark = (e) => {
        let index = parseInt(e.target.dataset.squareId);
        e.target.innerHTML = player ? 'o' : 'x';
        player = !player;
    }
})();

const playerFactory = (name, number) => {
    return {};
}



board.createBoard();


let playerOne = playerFactory("A", 1);
let playerTwo = playerFactory("B", 2);

