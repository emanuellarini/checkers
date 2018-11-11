import React from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import HelpIcon from '@material-ui/icons/Help'
import Player from 'components/Player'
import StyledAppBar from './styled'
import {compose, pure} from 'recompose'
import {connect} from 'react-redux'
import Slide from '@material-ui/core/Slide'

function AppBar({currentPlayer}) {
  return (
    <StyledAppBar currentPlayer={currentPlayer}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
            Checkers Game
          </Typography>

          <IconButton onClick={() => null} color="inherit">
            <HelpIcon />
          </IconButton>
        </Toolbar>

        <Slide
          in
          direction={currentPlayer === 1 ? 'right' : 'left'}
          key={'player-' + currentPlayer + '-slide'}
        >
          <div className="Turns">
            <Player player={currentPlayer} currentPlayer={currentPlayer} />
            <Divider className="Divider" />
          </div>
        </Slide>
      </MuiAppBar>
    </StyledAppBar>
  )
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  pure,
)

export default enhance(AppBar)
