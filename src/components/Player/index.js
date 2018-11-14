import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import StyledPlayer from './styled'
import {compose, pure, setPropTypes} from 'recompose'
import Slide from '@material-ui/core/Slide'

function Player({
  player,
  capturedDiscsCount,
  capturedKingDiscsCount,
  wins,
  losses,
  t,
}) {
  const tPlayer = t('app.player', {player})
  const tCapturedDiscs = t('statistics.captured_discs')
  const tCapturedKings = t('statistics.captured_kings')

  const tWins = t('statistics.wins')
  const tLosses = t('statistics.losses')
  const tOverall = t('statistics.overall')
  const tCaptures = t('statistics.captures')

  const playerTimeout = {enter: 150}
  const playerTransitionStyle = {transitionDelay: 500}

  return (
    <StyledPlayer player={player}>
      <Slide
        in
        unmountOnExit
        mountOnEnter
        direction={player === 1 ? 'right' : 'left'}
        key={'player-' + player + '-slide-header'}
        timeout={playerTimeout}
        style={playerTransitionStyle}
      >
        <div className="Box Header">
          <Avatar className="Avatar">N</Avatar>
          <div className="Info">
            <Typography color="inherit" variant="subtitle2" component="p">
              {tPlayer}
            </Typography>
            <Typography color="inherit" variant="h5" component="p">
              Nameless
            </Typography>
          </div>
        </div>
      </Slide>
      <Slide
        in
        unmountOnExit
        mountOnEnter
        direction={player === 1 ? 'left' : 'right'}
        key={'player-' + player + '-slide-body'}
        timeout={playerTimeout}
        style={playerTransitionStyle}
      >
        <div className="Box Body">
          <div className="Overall">
            <Typography
              color="inherit"
              variant="overline"
              component="div"
              className="Header"
            >
              {tOverall}
            </Typography>
            <div className="Statistic">
              <div className="Wins">
                <Typography color="inherit" variant="h5" component="p">
                  {wins}
                </Typography>
                <Typography variant="caption" color="inherit">
                  {tWins}
                </Typography>
              </div>
              <div className="Losses">
                <Typography color="inherit" variant="h5" component="p">
                  {losses}
                </Typography>
                <Typography variant="caption" color="inherit">
                  {tLosses}
                </Typography>
              </div>
            </div>
          </div>

          <div className="Current">
            <Typography
              color="inherit"
              variant="overline"
              component="div"
              className="Header"
            >
              {tCaptures}
            </Typography>
            <div className="Statistic">
              <div className="CapturedDiscs">
                <Typography color="inherit" variant="h5" component="p">
                  {capturedDiscsCount}
                </Typography>
                <Typography variant="caption" color="inherit">
                  {tCapturedDiscs}
                </Typography>
              </div>
              <div className="CapturedKings">
                <Typography color="inherit" variant="h5" component="p">
                  {capturedKingDiscsCount}
                </Typography>
                <Typography variant="caption" color="inherit">
                  {tCapturedKings}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </StyledPlayer>
  )
}

const propTypes = {
  /**
   * The Player
   */
  player: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * The Player quantity of captured discs
   */
  capturedDiscsCount: PropTypes.number.isRequired,

  /**
   * The Player quantity of captured kings
   */
  capturedKingDiscsCount: PropTypes.number.isRequired,

  /**
   * The Player quantity of wins
   */
  wins: PropTypes.number.isRequired,

  /**
   * The Player quantity of wins
   */
  losses: PropTypes.number.isRequired,

  /**
   * The translations
   */
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
