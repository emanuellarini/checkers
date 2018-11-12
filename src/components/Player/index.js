import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import StyledPlayer from './styled'
import {compose, pure, setPropTypes} from 'recompose'

function Player({player, capturedDiscsCount, capturedKingDiscsCount}) {
  return (
    <StyledPlayer player={player}>
      <div className="Box Header">
        <Avatar className="Avatar">N</Avatar>
        <div className="Info">
          <Typography color="inherit" variant="subtitle2" component="p">
            Player {player}
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
            Captured Discs
          </Typography>
        </div>
        <div className="Statistic CapturedKings">
          <Typography color="inherit" variant="h5" component="p">
            {capturedKingDiscsCount}
          </Typography>
          <Typography variant="caption" color="inherit">
            Captured Kings
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
}

const enhance = compose(
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
