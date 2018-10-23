import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import StyledTurn from './styled'

class Turn extends React.PureComponent {
  render() {
    const {currentPlayer, player} = this.props

    return (
      <StyledTurn player={player} currentPlayer={currentPlayer}>
        Turno do Jogador {player}
      </StyledTurn>
    )
  }
}

Turn.propTypes = {
  /**
   * A player
   */
  player: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * The current player
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,
}

export default connect(state => ({currentPlayer: state.turns.currentPlayer}))(
  Turn,
)
