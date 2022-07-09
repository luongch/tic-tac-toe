const board = (() => {
    const gridSize = 9;
    let board = [];

    const createBoard = () => {
        let container = document.querySelector(".container");
        let row = createRow();

        for(let i = 0; i<gridSize; i++) {
            let square = createSquare(i);
            row.appendChild(square)

            if (row.childNodes.length == 3) {
                container.appendChild(row);
                row = createRow();
            }
        }
    }

    const createRow = () => {
        let row = document.createElement('div');
        row.classList.add('row');
        return row;
    }

    const createSquare = (i) => {
        let square = document.createElement('div');
        square.dataset.squareId = i;
        square.classList.add('square')

        square.addEventListener('click', function() {
            placeMark();
        })

        return square;
    }

    return {createBoard};
})();




board.createBoard();

placeMark = () => {
    console.log("worked")
}