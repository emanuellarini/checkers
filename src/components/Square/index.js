import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import {Droppable} from 'react-beautiful-dnd'

/**
 * The Connected Board Squares
 * Represents a droppable square if its variant is dark
 */
class ConnectedSquare extends React.PureComponent {
  getKey() {
    const {coords} = this.props
    return `board-square-${coords[0]}-${coords[1]}`
  }

  render() {
    const {children, disabled} = this.props
    const key = this.getKey()

    return (
      <Droppable droppableId={'droppable-' + key} isDropDisabled={disabled}>
        {(provided, snapshot) => (
          <Square
            key={'droppable-' + key}
            data-testid={key}
            variant={'dark'}
            isDropping={snapshot.isDraggingOver && !disabled}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </div>
          </Square>
        )}
      </Droppable>
    )
  }
}

ConnectedSquare.propTypes = {
  /**
   * The function who renders the Disc
   */
  children: PropTypes.node.isRequired,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,

  /**
   * The movable Squares coordinates
   */
  movableSquares: PropTypes.arrayOf(PropTypes.array),
}

export default ConnectedSquare
