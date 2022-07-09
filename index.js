const gridSize = 9;
let board = [];

//create the grid
let container = document.querySelector(".container");
let row = document.createElement('div');
row.classList.add('row');



for(let i = 0; i<gridSize; i++) {
    let square = document.createElement('div');
    square.dataset.squareId = i;
    square.classList.add('square')
    row.appendChild(square)


    if (row.childNodes.length == 3) {
        container.appendChild(row);
        row = document.createElement('div');
        row.classList.add('row');
    }
}