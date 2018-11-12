import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {DragDropContext} from 'react-beautiful-dnd'
import Board from './styled'
import ConnectedSquare from 'components/Square'
import ConnectedDisc from 'components/Disc'
import _range from 'lodash/range'
import {compose, setPropTypes, pure} from 'recompose'
import {startMovement, endMovement} from 'store/movement'

function ConnectedBoard({startMovement, endMovement}) {
  function handleDragStart({source, draggableId}) {
    if (!source || !draggableId) return false
    const [player, discKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')

    startMovement(Number(player), discKey, Boolean(king))
  }

  function handleDragEnd({destination, draggableId}) {
    if (!destination || !draggableId) return false

    const [player, discKey, king] = draggableId
      .replace('disc-player-', '')
      .split('-')
    const [x, y] = destination.droppableId
      .replace(/droppable-board-square-*/, '')
      .split('-')

    const destinationCoords = [Number(x), Number(y)]

    endMovement(Number(player), destinationCoords, discKey, king)
  }

  const renderedSquares = _range(0, 8).map(function(x) {
    return _range(0, 8).map(function(y) {
      return (
        <ConnectedSquare
          key={`connected-board-square-${x}-${y}`}
          coords={[x, y]}
        >
          <ConnectedDisc coords={[x, y]} />
        </ConnectedSquare>
      )
    })
  })

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Board data-testid="board">{renderedSquares}</Board>
    </DragDropContext>
  )
}

const propTypes = {
  /**
   * Update movable squares action
   */
  startMovement: PropTypes.func.isRequired,

  /**
   * Update movable squares action
   */
  endMovement: PropTypes.func.isRequired,
}

const enhance = compose(
  connect(
    null,
    {startMovement, endMovement},
  ),
  setPropTypes(propTypes),
  pure,
)

export default enhance(ConnectedBoard)
