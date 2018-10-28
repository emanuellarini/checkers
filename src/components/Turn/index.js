import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import StyledTurn from './styled'
import {compose, pure, setPropTypes} from 'recompose'

function turn({currentPlayer, player}) {
  return (
    <StyledTurn player={player} currentPlayer={currentPlayer}>
      Turno do Jogador {player}
    </StyledTurn>
  )
}

const propTypes = {
  /**
   * A player
   */
  player: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * The current player
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

export default enhance(turn)
