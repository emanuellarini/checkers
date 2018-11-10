import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from 'components/AppBar'
import Board from 'components/Board'
import Player from 'components/Player'
import Winner from 'components/WinnerAlert'
import Turn from 'components/Turn'
import StyledGame from './styled'

function Game() {
  return (
    <StyledGame>
      <AppBar />

      <div className="Container">
        <Board />
        <div className="Players">
          <Player player={1} />
          <Player player={2} />
        </div>
        <Typography
          variant="overline"
          color="primary"
          align="center"
          component="p"
        >
          hint: you can pass your turn by pressing <b>Spacebar</b>
        </Typography>
      </div>

      <Winner />
      <Turn />
    </StyledGame>
  )
}

export default Game
