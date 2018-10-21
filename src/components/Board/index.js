import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Board from './Board'
import {DragDropContext} from 'react-beautiful-dnd'

/**
 * A Connected Board within Drag and Drop Context
 *
 */
class ConnectedBoard extends React.PureComponent {
  render() {
    const {onDragStart, onDragEnd} = this.props

    return (
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Board {...this.props} />
      </DragDropContext>
    )
  }
}

ConnectedBoard.propTypes = {
  /**
   * A callback when a player starts to Drag
   */
  onDragStart: PropTypes.func,

  /**
   * A callback when Drag movement is finished aka drop
   */
  onDragEnd: PropTypes.func.isRequired,

  /**
   * The player acting this turn
   */
  currentPlayer: PropTypes.oneOf([1, 2]).isRequired,
}

export default connect(state => ({currentPlayer: state.game.currentPlayer}))(
  ConnectedBoard,
)
