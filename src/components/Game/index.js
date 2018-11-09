import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from 'components/AppBar'
import Board from 'components/Board'
import Turns from 'components/Turn'
import Winner from 'components/WinnerAlert'
import StyledGame from './styled'

function Game() {
  return (
    <StyledGame>
      <AppBar />

      <Typography
        variant="overline"
        color="primary"
        align="center"
        component="p"
        className="Hint"
      >
        Hint: you can pass your turn by pressing <b>Spacebar</b>
      </Typography>

      <div className="Container">
        <Board />
        <Turns />
      </div>

      <Winner />
    </StyledGame>
  )
}

export default Game
