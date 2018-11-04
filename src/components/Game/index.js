import React from 'react'
import Typography from '@material-ui/core/Typography'
import Board from 'components/Board'
import Turns from 'components/Turn'
import StyledGame from './styled'

function Game() {
  return (
    <StyledGame>
      <Typography variant="h4" color="primary" align="center" component="h1">
        Checkers Game!
      </Typography>

      <div className="Container">
        <Board />
        <Turns />
      </div>
    </StyledGame>
  )
}

export default Game
