import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from 'components/AppBar'
import Board from 'components/Board'
import Winner from 'components/WinnerAlert'
import Turn from 'components/Turn'
import Zoom from '@material-ui/core/Zoom'
import Notification from 'components/Notification'
import StyledGame from './styled'

function Game() {
  const fadeDelay = {transitionDelay: 700}
  return (
    <StyledGame>
      <AppBar />

      <Zoom in appear style={fadeDelay}>
        <div className="Container">
          <Board />
          <Typography
            variant="caption"
            color="textSecondary"
            align="center"
            component="p"
            className="Hint"
          >
            hint: you can pass the turn by <b>pressing Spacebar</b> after your
            move
          </Typography>
        </div>
      </Zoom>

      <Winner />
      <Turn />
      <Notification />
    </StyledGame>
  )
}

export default Game
