import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import StyledPlayer from './styled'
import {compose, pure, setPropTypes} from 'recompose'

function Player({player, capturedDiscsCount, capturedKingDiscsCount, t}) {
  const tPlayer = t('app.player', {player})
  const tCapturedDiscs = t('statistics.captured_discs')
  const tCapturedKings = t('statistics.captured_kings')

  return (
    <StyledPlayer player={player}>
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
      <div className="Box Body">
        <div className="Statistic CapturedDiscs">
          <Typography color="inherit" variant="h5" component="p">
            {capturedDiscsCount}
          </Typography>
          <Typography variant="caption" color="inherit">
            {tCapturedDiscs}
          </Typography>
        </div>
        <div className="Statistic CapturedKings">
          <Typography color="inherit" variant="h5" component="p">
            {capturedKingDiscsCount}
          </Typography>
          <Typography variant="caption" color="inherit">
            {tCapturedKings}
          </Typography>
        </div>
      </div>
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
   * The translations
   */
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
