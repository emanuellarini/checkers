import React from 'react'
import Board from 'components/Board'
import Turns from 'components/Turn'

function Game() {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Board />
      <Turns />
    </div>
  )
}

export default Game
