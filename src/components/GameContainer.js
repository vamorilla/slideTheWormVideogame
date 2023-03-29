import { END, START } from 'config/const';
import React, { useEffect, useRef } from 'react';
import imgGame from '../img/worm.png';

const ship = 15;
const boardSize = 750;


function GameContainer({playersState, gameStatus}) {

    const refCanvas = useRef();

    useEffect(()=> {

      if(gameStatus === START || gameStatus === END){
        const canv = refCanvas.current;
        const context = canv.getContext('2d');
        context.clearRect(0, 0, boardSize, boardSize);

        context.beginPath();
        context.strokeStyle = '#001900';
        for(let i = ship * 2; i <= boardSize; i += ship * 2){
            context.moveTo(i, 0);
            context.lineTo(i, boardSize);
        }

        for(let i = ship * 2; i <= boardSize; i += ship * 2){
            context.moveTo(0, i);
            context.lineTo(boardSize, i);
        }

        context.stroke();
        context.closePath();
      }
        
    }, [gameStatus]);

    useEffect(()=>{
      const context = refCanvas.current.getContext('2d');

      playersState.forEach(player => {
        context.fillStyle = player.COLOR;
        context.fillRect(player.position.x, player.position.y, ship, ship);
      });

    }, [playersState])

  return (
    <>
      <div className='title'>
        <h1>Slide the Worm</h1>
        <img src={imgGame} alt='Imagen de gusano' />
      </div>
      <canvas ref={refCanvas} width={boardSize} height={boardSize} className="board"/>
      <div className='instructions'>
        {
          playersState.map((player) => (
            <div className='instructions__player' style={{color: player.COLOR, fontSize: '1.2em'}} key={`player--${player.ID}`}>
              {`${player.ID}: ${player.intructions}`}
            </div>
          ))
        }
      </div>
    </>
    
  )
}

export default GameContainer