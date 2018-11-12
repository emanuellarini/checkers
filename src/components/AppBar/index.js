import React from 'react'
import PropTypes from 'prop-types'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import HelpIcon from '@material-ui/icons/Help'
import Player from 'components/Player'
import StyledAppBar from './styled'
import {compose, setPropTypes, pure} from 'recompose'
import {connect} from 'react-redux'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'

function AppBar({currentPlayer}) {
  const collapseTimeout = {enter: 250}
  const playerTimeout = {enter: 150}
  const dividerTimeout = {enter: 250}
  const playerTransitionStyle = {transitionDelay: 250}
  const dividerTransitionStyle = {transitionDelay: 300}

  return (
    <StyledAppBar currentPlayer={currentPlayer}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="Title">
            Checkers Game
          </Typography>

          <IconButton onClick={() => null} color="inherit">
            <HelpIcon />
          </IconButton>
        </Toolbar>

        <Collapse in timeout={collapseTimeout} appear>
          <div className="Turns">
            <Slide
              in
              unmountOnExit
              mountOnEnter
              direction={currentPlayer === 1 ? 'right' : 'left'}
              key={'player-' + currentPlayer + '-slide'}
              timeout={playerTimeout}
              style={playerTransitionStyle}
            >
              <Player player={currentPlayer} currentPlayer={currentPlayer} />
            </Slide>
            <Fade
              in
              unmountOnExit
              mountOnEnter
              key={'divider-' + currentPlayer + '-slide'}
              timeout={dividerTimeout}
              style={dividerTransitionStyle}
            >
              <Divider className="Divider" />
            </Fade>
          </div>
        </Collapse>
      </MuiAppBar>
    </StyledAppBar>
  )
}

const propTypes = {
  /**
   * The Current Player
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  setPropTypes(propTypes),
  pure,
)

export default enhance(AppBar)
