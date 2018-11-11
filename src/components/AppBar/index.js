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
        <div className="Turns">
          <div className="Tabs">
            <Player player={1} currentPlayer={currentPlayer} />
            <Player player={2} currentPlayer={currentPlayer} />
          </div>
          <Divider className="Divider" />
        </div>
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
