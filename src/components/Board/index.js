import React from 'react'
import PropTypes from 'prop-types'
import Board from './Board'
import {DragDropContext} from 'react-beautiful-dnd'

class ConnectedBoard extends React.Component {
  render() {
    const {onDragStart, onDragUpdate, onDragEnd} = this.props

    return (
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Board {...this.props} />
      </DragDropContext>
    )
  }
}

ConnectedBoard.propTypes = {
  onDragStart: PropTypes.func,
  onDragUpdate: PropTypes.func,
  onDragEnd: PropTypes.func.isRequired,
}

export default ConnectedBoard
