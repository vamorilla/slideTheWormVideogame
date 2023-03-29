import React from 'react'
import Button from './Button'

function FinalResult({result, onClick}) {
  return (
    <div className='game__info'>
        <h2>{result}</h2>
        <Button onClick={onClick}>Ir al inicio</Button>
    </div>
  )
}

export default FinalResult