import React, { useReducer, useEffect } from 'react';
import { PLAYER_1, PLAYER_2, START, PLAYING, END } from 'config/const';
import useInterval from 'hooks/useInterval';
import GameContainer from 'components/GameContainer';
import sumCoord from 'utilities/sumCoord';
import playerCanChangeDirection from 'utilities/playerCanChangeDirection';
import getAvailableCells from 'utilities/getAvailableCells';
import availableCells from 'utilities/availableCells';
import StartGame from 'components/StartGame';

import './App.css';
import FinalResult from 'components/FinalResult';


const ship = 15;
const boardSize = 750;

const players = [PLAYER_1, PLAYER_2];

const initialState = {
  players,
  availableCells: availableCells(
    boardSize, 
    ship, 
    players.map((player)=> getAvailableCells(player.position.x, player.position.y))),
    gameStatus: START
};


function updateGame(game, action){
  if(action.type === 'start'){
    return{
      ...initialState,
      gameStatus: PLAYING
    }
  }

  if(action.type === 'reStart'){
    return{
      ...initialState,
      gameStatus: START
    }
  }

  if(action.type === 'move'){
    //update players state
    const newPlayersState = game.players.map(player => ({
      ...player,
      position: sumCoord(player.position, player.direction)
    }));

    const playerWithCollision = newPlayersState.map(player => {
      const myCellKey = getAvailableCells(player.position.x, player.position.y);

      return {
        ...player,
        hasDied:
          !game.availableCells.includes(myCellKey) || 
          newPlayersState.filter(p => p.ID !== player.ID)
          .map(p => getAvailableCells(p.position.x, p.position.y))
          .includes(myCellKey)
      }
    });

    const ocupedCells = game.players.map(player => getAvailableCells(player.position.x, player.position.y));
    const avCells = game.availableCells.filter(availableCells => {
      return !ocupedCells.includes(availableCells);
    })

    return {
      players: playerWithCollision,
      availableCells: game.availableCells,
      gameStatus: playerWithCollision.filter((player) => player.hasDied).length === 0
        ? PLAYING
        : END
    };
  }

  if(action.type === 'changeDirection'){
    const newPlayersState = game.players.map(player => ({
      ...player,
      direction: player.KEYS[action.key] && 
      playerCanChangeDirection(player.direction, player.KEYS[action.key]) 
      ? player.KEYS[action.key] 
      : player.direction
    }));

    return {
      players: newPlayersState,
      availableCells: game.availableCells,
      gameStatus: game.gameStatus
    };
  }
};

function App() {

  let result = null;
  const[game, playersStateDispatch] = useReducer(updateGame, initialState);

  const players = game.players;
  const diedPlayers = players.filter(player => player.hasDied);
  if(diedPlayers.length > 0 ){
    console.log(diedPlayers)
  }

  useInterval(()=>{
    playersStateDispatch({type: 'move'});
  }, game.gameStatus !== PLAYING ? null : 100);

  useEffect(()=>{
    //identify keys press
    function handleKeypress(e){
      const key = `${e.keyCode}`;
      if(key === '13'){
        if(game.gameStatus === START){
          handleStart();
        }
        if(game.gameStatus === END){
          handleReStart();
        }
      }
      playersStateDispatch({type: 'changeDirection', key});
    }

    document.addEventListener('keydown', handleKeypress);

    return function clean(){
      document.removeEventListener('keydown', handleKeypress);
    };
  }, []);

  function handleStart(){
    playersStateDispatch({type: 'start'});
  }

  if(game.gameStatus === END){
    const winner = game.players.filter(player => !player.hasDied);
    if(winner.length === 0){
      result = 'Ha sido un empate :/';
    }else{
      result = `Ganador: ${winner.map(player => `Jugador ${player.ID}`).join(',')} :)`
    }
  }

  function handleReStart(){
    playersStateDispatch({type: 'reStart'});
  }

  return (
    <>
      <GameContainer playersState={game.players} gameStatus={game.gameStatus}/>
      {game.gameStatus === START && <StartGame onClick={handleStart} />}
      {game.gameStatus === END && <FinalResult onClick={handleReStart} result={result} />}
    </>
    
  );
}

export default App;
