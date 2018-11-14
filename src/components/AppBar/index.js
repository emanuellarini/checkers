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
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'
import {compose, setPropTypes, pure} from 'recompose'
import {connect} from 'react-redux'
import {notify} from 'store/notification'
import {withNamespaces} from 'react-i18next'

function AppBar({
  notify,
  currentPlayer,
  capturedDiscsCount,
  capturedKingDiscsCount,
  wins,
  losses,
  t,
}) {
  const collapseTimeout = {enter: 350}
  const dividerTimeout = {enter: 250}
  const dividerTransitionStyle = {transitionDelay: 750}

  function handleNotify() {
    return notify(t('notifications.help'))
  }
  const appName = t('app.name')

  return (
    <StyledAppBar currentPlayer={currentPlayer}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="Title">
            {appName}
          </Typography>

          <IconButton onClick={handleNotify} color="inherit">
            <HelpIcon />
          </IconButton>
        </Toolbar>

        <Collapse in timeout={collapseTimeout} appear>
          <div className="Turns">
            <Player
              t={t}
              wins={wins}
              losses={losses}
              player={currentPlayer}
              currentPlayer={currentPlayer}
              capturedDiscsCount={capturedDiscsCount}
              capturedKingDiscsCount={capturedKingDiscsCount}
            />
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
  notify: PropTypes.func.isRequired,

  /**
   * The Player quantity of captured discs
   */
  capturedDiscsCount: PropTypes.number.isRequired,

  /**
   * The Player quantity of captured kings
   */
  capturedKingDiscsCount: PropTypes.number.isRequired,

  /**
   * The app translation strings
   */
  t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const currentPlayer = state.turns.currentPlayer

  return {
    currentPlayer,
    capturedDiscsCount:
      state[`player${currentPlayer}`].statistics.capturedDiscsCount,
    capturedKingDiscsCount:
      state[`player${currentPlayer}`].statistics.capturedKingDiscsCount,
    wins: state[`player${currentPlayer}`].statistics.wins,
    losses: state[`player${currentPlayer}`].statistics.losses,
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    {notify},
  ),
  withNamespaces(),
  setPropTypes(propTypes),
  pure,
)

export default enhance(AppBar)
