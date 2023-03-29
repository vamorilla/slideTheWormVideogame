import getAvailableCells from "./getAvailableCells";

export default function availableCells(boardSize, cellSize, initialPosition){
    const availableCells = [];
    for(let i = 0; i < boardSize / cellSize; i++){
        for(let j = 0; j < boardSize / cellSize; j++){
            const cellKey = getAvailableCells(i * cellSize, j * cellSize);
            if(!initialPosition.includes(cellKey)){
                availableCells.push(cellKey);
            }
        }
    }

    return availableCells;
}