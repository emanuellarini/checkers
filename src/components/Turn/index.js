import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import StyledTurn from './styled'
import {compose, pure, setPropTypes, withHandlers, lifecycle} from 'recompose'
import {endTurn} from 'store/movement'
import Typography from '@material-ui/core/Typography'

function turn({currentPlayer, canPassTurn, endTurn}) {
  function getPlayerButton(player) {
    return (
      <div>
        {player === currentPlayer ? (
          <span>
            <b>Player {player}</b>
          </span>
        ) : (
          <span>Player {player}</span>
        )}
        <Button
          variant="contained"
          onClick={endTurn}
          size="small"
          disabled={!canPassTurn(player)}
          color="primary"
        >
          Pass Turn
        </Button>
      </div>
    )
  }

  return (
    <StyledTurn currentPlayer={currentPlayer}>
      {getPlayerButton(1)}
      {getPlayerButton(2)}

      <Typography variant="caption">
        Hint: You can pass turn by pressing <b>Space</b> button
      </Typography>
    </StyledTurn>
  )
}

const propTypes = {
  /**
   * The current player
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * Determine if player can pass his turn
   */
  canPassTurn: PropTypes.func.isRequired,

  /**
   * Callback to end current player turn
   */
  endTurn: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
    movementCount: state.movement.movementCount,
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    {endTurn},
  ),
  withHandlers({
    canPassTurn: props => player =>
      props.movementCount !== 0 && props.currentPlayer === player,
    spacebarPressed: props => e =>
      e.code === 'Space' ? props.endTurn() : false,
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('keydown', this.props.spacebarPressed)
    },
    componentWillUnmount() {
      window.removeEventListener('keydown', this.props.spacebarPressed)
    },
  }),
  setPropTypes(propTypes),
  pure,
)

export default enhance(turn)
