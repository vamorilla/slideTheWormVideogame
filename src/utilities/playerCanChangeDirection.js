import sumCoord from "./sumCoord";

export default function playerCanChangeDirection(currentDir, nextDir){
    const result = sumCoord(currentDir, nextDir);

    return Object.keys(result).filter(coordinate => result[coordinate] !== 0).length > 0;
}