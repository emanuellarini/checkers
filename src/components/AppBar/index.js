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
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'
import {compose, setPropTypes, pure} from 'recompose'
import {connect} from 'react-redux'
import {underDevelopmentMessage} from 'store/notification'

function AppBar({
  underDevelopmentMessage,
  currentPlayer,
  capturedDiscsCount,
  capturedKingDiscsCount,
}) {
  const collapseTimeout = {enter: 350}
  const playerTimeout = {enter: 150}
  const dividerTimeout = {enter: 250}
  const playerTransitionStyle = {transitionDelay: 500}
  const dividerTransitionStyle = {transitionDelay: 650}

  return (
    <StyledAppBar currentPlayer={currentPlayer}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="Title">
            Checkers Game
          </Typography>

          <IconButton onClick={underDevelopmentMessage} color="inherit">
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
              <Player
                player={currentPlayer}
                currentPlayer={currentPlayer}
                capturedDiscsCount={capturedDiscsCount}
                capturedKingDiscsCount={capturedKingDiscsCount}
              />
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

  /**
   * Callback to display notification
   */
  underDevelopmentMessage: PropTypes.func.isRequired,

  /**
   * The Player quantity of captured discs
   */
  capturedDiscsCount: PropTypes.number.isRequired,

  /**
   * The Player quantity of captured kings
   */
  capturedKingDiscsCount: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const currentPlayer = state.turns.currentPlayer

  return {
    currentPlayer,
    capturedDiscsCount:
      state[`player${currentPlayer}`].statistics.capturedDiscsCount,
    capturedKingDiscsCount:
      state[`player${currentPlayer}`].statistics.capturedKingDiscsCount,
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    {underDevelopmentMessage},
  ),
  setPropTypes(propTypes),
  pure,
)

export default enhance(AppBar)
