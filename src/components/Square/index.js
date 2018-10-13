import React from 'react'
import PropTypes from 'prop-types'
import StyledDiv from './styled'
import {getSquareVariant} from './helpers'
import {Droppable} from 'react-beautiful-dnd'

/**
 * Visual representation of Board Squares
 * Dark and Light square variants are represented by coordinates x,y
 */
class Square extends React.Component {
  render() {
    const {coords, size, children, disabledDrop} = this.props
    const key = `board-square-${coords[0]}-${coords[1]}`

    return (
      <Droppable droppableId={'droppable-' + key} isDropDisabled={disabledDrop}>
        {(provided, snapshot) => (
          <StyledDiv
            variant={getSquareVariant(coords[0], coords[1])}
            data-testid={key}
            dragging={snapshot.isDraggingOver}
            size={size}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {children(coords)}
            </div>
            {provided.placeholder}
          </StyledDiv>
        )}
      </Droppable>
    )
  }
}

Square.defaultProps = {
  size: 80,
  disabledDrop: false,
}

Square.propTypes = {
  /**
   * The function who renders the Disc
   */
  children: PropTypes.func.isRequired,

  /**
   * The coordinates represented by X and Y coordinates in Board
   */
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,

  /**
   * The size of Square sides
   */
  size: PropTypes.number.isRequired,

  /**
   * Determine if the Square can receive a Disc
   */
  disabledDrop: PropTypes.bool.isRequired,
}

export default Square
