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

  getSquareVariant() {
    const [x, y] = this.props.coords

    const evenX = Number(x) % 2 === 0

    if (Number(y) % 2 === 0) {
      return evenX ? 'light' : 'dark'
    }

    return evenX ? 'dark' : 'light'
  }

  determineDisabledStatus() {
    const {coords, movableSquares} = this.props

    return !movableSquares.some(item => item.toString() === coords.toString())
  }

  render() {
    const {coords, renderDisc} = this.props

    const variant = this.getSquareVariant()
    const key = this.getKey()
    const disabled = this.determineDisabledStatus()

    if (variant === 'light') {
      return <Square key={key} variant={'light'} />
    }

    return (
      <Droppable droppableId={'droppable-' + key} isDropDisabled={disabled}>
        {(provided, snapshot) => (
          <Square
            key={key}
            data-testid={key}
            variant={'dark'}
            isDropping={snapshot.isDraggingOver && !disabled}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderDisc(coords)}
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
  renderDisc: PropTypes.func.isRequired,

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
