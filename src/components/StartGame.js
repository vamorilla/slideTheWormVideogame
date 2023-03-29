import React from 'react';
import Button from './Button';
import imgGame from '../img/worm.png';

function StartGame({ onClick }) {
  return (
    <>
      <div className='game__info'>
        <div className='title'>
        <h1>Slide the Worm</h1>
        <img src={imgGame} alt='Imagen de gusano' />
      </div>
        <Button onClick={onClick}>Jugar</Button>
      </div>
    </>
    
  )
}

export default StartGame;