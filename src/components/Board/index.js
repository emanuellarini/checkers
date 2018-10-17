import React from 'react'
import PropTypes from 'prop-types'
import Board from './Board'
import {DragDropContext} from 'react-beautiful-dnd'

class ConnectedBoard extends React.PureComponent {
  render() {
    const {onBeforeDragStart, onDragEnd} = this.props

    return (
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragEnd={onDragEnd}
      >
        <Board {...this.props} />
      </DragDropContext>
    )
  }
}

ConnectedBoard.propTypes = {
  onBeforeDragStart: PropTypes.func,
  onDragEnd: PropTypes.func.isRequired,
}

export default ConnectedBoard
