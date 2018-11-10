import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import StyledPlayer from './styled'
import MultiCaptureImg from 'assets/icons/multicapture.png'
import CaptureKingImg from 'assets/icons/capture-king.png'
import CaptureDiscImg from 'assets/icons/capture-disc.png'
import {compose, pure, setPropTypes} from 'recompose'

function Player({
  player,
  currentPlayer,
  capturedDiscsCount,
  capturedKingDiscsCount,
  multiCaptureMovesCount,
}) {
  return (
    <StyledPlayer player={player}>
      <div className="Box Header">
        <div className="Disc" />
        <div className="Info">
          <Typography color="textSecondary" variant="subtitle2" component="p">
            Player {player}
          </Typography>
          <Typography color="inherit" variant="subtitle1" component="p">
            Nameless
          </Typography>
        </div>
      </div>

      {player === currentPlayer ? (
        <LinearProgress
          variant="query"
          color={player === 1 ? 'primary' : 'secondary'}
        />
      ) : (
        <Divider />
      )}

      <div className="Box Body">
        <div className="Statistic">
          <img src={MultiCaptureImg} />
          <Typography variant="h4" component="div" color="textSecondary">
            {multiCaptureMovesCount}
          </Typography>
          <Typography variant="caption">Multicapture Movements</Typography>
        </div>
        <div className="Statistic">
          <img src={CaptureDiscImg} />
          <Typography variant="h4" component="div" color="textSecondary">
            {capturedDiscsCount}
          </Typography>
          <Typography variant="caption">Captured Discs</Typography>
        </div>
        <div className="Statistic">
          <img src={CaptureKingImg} />
          <Typography variant="h4" component="div" color="textSecondary">
            {capturedKingDiscsCount}
          </Typography>
          <Typography variant="caption">Captured Kings</Typography>
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
    currentPlayer: state.turns.currentPlayer,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
