import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import StyledPlayer from './styled'
import {compose, pure, setPropTypes} from 'recompose'

function Player({
  player,
  currentPlayer,
  capturedDiscsCount,
  capturedKingDiscsCount,
  multiCaptureMovesCount,
}) {
  return (
    <StyledPlayer player={player} currentPlayer={currentPlayer}>
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
        <div className="Statistic">
          <Typography color="inherit" variant="h5" component="p">
            {multiCaptureMovesCount}
          </Typography>
          <Typography variant="caption" color="inherit">
            Multi Capture Moves
          </Typography>
        </div>
        <div className="Statistic">
          <Typography color="inherit" variant="h5" component="p">
            {capturedDiscsCount}
          </Typography>
          <Typography variant="caption" color="inherit">
            Captured Discs
          </Typography>
        </div>
        <div className="Statistic">
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
   * The player
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
   * The Player quantity of multicapture moves
   */
  multiCaptureMovesCount: PropTypes.number.isRequired,
}

function mapStateToProps(state, props) {
  return {
    capturedDiscsCount:
      state[`player${props.player}`].statistics.capturedDiscsCount,
    capturedKingDiscsCount:
      state[`player${props.player}`].statistics.capturedKingDiscsCount,
    multiCaptureMovesCount:
      state[`player${props.player}`].statistics.multiCaptureMovesCount,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
