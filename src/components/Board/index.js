import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {DragDropContext} from 'react-beautiful-dnd'
import {startMovement, endMovement} from 'store/movement'
import _range from 'lodash/range'
import {getSquareVariant} from 'rules/square/variant'
import ConnectedSquare from 'components/Square'
import Board from './styled'
import Square from 'components/Square/styled'
import ConnectedDisc from 'components/Disc'

class ConnectedBoard extends React.PureComponent {
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

  renderSquares() {
    return _range(0, 8).map(x =>
      _range(0, 8).map(y => {
        if (getSquareVariant(x, y) === 'light') {
          return <Square variant="light" key={`light-square-${x}-${y}`} />
        }

        return (
          <ConnectedSquare
            key={`connected-board-square-${x}-${y}`}
            coords={[x, y]}
          >
            <ConnectedDisc coords={[x, y]} />
          </ConnectedSquare>
        )
      }),
    )
  }

  render() {
    const renderedSquares = this.renderSquares()

    return (
      <DragDropContext
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        <Board data-testid="board">{renderedSquares}</Board>
      </DragDropContext>
    )
  }
}

ConnectedBoard.propTypes = {
  /**
   * Update movable squares action
   */
  startMovement: PropTypes.func.isRequired,

  /**
   * Update movable squares action
   */
  endMovement: PropTypes.func.isRequired,
}

export default connect(
  null,
  {startMovement, endMovement},
)(ConnectedBoard)
