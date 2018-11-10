import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grow from '@material-ui/core/Grow'
import LinearProgress from '@material-ui/core/LinearProgress'
import StyledPlayer from './styled'
import {compose, pure, setPropTypes} from 'recompose'
import {getDiscsCountFromPlayer} from 'selectors/disc'

function Player({player, currentPlayer, capturedDiscsCount}) {
  function getDiscs() {
    return Array.from({length: capturedDiscsCount}, (disc, key) => (
      <Grow key={'captured-disc-' + player + '-' + key} in timeout={700}>
        <div className={`CapturedDisc Player${player}`} />
      </Grow>
    ))
  }

  const renderedDiscs =
    capturedDiscsCount > 0 ? (
      <React.Fragment>
        <Typography variant="body2" paragraph color="textSecondary">
          Captured Discs
        </Typography>
        {getDiscs()}
      </React.Fragment>
    ) : (
      <Typography variant="body2" color="textSecondary">
        No Discs captured yet!
      </Typography>
    )

  return (
    <StyledPlayer>
      <div className="Box Header">
        <div className={`Disc Player${player}`} />
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
        <div className="CapturedDiscs">{renderedDiscs}</div>
      </div>
    </StyledPlayer>
  )
}

const propTypes = {
  /**
   * The player number
   */
  player: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * The Player Discs captured quantity
   */
  capturedDiscsCount: PropTypes.number,
}

function mapStateToProps(state, props) {
  return {
    capturedDiscsCount: Number(12 - getDiscsCountFromPlayer(state, props)),
    currentPlayer: state.turns.currentPlayer,
  }
}

const enhance = compose(
  connect(mapStateToProps),
  setPropTypes(propTypes),
  pure,
)

export default enhance(Player)
