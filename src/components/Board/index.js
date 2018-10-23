import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Board from './Board'
import {DragDropContext} from 'react-beautiful-dnd'
import {startMovement, endMovement} from 'store/movement'

/**
 * A Connected Board within Drag and Drop Context
 *
 */
class ConnectedBoard extends React.Component {
  constructor(props) {
    super(props)

    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  handleDragStart({source, draggableId}) {
    if (!source || !draggableId) return false
    const [player, discKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')

    this.props.startMovement(Number(player), discKey, Boolean(king))
  }

  handleDragEnd({destination, draggableId}) {
    if (!destination || !draggableId) return false
    const [player, discKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')
    const [x, y] = destination.droppableId
      .replace(/droppable-board-square-*/, '')
      .split('-')

    const destinationCoords = [Number(x), Number(y)]

    this.props.endMovement(Number(player), destinationCoords, discKey, king)
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        <Board {...this.props} />
      </DragDropContext>
    )
  }
}

ConnectedBoard.propTypes = {
  /**
   * The player One Discs coordinates
   */
  player1Discs: PropTypes.object.isRequired,

  /**
   * The player One King Discs coordinates
   */
  player1Kings: PropTypes.array,

  /**
   * The player One Discs coordinates
   */
  player2Discs: PropTypes.object.isRequired,

  /**
   * The player One King Discs coordinates
   */
  player2Kings: PropTypes.array,

  /**
   * The movable squares
   */
  movableSquares: PropTypes.array,

  /**
   * The user who is playing the turn
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,

  /**
   * Update movable squares action
   */
  startMovement: PropTypes.func.isRequired,

  /**
   * Update movable squares action
   */
  endMovement: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    currentPlayer: state.turns.currentPlayer,
    player1Discs: state.discs.player1,
    player2Discs: state.discs.player2,
    player1Kings: state.kings.player1,
    player2Kings: state.kings.player2,
  }
}

export default connect(
  mapStateToProps,
  {startMovement, endMovement},
)(ConnectedBoard)
